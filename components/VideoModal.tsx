import React, { useState } from 'react';
import { getRecipeSummary } from '../services/geminiService';
import { CloseIcon, SummarizeIcon } from './icons';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  originalQuery: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoUrl, originalQuery }) => {
  const [summary, setSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);

  if (!isOpen) return null;

  const handleSummarize = async () => {
    if (!originalQuery) return;
    setIsSummarizing(true);
    setSummary('');
    const result = await getRecipeSummary(originalQuery);
    setSummary(result);
    setIsSummarizing(false);
  };

  const formattedSummary = summary.replace(/### (.*?)\n/g, '<h3 class="text-lg font-semibold text-cyan-400 mt-4 mb-2">$1</h3>')
                                  .replace(/\* (.*?)\n/g, '<li class="ml-5 list-disc">$1</li>')
                                  .replace(/(\d+\.) (.*?)\n/g, '<li class="ml-5 list-decimal">$2</li>');

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in" onClick={onClose}>
      <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col md:flex-row border border-gray-700" onClick={(e) => e.stopPropagation()}>
        <div className="w-full md:w-3/5 aspect-video flex-shrink-0">
           <iframe
              className="w-full h-full rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
              src={videoUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
        </div>
        <div className="flex-1 flex flex-col p-6 overflow-y-auto">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-bold text-white mb-4">Receta de Video</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white -mt-2 -mr-2">
              <CloseIcon className="w-8 h-8" />
            </button>
          </div>
          <button
            onClick={handleSummarize}
            disabled={isSummarizing}
            className="w-full flex items-center justify-center gap-2 bg-cyan-600 text-white px-4 py-3 rounded-lg hover:bg-cyan-500 transition-colors disabled:opacity-50 disabled:cursor-wait"
          >
            <SummarizeIcon className="w-6 h-6" />
            {isSummarizing ? 'Generando resumen...' : 'Resumir Receta'}
          </button>
          <div className="mt-4 text-gray-300 space-y-2 prose prose-invert prose-p:my-1 prose-li:my-0.5">
            {isSummarizing && (
              <div className="flex justify-center items-center h-24">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse [animation-delay:-0.15s] mx-2"></div>
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
              </div>
            )}
            {summary && <div dangerouslySetInnerHTML={{ __html: formattedSummary }} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
