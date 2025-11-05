import { useState, useEffect, useRef, useCallback } from 'react';

// FIX: Add type definitions for Web Speech API to resolve TypeScript errors.
// These types are not included in standard DOM typings.
interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly[index: number]: { transcript: string };
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  lang: string;
  interimResults: boolean;
  onend: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  start: () => void;
  stop: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

// FIX: Rename variable to avoid conflict with SpeechRecognition interface type.
const SpeechRecognitionApi = window.SpeechRecognition || window.webkitSpeechRecognition;

export const useSpeechRecognition = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // FIX: Check for the renamed API variable.
    if (!SpeechRecognitionApi) {
      console.error("Speech Recognition not supported by this browser.");
      return;
    }

    // FIX: Use renamed API variable to create a new instance.
    const recognition = new SpeechRecognitionApi();
    recognition.lang = 'es-AR';
    recognition.interimResults = false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      setTranscript(finalTranscript);
    };
    
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error', event.error);
      // Don't kill the session for a no-speech error; let onend handle the restart.
      // For critical permission errors, stop listening.
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setIsListening(false);
      }
    };

    recognition.onend = () => {
      if (recognitionRef.current && recognitionRef.current.continuous && isListening) {
         // In continuous mode, it can sometimes stop. Re-start it if we still want to be listening.
        setTimeout(() => recognition.start(), 100);
      } else {
        setIsListening(false);
      }
    };
    
    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [isListening]);

  const startListening = useCallback((continuous = false) => {
    if (recognitionRef.current && !isListening) {
      setTranscript('');
      recognitionRef.current.continuous = continuous;
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch(e) {
        console.error("Could not start recognition", e);
      }
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, [isListening]);

  return { transcript, isListening, startListening, stopListening, setTranscript };
};