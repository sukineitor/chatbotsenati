import React from 'react';
import { MicIcon, SendIcon } from './icons';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onMicClick: () => void;
  isListening: boolean;
  micPermissionDenied: boolean;
  value: string;
  setValue: (value: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, onMicClick, isListening, micPermissionDenied, value, setValue }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSendMessage(value);
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
        placeholder={isListening ? "Escuchando..." : "Escribe un mensaje..."}
        rows={1}
        className="flex-1 bg-gray-800 rounded-full py-3 px-5 text-gray-200 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
      <button
        type="button"
        onClick={onMicClick}
        disabled={micPermissionDenied}
        className={`p-3 rounded-full transition-colors ${
          isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
        } ${micPermissionDenied ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label="Usar micrófono"
      >
        <MicIcon className="w-6 h-6" />
      </button>
      <button
        type="submit"
        className="p-3 rounded-full bg-cyan-600 text-white hover:bg-cyan-500 transition-colors disabled:opacity-50"
        disabled={!value.trim()}
        aria-label="Enviar mensaje"
      >
        <SendIcon className="w-6 h-6" />
      </button>
    </form>
  );
};

export default ChatInput;