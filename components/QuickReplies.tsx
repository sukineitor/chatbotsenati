import React from 'react';

interface QuickRepliesProps {
  onSelect: (reply: string, isTopic: boolean) => void;
  hasActiveOrder: boolean;
}

const QuickReplies: React.FC<QuickRepliesProps> = ({ onSelect, hasActiveOrder }) => {
  const replies = [
    { label: "Nutrición", topic: "Háblame de la información nutricional de tus platos." },
    { label: "Maridaje", topic: "Recomiéndame un vino para el Solomillo de Ternera." },
    { label: "Plato del Día", topic: "¿Qué me recomiendas hoy, chef?" }
  ];

  return (
    <div className="flex gap-2 p-2 justify-center flex-wrap">
      {replies.map((reply) => (
        <button
          key={reply.label}
          onClick={() => onSelect(reply.topic, false)}
          className="px-4 py-2 bg-gray-800 text-gray-300 text-sm rounded-full hover:bg-gray-700 transition-colors"
        >
          {reply.label}
        </button>
      ))}
      {hasActiveOrder && (
        <button
          onClick={() => onSelect("Seguir Pedido", true)}
          className="px-4 py-2 bg-cyan-600 text-white text-sm rounded-full hover:bg-cyan-500 transition-colors"
        >
          Seguir Pedido
        </button>
      )}
    </div>
  );
};

export default QuickReplies;