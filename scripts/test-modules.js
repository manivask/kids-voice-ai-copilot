// Automated test suite for Kids Learning AI copilot modules
const fs = require('fs');
const path = require('path');

// Mock browser globals
global.window = global;
global.localStorage = {
  _data: {},
  getItem(key) { return this._data[key] || null; },
  setItem(key, val) { this._data[key] = String(val); },
  removeItem(key) { delete this._data[key]; },
  clear() { this._data = {}; }
};

// Load languages
require('../js/languages.js');

// Load AI Reasoning Engine
require('../js/ai-reasoning.js');

// Load Autonomous Learner
require('../js/autonomous-learner.js');

// Load Voice Engine
global.SpeechSynthesisUtterance = function(text) {
  this.text = text;
  this.voice = null;
  this.lang = 'en-US';
  this.pitch = 1.0;
  this.rate = 1.0;
};
global.speechSynthesis = {
  getVoices() {
    return [
      { name: 'Microsoft Jenny Online (Natural) - English (United States)', lang: 'en-US' },
      { name: 'Microsoft Aria Online (Natural) - English (United States)', lang: 'en-US' },
      { name: 'Google US English', lang: 'en-US' },
      { name: 'Microsoft David Desktop - English (United States)', lang: 'en-US' }
    ];
  },
  speak(u) {},
  cancel() {}
};
require('../js/voice.js');

async function runTests() {
  console.log('=== Starting Kids Learning AI Modules Verification ===\n');

  // 1. Test AI Reasoning Engine
  console.log('--- Test 1: AI Reasoning Engine ---');
  const reasoning = new window.AIReasoningEngine();
  
  const testQueries = [
    'Why is the sky blue?',
    'What is the distance between Earth and Moon?',
    'Why is Mars red?',
    'How do airplanes fly?',
    'Why is the ocean salty?',
    'Tell me a bedtime story about space'
  ];

  for (const q of testQueries) {
    const res = await reasoning.solve(q);
    console.log(`Query: "${q}"`);
    console.log(`  -> Title: "${res.title}"`);
    console.log(`  -> Category: "${res.category}"`);
    console.log(`  -> Thinking steps: ${res.thinkingSteps ? res.thinkingSteps.length : 0}`);
    console.log(`  -> Answer preview: ${res.answer.substring(0, 100)}...\n`);
    if (!res.answer || res.answer.length < 20) {
      throw new Error(`Invalid answer for "${q}"`);
    }
  }

  // 2. Test Voice Engine
  console.log('--- Test 2: Voice Engine ---');
  const voice = new window.VoiceEngine();
  const personas = voice.personas;
  console.log(`Loaded Personas: ${personas.map(p => p.name).join(', ')}`);
  
  const selectedVoice1 = voice.resolveBrowserVoice(personas[0]);
  const selectedVoice2 = voice.resolveBrowserVoice(personas[1]);
  console.log(`Persona 1 (${personas[0].name}) voice: ${selectedVoice1 ? selectedVoice1.name : 'none'}`);
  console.log(`Persona 2 (${personas[1].name}) voice: ${selectedVoice2 ? selectedVoice2.name : 'none'}`);

  const sampleLongText = "The sky is blue because of Rayleigh scattering! Sunlight reaches Earth's atmosphere and is scattered in all directions by all the gases and particles in the air. Blue light is scattered more than other colors because it travels as shorter, smaller waves. This is why we see a blue sky most of the time!";
  const cleaned = voice.cleanTextForSpeech(sampleLongText);
  console.log(`Cleaned Text for Speech: "${cleaned.substring(0, 60)}..."`);
  
  let chunksSpoken = 0;
  voice.speak(sampleLongText, () => {
    // onStart
  }, () => {
    // onEnd
  });
  console.log('Voice chunking & synthesis invocation passed.\n');

  // 3. Test Autonomous Learner Engine
  console.log('--- Test 3: Continuous Learning Engine ---');
  const learner = new window.AutonomousLearnerEngine(reasoning);
  learner.captureQuestion('Why do cats purr?', 'curiosity', 0.5);
  learner.captureQuestion('Can cars fly on water?', 'creative', 0.4);
  const stats = learner.stats;
  console.log('Autonomous Learner captured questions:', stats.totalQuestionsCaptured);
  console.log('Autonomous Learner evolution cycles:', stats.evolutionCycles);
  
  console.log('\n=== ALL TESTS PASSED SUCCESSFULLY! ===');
}

runTests().catch(err => {
  console.error('Test Failed:', err);
  process.exit(1);
});
