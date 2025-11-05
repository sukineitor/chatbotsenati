import React, { useRef, useEffect } from 'react';
import { Message } from '../types';
import MessageBubble from './MessageBubble';

interface ChatWindowProps {
  messages: Message[];
  onOpenVideo: (url: string, query: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onOpenVideo }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 pt-24 pb-4">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} onOpenVideo={onOpenVideo} />
      ))}
    </div>
  );
};

export default ChatWindow;
