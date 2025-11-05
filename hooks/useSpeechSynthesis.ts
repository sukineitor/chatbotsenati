
import { useState, useEffect, useCallback } from 'react';

export const useSpeechSynthesis = (onEndCallback: () => void) => {
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    const getVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const preferredVoice = voices.find(v => v.name.toLowerCase().includes('kore') && v.lang.startsWith('es-')) ||
                                 voices.find(v => v.lang.startsWith('es-') && v.name.toLowerCase().includes('female')) ||
                                 voices.find(v => v.lang === 'es-AR') ||
                                 voices.find(v => v.lang.startsWith('es-')) ||
                                 null;
        setVoice(preferredVoice);
      }
    };

    getVoices();
    window.speechSynthesis.onvoiceschanged = getVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = useCallback((text: string) => {
    if (!voice || !text) return;
    window.speechSynthesis.cancel(); 
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.lang = 'es-AR';
    utterance.pitch = 1.3;
    utterance.rate = 0.9;
    
    utterance.onend = () => {
        onEndCallback();
    };

    window.speechSynthesis.speak(utterance);
  }, [voice, onEndCallback]);

  const cancel = useCallback(() => {
    window.speechSynthesis.cancel();
  }, []);

  return { speak, cancel };
};