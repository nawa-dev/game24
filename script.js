// --- Background Particle Animation ---
const canvas = document.getElementById("particles-js");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.fill();
  }
  update() {
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}

function initParticles() {
  particlesArray = [];
  let numberOfParticles = (canvas.height * canvas.width) / 9000;
  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * 3 + 1;
    let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
    let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
    let directionX = Math.random() * 1.5 - 0.75;
    let directionY = Math.random() * 1.5 - 0.75;
    let color = Math.random() > 0.5 ? "#00ffff" : "#ff00cc";
    particlesArray.push(
      new Particle(x, y, directionX, directionY, size, color)
    );
  }
}

function animateParticles() {
  requestAnimationFrame(animateParticles);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
}
initParticles();
animateParticles();

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

// --- Game Logic ---
function toggleSettings() {
  const panel = document.getElementById("settings-panel");
  panel.style.display = panel.style.display === "block" ? "none" : "block";
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
}

function switchTab(event, tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  document.getElementById('tab-' + tabId).style.display = 'block';
  event.target.classList.add('active');
}

// --- Audio System ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let bgmVol = parseFloat(localStorage.getItem('game24_bgm_vol') || '0.5');
let sfxVol = parseFloat(localStorage.getItem('game24_sfx_vol') || '0.5');

document.addEventListener('click', function initAutoplay() {
  const bgm = document.getElementById('audio-bgm');
  if (bgm && bgm.paused && bgmVol > 0) {
    bgm.volume = bgmVol;
    bgm.play().catch(e => {});
  }
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  document.removeEventListener('click', initAutoplay);
}, { once: true });

// --- Cache System ---
function saveGameState(nums, target, solution) {
  const state = { nums, target, solution };
  localStorage.setItem('game24_gamestate', JSON.stringify(state));
}

function saveSettingsState() {
  const count = document.getElementById("count").value;
  const digits = document.getElementById("digits").value;
  const ops = getSelectedOps();
  const state = { count, digits, ops };
  localStorage.setItem('game24_settings', JSON.stringify(state));
}

function loadCache() {
  const settingsStr = localStorage.getItem('game24_settings');
  if (settingsStr) {
    try {
      const settings = JSON.parse(settingsStr);
      if (settings.count) document.getElementById("count").value = settings.count;
      if (settings.digits) document.getElementById("digits").value = settings.digits;
      if (settings.ops) {
        document.querySelectorAll(".ops input").forEach(cb => {
          cb.checked = settings.ops.includes(cb.value);
        });
      }
    } catch(e) {}
  }
  
  const gameStr = localStorage.getItem('game24_gamestate');
  if (gameStr) {
    try {
      const state = JSON.parse(gameStr);
      if (state.nums && state.target) {
        window._lastSolution = state.solution;
        const targetEl = document.getElementById("answer");
        targetEl.innerText = state.target;
        targetEl.style.color = "#00ff00";
        targetEl.style.textShadow = "0 0 15px #00ff00, 0 0 30px #00ff00";
        const container = document.getElementById("slots");
        container.innerHTML = "";
        state.nums.forEach(num => {
          let el = document.createElement("div");
          el.className = "slot";
          el.innerText = num;
          container.appendChild(el);
        });
      }
    } catch(e) {}
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const volBgmSlider = document.getElementById('vol-bgm');
  const volSfxSlider = document.getElementById('vol-sfx');
  const bgmAudio = document.getElementById('audio-bgm');

  if (volBgmSlider) {
    volBgmSlider.value = bgmVol;
    document.getElementById('vol-bgm-text').innerText = Math.round(bgmVol * 100) + '%';
  }
  if (volSfxSlider) {
    volSfxSlider.value = sfxVol;
    document.getElementById('vol-sfx-text').innerText = Math.round(sfxVol * 100) + '%';
  }
  if (bgmAudio) bgmAudio.volume = bgmVol;
  
  loadCache();
  
  ['count', 'digits'].forEach(id => {
    let el = document.getElementById(id);
    if(el) el.addEventListener("change", saveSettingsState);
  });
  document.querySelectorAll(".ops input").forEach(cb => {
    cb.addEventListener("change", saveSettingsState);
  });
});

function updateVolBGM() {
  bgmVol = parseFloat(document.getElementById('vol-bgm').value);
  localStorage.setItem('game24_bgm_vol', bgmVol);
  const bgm = document.getElementById('audio-bgm');
  if (bgm) {
    bgm.volume = bgmVol;
    if (bgmVol === 0) {
      bgm.pause();
    } else if (bgm.paused && audioCtx.state !== 'suspended') {
      bgm.play().catch(e => {});
    }
  }
  document.getElementById('vol-bgm-text').innerText = Math.round(bgmVol * 100) + '%';
}

function updateVolSFX() {
  sfxVol = parseFloat(document.getElementById('vol-sfx').value);
  localStorage.setItem('game24_sfx_vol', sfxVol);
  document.getElementById('vol-sfx-text').innerText = Math.round(sfxVol * 100) + '%';
}

function playBeep(freq = 440, type = 'sine', duration = 0.1) {
  if (sfxVol === 0) return;
  if(audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  gain.gain.setValueAtTime(0.1 * sfxVol, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

function playWinSound() {
  if (sfxVol === 0) return;
  if(audioCtx.state === 'suspended') audioCtx.resume();
  let t = audioCtx.currentTime;
  [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, t + idx * 0.1);
    gain.gain.setValueAtTime(0, t + idx * 0.1);
    gain.gain.linearRampToValueAtTime(0.1 * sfxVol, t + idx * 0.1 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.1 + 0.2);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(t + idx * 0.1);
    osc.stop(t + idx * 0.1 + 0.2);
  });
}

function randomNums(n) {
  let arr = [];
  for (let i = 0; i < n; i++) arr.push(Math.floor(Math.random() * 9) + 1);
  return arr;
}

function getSelectedOps() {
  let checkboxes = document.querySelectorAll(".ops input:checked");
  return Array.from(checkboxes).map((cb) => cb.value);
}

function applyOp(a, b, op) {
  if (op === "+") return a + b;
  if (op === "-") return a - b;
  if (op === "*") return a * b;
  if (op === "/") return b !== 0 ? a / b : null;
  if (op === "^") return Math.pow(a, b);
  return null;
}

function solveExact(nums, target) {
  let opsSelected = getSelectedOps();
  let initialArr = nums.map((n) => ({ val: n, expr: String(n) }));

  function helper(arr) {
    if (arr.length === 1) {
      if (Math.abs(arr[0].val - target) < 1e-6) return arr[0].expr;
      return null;
    }
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (i === j) continue;
        let rest = [];
        for (let k = 0; k < arr.length; k++)
          if (k !== i && k !== j) rest.push(arr[k]);

        for (let op of opsSelected) {
          if (
            op === "^" &&
            (Math.abs(arr[i].val) > 20 || Math.abs(arr[j].val) > 10)
          )
            continue;

          let r = applyOp(arr[i].val, arr[j].val, op);
          if (r === null || !isFinite(r) || isNaN(r)) continue;

          let next = rest.concat([
            { val: r, expr: `(${arr[i].expr} ${op} ${arr[j].expr})` },
          ]);
          let res = helper(next);
          if (res !== null) return res;
        }
      }
    }
    return null;
  }
  return helper(initialArr);
}

async function spinSlots(nums, targetNumber) {
  const container = document.getElementById("slots");
  const targetEl = document.getElementById("answer");
  container.innerHTML = "";

  let slotElements = [];
  for (let i = 0; i < nums.length; i++) {
    let el = document.createElement("div");
    el.className = "slot rolling";
    el.innerText = Math.floor(Math.random() * 9) + 1;
    container.appendChild(el);
    slotElements.push(el);
  }

  const intervalTime = 40;
  const baseSteps = 15;
  const staggerSteps = 10;
  const maxSteps = baseSteps + (nums.length - 1) * staggerSteps;
  const targetStopStep = maxSteps - 5;

  return new Promise((resolve) => {
    let currentStep = 0;

    let timer = setInterval(() => {
      currentStep++;
      if (currentStep % 2 === 0) playBeep(800 + Math.random()*200, 'square', 0.05);

      if (currentStep < targetStopStep) {
        targetEl.innerText = Math.floor(Math.random() * 90) + 10;
        targetEl.style.filter = "blur(1.5px)";
        targetEl.style.color = "#555";
        targetEl.style.textShadow = "none";
      } else if (currentStep === targetStopStep) {
        targetEl.innerText = targetNumber;
        targetEl.style.filter = "none";
        targetEl.style.color = "#00ff00";
        targetEl.style.textShadow = "0 0 15px #00ff00, 0 0 30px #00ff00";
        targetEl.style.transform = "scale(1.3)";
        setTimeout(() => (targetEl.style.transform = "scale(1)"), 150);
      }

      slotElements.forEach((el, index) => {
        const stopStep = baseSteps + index * staggerSteps;

        if (currentStep < stopStep) {
          el.innerText = Math.floor(Math.random() * 9) + 1;
        } else if (currentStep === stopStep) {
          el.innerText = nums[index];
          el.classList.remove("rolling");
          el.style.transform = "scale(1.2)";
          el.style.boxShadow =
            "0 0 20px #ffcc00, inset 0 5px 15px rgba(0,0,0,0.6)";

          setTimeout(() => {
            el.style.transform = "scale(1)";
            el.style.boxShadow =
              "inset 0 5px 15px rgba(0,0,0,0.6), 0 0 10px #ffcc00";
          }, 150);
        }
      });

      if (currentStep >= maxSteps) {
        clearInterval(timer);
        resolve();
      }
    }, intervalTime);
  });
}

async function generate() {
  const btnGen = document.getElementById("btn-generate");
  const btnSol = document.getElementById("btn-solution");

  window._lastSolution = null;
  let count = parseInt(document.getElementById("count").value);
  let digits = parseInt(document.getElementById("digits").value);
  let opsSelected = getSelectedOps();

  if (opsSelected.length === 0) {
    alert(typeof t === 'function' ? t('alert_no_ops') : "กรุณาเลือกอย่างน้อย 1 เครื่องหมาย");
    return;
  }

  let min = Math.pow(10, digits - 1);
  let max = Math.pow(10, digits) - 1;
  let target = Math.floor(Math.random() * (max - min + 1)) + min;

  let nums, solution;
  let attempts = 0;

  btnGen.disabled = true;
  btnSol.disabled = true;
  document.getElementById("answer").innerText = typeof t === 'function' ? t('msg_calculating') : "...";

  do {
    if (attempts > 3000) {
      alert(
        typeof t === 'function' ? t('alert_no_solution') : "ไม่พบโจทย์ที่เหมาะสม กรุณากดสุ่มใหม่อีกครั้ง หรือปรับลดเงื่อนไขความยาก",
      );
      btnGen.disabled = false;
      btnSol.disabled = false;
      document.getElementById("answer").innerText = typeof t === 'function' ? t('msg_unknown') : "?";
      return;
    }
    if (attempts % 20 === 0) {
      target = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    nums = randomNums(count);
    solution = solveExact(nums, target);
    attempts++;
  } while (solution === null);

  window._lastSolution = solution;
  saveGameState(nums, target, solution);

  await spinSlots(nums, target);

  btnGen.disabled = false;
  btnSol.disabled = false;
}

// ===== Tests =====
function runTests() {
  console.log("Running tests...");
  console.assert(randomNums(5).length === 5, "randomNums failed");
  let ops = getSelectedOps();
  console.assert(Array.isArray(ops), "getSelectedOps failed");
  console.assert(applyOp(2, 3, "+") === 5, "applyOp + failed");
  console.assert(applyOp(2, 3, "*") === 6, "applyOp * failed");
  console.log("Tests done");
}
runTests();

// --- I18n Logic ---
let translations = {};
let currentLang = localStorage.getItem('game24_lang') || 'th';

async function initI18n() {
  try {
    const res = await fetch('lang.json');
    if (!res.ok) throw new Error("HTTP error " + res.status);
    const data = await res.json();
    translations = data;
    
    const langSelect = document.getElementById('lang');
    if (langSelect) {
      langSelect.value = currentLang;
      langSelect.addEventListener('change', (e) => {
        currentLang = e.target.value;
        localStorage.setItem('game24_lang', currentLang);
        updateUI();
      });
    }
    
    updateUI();
  } catch (err) {
    console.error("Failed to load lang.json (May require local web server):", err);
  }
}

function t(key) {
  if (!translations[currentLang]) return "...";
  return translations[currentLang][key] || key;
}

function updateUI() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      el.innerText = t(key);
    }
  });
  
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    const attrMappings = el.getAttribute('data-i18n-attr').split(';');
    attrMappings.forEach(mapping => {
      const [attr, key] = mapping.split(':');
      if (attr && key) {
        el.setAttribute(attr, t(key));
      }
    });
  });
}

initI18n();

function closeModal() {
  document.getElementById("solution-modal").style.display = "none";
}

function showSolution() {
  if (
    window._lastSolution === null ||
    window._lastSolution === undefined
  ) {
    const msg = typeof t === 'function' ? t('msg_no_solution_yet') : "ยังไม่มีเฉลย กรุณาสุ่มก่อน";
    document.getElementById("modal-text").innerHTML =
      `<span style="color:#ffaa00; font-size:20px;">${msg}</span>`;
    document.getElementById("solution-modal").style.display = "flex";
  } else {
    playWinSound();
    if (typeof confetti === "function") {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#00ffff", "#ff00cc", "#ffcc00", "#00ff00"],
        zIndex: 200,
      });
    }
    let answer = document.getElementById("answer").innerText;
    document.getElementById("modal-text").innerHTML =
      window._lastSolution + "<br>= " + answer;
    document.getElementById("solution-modal").style.display = "flex";
  }
}
