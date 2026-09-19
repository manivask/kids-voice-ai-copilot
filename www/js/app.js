/**
 * Kids Voice AI Copilot (Ages 5-12) - App Controller
 * Connects UI, Voice Engine, Calendar Engine, Timer Engine, Kids Story Engine,
 * Math & Learning Engine, Multilingual Engine, and Voice Cloner Studio
 */

document.addEventListener('DOMContentLoaded', () => {
  const voice = new VoiceEngine();
  const calendar = new CalendarEngine();
  const stories = new KidsStoryEngine();
  const mathLearning = new MathAndLearningEngine();
  const aiReasoning = new AIReasoningEngine();
  const autonomousLearner = new AutonomousLearnerEngine(aiReasoning);

  // Initialize Timer Engine with completion callback
  const timer = new TimerEngine((finishedTimer) => {
    setOrbState('speaking');
    waveformContainer.classList.add('active');
    voice.speak(
      `Your ${finishedTimer.label} has finished!`,
      () => setOrbState('speaking'),
      () => {
        setOrbState('idle');
        waveformContainer.classList.remove('active');
      }
    );
  });

  // Global Timer Controller for inline card buttons
  window.TimerController = {
    togglePause: (id) => timer.togglePause(id),
    cancel: (id) => timer.cancelTimer(id)
  };

  // Global Story Controller for reading story aloud & filtering
  window.StoryController = {
    readStory: (storyId) => {
      const story = stories.stories.find(s => s.id === storyId) || stories.stories[0];
      if (voice.isSpeaking) {
        voice.stopSpeaking();
        setOrbState('idle');
        waveformContainer.classList.remove('active');
        return;
      }

      setOrbState('speaking');
      waveformContainer.classList.add('active');
      voice.speak(
        `${story.title}. ${story.content} ... Moral of the story: ${story.moral} ... Now, here is your question: ${story.quiz.question}`,
        () => setOrbState('speaking'),
        () => {
          setOrbState('idle');
          waveformContainer.classList.remove('active');
        }
      );
    },
    filterStory: (lengthType) => {
      handleSend(`Tell me a ${lengthType} kids story`);
    },
    nextRandomStory: () => {
      handleSend(`Tell me another kids story`);
    }
  };

  const agent = new AgentEngine(calendar, voice, timer, stories, mathLearning, aiReasoning);

  // Initialize Voice Cloner Studio
  const voiceStudio = new VoiceClonerStudio(voice, (userPersona) => {
    renderVoicePersonaOptions();
    closeVoiceStudioModal();
    appendMessage({
      sender: 'agent',
      text: `🎉 **Voice Calibration Complete!**\n\nYour personalized voice profile **"${userPersona.name}"** (${userPersona.tagline}) has been calibrated and set as your active AI voice persona!`,
      spokenText: "Your personalized voice profile is calibrated and ready."
    });
  });

  // DOM Elements
  const chatViewport = document.getElementById('chatViewport');
  const heroStage = document.getElementById('heroStage');
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  const micBtn = document.getElementById('micBtn');
  const attachPhotoBtn = document.getElementById('attachPhotoBtn');
  const photoFileInput = document.getElementById('photoFileInput');
  const imagePreviewBar = document.getElementById('imagePreviewBar');
  const previewThumbnailImg = document.getElementById('previewThumbnailImg');
  const removePhotoBtn = document.getElementById('removePhotoBtn');
  const copilotOrbContainer = document.getElementById('copilotOrbContainer');
  const waveformContainer = document.getElementById('waveformContainer');
  const liveTranscript = document.getElementById('liveTranscript');
  const liveTranscriptText = document.getElementById('liveTranscriptText');
  const inputContainer = document.getElementById('inputContainer');
  const quickPromptsContainer = document.getElementById('quickPromptsContainer');

  // Language Elements
  const openLangModalBtn = document.getElementById('openLangModalBtn');
  const closeLangModalBtn = document.getElementById('closeLangModalBtn');
  const langModalOverlay = document.getElementById('langModalOverlay');
  const currentLangFlag = document.getElementById('currentLangFlag');
  const currentLangName = document.getElementById('currentLangName');
  const langOptionsGrid = document.getElementById('langOptionsGrid');

  // Voice Modal Elements
  const voiceModalOverlay = document.getElementById('voiceModalOverlay');
  const openVoiceModalBtn = document.getElementById('openVoiceModalBtn');
  const closeVoiceModalBtn = document.getElementById('closeVoiceModalBtn');
  const currentVoiceNameBadge = document.getElementById('currentVoiceNameBadge');
  const kidsBoyVoicePersonaList = document.getElementById('kidsBoyVoicePersonaList');
  const kidsGirlVoicePersonaList = document.getElementById('kidsGirlVoicePersonaList');
  const softVoicePersonaList = document.getElementById('softVoicePersonaList');
  const speechRateSlider = document.getElementById('speechRateSlider');
  const speechPitchSlider = document.getElementById('speechPitchSlider');
  const rateValueDisplay = document.getElementById('rateValueDisplay');
  const pitchValueDisplay = document.getElementById('pitchValueDisplay');

  // Studio Elements
  const openVoiceStudioBtn = document.getElementById('openVoiceStudioBtn');
  const voiceStudioModalOverlay = document.getElementById('voiceStudioModalOverlay');
  const closeVoiceStudioBtn = document.getElementById('closeVoiceStudioBtn');
  const studioProgressDots = document.getElementById('studioProgressDots');
  const sentenceIndexTag = document.getElementById('sentenceIndexTag');
  const sentenceText = document.getElementById('sentenceText');
  const recordSentenceBtn = document.getElementById('recordSentenceBtn');
  const studioStatusText = document.getElementById('studioStatusText');
  const liveEqContainer = document.getElementById('liveEqContainer');
  const vuIndicatorBadge = document.getElementById('vuIndicatorBadge');
  const vuLevelText = document.getElementById('vuLevelText');
  const studioActionButtonsRow = document.getElementById('studioActionButtonsRow');
  const playSampleRecordingBtn = document.getElementById('playSampleRecordingBtn');
  const nextSentenceBtn = document.getElementById('nextSentenceBtn');
  const genderPillGroup = document.getElementById('genderPillGroup');
  const modePillGroup = document.getElementById('modePillGroup');

  let hasUserInteracted = false;
  let currentlyPreviewingId = null;
  let isPlayingSample = false;
  let currentAttachedImage = null;

  // ==================== LANGUAGE CONTROLS ====================
  function renderLanguageOptions() {
    if (!langOptionsGrid) return;
    langOptionsGrid.innerHTML = '';

    const currentCode = voice.currentLanguage;
    Object.values(window.KIDS_LANGUAGES || {}).forEach(lang => {
      const isSelected = lang.code === currentCode;
      const card = document.createElement('div');
      card.className = `lang-card-option ${isSelected ? 'selected' : ''}`;
      card.innerHTML = `
        <div class="lang-flag-big">${lang.flag}</div>
        <div class="lang-name-main">${lang.name}</div>
        <div class="lang-name-native">${lang.nativeName}</div>
      `;

      card.addEventListener('click', () => {
        switchLanguage(lang.code);
        closeLanguageModal();
      });

      langOptionsGrid.appendChild(card);
    });
  }

  function switchLanguage(langCode) {
    if (!window.KIDS_LANGUAGES || !window.KIDS_LANGUAGES[langCode]) return;
    const cfg = window.KIDS_LANGUAGES[langCode];
    voice.setLanguage(langCode);

    if (currentLangFlag) currentLangFlag.textContent = cfg.flag;
    if (currentLangName) currentLangName.textContent = cfg.name;

    renderLanguageOptions();
    updatePromptsForLanguage(cfg);

    appendMessage({
      sender: 'agent',
      text: cfg.switchedMessage,
      spokenText: cfg.switchedSpoken
    });

    voice.speak(cfg.switchedSpoken);
  }

  function updatePromptsForLanguage(cfg) {
    if (!quickPromptsContainer || !cfg.samplePrompts) return;
    quickPromptsContainer.innerHTML = '';
    cfg.samplePrompts.forEach(p => {
      const btn = document.createElement('button');
      btn.className = 'prompt-chip';
      btn.dataset.prompt = p;
      btn.innerHTML = `<span>✨</span> ${p}`;
      btn.addEventListener('click', () => handleSend(p));
      quickPromptsContainer.appendChild(btn);
    });
  }

  function openLanguageModal() {
    renderLanguageOptions();
    if (langModalOverlay) langModalOverlay.classList.add('open');
  }

  function closeLanguageModal() {
    if (langModalOverlay) langModalOverlay.classList.remove('open');
  }

  if (openLangModalBtn) openLangModalBtn.addEventListener('click', openLanguageModal);
  if (closeLangModalBtn) closeLangModalBtn.addEventListener('click', closeLanguageModal);

  // ==================== LEFT SIDEBAR DRAWER CONTROLS ====================
  const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
  const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
  const sidebarBackdrop = document.getElementById('sidebarBackdrop');
  const leftSidebarDrawer = document.getElementById('leftSidebarDrawer');
  const sidebarVoiceList = document.getElementById('sidebarVoiceList');
  const sidebarLangPills = document.getElementById('sidebarLangPills');
  const sidebarEvolutionBtn = document.getElementById('sidebarEvolutionBtn');
  const sidebarStudioBtn = document.getElementById('sidebarStudioBtn');
  const sidebarRateSlider = document.getElementById('sidebarRateSlider');
  const sidebarPitchSlider = document.getElementById('sidebarPitchSlider');
  const sidebarRateDisplay = document.getElementById('sidebarRateDisplay');
  const sidebarPitchDisplay = document.getElementById('sidebarPitchDisplay');

  function openSidebar() {
    if (leftSidebarDrawer) leftSidebarDrawer.classList.add('open');
    if (sidebarBackdrop) sidebarBackdrop.classList.add('active');
  }

  function closeSidebar() {
    if (leftSidebarDrawer) leftSidebarDrawer.classList.remove('open');
    if (sidebarBackdrop) sidebarBackdrop.classList.remove('active');
  }

  if (sidebarToggleBtn) sidebarToggleBtn.addEventListener('click', openSidebar);
  if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeSidebar);
  if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeSidebar);

  if (sidebarEvolutionBtn) {
    sidebarEvolutionBtn.addEventListener('click', () => {
      closeSidebar();
      openEvolutionModal();
    });
  }

  if (sidebarStudioBtn) {
    sidebarStudioBtn.addEventListener('click', () => {
      closeSidebar();
      openVoiceStudioModal();
    });
  }

  // Sidebar Topic Chips
  document.querySelectorAll('.sidebar-topic-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.dataset.prompt;
      if (prompt) {
        closeSidebar();
        handleSend(prompt);
      }
    });
  });

  // Render Sidebar Languages
  function renderSidebarLanguages() {
    if (!sidebarLangPills) return;
    sidebarLangPills.innerHTML = '';
    const currentCode = voice.currentLanguage;

    Object.values(window.KIDS_LANGUAGES || {}).forEach(lang => {
      const isSelected = lang.code === currentCode;
      const btn = document.createElement('button');
      btn.className = `sidebar-lang-pill ${isSelected ? 'active' : ''}`;
      btn.innerHTML = `<span>${lang.flag}</span> <span>${lang.name}</span>`;
      btn.addEventListener('click', () => {
        switchLanguage(lang.code);
        renderSidebarLanguages();
      });
      sidebarLangPills.appendChild(btn);
    });
  }

  // Render Sidebar Voices (Voice 1 & Voice 2)
  function renderSidebarVoices() {
    if (!sidebarVoiceList) return;
    sidebarVoiceList.innerHTML = '';
    const currentId = voice.currentPersonaId;

    voice.personas.forEach(p => {
      const isActive = p.id === currentId;
      const isPlaying = currentlyPreviewingId === p.id && voice.isSpeaking;
      const card = document.createElement('div');
      card.className = `sidebar-voice-card ${isActive ? 'active' : ''}`;
      card.dataset.voiceId = p.id;
      card.innerHTML = `
        <div class="sidebar-voice-info">
          <span class="sidebar-voice-avatar">${p.avatarText}</span>
          <div>
            <div class="sidebar-voice-name">${p.name} <span class="badge-age">${p.ageGroup || 'Kids'}</span></div>
            <div class="sidebar-voice-desc">${p.tagline}</div>
          </div>
        </div>
        <div class="sidebar-voice-actions">
          <button class="sidebar-play-btn ${isPlaying ? 'playing' : ''}" data-preview-voice="${p.id}" title="Play Voice Sample">
            ${isPlaying ? '⏹ Stop' : '▶ Sample'}
          </button>
          <button class="sidebar-select-voice-btn ${isActive ? 'active' : ''}" data-select-voice="${p.id}">
            ${isActive ? '✓ Active' : 'Select'}
          </button>
        </div>
      `;

      const playBtn = card.querySelector('.sidebar-play-btn');
      if (playBtn) {
        playBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          togglePreviewPersonaVoice(p);
        });
      }

      const selectBtn = card.querySelector('.sidebar-select-voice-btn');
      if (selectBtn) {
        selectBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          selectPersona(p.id);
        });
      }

      card.addEventListener('click', () => {
        selectPersona(p.id);
      });

      sidebarVoiceList.appendChild(card);
    });
  }

  // Sidebar Sliders
  if (sidebarRateSlider) {
    sidebarRateSlider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      voice.speechRate = val;
      if (sidebarRateDisplay) sidebarRateDisplay.textContent = `${val.toFixed(2)}x`;
      if (speechRateSlider) speechRateSlider.value = val;
      if (rateValueDisplay) rateValueDisplay.textContent = `${val.toFixed(2)}x`;
    });
  }

  if (sidebarPitchSlider) {
    sidebarPitchSlider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      voice.speechPitch = val;
      if (sidebarPitchDisplay) sidebarPitchDisplay.textContent = `${val.toFixed(2)}x`;
      if (speechPitchSlider) speechPitchSlider.value = val;
      if (pitchValueDisplay) pitchValueDisplay.textContent = `${val.toFixed(2)}x`;
    });
  }

  // ==================== VOICE PERSONA RENDERING ====================
  function renderVoicePersonaOptions() {
    if (kidsBoyVoicePersonaList) kidsBoyVoicePersonaList.innerHTML = '';
    if (kidsGirlVoicePersonaList) kidsGirlVoicePersonaList.innerHTML = '';
    if (softVoicePersonaList) softVoicePersonaList.innerHTML = '';

    const currentId = voice.currentPersonaId;

    voice.personas.forEach(p => {
      const isSelected = p.id === currentId;
      const card = document.createElement('div');
      card.className = `voice-card-option ${isSelected ? 'selected' : ''}`;
      card.dataset.personaId = p.id;

      let badgeClass = 'kids-boy';
      if (p.isUserCloned) badgeClass = 'user-cloned';

      const isPlaying = currentlyPreviewingId === p.id && voice.isSpeaking;

      const deleteBtnHtml = p.isUserCloned ? `
        <button class="delete-voice-btn" data-delete-id="${p.id}" title="Remove Custom Voice">
          ✕
        </button>
      ` : '';

      const ageTagHtml = p.ageGroup ? `<span style="font-size:0.75rem; color:#818cf8; font-weight:600; margin-left:0.3rem;">(${p.ageGroup})</span>` : '';

      card.innerHTML = `
        <div class="voice-info">
          <div class="voice-avatar-badge ${badgeClass}">
            ${p.avatarText}
          </div>
          <div class="voice-details">
            <h4>${p.name} ${ageTagHtml}</h4>
            <p>${p.tagline}</p>
          </div>
        </div>
        <div class="voice-card-actions">
          <button class="preview-voice-btn ${isPlaying ? 'playing' : ''}" data-preview-id="${p.id}" title="Play Kid Voice Sample">
            ${isPlaying ? '⏹ Stop' : '▶ Play Sample'}
          </button>
          ${deleteBtnHtml}
        </div>
      `;

      card.addEventListener('click', (e) => {
        if (e.target.closest('.preview-voice-btn') || e.target.closest('.delete-voice-btn')) return;
        selectPersona(p.id);
      });

      const previewBtn = card.querySelector('.preview-voice-btn');
      if (previewBtn) {
        previewBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          togglePreviewPersonaVoice(p);
        });
      }

      if (p.isUserCloned) {
        const delBtn = card.querySelector('.delete-voice-btn');
        if (delBtn) {
          delBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            confirmDeleteClonedVoice(p.id);
          });
        }
      }

      if (kidsBoyVoicePersonaList) {
        kidsBoyVoicePersonaList.appendChild(card);
      } else if (softVoicePersonaList) {
        softVoicePersonaList.appendChild(card);
      }
    });

    const activePersona = voice.getCurrentPersona();
    let displayTag = activePersona.name;
    if (activePersona.ageGroup) {
      displayTag += ` (${activePersona.ageGroup})`;
    }
    if (currentVoiceNameBadge) currentVoiceNameBadge.textContent = displayTag;
    renderSidebarVoices();
  }

  function selectPersona(personaId) {
    voice.setPersona(personaId);
    renderVoicePersonaOptions();
    renderSidebarVoices();
  }

  function togglePreviewPersonaVoice(persona) {
    if (currentlyPreviewingId === persona.id && voice.isSpeaking) {
      voice.stopSpeaking();
      currentlyPreviewingId = null;
      setOrbState('idle');
      waveformContainer.classList.remove('active');
      renderVoicePersonaOptions();
      renderSidebarVoices();
      return;
    }

    voice.stopSpeaking();
    currentlyPreviewingId = persona.id;
    setOrbState('speaking');
    waveformContainer.classList.add('active');
    renderVoicePersonaOptions();
    renderSidebarVoices();

    voice.playVoiceSample(persona.id,
      () => {},
      () => {
        currentlyPreviewingId = null;
        setOrbState('idle');
        waveformContainer.classList.remove('active');
        renderVoicePersonaOptions();
        renderSidebarVoices();
      }
    );
  }

  function confirmDeleteClonedVoice(personaId) {
    const ok = window.confirm("Are you sure you want to remove your custom voice profile?");
    if (ok) {
      voice.stopSpeaking();
      voice.removePersona(personaId);
      renderVoicePersonaOptions();
    }
  }

  // ==================== VOICE STUDIO MODAL ====================
  function openVoiceStudioModal() {
    voiceStudio.currentSentenceIndex = 0;
    voiceStudio.recordedSamples = [];
    voiceStudio.detectedPitches = [];
    voiceStudio.recordingDurations = [];
    voiceStudio.lastRecordedBlob = null;
    voiceStudio.userPinnedGender = false;
    voiceStudio.selectedGender = 'kid';
    const kidBtn = genderPillGroup?.querySelector('[data-gender="kid"]');
    genderPillGroup?.querySelectorAll('.toggle-pill-btn').forEach(b => b.classList.toggle('active', b === kidBtn));
    if (studioActionButtonsRow) studioActionButtonsRow.style.display = 'none';
    renderStudioProgressDots();
    updateStudioSentenceUI();
    resetEqualizerBars();
    voiceStudioModalOverlay.classList.add('open');
  }

  function closeVoiceStudioModal() {
    voiceStudioModalOverlay.classList.remove('open');
    if (voiceStudio.isRecording) {
      voiceStudio.stopRecording();
    }
    voiceStudio.stopPlayback();
  }

  function renderStudioProgressDots() {
    if (!studioProgressDots) return;
    studioProgressDots.innerHTML = '';
    const activeList = voiceStudio.getActiveSentenceList();
    activeList.forEach((s, idx) => {
      const dot = document.createElement('div');
      dot.className = `studio-dot ${idx === voiceStudio.currentSentenceIndex ? 'active' : ''} ${idx < voiceStudio.currentSentenceIndex ? 'completed' : ''}`;
      studioProgressDots.appendChild(dot);
    });
  }

  function updateStudioSentenceUI() {
    const currentIdx = voiceStudio.currentSentenceIndex;
    const total = voiceStudio.getActiveSentenceList().length;
    sentenceIndexTag.textContent = `Sentence ${currentIdx + 1} of ${total}`;
    sentenceText.textContent = `"${voiceStudio.getCurrentSentence()}"`;
    studioStatusText.textContent = 'Tap the microphone button to record reading this sentence';
    recordSentenceBtn.classList.remove('recording');
    if (studioActionButtonsRow) studioActionButtonsRow.style.display = 'none';
    if (vuIndicatorBadge) {
      vuIndicatorBadge.className = 'vu-indicator-badge';
      vuIndicatorBadge.textContent = '⚪ Ready to Listen';
    }
    if (vuLevelText) vuLevelText.textContent = 'Audio Level: 0%';
    renderStudioProgressDots();
  }

  function resetEqualizerBars() {
    if (!liveEqContainer) return;
    const bars = liveEqContainer.querySelectorAll('.live-eq-bar');
    bars.forEach((bar, i) => {
      bar.style.height = `${8 + (i % 4) * 4}%`;
    });
  }

  function updateLiveEqualizer(bandHeights, overallVolume) {
    if (!liveEqContainer) return;
    const bars = liveEqContainer.querySelectorAll('.live-eq-bar');
    bars.forEach((bar, idx) => {
      if (bandHeights[idx] !== undefined) {
        bar.style.height = `${Math.min(100, Math.max(8, bandHeights[idx]))}%`;
      }
    });

    const displayVol = Math.max(overallVolume, Math.round(bandHeights.reduce((a, b) => a + b, 0) / 16));
    const estimatedDb = Math.max(12, Math.min(99, Math.round((displayVol / 100) * 58) + 12));

    if (vuLevelText) {
      vuLevelText.textContent = `Audio Level: ${displayVol}% (${estimatedDb} dB)`;
    }

    if (vuIndicatorBadge) {
      vuIndicatorBadge.style.color = '';
      if (displayVol >= 15) {
        vuIndicatorBadge.className = 'vu-indicator-badge green';
        vuIndicatorBadge.textContent = `🟢 Voice captured loud & clear! (${estimatedDb} dB)`;
      } else if (displayVol >= 6) {
        vuIndicatorBadge.className = 'vu-indicator-badge warning';
        vuIndicatorBadge.style.color = '#fde047';
        vuIndicatorBadge.textContent = `🟡 Hearing your voice (${displayVol}% level)... Speak clearly`;
      } else {
        vuIndicatorBadge.className = 'vu-indicator-badge';
        vuIndicatorBadge.style.color = 'var(--text-muted)';
        vuIndicatorBadge.textContent = '🔴 Listening for your microphone input...';
      }
    }
  }

  // Record Sentence Button Handler
  if (recordSentenceBtn) {
    recordSentenceBtn.addEventListener('click', async () => {
      if (!voiceStudio.isRecording) {
        const ok = await voiceStudio.startRecording((bandHeights, volume) => {
          updateLiveEqualizer(bandHeights, volume);
        });
        if (ok) {
          recordSentenceBtn.classList.add('recording');
          studioStatusText.textContent = '🔴 Recording... Speak the sentence above into your mic';
          if (studioActionButtonsRow) studioActionButtonsRow.style.display = 'none';
        }
      } else {
        recordSentenceBtn.classList.remove('recording');
        studioStatusText.textContent = '✅ Sound captured! Tap Play to check your voice sample';
        await voiceStudio.stopRecording();
        resetEqualizerBars();

        if (vuIndicatorBadge) {
          vuIndicatorBadge.className = 'vu-indicator-badge green';
          vuIndicatorBadge.textContent = '✨ Voice Sample Captured Successfully';
        }

        if (studioActionButtonsRow) {
          studioActionButtonsRow.style.display = 'flex';
        }
      }
    });
  }

  if (playSampleRecordingBtn) {
    playSampleRecordingBtn.addEventListener('click', () => {
      if (!isPlayingSample) {
        isPlayingSample = true;
        playSampleRecordingBtn.textContent = '⏹ Stop Playback';
        voiceStudio.playLastRecording(() => {
          isPlayingSample = false;
          playSampleRecordingBtn.textContent = '▶ Play My Recording';
        });
      } else {
        voiceStudio.stopPlayback();
        isPlayingSample = false;
        playSampleRecordingBtn.textContent = '▶ Play My Recording';
      }
    });
  }

  if (nextSentenceBtn) {
    nextSentenceBtn.addEventListener('click', () => {
      voiceStudio.stopPlayback();
      isPlayingSample = false;
      if (playSampleRecordingBtn) playSampleRecordingBtn.textContent = '▶ Play My Recording';

      const hasNext = voiceStudio.nextSentence();
      if (hasNext) {
        updateStudioSentenceUI();
      } else {
        studioStatusText.textContent = '✨ Calibrating fundamental frequency & synthesis timbre...';
        setTimeout(() => {
          voiceStudio.generateCalibratedVoiceProfile();
        }, 600);
      }
    });
  }

  if (genderPillGroup) {
    genderPillGroup.querySelectorAll('.toggle-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        genderPillGroup.querySelectorAll('.toggle-pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const selectedGender = btn.getAttribute('data-gender');
        voiceStudio.setGender(selectedGender);
      });
    });
  }

  if (modePillGroup) {
    modePillGroup.querySelectorAll('.toggle-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        modePillGroup.querySelectorAll('.toggle-pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const selectedMode = btn.getAttribute('data-mode');
        voiceStudio.setMode(selectedMode);
        updateStudioSentenceUI();
      });
    });
  }

  if (openVoiceStudioBtn) openVoiceStudioBtn.addEventListener('click', openVoiceStudioModal);
  if (closeVoiceStudioBtn) closeVoiceStudioBtn.addEventListener('click', closeVoiceStudioModal);

  if (openVoiceModalBtn) {
    openVoiceModalBtn.addEventListener('click', () => {
      renderVoicePersonaOptions();
      if (voiceModalOverlay) voiceModalOverlay.classList.add('open');
    });
  }

  if (closeVoiceModalBtn) {
    closeVoiceModalBtn.addEventListener('click', () => {
      voice.stopSpeaking();
      currentlyPreviewingId = null;
      if (voiceModalOverlay) voiceModalOverlay.classList.remove('open');
    });
  }

  if (speechRateSlider) {
    speechRateSlider.addEventListener('input', (e) => {
      voice.speechRate = parseFloat(e.target.value);
      if (rateValueDisplay) rateValueDisplay.textContent = `${voice.speechRate.toFixed(2)}x`;
      if (sidebarRateSlider) sidebarRateSlider.value = voice.speechRate;
      if (sidebarRateDisplay) sidebarRateDisplay.textContent = `${voice.speechRate.toFixed(2)}x`;
    });
  }

  if (speechPitchSlider) {
    speechPitchSlider.addEventListener('input', (e) => {
      voice.speechPitch = parseFloat(e.target.value);
      if (pitchValueDisplay) pitchValueDisplay.textContent = `${voice.speechPitch.toFixed(2)}x`;
      if (sidebarPitchSlider) sidebarPitchSlider.value = voice.speechPitch;
      if (sidebarPitchDisplay) sidebarPitchDisplay.textContent = `${voice.speechPitch.toFixed(2)}x`;
    });
  }

  // ==================== PHOTO ATTACHMENT (+) ====================
  if (attachPhotoBtn && photoFileInput) {
    attachPhotoBtn.addEventListener('click', () => {
      photoFileInput.click();
    });

    photoFileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        currentAttachedImage = loadEvt.target.result;
        if (previewThumbnailImg) previewThumbnailImg.src = currentAttachedImage;
        if (imagePreviewBar) imagePreviewBar.style.display = 'flex';
        chatInput.focus();
      };
      reader.readAsDataURL(file);
    });
  }

  if (removePhotoBtn) {
    removePhotoBtn.addEventListener('click', () => {
      currentAttachedImage = null;
      if (photoFileInput) photoFileInput.value = '';
      if (imagePreviewBar) imagePreviewBar.style.display = 'none';
      if (previewThumbnailImg) previewThumbnailImg.src = '';
    });
  }

  // Orb Visual States
  function setOrbState(state) {
    if (!copilotOrbContainer || !micBtn) return;
    copilotOrbContainer.classList.remove('listening', 'speaking');
    if (state === 'listening') {
      copilotOrbContainer.classList.add('listening');
      micBtn.classList.add('active');
    } else if (state === 'speaking') {
      copilotOrbContainer.classList.add('speaking');
      micBtn.classList.remove('active');
    } else {
      micBtn.classList.remove('active');
    }
  }

  // Send Message and Handle Agent Execution
  async function handleSend(text) {
    const query = (text || chatInput.value || '').trim();
    const attachedImg = currentAttachedImage;

    if (!query && !attachedImg) return;

    if (!hasUserInteracted) {
      hasUserInteracted = true;
      heroStage.style.display = 'none';
      chatViewport.style.display = 'flex';
    }

    appendMessage({
      sender: 'user',
      text: query || (attachedImg ? '📷 [Attached Photo for Analysis]' : ''),
      image: attachedImg
    });

    // Clear inputs and attached photo
    chatInput.value = '';
    currentAttachedImage = null;
    if (photoFileInput) photoFileInput.value = '';
    if (imagePreviewBar) imagePreviewBar.style.display = 'none';
    if (previewThumbnailImg) previewThumbnailImg.src = '';

    sendBtn.disabled = true;

    // Process Query with Agent Engine
    const response = await agent.processQuery(query, { image: attachedImg });

    // Autonomous Question Capture & Self-Evolution Cycle
    if (typeof autonomousLearner !== 'undefined' && autonomousLearner) {
      autonomousLearner.captureQuestion(query || 'Visual Image Analysis', response);
    }

    if (response.languageChanged) {
      const cfg = window.KIDS_LANGUAGES[response.languageChanged];
      if (cfg) {
        if (currentLangFlag) currentLangFlag.textContent = cfg.flag;
        if (currentLangName) currentLangName.textContent = cfg.name;
        updatePromptsForLanguage(cfg);
        renderLanguageOptions();
        renderSidebarLanguages();
      }
    }

    if (response.triggerAction === 'open_voice_studio') {
      openVoiceStudioModal();
    }

    appendMessage({
      sender: 'agent',
      text: response.text,
      spokenText: response.spokenText,
      widgetHtml: response.widgetHtml,
      query: query
    });

    // Gamification Reward: Award star for learning questions
    if (response.widgetHtml || response.text.length > 50 || attachedImg) {
      awardStars(1);
    }

    sendBtn.disabled = false;

    // Voice Feedback (TTS)
    if (response.spokenText) {
      setOrbState('speaking');
      waveformContainer.classList.add('active');
      voice.speak(
        response.spokenText,
        () => {
          setOrbState('speaking');
        },
        () => {
          setOrbState('idle');
          waveformContainer.classList.remove('active');
        }
      );
    }
  }

  // Append Message to UI
  function appendMessage({ sender, text, spokenText, widgetHtml, query = '', image = null }) {
    const msgEl = document.createElement('div');
    msgEl.className = `chat-message ${sender}`;

    const now = new Date();
    const timeStr = `${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;

    if (sender === 'user') {
      const imgHtml = image ? `
        <div style="margin-bottom:0.5rem; border-radius:12px; overflow:hidden; max-width:240px; border:2px solid rgba(255,255,255,0.2);">
          <img src="${image}" alt="Attached photo" style="width:100%; height:auto; display:block; border-radius:10px;">
        </div>
      ` : '';

      msgEl.innerHTML = `
        <div class="avatar user-avatar">You</div>
        <div class="message-bubble">
          ${imgHtml}
          <div>${escapeHtml(text)}</div>
          <div class="message-bubble-time">${timeStr}</div>
        </div>
      `;
    } else {
      const activePersona = voice.getCurrentPersona();
      const currentLang = voice.getLanguageConfig();
      const replayHtml = spokenText ? `
        <button class="voice-replay-btn" data-spoken="${escapeHtml(spokenText)}">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
          Replay
        </button>
      ` : '';

      msgEl.innerHTML = `
        <div class="avatar agent-avatar">
          <span style="font-size:1.2rem;">${activePersona.avatarText}</span>
        </div>
        <div class="message-bubble">
          <div style="font-size:0.75rem; color:#818cf8; margin-bottom:0.3rem; font-weight:600;">
            ${activePersona.name} • ${currentLang.flag} ${currentLang.name}
          </div>
          <div>${formatMarkdown(text)}</div>
          ${widgetHtml ? widgetHtml : ''}
          <div class="feedback-action-bar">
            <button class="feedback-chip-btn like-feedback-btn" title="Great Answer!">
              <span>👍</span> Helpful
            </button>
            <button class="feedback-chip-btn teach-feedback-btn" title="Teach Copilot or Improve Answer">
              <span>💡</span> Teach AI
            </button>
          </div>
          <div class="message-bubble-time">
            ${timeStr} ${replayHtml}
          </div>
        </div>
      `;

      const likeBtn = msgEl.querySelector('.like-feedback-btn');
      if (likeBtn) {
        likeBtn.addEventListener('click', () => {
          likeBtn.classList.toggle('active');
          awardStars(1);
          autonomousLearner.recordFeedback(query || text, true);
        });
      }

      const teachBtn = msgEl.querySelector('.teach-feedback-btn');
      if (teachBtn) {
        teachBtn.addEventListener('click', () => {
          openEvolutionModal(query || '');
        });
      }

      const replayBtn = msgEl.querySelector('.voice-replay-btn');
      if (replayBtn) {
        replayBtn.addEventListener('click', () => {
          if (voice.isSpeaking) {
            voice.stopSpeaking();
            setOrbState('idle');
            waveformContainer.classList.remove('active');
            return;
          }
          setOrbState('speaking');
          waveformContainer.classList.add('active');
          voice.speak(
            spokenText,
            () => setOrbState('speaking'),
            () => {
              setOrbState('idle');
              waveformContainer.classList.remove('active');
            }
          );
        });
      }
    }

    chatViewport.appendChild(msgEl);
    chatViewport.scrollTop = chatViewport.scrollHeight;
  }

  // Reset Listening UI
  function resetListeningUi() {
    voice.stopListening();
    setOrbState('idle');
    waveformContainer.classList.remove('active');
    liveTranscript?.classList.remove('active');
    inputContainer?.classList.remove('listening');
    chatInput.placeholder = 'Ask a story, math question, science fact, or speak...';
    waveformContainer?.querySelectorAll('.waveform-bar').forEach((bar) => {
      bar.style.height = '8px';
      bar.style.opacity = '0.6';
    });
  }

  // Speech Recognition (Voice Input)
  function toggleListening() {
    if (voice.isListening) {
      const pendingText = chatInput.value.trim();
      resetListeningUi();
      if (pendingText) {
        handleSend(pendingText);
      }
    } else {
      setOrbState('listening');
      waveformContainer.classList.add('active');
      liveTranscript?.classList.add('active');
      inputContainer?.classList.add('listening');
      if (liveTranscriptText) liveTranscriptText.textContent = 'Listening for your voice...';

      voice.startListening({
        onStart: () => {
          setOrbState('listening');
          waveformContainer.classList.add('active');
          liveTranscript?.classList.add('active');
          inputContainer?.classList.add('listening');
          chatInput.placeholder = 'Listening... speak naturally';
          chatInput.focus();
        },
        onAudioLevel: (level, bands) => {
          if (!waveformContainer) return;
          const bars = waveformContainer.querySelectorAll('.waveform-bar');
          bars.forEach((bar, idx) => {
            const bandLevel = bands?.[idx] ?? level;
            const barHeight = Math.min(34, Math.max(6, Math.round((bandLevel / 100) * 32) + 4));
            bar.style.height = `${barHeight}px`;
            bar.style.opacity = bandLevel > 6 ? '1' : '0.45';
            bar.style.filter = `brightness(${Math.min(1.8, 1 + bandLevel / 80)})`;
          });

          if (level > 10) {
            if (liveTranscriptText && !chatInput.value) {
              liveTranscriptText.textContent = `🟢 Hearing sound (${level}% volume)... speak now`;
            }
          }
        },
        onResult: ({ final, interim }) => {
          const liveText = (interim || final || '').trim();
          if (liveText) {
            chatInput.value = liveText;
            if (liveTranscriptText) liveTranscriptText.textContent = liveText;
            chatInput.focus();
            chatInput.setSelectionRange(chatInput.value.length, chatInput.value.length);
          }

          if (final) {
            resetListeningUi();
            handleSend(final);
          }
        },
        onError: (err) => {
          console.warn('Voice recognition note:', err);
          if (liveTranscriptText && !chatInput.value) {
            liveTranscriptText.textContent = '🎙️ Microphone listening. Speak into your mic or type...';
          }
        },
        onEnd: () => {
          if (!voice.isListening) {
            resetListeningUi();
          }
        }
      });
    }
  }

  // Event Listeners
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      if (voice.isListening) {
        voice.stopListening();
        resetListeningUi();
      }
      handleSend();
    });
  }

  if (micBtn) micBtn.addEventListener('click', toggleListening);
  if (copilotOrbContainer) copilotOrbContainer.addEventListener('click', toggleListening);

  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (voice.isListening) {
          voice.stopListening();
          resetListeningUi();
        }
        handleSend();
      }
    });
  }

  // Reset Chat button
  const resetChatBtn = document.getElementById('resetChatBtn');
  if (resetChatBtn) {
    resetChatBtn.addEventListener('click', () => {
      if (voice.isSpeaking) voice.stopSpeaking();
      if (voice.isListening) {
        voice.stopListening();
        resetListeningUi();
      }
      chatViewport.innerHTML = '';
      heroStage.style.display = 'flex';
      chatViewport.style.display = 'none';
      if (quickPromptsContainer) quickPromptsContainer.style.display = 'flex';
      setOrbState('idle');
      waveformContainer.classList.remove('active');
    });
  }

  // Prompt suggestion chips
  document.querySelectorAll('.prompt-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt') || chip.textContent.trim();
      handleSend(prompt);
    });
  });

  // Discovery Hub Cards (Space, Math Gym, Science, Story, Riddles, Languages)
  document.querySelectorAll('.discovery-card').forEach(card => {
    card.addEventListener('click', () => {
      const prompt = card.getAttribute('data-prompt');
      if (prompt) {
        handleSend(prompt);
      }
    });
  });

  // Star Rewards Gamification System
  const starCountDisplay = document.getElementById('starCountDisplay');
  const starBadgeBtn = document.getElementById('starBadgeBtn');
  let currentStars = parseInt(localStorage.getItem('kids_copilot_stars') || '0', 10);
  if (starCountDisplay) starCountDisplay.textContent = currentStars;

  function awardStars(amount = 1) {
    currentStars += amount;
    localStorage.setItem('kids_copilot_stars', currentStars);
    if (starCountDisplay) {
      starCountDisplay.textContent = currentStars;
      starCountDisplay.parentElement.classList.add('star-bump');
      setTimeout(() => starCountDisplay.parentElement?.classList.remove('star-bump'), 600);
    }
    playCelebrationChime();
  }

  if (starBadgeBtn) {
    starBadgeBtn.addEventListener('click', () => {
      const badgeTitle = currentStars >= 20 ? "👑 Grand AI Master" :
                         currentStars >= 10 ? "🏆 Super Explorer" :
                         currentStars >= 5  ? "🌟 Curious Learner" : "🌱 Junior Star";
      appendMessage({
        sender: 'agent',
        text: `⭐ **Your Star Achievements** ⭐\n\n- **Total Stars**: **${currentStars} Stars** 🌟\n- **Current Rank**: **${badgeTitle}** 🏅\n\nKeep asking questions about space, solving math puzzles, and exploring stories to earn more stars!`,
        spokenText: `You have earned ${currentStars} stars! Your rank is ${badgeTitle}!`
      });
    });
  }

  // Web Audio API Gentle Star Chime Sound
  function playCelebrationChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.09);
        gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.09 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.09);
        osc.stop(ctx.currentTime + idx * 0.09 + 0.3);
      });
    } catch (err) {}
  }

  // Helper text formatters
  function escapeHtml(str) {
    return (str || '').replace(/[&<>"']/g, (m) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m]));
  }

  function formatMarkdown(text) {
    let formatted = escapeHtml(text);
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
    formatted = formatted.replace(/\n/g, '<br>');
    return formatted;
  }

  // ==================== AUTONOMOUS AI EVOLUTION HUB CONTROLLERS ====================
  const evolutionModalOverlay = document.getElementById('evolutionModalOverlay');
  const openEvolutionModalBtn = document.getElementById('openEvolutionModalBtn');
  const closeEvolutionModalBtn = document.getElementById('closeEvolutionModalBtn');
  const teachQuestionInput = document.getElementById('teachQuestionInput');
  const teachAnswerInput = document.getElementById('teachAnswerInput');
  const teachSubmitBtn = document.getElementById('teachSubmitBtn');
  const refreshEvolutionBtn = document.getElementById('refreshEvolutionBtn');
  const learnedKnowledgeList = document.getElementById('learnedKnowledgeList');
  const metricCapturedCount = document.getElementById('metricCapturedCount');
  const metricSynthesizedCount = document.getElementById('metricSynthesizedCount');
  const metricCyclesCount = document.getElementById('metricCyclesCount');
  const metricRebuildTime = document.getElementById('metricRebuildTime');
  const learnedBankCount = document.getElementById('learnedBankCount');

  function openEvolutionModal(prefillQuestion = '') {
    if (!evolutionModalOverlay) return;
    renderEvolutionMetrics();
    if (prefillQuestion && teachQuestionInput) {
      teachQuestionInput.value = prefillQuestion;
      teachAnswerInput?.focus();
    }
    evolutionModalOverlay.classList.add('open');
  }

  function closeEvolutionModal() {
    if (evolutionModalOverlay) evolutionModalOverlay.classList.remove('open');
  }

  function renderEvolutionMetrics() {
    if (!autonomousLearner) return;
    const metrics = autonomousLearner.getEvolutionMetrics();

    if (metricCapturedCount) metricCapturedCount.textContent = metrics.totalQuestionsCaptured;
    if (metricSynthesizedCount) metricSynthesizedCount.textContent = metrics.totalAutoSynthesized;
    if (metricCyclesCount) metricCyclesCount.textContent = metrics.evolutionCycles;
    if (metricRebuildTime) metricRebuildTime.textContent = metrics.lastRebuildTime || 'Now';
    if (learnedBankCount) learnedBankCount.textContent = metrics.totalLearnedInBank;

    if (learnedKnowledgeList) {
      learnedKnowledgeList.innerHTML = '';
      metrics.learnedItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'learned-knowledge-item';
        div.innerHTML = `
          <div class="learned-item-title">
            <span>✨ ${escapeHtml(item.entity || item.queryPattern)}</span>
            <span style="font-size:0.68rem; color:#86efac; font-weight:600;">✓ Verified</span>
          </div>
          <div class="learned-item-desc">${escapeHtml(item.summary)}</div>
          <div style="font-size:0.7rem; color:#94a3b8; margin-top:0.2rem;">
            💡 <em>${escapeHtml(item.analogy || '')}</em>
          </div>
        `;
        learnedKnowledgeList.appendChild(div);
      });
    }
  }

  if (openEvolutionModalBtn) openEvolutionModalBtn.addEventListener('click', () => openEvolutionModal());
  if (closeEvolutionModalBtn) closeEvolutionModalBtn.addEventListener('click', closeEvolutionModal);
  if (refreshEvolutionBtn) refreshEvolutionBtn.addEventListener('click', renderEvolutionMetrics);

  if (teachSubmitBtn) {
    teachSubmitBtn.addEventListener('click', () => {
      const q = (teachQuestionInput?.value || '').trim();
      const a = (teachAnswerInput?.value || '').trim();
      if (!q || !a) {
        alert('Please enter both a question and a kid-friendly explanation!');
        return;
      }

      teachSubmitBtn.disabled = true;
      teachSubmitBtn.textContent = '⏳ Synthesizing & Burning Knowledge...';

      setTimeout(() => {
        autonomousLearner.teachNewConcept(q, a);
        renderEvolutionMetrics();
        awardStars(2);
        teachQuestionInput.value = '';
        teachAnswerInput.value = '';
        teachSubmitBtn.disabled = false;
        teachSubmitBtn.textContent = '⚡ Synthesize & Rebuild AI Knowledge Graph';
        closeEvolutionModal();

        appendMessage({
          sender: 'agent',
          text: `🎉 **AI Knowledge Graph Rebuilt Successfully!**\n\nI have autonomously synthesized **"${q}"** and embedded it into my active neural reasoning engine! Test asking me now!`,
          spokenText: `I have learned your new concept and updated my knowledge graph!`
        });
      }, 500);
    });
  }

  // Initial renders
  renderVoicePersonaOptions();
  renderSidebarVoices();
  renderSidebarLanguages();
  renderLanguageOptions();
  renderEvolutionMetrics();
});
