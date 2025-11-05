import React from 'react';
import { Message } from '../types';
import { PlayIcon } from './icons';

interface MessageBubbleProps {
  message: Message;
  onOpenVideo: (url: string, query: string) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onOpenVideo }) => {
  const isUser = message.sender === 'user';

  const getYoutubeThumbnail = (url: string) => {
    const videoId = url.split('embed/')[1]?.split('?')[0];
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '';
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      <div className={`max-w-md lg:max-w-lg rounded-2xl p-4 space-y-3 ${isUser ? 'bg-cyan-600 text-white rounded-br-lg' : 'bg-gray-800 text-gray-200 rounded-bl-lg'}`}>
        {message.isThinking ? (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{message.text}</p>
        )}
        {message.videoUrl && (
          <button
            onClick={() => onOpenVideo(message.videoUrl!, message.originalQuery || '')}
            className="w-full aspect-video rounded-lg overflow-hidden border border-gray-700 mt-2 relative group focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <img src={getYoutubeThumbnail(message.videoUrl)} alt="Video thumbnail" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-colors">
              <PlayIcon className="w-12 h-12 text-white/80 group-hover:scale-110 transition-transform" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
