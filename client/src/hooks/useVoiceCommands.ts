import { useState, useEffect, useCallback } from 'react';

// Add type declarations for speech recognition
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

interface SpeechRecognitionEvent {
  resultIndex: number;
  results: {
    [key: number]: {
      [key: number]: {
        transcript: string;
      };
      isFinal: boolean;
    };
  };
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

export function useVoiceCommands() {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        
        if (event.results[current].isFinal) {
          handleVoiceCommand(transcript);
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      setRecognition(recognition);
    }
  }, []);

  const handleVoiceCommand = (command: string) => {
    console.log('Voice command:', command);
    
    // Process voice commands
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('threat')) {
      console.log('Executing threat analysis command');
    } else if (lowerCommand.includes('scan')) {
      console.log('Executing scan command');
    } else if (lowerCommand.includes('status')) {
      console.log('Executing status command');
    }
  };

  const startListening = useCallback(async () => {
    if (!recognition) {
      console.warn('Speech recognition not supported');
      return;
    }

    try {
      // Request microphone permission first
      await navigator.mediaDevices.getUserMedia({ audio: true });
      recognition.start();
    } catch (error) {
      console.error('Microphone permission denied or not available:', error);
      setIsListening(false);
      // You could show a toast notification here
      alert('Microphone access is required for voice commands. Please allow microphone access and try again.');
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (recognition && isListening) {
      recognition.stop();
    }
  }, [recognition, isListening]);

  return {
    isListening,
    startListening,
    stopListening,
  };
}
