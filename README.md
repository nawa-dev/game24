# 🎯 Game 24 (เกม 24) - Arcade Edition

An interactive, neon-styled, arcade web-based version of the classic Math Game 24.
*สร้างสรรค์เกมคลาสสิกแห่งตัวเลขในรูปแบบตู้เกมอาร์เคดแสงนีออน พร้อมเอฟเฟกต์ สล็อตแมชชีน และระบบเสียง 8-bit เต็มรูปแบบ!*

[English](#english) | [ภาษาไทย](#ภาษาไทย)

---

<br/>

## English

### 🎮 About the Game
Game 24 is a mathematical puzzle game where the objective is to use the provided random numbers and selected operators (+, -, *, /, ^) to precisely calculate a target number. 

This specific project modernizes the classic game with a **Cyberpunk/Arcade** aesthetic, featuring dynamic slot machine spinning effects, animated backgrounds, synthetic sound effects, and intelligent local caching.

### ✨ Key Features
- **Arcade Style UI:** Responsive neon design with a beautifully animated HTML5 canvas particle background.
- **Slot Machine Effects:** Numbers are revealed smoothly through spinning slot animations.
- **Synthetic Web Audio API Engine:** Generates high-quality, retro 8-bit sound effects (SFX) on the fly without needing external audio files. 
- **BGM Support & Controls:** Adjustable background music with autoplay and visual volume sliders.
- **Multi-language (i18n):** Full support for English and Thai via a `lang.json` dictionary.
- **Local Storage Caching:** Automatically remembers your last puzzle state, game settings (number count, digits, operators), language, and audio volume levels across sessions.
- **Confetti Celebrations:** Uses `canvas-confetti` to celebrate when revealing the solution.

### ⚙️ Settings / Customization
You can easily tweak the puzzle parameters via the "Settings" (⚙️) panel:
- **Number count:** Pick 4 or 5 initial numbers.
- **Digits target:** Select 2-digit (10-99) or 3-digit (100-999) targets.
- **Operators:** Enable or disable Addition, Subtraction, Multiplication, Division, or Power.

### 🚀 How to Run
Since the multi-language system utilizes the `fetch()` API for `lang.json`, running it via direct file path (`file://`) might cause CORS blockage on modern browsers.
1. Use an extension like **Live Server** in VSCode.
2. Or run a simple local server in your terminal: `npx serve .`
3. Enjoy the game at `http://localhost:3000`

### 🧑‍💻 Credits
- **Developer:** [@nawa-dev](https://github.com/nawa-dev)
- **Sound Effects (BGM reference):** [freesound_community](https://pixabay.com/users/freesound_community-46691455/) from Pixabay

---

<br/>

## ภาษาไทย

### 🎮 เกี่ยวกับเกม
**เกม 24** เป็นเกมปริศนาคณิตศาสตร์คลาสสิก ที่ผู้เล่นจะต้องนำชุดตัวเลขที่สุ่มออกมาใช้ร่วมกับเครื่องหมายทางคณิตศาสตร์ (+, -, *, /, ^) เพื่อคำนวณให้ได้ผลลัพธ์ตรงกับเป้าหมายที่กำหนดไว้

โปรเจกต์นี้เป็นการนำเกมคลาสสิกมาดีไซน์ใหม่ให้เป็นรูปแบบ **Arcade/Neon (เกมตู้สไตล์ไซเบอร์)** โดยเพิ่มลูกเล่นให้ปุ่มตัวเลขหมุนได้แบบ 'สล็อตแมชชีน' รวมไปถึงเอฟเฟกต์เสียงและระบบจำค่าต่างๆ เพื่อความสมบูรณ์แบบในการเล่น

### ✨ ฟีเจอร์เด่น
- **Arcade Style UI:** อินเตอร์เฟสล้ำสมัย รองรับการใช้งานมือถือ พร้อมแอนิเมชันพื้นหลัง (Particle) สวยงาม
- **Slot Machine Effects:** แอนิเมชันการสุ่มตัวเลขที่หมุนและหยุดทีละช่องเพื่อลุ้นผล
- **ระบบเสียงสังเคราะห์ (Web Audio API):** จำลองเสียงเอฟเฟกต์ (SFX) สไตล์ 8-bit ขึ้นมาจากเบราว์เซอร์สดๆ โดยไม่ต้องง้อไฟล์เสียง
- **การจัดการระดับเสียง:** มีแถบเลื่อนปรับระดับเปอร์เซ็นต์ (Volume) ของ BGM และ SFX พร้อมระบบ Autoplay หลังจากคลิกหน้าจอครั้งแรก
- **ระบบหลายภาษา (i18n):** รองรับภาษาไทยและอังกฤษ เปลี่ยนภาษาได้ง่ายๆ ผ่านไฟล์ `lang.json` 
- **ระบบความจำ (Cache State):** เกมจะจำค่าการตั้งค่าต่างๆ (จำนวนหลัก, เครื่องหมายที่ใช้), ระดับเสียง, ภาษา, และสถานะของโจทย์ล่าสุดไว้ในเครื่อง เข้าใหม่กี่รอบก็เล่นต่อได้ทันที
- **ฉลองความสำเร็จ:** พลุ Confetti โปรยปรายเมื่อหาเฉลยเจอ

### ⚙️ การตั้งค่าที่ปรับแต่งได้
ปรับความยาก-ง่ายของเกมได้ในลิ้นชักการตั้งค่า (⚙️ เมนูมุมขวาบน):
- **จำนวนตัวเลข:** เลือกสุ่มจำนวน 4 ตัว หรือ 5 ตัว
- **จำนวนหลักเป้าหมาย:** เป้าหมาย 2 หลัก (10-99) หรือ 3 หลัก (100-999)
- **เครื่องหมายคณิตศาสตร์:** เลือกเปิด-ปิดเครื่องหมาย บวก, ลบ, คูณ, หาร หรือ ยกกำลัง

### 🚀 เคล็ดลับการรันโปรเจกต์
เนื่องจากระบบดึงภาษาถูกเขียนให้ใช้ API `fetch('lang.json')` การดับเบิ้ลคลิกเปิดไฟล์ `index.html` ตรงๆ อาจทำให้เบราว์เซอร์บล็อกข้อมูล (ติด CORS)
**วิธีแก้:**
1. หากใช้ VSCode แนะนำให้เปิดผ่าน Extension อย่าง **Live Server**
2. หรือใช้ Local web server เช่นพิมพ์ `npx serve .` ใน Terminal
3. จากนั้นเปิดใช้งานผ่าน URL `http://localhost:3000` ตามที่ระบุได้เลยครับ!

### 🧑‍💻 เครดิต
- **ผู้พัฒนา:** [@nawa-dev](https://github.com/nawa-dev)
- **ระบบเสียงดนตรี (BGM อ้างอิง):** [freesound_community](https://pixabay.com/users/freesound_community-46691455/) จาก Pixabay
