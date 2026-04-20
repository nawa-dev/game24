# 🎯 Game 24 (เกม 24) - Arcade Edition
**Comprehensive System Documentation**

[English](#english) | [ภาษาไทย](#ภาษาไทย)

---

## English

### 1. System Overview
**Game 24: Arcade Edition** is a modern, offline-capable, web-based mathematics puzzle game. The objective is to utilize 4 or 5 given random numbers and selected mathematical operators to match a randomly generated target. The UI features a cyberpunk/arcade aesthetic alongside interactive animations and synthesized audio.

### 2. Architecture & Tech Stack
The project is built symmetrically without large external frameworks. It heavily relies on Vanilla Javascript, HTML5, and CSS3. 
- **Core Engine:** Vanilla JavaScript (`script.js`) 
- **Visuals:** HTML5 Canvas (Particle Background), CSS3 Keyframes & Flexbox
- **Offline Support:** Localized Google Fonts (`Mitr`) and standalone Javascript plugins (`canvas-confetti`).
- **Data Persistence:** Browser `LocalStorage`
- **Audio:** Web Audio API (Synthesizer) & HTML5 `<audio>` tag.

### 3. Core Modules & Algorithms

#### 3.1 Mathematical Engine (`solveExact`)
The brain of the game is a recursive backtracking algorithm that attempts to calculate every possible combination of operators and numbers to find a valid mathematical expression that equals the generated `target`.
- **Logic:** It pairs up numbers, applies valid operators chosen by the user (`+`, `-`, `*`, `/`, `^`), and stores the resulting branch as a new leaf.
- **Fail-Safe:** To prevent infinite loops or unsolvable cases, an iteration cap is implemented. The system will repeatedly regenerate target numbers and sequences under the hood until a mathematically solvable outcome is guaranteed before presenting it to the user.

#### 3.2 Visual & Animation Engine
- **Slot Machine Effect:** Simulated using pure JavaScript `setInterval` coupled with CSS `filter: blur()`. The numbers "spin" by rapidly updating their inner text while blurred, halting sequentially based on a dynamic time stagger.
- **Canvas Particles (`particles-js`):** A custom-built Class-based background engine that computes 2D coordinates, sizes, and velocity trajectories of nodes mapped against the window dimension, rendering dynamically at 60fps via `requestAnimationFrame`.

#### 3.3 State Management & Cache System 
To offer a robust user experience, the system utilizes `LocalStorage` to save persistent states.
- **Settings Store (`game24_settings`):** Watches DOM `change` events on operator bindings, digit counts, and number counts.
- **Game State (`game24_gamestate`):** The moment a puzzle is validated, the array of `nums`, `target`, and algebraic `solution` are cached. Refreshing the browser invokes a state rehydration sequence that injects the puzzle exactly as the user left it.

#### 3.4 Audio Synthesizer (Web Audio API)
Instead of utilizing external `.mp3` files for sound effects, the system utilizes the native browser oscillator API (`AudioContext`).
- **Spin Beep:** Fires a high-frequency `square` wave algorithm with random modulation per frame sync during the slot roll.
- **Win Chords:** Triggers a multi-layered harmonic chord (using distinct frequencies: 523.25, 659.25, 783.99, 1046.50) using `gain.exponentialRampToValueAtTime()` for a retro 8-bit aesthetic.

#### 3.5 Internationalization (i18n)
- Operated by a dynamic `fetch()` request targeting `lang.json`.
- UI text nodes and attributes utilize the `data-i18n` and `data-i18n-attr` dataset maps. Switching languages re-renders the DOM elements selectively.

#### 3.6 Offline Capability
All necessary dependencies, including fonts (Mitr Regular/SemiBold) and the confetti library, have been hard-copied natively into the repository layout. The module handles CORS locally when driven through a local standard web server.

### 4. Running Locally
Simply serve the root directory through any basic HTTP server:
```bash
# Using Node.js
npx serve .

# Using Python
python -m http.server 3000
```


---


## ภาษาไทย

### 1. ข้อมูลระบบภาพรวม (System Overview)
**Game 24: Arcade Edition** เป็นระบบเกมคณิตศาสตร์บนเว็บที่จำลองบรรยากาศตู้เกมสมัยก่อน ผู้เล่นต้องนำตัวเลขที่สุ่มได้ตามจำนวนที่ตั้งค่าไว้ (เป้าหมาย 4-5 ตัวเลข) มาคำนวณทางคณิตศาสตร์ให้ตรงกับผลลัพธ์ โดยระบบทำงานแบบ **Standalone Offline** รองรับได้ทุกหน้าจอและฟังก์ชันทั้งหมดจัดการผ่าน Vanilla JavaScript โดยตรงครับ

### 2. เทคโนโลยีที่ใช้ (Architecture & Tech Stack)
- **ประมวลผลหลัก (Core):** `script.js` (Vanilla JS) จัดการลอจิก, อัลกอริทึม, และอินเตอร์แอคชันของหน้าต่าง
- **การจัดแต่งและการแสดงผล (UI):** `index.html`, `style.css` ใช้งาน Flexbox และ CSS Keyframes เพื่อออกแบบ UI ไหลลื่นแบบ Responsive
- **กราฟิกพื้นหลัง (Graphics):** ดึงพลังของ `HTML5 Canvas API` มาวาดเศษฝุ่นนีออนพิกเซลกระจายบนฉากหลัง
- **ฐานข้อมูลในเครื่อง (Data Persistence):** `LocalStorage` ของเบราว์เซอร์
- **ระบบเสียง:** `Web Audio API` (สังเคราะห์เสียงแบบอิเล็กทรอนิกส์) และ `HTML5 Audio` สำหรับเพลงประกอบ

### 3. เจาะลึกโมดูลภายใน (Core Modules)

#### 3.1 ระบบประมวลผลอัลกอริทึมคณิตศาสตร์ (`solveExact`)
หัวใจหลักของการสุ่มชุดตัวเลขคือการคำนวณหาล่วงหน้าเสมอว่าชุดตัวเลขนั้น "มีคำตอบจริงๆ" ระบบจะใช้อัลกอริทึมแบบถอยกลับ (Recursive Backtracking/Brute force) เพื่อสับเปลี่ยนและแตกแขนงนำตัวเลขแต่ละเซ็ตมาจับคู่กันพร้อมเครื่องหมาย (+, -, *, /, ^) ที่ผู้เล่นตั้งค่าไว้ 
- หากอัลกอริทึมพบว่าการทดลองเกินขีดจำกัด (เช่น วนเกินหลายพันครั้ง) ระบบจะรีเซ็ตเลขเป้าหมายใหม่ทันทีภายใต้เสี้ยววินาทีก่อนจะแสดงผล เพื่อการันตีว่าโจทย์บนหน้าจอมีคำตอบ 100%

#### 3.2 เอนจินกราฟิกแอนิเมชัน
- **แอนิเมชัน Slot Machine:** อาศัยการคำนวณรอบลูปของ `setInterval()` ผสานไปกับ CSS `filter: blur()` โดยจะเปลี่ยนตัวเลขมั่วๆ วนไปพร้อมจังหวะหน่วงเวลาแต่ละฝั่งก่อนจะล็อคเลขจริงทีละบล็อกให้ลุคเหมือนวงล้อตู้สล็อต
- **Canvas Particles:** ระบบถูกเขียนขึ้นเป็นแบบ `Class Object` เพื่อจำลองการลอยไปมาของอนุภาคโดยเช็คองศาของการชนขอบจอ (Boundary Collision Detection) แสดงผลที่เฟรมเรทสูงด้วย `requestAnimationFrame`

#### 3.3 ระบบลงทะเบียนจดจำหน่วยความจำ (Cache State Manager)
ระบบนี้ทำงานเพื่อกันปัญหาข้อมูลหายขณะผู้เล่น Reload บราวเซอร์ 
- **Settings Store (`game24_settings`):** จะคอยตรวจจับ (Listen event `change`) เมื่อพารามิเตอร์ของโหมดความยาก (หลักตัวเลข, เครื่องหมาย) และเปอร์เซนต์เสียงขยับ
- **Game State (`game24_gamestate`):** เมื่อกด สุ่มโจทย์ และสล็อตหมุนเสร็จ ข้อมูล "ตัวเลข," "เป้าหมาย," และ "หนทางเฉลย (Equations)" จะถูกจับยัดเป็น JSON และฉีดเข้าเครื่องผู้เล่น. ฟังก์ชันโหลดครั้งแรก (`DOMContentLoaded`) จะอ่านข้อมูลก้อนนี้แล้วจำลองสภาพเกมกลับคืนอย่างสมบูรณ์แบบเสมือนไม่ได้ Reload

#### 3.4 ระบบเสียงสังเคราะห์ 8-Bit (Audio Synthesizer)
ตัวเกมมีการลดปัญหาขนาดพื้นที่จัดเก็บด้วยการตัดการใช้ไฟล์เสียง Effect แบบ mp3 ออก และมาใช้ `window.AudioContext` แทน:
- ระบบเสียงในเบราว์เซอร์จะจำลองเครื่องมือกำเนิดคลื่นเสียงความถี่สูง (Oscillator Node) ปล่อยคลื่นแบบ `square` ด้วยโทนเสียงอิเล็กทรอนิกส์ เพื่อใช้จังหวะหมุนสล็อต
- เวลาชนะ/ดูเฉลย ระบบจะกระแทกคอร์ดประสานจังหวะ 4 โน้ต (C5, E5, G5, C6) ผสมกับระบบเฟดเสียง `exponentialRampToValueAtTime()` ที่ช่วยให้ฟังดูคล้ายเครื่อง SNES แบบ 8-bit

#### 3.5 เอนจิ้นโครงข่ายหลายภาษา (i18n Engine)
ตัวเกมฝังดิกชันนารีสลับภาษาไว้ในไฟล์ `lang.json` โดยเมื่อผู้ใช้เปลี่ยนภาษา `script.js` จะสกัดหา `<div data-i18n="xxx">` ทุกตำแหน่งในเอกสาร และเข้าไปเปลี่ยน DOM (Document Object Model) แบบไร้รอยต่อโดยไม่ต้องรีโหลดหน้าเว็บ

#### 3.6 การรองรับการทำงานออฟไลน์ (Offline Ecosystem)
ระบบทั้งหมดถูกโหลดเข้าเครื่องโดยไม่ต้องใช้เน็ตเวิร์ก 
1. ฟอนต์ `Mitr` จาก Google Fonts ถูกดึงเป็นไฟล์ `.ttf` และตั้งค่าใน (`style.css`)
2. Library อย่าง Confetti 被ถูกแปลงเป็นก้อน local file 

### 4. วิธีการเปิดใช้งาน
หากดับเบิ้ลคลิกไฟล์ `index.html` แบบตรงๆ ตัวเบราว์เซอร์อาจป้องกันเรื่องระบบความปลอดภัยจากไฟล์ Local (CORS Policy Error) เพราะมีฟังก์ชันโหลดไฟล์ JSON

**แนะนำจำลอง Server ด้วย Terminal ยิงคำสั่งดังนี้:**
```bash
# พิมพ์ใน Terminal (ใช้ npx หากติดตั้ง nodejs)
npx serve .

# หรือหากใช้ Python
python -m http.server 3000
```
จากนั้นเปิดดูผลลัพธ์ผ่านเบราว์เซอร์ด้วย URL `http://localhost:3000`
