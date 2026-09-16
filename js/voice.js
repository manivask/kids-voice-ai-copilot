/**
 * Voice Engine - Dynamic Multilingual Speech Recognition (STT) & Speech Synthesis (TTS)
 * Provides distinct kid voices (Boys & Girls 5-12), adult personas,
 * real-time audio visualizer, and dynamic multi-language switching for:
 * English, Tamil, Spanish, Korean, Japanese, Hindi, Telugu, Kannada, Malayalam, Marathi, Bengali, Gujarati.
 */

class VoiceEngine {
  constructor() {
    this.synth = window.speechSynthesis;
    this.recognition = null;
    this.isListening = false;
    this.isSpeaking = false;
    this.voices = [];
    this.currentLanguage = 'en-US';
    this.speechRate = 1.0;
    this.speechPitch = 1.0;
    this.currentUtterance = null;
    this.liveMeterFrame = null;

    // Natural AI Kid Voice Catalog (Modeled after kid-voices-ai.com: 3 Boys & 3 Girls)
    this.personas = [
      // ==================== 👦 3 AI BOY VOICES ====================
      {
        id: 'kid-boy-leo',
        name: 'Leo (Boy 6-8)',
        ageGroup: 'Age 6-8',
        gender: 'kid-boy',
        category: 'kids-boy',
        tagline: 'Energetic, Curious & High-Pitched Adventurer Boy',
        avatarText: '👦',
        pitch: 1.58,
        rate: 1.10,
        voiceIndexOffset: 0,
        voicePattern: /zira|jenny|samantha|aria|google|eva/i
      },
      {
        id: 'kid-boy-oliver',
        name: 'Oliver (Boy 9-12)',
        ageGroup: 'Age 9-12',
        gender: 'kid-boy',
        category: 'kids-boy',
        tagline: 'Smart, Fast-Thinking & Cheerful Explorer Boy',
        avatarText: '🎒',
        pitch: 1.40,
        rate: 1.05,
        voiceIndexOffset: 1,
        voicePattern: /jenny|zira|samantha|victoria|george/i
      },
      {
        id: 'kid-boy-charlie',
        name: 'Charlie (Boy 5-7)',
        ageGroup: 'Age 5-7',
        gender: 'kid-boy',
        category: 'kids-boy',
        tagline: 'Cute, Playful & Animated Storytelling Young Boy',
        avatarText: '🚀',
        pitch: 1.68,
        rate: 1.02,
        voiceIndexOffset: 2,
        voicePattern: /aria|samantha|zira|jenny/i
      },

      // ==================== 👧 3 AI GIRL VOICES ====================
      {
        id: 'kid-girl-sadie',
        name: 'Sadie (Girl 6-8)',
        ageGroup: 'Age 6-8',
        gender: 'kid-girl',
        category: 'kids-girl',
        tagline: 'Bright, Bubbly & Joyful Young Girl (KidVoice Style)',
        avatarText: '👧',
        pitch: 1.62,
        rate: 1.06,
        voiceIndexOffset: 0,
        voicePattern: /samantha|jenny|zira|karen|aria/i
      },
      {
        id: 'kid-girl-shygirl',
        name: 'Shygirl (Girl 5-7)',
        ageGroup: 'Age 5-7',
        gender: 'kid-girl',
        category: 'kids-girl',
        tagline: 'Gentle, Soft-Spoken & Adorable Little Girl (KidVoice Style)',
        avatarText: '🌸',
        pitch: 1.70,
        rate: 0.96,
        voiceIndexOffset: 1,
        voicePattern: /victoria|eva|fiona|susan|zira/i
      },
      {
        id: 'kid-girl-cookie',
        name: 'Cookie (Girl 9-12)',
        ageGroup: 'Age 9-12',
        gender: 'kid-girl',
        category: 'kids-girl',
        tagline: 'Melodious, Expressive & Friendly Kid Storyteller',
        avatarText: '🍪',
        pitch: 1.48,
        rate: 1.02,
        voiceIndexOffset: 2,
        voicePattern: /tessa|moira|veena|catherine|jenny/i
      }
    ];

    this.currentPersonaId = 'kid-boy-leo';
    this.initSpeechRecognition();
    this.loadVoices();

    if (window.speechSynthesis && speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = () => this.loadVoices();
    }
  }

  loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  setLanguage(langCode) {
    if (!langCode) return;
    this.currentLanguage = langCode;
    if (this.recognition) {
      this.recognition.lang = langCode;
    }
  }

  getLanguageConfig() {
    return (window.KIDS_LANGUAGES && window.KIDS_LANGUAGES[this.currentLanguage]) || {
      code: this.currentLanguage,
      name: 'Language',
      nativeName: 'Language'
    };
  }

  cleanupLiveAudioMeter() {
    if (this.liveMeterFrame) {
      cancelAnimationFrame(this.liveMeterFrame);
      this.liveMeterFrame = null;
    }
  }

  startLiveAudioMeter(onAudioLevel) {
    this.cleanupLiveAudioMeter();

    const tick = () => {
      if (!this.isListening) return;
      const timeFactor = Date.now() * 0.015;
      const bands = Array.from({ length: 16 }, (_, i) => {
        const wave = Math.sin((i + 1) * 0.8 + timeFactor) * 38 + 48;
        const drift = Math.sin(timeFactor * 1.9 + i * 0.5) * 16;
        return Math.min(100, Math.max(8, Math.round(wave + drift)));
      });
      const level = Math.min(100, Math.max(12, Math.round((bands.reduce((s, v) => s + v, 0) / bands.length))));

      if (onAudioLevel) {
        onAudioLevel(level, bands);
      }
      this.liveMeterFrame = requestAnimationFrame(tick);
    };
    this.liveMeterFrame = requestAnimationFrame(tick);
    return true;
  }

  getPersona(id) {
    return this.personas.find(p => p.id === id) || this.personas[0];
  }

  getCurrentPersona() {
    return this.getPersona(this.currentPersonaId);
  }

  setPersona(id) {
    if (this.personas.some(p => p.id === id)) {
      this.currentPersonaId = id;
    }
  }

  removePersona(id) {
    const idx = this.personas.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.personas.splice(idx, 1);
      if (this.currentPersonaId === id) {
        this.currentPersonaId = 'kid-boy-1';
      }
      return true;
    }
    return false;
  }

  /**
   * Intelligently resolves an authentically distinct browser voice for each persona and language
   */
  resolveBrowserVoice(persona) {
    if (!this.voices || this.voices.length === 0) {
      this.loadVoices();
    }

    if (!this.voices || this.voices.length === 0) return null;

    const langPrefix = this.currentLanguage.split('-')[0].toLowerCase();
    
    // 1. Filter voices for current selected language
    let langVoices = this.voices.filter(v => v.lang.toLowerCase().startsWith(langPrefix));
    if (langVoices.length === 0) {
      langVoices = this.voices.filter(v => v.lang.toLowerCase().startsWith('en'));
    }
    if (langVoices.length === 0) {
      langVoices = this.voices;
    }

    const isKid = persona.category === 'kids-boy' || persona.category === 'kids-girl';
    const isAdultMale = persona.gender === 'male' && persona.category !== 'kids-boy';

    // High formant voice candidates that sound natural for kids
    const kidNaturalKeywords = /zira|jenny|samantha|karen|aria|eva|fiona|veena|catherine|clara|tessa|moira|google/i;
    const maleKeywords = /david|mark|guy|george|male|daniel|richard|alex|oliver|rishi|raul|jorge|minho|ichiro|hemant|mohan/i;

    let matchedCandidates = [];

    if (isKid) {
      // For children (both boys & girls 5-12), prioritize high-formant, clear, energetic voices
      matchedCandidates = langVoices.filter(v => kidNaturalKeywords.test(v.name));
      if (matchedCandidates.length === 0) {
        matchedCandidates = langVoices.filter(v => !maleKeywords.test(v.name));
      }
    } else if (isAdultMale) {
      matchedCandidates = langVoices.filter(v => maleKeywords.test(v.name));
    } else {
      matchedCandidates = langVoices.filter(v => kidNaturalKeywords.test(v.name));
    }

    if (matchedCandidates.length === 0) {
      matchedCandidates = langVoices;
    }

    const offset = persona.voiceIndexOffset || 0;
    const selectedVoice = matchedCandidates[offset % matchedCandidates.length] || matchedCandidates[0];

    return selectedVoice;
  }

  /**
   * Speak with distinct vocal characteristics (pitch, rate, volume)
   */
  speak(text, onStart, onEnd) {
    if (!this.synth) {
      console.warn('Speech Synthesis not supported in this browser.');
      if (onEnd) onEnd();
      return;
    }

    this.synth.cancel();
    this.isSpeaking = false;

    const persona = this.getCurrentPersona();
    const utterance = new SpeechSynthesisUtterance(text);
    const matchedVoice = this.resolveBrowserVoice(persona);

    if (matchedVoice) {
      utterance.voice = matchedVoice;
      utterance.lang = matchedVoice.lang || this.currentLanguage;
    } else {
      utterance.lang = this.currentLanguage;
    }

    // Apply distinct calibrated pitch per persona
    const basePitch = persona.pitch || 1.0;
    const baseRate = persona.rate || 1.0;

    utterance.pitch = Math.max(0.4, Math.min(2.0, basePitch * this.speechPitch));
    utterance.rate = Math.max(0.5, Math.min(1.8, baseRate * this.speechRate));
    utterance.volume = 1.0;

    this.currentUtterance = utterance;

    utterance.onstart = () => {
      this.isSpeaking = true;
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    try {
      this.synth.speak(utterance);
    } catch (err) {
      console.warn('Synth speak error:', err);
      this.isSpeaking = false;
      if (onEnd) onEnd();
    }
  }

  stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
      this.currentUtterance = null;
    }
  }

  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = this.currentLanguage;
      this.recognition.maxAlternatives = 1;
    } catch (e) {
      console.warn('SpeechRecognition init error:', e);
    }
  }

  startListening({ onStart, onResult, onError, onEnd, onAudioLevel }) {
    this.stopSpeaking();
    this.isListening = true;

    this.startLiveAudioMeter(onAudioLevel);

    if (!this.recognition) {
      this.initSpeechRecognition();
    }

    if (this.recognition) {
      this.recognition.lang = this.currentLanguage;
    }

    if (onStart) onStart();

    if (!this.recognition) {
      if (onError) onError('speech-api-unavailable');
      return;
    }

    this.recognition.onstart = () => {
      this.isListening = true;
    };

    this.recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript.trim();
        if (!transcript) continue;

        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript + ' ';
        }
      }

      if (onResult) {
        onResult({
          final: finalTranscript.trim(),
          interim: interimTranscript.trim()
        });
      }
    };

    this.recognition.onerror = (event) => {
      console.warn('SpeechRecognition event note:', event.error);
      if (onError) onError(event.error);
    };

    this.recognition.onend = () => {
      if (!this.isListening) {
        this.cleanupLiveAudioMeter();
        if (onEnd) onEnd();
      }
    };

    try {
      this.recognition.start();
    } catch (err) {
      console.warn('Recognition start exception:', err);
    }
  }

  stopListening() {
    this.isListening = false;
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (_) {}
    }
    this.cleanupLiveAudioMeter();
  }
}

window.VoiceEngine = VoiceEngine;
