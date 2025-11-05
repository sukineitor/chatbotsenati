import React, { useState, useEffect } from 'react';
import { CartItem } from '../types';
import { CloseIcon } from './icons';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: number, quantity: number) => void;
  onCheckout: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, cartItems, onUpdateQuantity, onCheckout }) => {
  const [view, setView] = useState<'cart' | 'payment' | 'success'>('cart');

  useEffect(() => {
    if (isOpen) {
      setView(cartItems.length > 0 ? 'cart' : 'cart'); // Reset view on open
    }
  }, [isOpen, cartItems.length]);

  if (!isOpen) return null;

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setView('success');
    setTimeout(() => {
        onCheckout();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-40" onClick={onClose}>
      <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] flex flex-col border border-gray-700" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">
            {view === 'cart' ? 'Tu Pedido' : view === 'payment' ? 'Proceso de Pago' : '¡Gracias!'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        {view === 'cart' && (
          <div className="flex-1 flex flex-col">
            {cartItems.length === 0 ? (
              <p className="p-6 text-gray-400 text-center">Tu pedido está vacío.</p>
            ) : (
              <div className="p-6 overflow-y-auto space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-white">{item.name}</h3>
                      <p className="text-sm text-gray-400">{item.price.toFixed(2)} €</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 bg-gray-700 rounded">-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 bg-gray-700 rounded">+</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-800 mt-auto">
                <div className="flex justify-between font-bold text-lg mb-4">
                  <span>Total</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
                <button onClick={() => setView('payment')} className="w-full bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-500 transition-colors">
                  Proceder al Pago
                </button>
              </div>
            )}
          </div>
        )}

        {view === 'payment' && (
           <form onSubmit={handlePaymentSubmit} className="p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Nombre en la tarjeta</label>
                    <input type="text" required className="w-full bg-gray-800 rounded-md p-2 focus:ring-cyan-500 focus:border-cyan-500 border-gray-700"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Número de tarjeta</label>
                    <input type="text" placeholder="**** **** **** ****" required className="w-full bg-gray-800 rounded-md p-2 focus:ring-cyan-500 focus:border-cyan-500 border-gray-700"/>
                </div>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-300 mb-1">Caducidad</label>
                        <input type="text" placeholder="MM/AA" required className="w-full bg-gray-800 rounded-md p-2 focus:ring-cyan-500 focus:border-cyan-500 border-gray-700"/>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-300 mb-1">CVC</label>

                        <input type="text" placeholder="123" required className="w-full bg-gray-800 rounded-md p-2 focus:ring-cyan-500 focus:border-cyan-500 border-gray-700"/>
                    </div>
                </div>
                <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors mt-4">
                  Pagar {total.toFixed(2)} €
                </button>
           </form>
        )}

        {view === 'success' && (
            <div className="p-10 text-center">
                <p className="text-lg text-green-400">¡Pedido realizado con éxito!</p>
                <p className="text-gray-300 mt-2">Tu pedido está en camino. ¡Buen provecho!</p>
            </div>
        )}

      </div>
    </div>
  );
};

export default CartModal;