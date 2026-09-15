/**
 * Agent Engine - Kids AI Copilot Intent Recognition & Multilingual Dispatcher
 * Features:
 * 1. Dynamic Multilingual Language Switcher (English, Tamil, Spanish, Korean, Japanese, Hindi, Telugu, etc.)
 * 2. Kids Storytelling & Comprehension Quiz Engine
 * 3. Math Problem Solver & Mental Math Games
 * 4. English Vocabulary, Grammar & Science Curiosity Engine
 * 5. Animal Riddles & Fun Kids Games
 * 6. User Voice Calibration & Enrollment Studio
 * 7. Fun Timers & Countdown Chimes
 */

class AgentEngine {
  constructor(calendarEngine, voiceEngine, timerEngine, storyEngine, mathLearningEngine) {
    this.calendar = calendarEngine;
    this.voice = voiceEngine;
    this.timer = timerEngine;
    this.stories = storyEngine;
    this.mathLearning = mathLearningEngine;
  }

  /**
   * Process a natural language query and return rich response payload
   * @param {string} rawInput 
   * @returns {Promise<{text: string, spokenText: string, widgetHtml?: string, triggerAction?: string, languageChanged?: string}>}
   */
  async processQuery(rawInput) {
    const input = (rawInput || '').trim();
    const clean = input.toLowerCase();

    if (!input) {
      const langConfig = this.voice.getLanguageConfig();
      return {
        text: langConfig.greeting || "Hi there! I'm your Kid AI Copilot! What would you like to explore today?",
        spokenText: langConfig.greeting || "Hi there! What would you like to learn or explore today?"
      };
    }

    // 1. Dynamic Language Switching Intent Check
    const langSwitchResult = this.checkLanguageSwitchIntent(clean);
    if (langSwitchResult) {
      this.voice.setLanguage(langSwitchResult.code);
      const cfg = KIDS_LANGUAGES[langSwitchResult.code];
      return {
        text: cfg.switchedMessage,
        spokenText: cfg.switchedSpoken,
        languageChanged: langSwitchResult.code
      };
    }

    // 2. Math Solving Intent Check (Arithmetic, Word Problems, Times Tables, Fractions)
    if (this.mathLearning && this.mathLearning.isMathIntent(clean)) {
      const mathResult = this.mathLearning.solveMath(clean);
      if (mathResult) {
        return {
          text: `🔢 **Math Solution**: **${mathResult.title}**\n\n🎯 **Answer**: **${mathResult.answer}**\n\n${mathResult.steps.map(s => `• ${s}`).join('\n')}\n\n${mathResult.tip || ''}`,
          spokenText: mathResult.spokenAnswer,
          widgetHtml: this.mathLearning.renderMathCard(mathResult)
        };
      }
    }

    // 3. Animal Riddles & Jokes Intent Check
    if (this.isRiddleIntent(clean)) {
      return this.handleRiddleQuery();
    }

    // 4. English Vocabulary, Grammar & Science Curiosity Intent Check
    if (this.mathLearning && this.mathLearning.isLearningIntent(clean)) {
      const learnResult = this.mathLearning.solveLearning(clean);
      if (learnResult) {
        return {
          text: `💡 **Copilot Knowledge**: **${learnResult.title}**\n\n${learnResult.content}\n\n✨ **Did You Know?**: ${learnResult.funFact}`,
          spokenText: learnResult.spokenAnswer,
          widgetHtml: this.mathLearning.renderLearningCard(learnResult)
        };
      }
    }

    // 5. Kids Storytelling & Comprehension Quiz Intent Check
    if (this.isStoryIntent(clean)) {
      return this.handleStoryQuery(clean);
    }

    // 6. Check if user is answering the active Story Comprehension Quiz
    if (this.stories && this.stories.currentActiveQuiz && !this.isTimeIntent(clean) && !this.isTimerIntent(clean)) {
      const evalResult = this.stories.evaluateComprehensionAnswer(clean);
      if (evalResult) {
        this.stories.currentActiveQuiz = null;
        return {
          text: `${evalResult.praise}\n\n🏆 **Score & Badge**: ${evalResult.stars} • **${evalResult.badge}**\n\n📝 **Feedback**: ${evalResult.feedback}\n\n✨ **Did You Know?**: ${evalResult.funFact}`,
          spokenText: evalResult.spokenPraise,
          widgetHtml: this.stories.renderEvaluationCard(evalResult)
        };
      }
    }

    // 7. Voice Calibration & Training Intent Check
    if (this.isVoiceTrainIntent(clean)) {
      return {
        text: `🎙️ **Voice Calibration Studio**: Let's record and calibrate your unique personal voice profile! Click below to open the guided 8-sentence studio.`,
        spokenText: "Opening the Voice Calibration Studio so you can record your voice profile.",
        triggerAction: 'open_voice_studio'
      };
    }

    // 8. Timer & Countdown Intent Check
    if (this.isTimerIntent(clean)) {
      return this.handleTimerQuery(clean);
    }

    // 9. Time & Clock Intent Check
    if (this.isTimeIntent(clean)) {
      return this.handleTimeQuery(clean);
    }

    // 10. Greetings & Persona Check
    if (this.isGreetingIntent(clean)) {
      return this.handleGreetingQuery();
    }

    // 11. Help / Capabilities Check
    if (this.isHelpIntent(clean)) {
      return this.handleHelpQuery();
    }

    // 12. Voice Switch / Settings Check
    if (this.isVoiceIntent(clean)) {
      return this.handleVoiceQuery(clean);
    }

    // 13. General Kid Fallback
    return this.handleFallback(clean);
  }

  checkLanguageSwitchIntent(input) {
    if (/\b(speak in tamil|talk in tamil|change language to tamil|switch to tamil|tamil|தமிழ்|தமிழில் பேசு|தமிழ் பேசு|பேசு)\b/i.test(input) && !input.includes('story') && !input.includes('கதை')) {
      return { code: 'ta-IN' };
    }
    if (/\b(speak in spanish|talk in spanish|change language to spanish|switch to spanish|spanish|español|habla en español|cambiar a español)\b/i.test(input) && !input.includes('story') && !input.includes('cuento')) {
      return { code: 'es-ES' };
    }
    if (/\b(speak in korean|talk in korean|change language to korean|switch to korean|korean|한국어|한국어로 말해줘)\b/i.test(input)) {
      return { code: 'ko-KR' };
    }
    if (/\b(speak in japanese|talk in japanese|change language to japanese|switch to japanese|japanese|日本語|日本語で話して)\b/i.test(input)) {
      return { code: 'ja-JP' };
    }
    if (/\b(speak in hindi|talk in hindi|change language to hindi|switch to hindi|hindi|हिंदी|हिंदी में बोलो)\b/i.test(input) && !input.includes('story') && !input.includes('कहानी')) {
      return { code: 'hi-IN' };
    }
    if (/\b(speak in telugu|talk in telugu|change language to telugu|switch to telugu|telugu|తెలుగు|తెలుగులో మాట్లాడు)\b/i.test(input)) {
      return { code: 'te-IN' };
    }
    if (/\b(speak in kannada|talk in kannada|kannada|ಕನ್ನಡ)\b/i.test(input)) {
      return { code: 'kn-IN' };
    }
    if (/\b(speak in malayalam|talk in malayalam|malayalam|മലയാളം)\b/i.test(input)) {
      return { code: 'ml-IN' };
    }
    if (/\b(speak in marathi|talk in marathi|marathi|मराठी)\b/i.test(input)) {
      return { code: 'mr-IN' };
    }
    if (/\b(speak in bengali|talk in bengali|bengali|bangla|বাংলা)\b/i.test(input)) {
      return { code: 'bn-IN' };
    }
    if (/\b(speak in gujarati|talk in gujarati|gujarati|ગુજરાતી)\b/i.test(input)) {
      return { code: 'gu-IN' };
    }
    if (/\b(speak in english|talk in english|change language to english|switch to english|english)\b/i.test(input) && !input.includes('story')) {
      return { code: 'en-US' };
    }
    return null;
  }

  isRiddleIntent(input) {
    return /\b(riddle|riddles|joke|jokes|tell me a joke|tell me a riddle|animal riddle|fun puzzle)\b/i.test(input);
  }

  isStoryIntent(input) {
    return /\b(story|stories|tale|bedtime story|tell me a story|kids story|story for kids|story time|fairy tale|short story|long story|கதை|cuento|कहानी)\b/i.test(input);
  }

  isVoiceTrainIntent(input) {
    return /\b(calibrate voice|train voice|clone voice|record voice|my voice|enroll voice|voice studio|voice training)\b/i.test(input);
  }

  isTimerIntent(input) {
    return /\b(timer|alarm|countdown|count down|stopwatch|remind me in)\b/i.test(input);
  }

  isTimeIntent(input) {
    return /\b(time|clock|hour|minute|timing|what time|current time|tell me the time|time now|o'?clock)\b/i.test(input);
  }

  isGreetingIntent(input) {
    return /\b(hi|hello|hey|greetings|good morning|good afternoon|good evening|who are you|what is your name|வணக்கம்|hola|안녕|こんにちは|नमस्ते)\b/i.test(input);
  }

  isHelpIntent(input) {
    return /\b(help|what can you do|features|commands|capabilities|options)\b/i.test(input);
  }

  isVoiceIntent(input) {
    return /\b(voice|voices|change voice|switch voice|persona|kids voice|boy voice|girl voice|male voice|female voice)\b/i.test(input);
  }

  handleRiddleQuery() {
    const riddles = [
      {
        riddle: "I have a trunk, but no clothes. I have tusks, but no teeth to brush. Who am I?",
        answer: "An Elephant! 🐘",
        spoken: "I have a trunk, but no clothes. I have tusks, but no teeth to brush. Who am I? ... It's an Elephant!"
      },
      {
        riddle: "I have feathers and wings, but I love swimming in freezing ice and waddling on snow. Who am I?",
        answer: "A Penguin! 🐧",
        spoken: "I have feathers and wings, but love swimming in freezing ice. Who am I? ... A Penguin!"
      },
      {
        riddle: "What has hands and a face, but cannot hold anything or smile?",
        answer: "A Clock! ⏰",
        spoken: "What has hands and a face, but cannot hold anything or smile? ... A Clock!"
      },
      {
        riddle: "What goes up when rain comes down?",
        answer: "An Umbrella! ☂️",
        spoken: "What goes up when rain comes down? ... An Umbrella!"
      }
    ];

    const pick = riddles[Math.floor(Math.random() * riddles.length)];
    return {
      text: `🧩 **Kid's Riddle Time!**\n\n❓ *${pick.riddle}*\n\n💡 **Answer**: **${pick.answer}**`,
      spokenText: pick.spoken,
      widgetHtml: `
        <div class="rich-widget-card math-solution-card">
          <div class="math-card-header">
            <div class="math-card-title"><span>🧩</span> Kid's Riddle</div>
            <span class="math-badge">Fun Puzzle</span>
          </div>
          <div style="font-size:1.05rem; margin-bottom:0.75rem; color:#f1f5f9;">${pick.riddle}</div>
          <div class="math-expression-display">
            ✨ Answer: <span class="math-highlight-answer">${pick.answer}</span>
          </div>
        </div>
      `
    };
  }

  // Handle Kids Story Telling
  handleStoryQuery(input) {
    const currentLang = this.voice.currentLanguage || 'en-US';
    const story = this.stories.getStory(input, currentLang);
    const persona = this.voice.getCurrentPersona();

    let introSpoken = `Here is a fun story called ${story.title}. Listen carefully because there is an interactive quiz at the end!`;
    if (currentLang === 'ta-IN') {
      introSpoken = `இதோ உங்களுக்கான அழகிய கதை: ${story.title}. கதையைக் கவனமாகக் கேளுங்கள், இறுதியில் ஒரு சுவாரஸ்யமான கேள்வி காத்திருக்கிறது!`;
    } else if (currentLang === 'es-ES') {
      introSpoken = `Aquí tienes un divertido cuento titulado ${story.title}. ¡Escucha con atención porque al final hay una pregunta!`;
    }

    return {
      text: `📖 **Story Time**: **${story.title}** ${story.emoji}\n\n*${story.summary}*\n\n⏱️ Duration: **${story.duration}** (${(story.lengthType || 'medium').toUpperCase()} STORY)\n\n🎯 *Listen to the story and answer the comprehension quiz below to earn your star badge!*`,
      spokenText: introSpoken,
      widgetHtml: this.stories.renderStoryCard(story)
    };
  }

  // Handle Timer Intent
  handleTimerQuery(input) {
    let totalSeconds = 60;
    const minMatch = input.match(/(\d+)\s*(?:min|minute|minutes|m\b)/i);
    const secMatch = input.match(/(\d+)\s*(?:sec|second|seconds|s\b)/i);
    const hrMatch = input.match(/(\d+)\s*(?:hr|hour|hours|h\b)/i);

    if (minMatch || secMatch || hrMatch) {
      totalSeconds = 0;
      if (hrMatch) totalSeconds += parseInt(hrMatch[1], 10) * 3600;
      if (minMatch) totalSeconds += parseInt(minMatch[1], 10) * 60;
      if (secMatch) totalSeconds += parseInt(secMatch[1], 10);
    } else {
      const numMatch = input.match(/\b(\d+)\b/);
      if (numMatch) {
        totalSeconds = parseInt(numMatch[1], 10) * 60;
      }
    }

    totalSeconds = Math.max(5, totalSeconds);
    const formattedDuration = totalSeconds >= 60 ? 
      `${Math.floor(totalSeconds / 60)} minute${Math.floor(totalSeconds / 60) > 1 ? 's' : ''}` : 
      `${totalSeconds} seconds`;

    const timer = this.timer.createTimer(totalSeconds, `${formattedDuration} Timer`);

    return {
      text: `⏱️ Starting your countdown timer for **${formattedDuration}**. You'll hear a gentle melodic chime when it finishes!`,
      spokenText: `Setting a timer for ${formattedDuration}. Starting now.`,
      widgetHtml: this.timer.renderTimerCard(timer)
    };
  }

  handleTimeQuery(input) {
    const time = this.calendar.getTimeData();
    let spoken = `${time.greeting}! ${time.spokenTime}.`;
    let responseText = `${time.greeting}! It is currently **${time.formattedTime}** (${time.timeZone}).`;

    return {
      text: responseText,
      spokenText: spoken,
      widgetHtml: this.calendar.renderTimeWidget()
    };
  }

  handleGreetingQuery() {
    const langConfig = this.voice.getLanguageConfig();
    const persona = this.voice.getCurrentPersona();

    return {
      text: `${langConfig.greeting || 'Hello!'} I'm **${persona.name}** (${persona.tagline}). Ask me a math problem, a kids story, an animal riddle, or change languages!`,
      spokenText: langConfig.greeting || `Hello! I am ${persona.name}. How can I help you learn and have fun today?`
    };
  }

  handleHelpQuery() {
    return {
      text: `🌟 **Things you can ask your Kid AI Copilot (Ages 5-12)**:
- 🌐 **Change Languages**: *"Speak in Tamil"*, *"Speak in Spanish"*, *"Speak in Korean"*, *"Speak in Hindi"*, *"Speak in English"*
- 🔢 **Math Solver**: *"What is 45 plus 38?"*, *"What is 15% of 80?"*, *"If 4 friends share 24 candies, how many do they get?"*
- 📖 **Story Land**: *"Tell me a short story"*, *"Tell me a long adventure story"*, *"ஒரு தமிழ் கதை சொல்"*
- 💡 **Curiosity & Science**: *"Why is the sky blue?"*, *"How do airplanes fly?"*, *"How many planets are there?"*
- 🧩 **Riddles & Jokes**: *"Tell me an animal riddle"*, *"Tell me a joke"*
- 🎙️ **Kids Voices**: Pick between *Leo Junior, Toby, Charlie, Maya, Lily, Emma* or record your voice in the studio!`,
      spokenText: `You can ask me for stories, math questions, science facts, riddles, or ask me to speak in different languages!`
    };
  }

  handleVoiceQuery(input) {
    const persona = this.voice.getCurrentPersona();
    const genderLabel = persona.gender === 'kid-boy' ? '👦 Kid Boy Voice' :
                        persona.gender === 'kid-girl' ? '👧 Kid Girl Voice' :
                        persona.gender === 'female' ? '👩 Female Voice' : '👨 Male Voice';

    return {
      text: `I am currently speaking in **${persona.name}** (${genderLabel} - ${persona.tagline}). Click the Voice Settings button at the top to select another kid voice or calibrate your voice!`,
      spokenText: `You are currently listening to ${persona.name}. You can switch between boy and girl kids voices anytime.`
    };
  }

  handleFallback(input) {
    return {
      text: `I understood: *"${input}"*.\n\nTry asking me:\n- 🔢 *"What is 125 plus 48?"* or *"What is 12 times 8?"*\n- 💡 *"Why is the sky blue?"* or *"What does empathy mean?"*\n- 📖 *"Tell me a short story"* or *"ஒரு தமிழ் கதை சொல்"*\n- 🧩 *"Tell me an animal riddle"*`,
      spokenText: `I can help you with math, kids stories, science facts, animal riddles, or speak in different languages!`
    };
  }
}

window.AgentEngine = AgentEngine;
