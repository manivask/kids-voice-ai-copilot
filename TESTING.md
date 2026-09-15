# Testing & Mobile Access Guide: Kids Voice AI Copilot (Ages 5-12)

This guide explains how to test the **Kids Voice AI Copilot**, how to switch languages dynamically, how to test distinct kid voices, how to use the **Android APK**, and how to open the app on an **iPhone / iPad**.

---

## 🌐 1. Dynamic Multilingual Switching

The Copilot supports dynamic speech synthesis and recognition across 12 languages:
- 🇺🇸 **English** (`en-US`)
- 🇮🇳 **Tamil / தமிழ்** (`ta-IN`)
- 🇪🇸 **Spanish / Español** (`es-ES`)
- 🇰🇷 **Korean / 한국어** (`ko-KR`)
- 🇯🇵 **Japanese / 日本語** (`ja-JP`)
- 🇮🇳 **Hindi / हिन्दी** (`hi-IN`)
- 🇮🇳 **Telugu / తెలుగు** (`te-IN`)
- 🇮🇳 **Kannada / ಕನ್ನಡ** (`kn-IN`)
- 🇮🇳 **Malayalam / മലയാളം** (`ml-IN`)
- 🇮🇳 **Marathi / मराठी** (`mr-IN`)
- 🇮🇳 **Bengali / বাংলা** (`bn-IN`)
- 🇮🇳 **Gujarati / ગુજરાતી** (`gu-IN`)

### How to Switch Languages:
1. **Via UI**: Tap the 🌐 **Language Button** in the top bar or bottom navigation to open the flag grid and select your language.
2. **Via Voice / Chat**: Simply say or type:
   - *"Speak in Tamil"* or *"தமிழில் பேசு"*
   - *"Speak in Spanish"* or *"Habla en español"*
   - *"Speak in Korean"* or *"한국어로 말해줘"*
   - *"Speak in Japanese"* or *"日本語で話して"*
   - *"Speak in Hindi"* or *"हिंदी में बोलो"*
   - *"Speak in Telugu"* or *"తెలుగులో మాట్లాడు"*
   - *"Speak in English"*

---

## 🧒 2. Distinct Kids Voices (Ages 5-12 Boys & Girls)

Every persona now uses distinct browser voices with calibrated pitch and cadence:
- **👦 Kids Boy Voices (Ages 5-12)**:
  - **Leo Junior (Age 6-8)**: High-pitched, energetic, curious boy tone (Pitch: 1.55, Rate: 1.05).
  - **Toby (Age 9-12)**: Adventurer, cheerful boy tone (Pitch: 1.35, Rate: 1.00).
  - **Charlie (Age 5-7)**: Playful, little boy storytelling tone (Pitch: 1.65, Rate: 0.95).
- **👧 Kids Girl Voices (Ages 5-12)**:
  - **Maya (Age 6-8)**: Bright, bubbly, enthusiastic young girl tone (Pitch: 1.60, Rate: 1.02).
  - **Lily (Age 9-12)**: Gentle, clear, expressive storyteller (Pitch: 1.42, Rate: 0.94).
  - **Emma (Age 5-7)**: Joyful, melodious little girl tone (Pitch: 1.70, Rate: 0.98).

Tap **▶ Preview** on any voice card in the Voice Modal to hear its distinct vocal character!

---

## 📱 3. How to Open on iPhone / iPad (Mobile PWA Link)

1. Connect your iPhone to the same local Wi-Fi network.
2. Open **Safari** on your iPhone and visit:
   ```text
   http://192.168.7.76:8080/apps/chatbot/
   ```
3. **To Install on iPhone Home Screen as a Standalone App**:
   - In Safari, tap the **Share** button (the square icon with an upward arrow).
   - Scroll down and tap **"Add to Home Screen"** (`[+]`).
   - Tap **"Add"** in the top right.
   - The **Kids AI Copilot** app icon will appear on your iPhone home screen!

---

## 🤖 4. Android App Package (APK)

- **APK File Location**: `apps/chatbot/apk/VoiceAI-Copilot.apk`
- **File Size**: ~4.00 MB
- **Installation**: Transfer the `.apk` to any Android phone or tablet and tap **Install**.
- **To Rebuild APK**:
  ```powershell
  cd c:\Users\maniv\all_ide_code_ws\apps\chatbot
  npm.cmd run build:apk
  ```

---

## 🧪 5. Sample Kid Questions & Voice Prompts

- 📖 **Stories**:
  - *"Tell me a short story"* (English)
  - *"ஒரு தமிழ் கதை சொல்"* (Tamil)
  - *"Cuéntame un cuento corto"* (Spanish)
  - *"एक मज़ेदार कहानी सुनाओ"* (Hindi)
- 🔢 **Math Solver**:
  - *"What is 45 plus 38?"*
  - *"What is 15 percent of 80?"*
  - *"If 4 friends share 24 candies, how many does each get?"*
  - *"A toy costs 18 dollars and I pay with 50 dollars, what is my change?"*
- 🧩 **Riddles**:
  - *"Tell me an animal riddle"*
  - *"Tell me a joke"*
- 💡 **Curiosity & Science**:
  - *"Why is the sky blue?"*
  - *"How do airplanes fly?"*
  - *"Why do leaves change color in autumn?"*
  - *"What does perseverance mean?"*
  - *"What words rhyme with star?"*
