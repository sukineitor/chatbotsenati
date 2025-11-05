import React from 'react';
import { OrderStatus, OrderStatusValue } from '../types';
import { CloseIcon, PackageIcon, KitchenIcon, DeliveryIcon, CheckCircleIcon } from './icons';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderStatus: OrderStatus | null;
}

const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({ isOpen, onClose, orderStatus }) => {
  if (!isOpen) return null;

  const statuses: OrderStatusValue[] = ['Recibido', 'En preparación', 'En reparto', 'Entregado'];
  const currentStatusIndex = orderStatus ? statuses.indexOf(orderStatus.status) : -1;

  const getIcon = (status: OrderStatusValue) => {
    switch (status) {
      case 'Recibido':
        return <PackageIcon className="w-8 h-8" />;
      case 'En preparación':
        return <KitchenIcon className="w-8 h-8" />;
      case 'En reparto':
        return <DeliveryIcon className="w-8 h-8" />;
      case 'Entregado':
        return <CheckCircleIcon className="w-8 h-8" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-md border border-gray-700" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Estado del Pedido</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-8">
          {!orderStatus ? (
            <p className="text-center text-gray-400">No hay ningún pedido activo para seguir.</p>
          ) : (
            <div>
              <p className="text-center text-gray-300 mb-2">Número de Pedido:</p>
              <p className="text-center text-lg font-mono font-bold text-cyan-400 mb-8">{orderStatus.id}</p>
              <div className="flex justify-between items-center">
                {statuses.map((status, index) => (
                  <React.Fragment key={status}>
                    <div className="flex flex-col items-center text-center">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${index <= currentStatusIndex ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-400'}`}>
                        {getIcon(status)}
                      </div>
                      <p className={`mt-2 text-sm font-medium transition-colors ${index <= currentStatusIndex ? 'text-white' : 'text-gray-500'}`}>{status}</p>
                    </div>
                    {index < statuses.length - 1 && (
                      <div className={`flex-1 h-1 mx-2 transition-colors ${index < currentStatusIndex ? 'bg-green-500' : 'bg-gray-700'}`}></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
               {orderStatus.status === 'Entregado' && (
                <p className="text-center text-green-400 mt-8 animate-pulse">¡Tu pedido ha sido entregado! ¡Buen provecho!</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingModal;