import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import QuickReplies from './components/QuickReplies';
import MenuModal from './components/MenuModal';
import CartModal from './components/CartModal';
import OrderTrackingModal from './components/OrderTrackingModal';
import VideoModal from './components/VideoModal';
import { Message, CallStatus, MicPermission, MenuItem, CartItem, OrderStatus, OrderStatusValue } from './types';
import { getBotResponse } from './services/geminiService';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis';
import { menuItems } from './data/menuData';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: '¡Hola! Soy SaborBot, tu asistente virtual. Puedo tomar tu pedido o responder tus preguntas. ¿Cómo te ayudo hoy?', sender: 'bot' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isContinuousCallActive, setIsContinuousCallActive] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>('idle');
  const [micPermission, setMicPermission] = useState<MicPermission['state']>('prompt');
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [videoModalState, setVideoModalState] = useState<{ isOpen: boolean; url: string; query: string }>({ isOpen: false, url: '', query: '' });
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const orderTimerRef = useRef<number[]>([]);

  const speechEndedCallback = useCallback(() => {
    if (isContinuousCallActive) {
      setCallStatus('listening');
    } else {
      setCallStatus('idle');
    }
  }, [isContinuousCallActive]);
  
  const { speak, cancel } = useSpeechSynthesis(speechEndedCallback);
  const { transcript, isListening, startListening, stopListening, setTranscript } = useSpeechRecognition();

  const addMessage = (sender: 'user' | 'bot', text: string, videoUrl?: string, isThinking?: boolean, originalQuery?: string) => {
    const newMessage: Message = { id: Date.now().toString(), sender, text, videoUrl, isThinking, originalQuery };
    setMessages(prev => [...prev.filter(m => !m.isThinking), newMessage]);
  };
  
  const handleBotResponse = useCallback(async (userMessage: string) => {
    addMessage('bot', '', undefined, true);
    const history = messages;
    const response = await getBotResponse(userMessage, history);
    
    setMessages(prev => prev.filter(m => !m.isThinking));

    if (response.functionCall && response.functionCall.name === 'addToOrder') {
        const { items } = response.functionCall.args;
        let confirmationText = 'Perfecto, he añadido lo siguiente a tu pedido:\n';
        let itemsAdded = 0;

        if (items && Array.isArray(items)) {
          items.forEach((orderItem: { itemName: string; quantity: number }) => {
            const menuItem = menuItems.find(mi => mi.name.toLowerCase() === orderItem.itemName.toLowerCase());
            if (menuItem) {
              const quantity = orderItem.quantity || 1;
              setCartItems(prev => {
                const existingItem = prev.find(i => i.id === menuItem.id);
                if (existingItem) {
                  return prev.map(i => i.id === menuItem.id ? { ...i, quantity: i.quantity + quantity } : i);
                }
                return [...prev, { ...menuItem, quantity }];
              });
              confirmationText += `\n- ${quantity}x ${menuItem.name}`;
              itemsAdded++;
            }
          });
        }
        
        if (itemsAdded > 0) {
            addMessage('bot', confirmationText);
            setIsCartOpen(true);
        } else {
            addMessage('bot', "Lo siento, no pude encontrar los artículos que mencionaste en nuestro menú. ¿Podrías intentarlo de nuevo con el nombre exacto?");
        }

    } else if (response.text) {
        addMessage('bot', response.text, response.videoUrl, false, userMessage);
        if (isContinuousCallActive) {
            setCallStatus('speaking');
            speak(response.text);
        }
    }
  }, [messages, isContinuousCallActive, speak, setIsCartOpen]);

  // Voice Command Handling
  useEffect(() => {
    if (transcript && transcript.trim()) {
      const trimmedTranscript = transcript.trim();
      const command = trimmedTranscript.toLowerCase();
      let commandHandled = false;

      if (command.includes('menú') || command.includes('carta')) {
        if (!isMenuOpen) {
          setIsMenuOpen(true);
          speak('Claro, abriendo el menú.');
        }
        commandHandled = true;
      } else if (command.includes('carrito') || command.includes('pedido')) {
        if (!isCartOpen) {
          setIsCartOpen(true);
          speak('Aquí tienes tu pedido.');
        }
        commandHandled = true;
      } else if (command.includes('cierra el menú') || (isMenuOpen && command.includes('cerrar'))) {
        setIsMenuOpen(false);
        speak('Menú cerrado.');
        commandHandled = true;
      } else if (command.includes('cierra el carrito') || command.includes('cierra el pedido') || (isCartOpen && command.includes('cerrar'))) {
        setIsCartOpen(false);
        speak('Pedido cerrado.');
        commandHandled = true;
      }

      if (!commandHandled) {
        if (isContinuousCallActive) {
          stopListening();
          setCallStatus('thinking');
          addMessage('user', trimmedTranscript);
          handleBotResponse(trimmedTranscript);
        } else {
          setInputValue(trimmedTranscript);
          addMessage('user', trimmedTranscript);
          handleBotResponse(trimmedTranscript);
        }
      }
      
      setTranscript('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript]);

  useEffect(() => {
    if (isContinuousCallActive && callStatus === 'listening') {
      startListening(true);
    } else if (!isContinuousCallActive && isListening) {
      stopListening();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isContinuousCallActive, callStatus]);

  useEffect(() => {
    navigator.permissions.query({ name: 'microphone' as PermissionName }).then((permissionStatus) => {
      setMicPermission(permissionStatus.state);
      if (permissionStatus.state === 'denied') {
        setCallStatus('denied');
      }
      permissionStatus.onchange = () => {
        setMicPermission(permissionStatus.state);
        if (permissionStatus.state === 'denied') {
          setCallStatus('denied');
          setIsContinuousCallActive(false);
        } else if (permissionStatus.state === 'granted') {
           if (callStatus === 'denied') setCallStatus('idle');
        }
      };
    });
  }, [callStatus]);
  
  const requestMicPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      setMicPermission('granted');
      return true;
    } catch (err) {
      setMicPermission('denied');
      setCallStatus('denied');
      return false;
    }
  };

  const handleQuickReply = (messageText: string, isAction: boolean) => {
    if (isAction && messageText === 'Seguir Pedido') {
      if (orderStatus) {
        setIsTrackingModalOpen(true);
      } else {
        addMessage('bot', 'No tienes ningún pedido activo para seguir.');
      }
    } else {
      addMessage('user', messageText);
      handleBotResponse(messageText);
    }
  };

  const handleSendMessage = (messageText: string) => {
    addMessage('user', messageText);
    setInputValue('');
    handleBotResponse(messageText);
  };
  
  const handleMicClick = async () => {
    if (isListening) {
      stopListening();
    } else {
      const permissionGranted = micPermission === 'granted' || await requestMicPermission();
      if(permissionGranted){
        startListening(false);
      }
    }
  };

  const startCall = async () => {
    const permissionGranted = micPermission === 'granted' || await requestMicPermission();
    if (permissionGranted) {
      setIsContinuousCallActive(true);
      setCallStatus('listening');
      speak('Llamada iniciada. ¿En qué puedo ayudarte?');
    }
  };

  const endCall = () => {
    setIsContinuousCallActive(false);
    setCallStatus('idle');
    stopListening();
    cancel();
  };
  
  const handleAddToCart = (item: MenuItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      if (existingItem) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsMenuOpen(false);
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(i => i.id !== itemId));
    } else {
      setCartItems(prev => prev.map(i => i.id === itemId ? { ...i, quantity } : i));
    }
  };

  const simulateOrderProgress = (orderId: string) => {
    orderTimerRef.current.forEach(window.clearTimeout);
    orderTimerRef.current = [];

    const statuses: OrderStatusValue[] = ['En preparación', 'En reparto', 'Entregado'];
    let delay = 10000; 

    statuses.forEach((status, index) => {
        const timer = window.setTimeout(() => {
            setOrderStatus(prev => (prev && prev.id === orderId ? { ...prev, status } : prev));
            if(status === 'Entregado') {
              window.setTimeout(() => setOrderStatus(null), 60000); 
            }
        }, delay * (index + 1));
        orderTimerRef.current.push(timer);
    });
  };

  const handleCheckout = () => {
    const newOrderId = `SABOR-${Date.now().toString().slice(-6)}`;
    setOrderStatus({ id: newOrderId, status: 'Recibido' });
    setCartItems([]);
    setIsCartOpen(false);
    addMessage('bot', `¡Gracias por tu pedido! Tu número de seguimiento es ${newOrderId}. Puedes ver el estado con el botón "Seguir Pedido".`);
    simulateOrderProgress(newOrderId);
  };

  const handleOpenVideoModal = (url: string, query: string) => {
    setVideoModalState({ isOpen: true, url, query });
  };

  const handleCloseVideoModal = () => {
    setVideoModalState({ isOpen: false, url: '', query: '' });
  };

  return (
    <div className="h-screen w-screen bg-gray-950 flex flex-col antialiased">
      <Header 
        cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onMenuClick={() => setIsMenuOpen(true)}
        onCartClick={() => setIsCartOpen(true)}
        callStatus={callStatus}
        onStartCall={startCall}
        onEndCall={endCall}
      />
      
      <ChatWindow messages={messages} onOpenVideo={handleOpenVideoModal} />

      {micPermission === 'denied' && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-red-500/90 text-white text-sm p-3 rounded-lg shadow-lg z-20">
          SaborBot necesita acceso al micrófono para las funciones de voz. Por favor, habilítalo en la configuración de tu navegador.
        </div>
      )}

      <div className="bg-gray-950/80 backdrop-blur-sm border-t border-gray-800">
          <QuickReplies onSelect={handleQuickReply} hasActiveOrder={!!orderStatus} />
          <ChatInput 
              onSendMessage={handleSendMessage} 
              onMicClick={handleMicClick}
              isListening={isListening && !isContinuousCallActive}
              micPermissionDenied={micPermission === 'denied'}
              value={inputValue}
              setValue={setInputValue}
          />
      </div>

      <MenuModal 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        menuItems={menuItems}
        onAddToCart={handleAddToCart}
      />
      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onCheckout={handleCheckout}
      />
      <OrderTrackingModal
        isOpen={isTrackingModalOpen}
        onClose={() => setIsTrackingModalOpen(false)}
        orderStatus={orderStatus}
      />
      <VideoModal
        isOpen={videoModalState.isOpen}
        onClose={handleCloseVideoModal}
        videoUrl={videoModalState.url}
        originalQuery={videoModalState.query}
      />
    </div>
  );
};

export default App;
