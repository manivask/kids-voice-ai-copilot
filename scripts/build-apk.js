const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const jdkPath = path.join(process.env.USERPROFILE, '.jdks', 'jdk-21.0.6+7');
const androidHome = path.join(process.env.LOCALAPPDATA, 'Android', 'Sdk');
const env = {
  ...process.env,
  JAVA_HOME: jdkPath,
  ANDROID_HOME: androidHome
};

const androidDir = path.join(__dirname, '..', 'android');
const gradlewCmd = process.platform === 'win32' ? path.join(androidDir, 'gradlew.bat') : path.join(androidDir, 'gradlew');

console.log('Starting Gradle assembleDebug with JAVA_HOME:', jdkPath);
execSync(`"${gradlewCmd}" assembleDebug`, {
  cwd: androidDir,
  env,
  stdio: 'inherit'
});

fs.mkdirSync(path.join(__dirname, '..', 'apk'), { recursive: true });
const srcApk = path.join(androidDir, 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk');
const destApk1 = path.join(__dirname, '..', 'apk', 'VoiceAI-Copilot.apk');
const destApk2 = path.join(__dirname, '..', 'apk', 'app-debug.apk');

if (fs.existsSync(srcApk)) {
  fs.copyFileSync(srcApk, destApk1);
  fs.copyFileSync(srcApk, destApk2);
  console.log('✅ APK successfully built and saved to apk/VoiceAI-Copilot.apk');
} else {
  console.error('❌ Could not find output APK at:', srcApk);
}

