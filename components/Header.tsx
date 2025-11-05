import React from 'react';
import { ForkIcon, PhoneIcon, EndCallIcon, MenuIcon, ReceiptIcon } from './icons';
import { CallStatus } from '../types';

interface HeaderProps {
  cartItemCount: number;
  onMenuClick: () => void;
  onCartClick: () => void;
  callStatus: CallStatus;
  onStartCall: () => void;
  onEndCall: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onMenuClick, onCartClick, callStatus, onStartCall, onEndCall }) => {
  const isCallActive = callStatus === 'listening' || callStatus === 'speaking' || callStatus === 'thinking';

  return (
    <header className="bg-gray-950/80 backdrop-blur-sm p-4 border-b border-gray-800 fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <ForkIcon className="w-8 h-8 text-cyan-400" />
          <h1 className="text-2xl font-bold text-white tracking-tight">SaborBot</h1>
        </div>
        <div className="flex items-center gap-5 text-sm font-medium">
          <button onClick={onMenuClick} className="text-gray-300 hover:text-white transition-colors" aria-label="Abrir menú">
            <MenuIcon className="w-6 h-6" />
          </button>
          
          <button onClick={onCartClick} className="text-gray-300 hover:text-white transition-colors relative" aria-label="Ver pedido">
            <ReceiptIcon className="w-6 h-6" />
            {cartItemCount > 0 && 
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">{cartItemCount}</span>
            }
          </button>

          <button 
            onClick={isCallActive ? onEndCall : onStartCall} 
            className="transition-colors"
            aria-label={isCallActive ? 'Terminar llamada' : 'Iniciar llamada'}
          >
            {isCallActive 
              ? <EndCallIcon className="w-6 h-6 text-red-500 hover:text-red-400" /> 
              : <PhoneIcon className="w-6 h-6 text-gray-300 hover:text-white" />}
          </button>

        </div>
      </div>
    </header>
  );
};

export default Header;