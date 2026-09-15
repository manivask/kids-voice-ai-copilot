/**
 * Multilingual Support & Localization Catalog for Kids Copilot
 * Supports: English, Tamil, Spanish, Korean, Japanese, Hindi, Telugu, Kannada, Malayalam, Marathi, Bengali, Gujarati
 */

const KIDS_LANGUAGES = {
  'en-US': {
    code: 'en-US',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    voiceKeywords: [/english/i, /us/i, /uk/i, /samantha/i, /david/i, /zira/i, /karen/i],
    greeting: "Hi there! I'm your Kid AI Copilot! What would you like to explore today?",
    switchedMessage: "🌟 Yay! I am now speaking in English. Ask me a math question, a fun story, or any science wonder!",
    switchedSpoken: "Yay! I am now speaking in English. What shall we learn or read today?",
    mathLabel: "Math Solution",
    storyLabel: "Kids Story",
    quizPrompt: "🎯 Answer the quiz question to earn your Super Star Badge!",
    samplePrompts: [
      "Tell me a short story",
      "What is 25 plus 47?",
      "Why is the sky blue?",
      "Tell me an animal riddle",
      "What rhymes with star?"
    ]
  },
  'ta-IN': {
    code: 'ta-IN',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    flag: '🇮🇳',
    voiceKeywords: [/tamil/i, /ta[-_]in/i, /valluvar/i, /latha/i, /vani/i],
    greeting: "வணக்கம்! நான் உங்கள் தமிழ் கிட்ஸ் வாய்ஸ் உதவியாளர்! இன்று என்ன கதை கேட்கலாம்?",
    switchedMessage: "🌟 சிறப்பு! நான் இப்போது தமிழில் பேசுகிறேன். என்னிடம் கதைகள், கணித கேள்விகள் அல்லது பொது அறிவு கேட்கலாம்!",
    switchedSpoken: "சிறப்பு! நான் இப்போது தமிழில் பேசுகிறேன். இன்று என்ன கதை கேட்கலாம்?",
    mathLabel: "கணித தீர்வு",
    storyLabel: "சிறுவர் கதை",
    quizPrompt: "🎯 உங்கள் விடையைச் சொல்லி நல்மதிப்பீட்டு நட்சத்திரப் பதக்கம் வெல்லுங்கள்!",
    samplePrompts: [
      "ஒரு தமிழ் கதை சொல்",
      "கணிதம்: 15 கூட்டல் 28 என்ன?",
      "வானம் ஏன் நீல நிறமாக இருக்கிறது?",
      "ஒரு விலங்கு விடுகதை சொல்"
    ]
  },
  'es-ES': {
    code: 'es-ES',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    voiceKeywords: [/spanish/i, /español/i, /es[-_]es/i, /es[-_]mx/i, /helena/i, /sabina/i, /raul/i, /jorge/i],
    greeting: "¡Hola amiguito! Soy tu Copiloto de Inteligencia Artificial para niños. ¿Qué quieres explorar hoy?",
    switchedMessage: "🌟 ¡Excelente! Ahora estoy hablando en español. ¡Pídeme un cuento, un problema de matemáticas o preguntas divertidas!",
    switchedSpoken: "¡Excelente! Ahora estoy hablando en español. ¿Qué historia o juego quieres explorar hoy?",
    mathLabel: "Solución de Matemáticas",
    storyLabel: "Cuento para Niños",
    quizPrompt: "🎯 ¡Responde la pregunta del cuento para ganar tu medalla de superestrella!",
    samplePrompts: [
      "Cuéntame un cuento corto",
      "¿Cuánto es 45 más 38?",
      "¿Por qué el cielo es azul?",
      "Dime una adivinanza de animales"
    ]
  },
  'ko-KR': {
    code: 'ko-KR',
    name: 'Korean',
    nativeName: '한국어',
    flag: '🇰🇷',
    voiceKeywords: [/korean/i, /ko[-_]kr/i, /heami/i, /yuna/i, /sunhi/i, /minho/i],
    greeting: "안녕! 나는 어린이들을 위한 AI 보조친구야! 오늘 어떤 재미있는 이야기를 들려줄까?",
    switchedMessage: "🌟 좋아요! 이제 한국어로 이야기할게요. 재미있는 동화, 수학 문제, 과학 퀴즈를 물어보세요!",
    switchedSpoken: "좋아요! 이제 한국어로 이야기할게요. 오늘 어떤 재미있는 공부나 이야기를 할까요?",
    mathLabel: "수학 풀이",
    storyLabel: "어린이 동화",
    quizPrompt: "🎯 질문에 답하고 멋진 슈퍼스타 배지를 받아보세요!",
    samplePrompts: [
      "짧은 동화 이야기 해줘",
      "수학 문제: 25 더하기 47은?",
      "하늘은 왜 파란색인가요?",
      "동물 퀴즈 내줘"
    ]
  },
  'ja-JP': {
    code: 'ja-JP',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    voiceKeywords: [/japanese/i, /ja[-_]jp/i, /ayumi/i, /haruka/i, /ichiro/i, /sayaka/i],
    greeting: "こんにちは！ぼくはキッズAIコパイロットだよ！きょうはどんなおはなしをしようか？",
    switchedMessage: "🌟 やったね！これからは日本語でお話しするよ。たのしいお話や算数の問題、なんでも聞いてね！",
    switchedSpoken: "やったね！これからは日本語でお話しするよ。きょうはどんなお話を聞きたいかな？",
    mathLabel: "さんすうのこたえ",
    storyLabel: "きっずのおはなし",
    quizPrompt: "🎯 クイズのこたえをいって、ピカピカのスターバッジをゲットしよう！",
    samplePrompts: [
      "みじかいおはなしをして",
      "さんすう: 25 たす 47 は？",
      "そらはどうしてあおいの？",
      "どうぶつのなぞなぞをだして"
    ]
  },
  'hi-IN': {
    code: 'hi-IN',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    voiceKeywords: [/hindi/i, /hi[-_]in/i, /kalpana/i, /hemant/i, /swara/i, /madhur/i],
    greeting: "नमस्ते दोस्त! मैं आपका किड्स एआई साथी हूँ! आज आप कौन सी मज़ेदार कहानी सुनना चाहते हैं?",
    switchedMessage: "🌟 बहुत बढ़िया! अब मैं आपसे हिंदी में बात करूँगा। मुझसे कहानियाँ, गणित के सवाल या विज्ञान के रहस्य पूछिए!",
    switchedSpoken: "बहुत बढ़िया! अब मैं आपसे हिंदी में बात करूँगा। आज कौन सी कहानी या सवाल पूछना चाहते हैं?",
    mathLabel: "गणित का उत्तर",
    storyLabel: "बाल कहानी",
    quizPrompt: "🎯 प्रश्न का उत्तर दें और अपना सुपर स्टार बैज जीतें!",
    samplePrompts: [
      "एक मज़ेदार कहानी सुनाओ",
      "गणित: 35 जमा 45 कितना होता है?",
      "आसमान नीला क्यों होता है?",
      "एक पहेली पूछो"
    ]
  },
  'te-IN': {
    code: 'te-IN',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    flag: '🇮🇳',
    voiceKeywords: [/telugu/i, /te[-_]in/i, /mohan/i, /geetha/i, /shruti/i],
    greeting: "నమస్కారం! నేను మీ కిడ్స్ AI స్నేహితుడిని! ఈరోజు ఏ కథ వినాలనుకుంటున్నారు?",
    switchedMessage: "🌟 అద్భుతం! ఇప్పుడు నేను తెలుగులో మాట్లాడుతాను. కథలు, లెక్కలు లేదా సరదా విషయాలు అడగండి!",
    switchedSpoken: "అద్భుతం! ఇప్పుడు నేను మీతో తెలుగులో మాట్లాడుతాను. ఈరోజు ఏ కథ వినాలనుకుంటున్నారు?",
    mathLabel: "గణిత సమాధానం",
    storyLabel: "పిల్లల కథ",
    quizPrompt: "🎯 ప్రశ్నకు సమాధానం చెప్పి సూపర్ స్టార్ బ్యాడ్జ్ గెలుచుకోండి!",
    samplePrompts: [
      "ఒక మంచి కథ చెప్పు",
      "లెక్క: 20 ప్లస్ 30 ఎంత?",
      "ఆకాశం ఎందుకు నీలంగా ఉంటుంది?"
    ]
  },
  'kn-IN': {
    code: 'kn-IN',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    flag: '🇮🇳',
    voiceKeywords: [/kannada/i, /kn[-_]in/i, /sapna/i, /gagan/i],
    greeting: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಮಕ್ಕಳ AI ಸ್ನೇಹಿತ! ಇಂದು ಯಾವ ಕಥೆ ಕೇಳಲು ಬಯಸುತ್ತೀರಿ?",
    switchedMessage: "🌟 ಅದ್ಭುತ! ನಾನು ಈಗ ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡುತ್ತೇನೆ. ಕಥೆಗಳು ಅಥವಾ ಗಣಿತ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ!",
    switchedSpoken: "ಅದ್ಭುತ! ನಾನು ಈಗ ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡುತ್ತೇನೆ.",
    mathLabel: "ಗಣಿತ ಪರಿಹಾರ",
    storyLabel: "ಮಕ್ಕಳ ಕಥೆ",
    quizPrompt: "🎯 ಪ್ರಶ್ನೆಗೆ ಉತ್ತರಿಸಿ ಸ್ಟಾರ್ ಬ್ಯಾಡ್ಜ್ ಪಡೆಯಿರಿ!",
    samplePrompts: ["ಒಂದು ಕಥೆ ಹೇಳು", "ಗಣಿತ: 15 + 25 ಎಷ್ಟು?"]
  },
  'ml-IN': {
    code: 'ml-IN',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    flag: '🇮🇳',
    voiceKeywords: [/malayalam/i, /ml[-_]in/i, /midhun/i, /sobhana/i],
    greeting: "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ കുട്ടി AI കൂട്ടുകാരനാണ്! ഇന്ന് എന്ത് കഥയാണ് കേൾക്കേണ്ടത്?",
    switchedMessage: "🌟 അടിപൊളി! ഞാൻ ഇപ്പോൾ മലയാളത്തിൽ സംസാരിക്കുന്നു. കഥകളും കണക്കുകളും ചോദിക്കൂ!",
    switchedSpoken: "അടിപൊളി! ഞാൻ ഇപ്പോൾ മലയാളത്തിൽ സംസാരിക്കുന്നു.",
    mathLabel: "കണക്ക് പരിഹാരം",
    storyLabel: "കുട്ടിക്കഥ",
    quizPrompt: "🎯 ചോദ്യത്തിന് ഉത്തരം നൽകി സൂപ്പർ സ്റ്റാർ ബാഡ്ജ് നേടൂ!",
    samplePrompts: ["ഒരു കഥ പറയൂ", "കണക്ക്: 25 + 25 എത്രയാണ്?"]
  },
  'mr-IN': {
    code: 'mr-IN',
    name: 'Marathi',
    nativeName: 'मराठी',
    flag: '🇮🇳',
    voiceKeywords: [/marathi/i, /mr[-_]in/i, /aarohi/i, /manohar/i],
    greeting: "नमस्कार मित्रा! मी तुझा AI बालमित्र आहे! आज कोणती छान गोष्ट ऐकायची आहे?",
    switchedMessage: "🌟 छान! आता मी मराठीत बोलेन. मला गोष्टी, गणिताचे प्रश्न किंवा कोडी विचारा!",
    switchedSpoken: "छान! आता मी मराठीत बोलेन. आज कोणती गोष्ट ऐकायची आहे?",
    mathLabel: "गणित उत्तर",
    storyLabel: "बालगोष्ट",
    quizPrompt: "🎯 प्रश्नाचे उत्तर द्या आणि सुपर स्टार बॅज मिळवा!",
    samplePrompts: ["एक छान गोष्ट सांग", "गणित: 50 + 25 किती?"]
  },
  'bn-IN': {
    code: 'bn-IN',
    name: 'Bengali',
    nativeName: 'বাংলা',
    flag: '🇮🇳',
    voiceKeywords: [/bengali/i, /bangla/i, /bn[-_]in/i, /tanishaa/i, /bashkar/i],
    greeting: "নমস্কার বন্ধু! আমি তোমাদের কিডস এআই বন্ধু! আজ কোন মজার গল্প শুনতে চাও?",
    switchedMessage: "🌟 দারুণ! এখন আমি বাংলায় কথা বলব। আমাকে মজার গল্প, অঙ্কের ধাঁধা বা বিজ্ঞানের প্রশ্ন জিজ্ঞেস করো!",
    switchedSpoken: "দারুণ! এখন আমি বাংলায় কথা বলব। আজ কোন গল্প শুনবে?",
    mathLabel: "অঙ্কের সমাধান",
    storyLabel: "ছোটদের গল্প",
    quizPrompt: "🎯 প্রশ্নের উত্তর দিয়ে সুপার স্টার ব্যাজ জিতে নাও!",
    samplePrompts: ["একটি মজার গল্প বলো", "অঙ্ক: ২৫ যোগ ৩৫ কত?"]
  },
  'gu-IN': {
    code: 'gu-IN',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    flag: '🇮🇳',
    voiceKeywords: [/gujarati/i, /gu[-_]in/i, /dhwani/i, /niranjan/i],
    greeting: "નમસ્તે દોસ્ત! હું તમારો કિડ્સ AI મિત્ર છું! આજે કઈ સરસ વાર્તા સાંભળવી છે?",
    switchedMessage: "🌟 ખૂબ સરસ! હવે હું ગુજરાતીમાં વાત કરીશ. મને વાર્તાઓ અને ગણિતના પ્રશ્નો પૂછો!",
    switchedSpoken: "ખૂબ સરસ! હવે હું ગુજરાતીમાં વાત કરીશ.",
    mathLabel: "ગણિત જવાબ",
    storyLabel: "બાળવાર્તા",
    quizPrompt: "🎯 પ્રશ્નનો જવાબ આપો અને સુપર સ્ટાર બેજ મેળવો!",
    samplePrompts: ["એક સરસ વાર્તા કહો", "ગણિત: ૧૫ + ૧૫ કેટલા થાય?"]
  }
};

window.KIDS_LANGUAGES = KIDS_LANGUAGES;

