import React from 'react';
import { MenuItem } from '../types';
import { CloseIcon } from './icons';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
}

const MenuModal: React.FC<MenuModalProps> = ({ isOpen, onClose, menuItems, onAddToCart }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-30" onClick={onClose}>
      <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-gray-700" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Nuestro Menú</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto space-y-4">
          {menuItems.map((item) => (
            <div key={item.id} className="flex gap-5 items-start bg-gray-800/50 p-4 rounded-lg transition-transform transform hover:scale-[1.02] hover:bg-gray-800">
              <img src={item.image} alt={item.name} loading="lazy" className="w-36 h-36 object-cover rounded-md flex-shrink-0"/>
              <div className="flex-grow flex flex-col h-36">
                <div>
                  <h3 className="text-lg font-semibold text-cyan-400">{item.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                </div>
                <div className="mt-auto flex justify-between items-end">
                  <p className="text-lg font-bold text-white">{item.price.toFixed(2)} €</p>
                  <button
                    onClick={() => onAddToCart(item)}
                    className="bg-cyan-600 text-white px-4 py-2 rounded-full hover:bg-cyan-500 transition-colors self-end"
                  >
                    Añadir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuModal;