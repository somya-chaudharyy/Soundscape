# 🎧 FocusSound – Ambient Soundscape Mixer

A simple, lightweight web app for studying, relaxing, or coding. Mix your own ambient soundscape from multiple looping sounds, and stay on track with a built-in Pomodoro timer.

Built with plain **HTML, CSS, and JavaScript**. No frameworks, no backend, no build step.

---

## ✨ Features

- **Sound mixer**: play several ambient sounds at once
  - 🌧️ Rainfall
  - ☕ Coffee Shop
  - 🔥 Fireplace
  - 🌲 Forest Birds
- **Individual volume control** for each sound
- **Continuous looping** playback
- **Stop All** button to silence everything and reset
- **Pomodoro timer** with Start, Pause, and Reset
  - Work mode (25 minutes)
  - Break mode (5 minutes)
- **Glassmorphism UI** with a glowing highlight on active sounds
- **Responsive layout** that adapts to phones, tablets, and desktops

---

## 📁 Project Structure

```
focussound/
├── index.html
├── styles.css
├── script.js
├── README.md
└── audio/
    ├── rain.mp3
    ├── cafe.mp3
    ├── fire.mp3
    └── forest.mp3
```

> **Note:** If your audio files sit next to `index.html` (as in the original code), the `src` values in the HTML must match the file names exactly. Using short names inside an `audio/` folder is recommended.

---

## 🚀 Getting Started

### 1. Download or clone the project

```bash
git clone <your-repo-url>
cd focussound
```

### 2. Add your audio files

Place your `.mp3` files in the `audio/` folder and update the `src` in `index.html`:

```html
<audio loop src="audio/rain.mp3"></audio>
```

### 3. Run it

**Option A: Open directly**
Double-click `index.html`. It should open with a `file:///` address.

**Option B: Use a local server (recommended)**

- *VS Code:* install **Live Server**, then right-click `index.html` → **Open with Live Server**
- *Python:*
  ```bash
  python -m http.server 8000
  ```
  Then visit `http://localhost:8000`

---

## 🎮 How to Use

### Sound mixer
1. Click **Play** on any sound card to start it.
2. Drag the slider to adjust that sound's volume.
3. Combine multiple sounds to create your own mix.
4. Click **Pause** to stop one sound, or **Stop All Sounds** to stop everything.

### Pomodoro timer
1. Choose **Work (25m)** or **Break (5m)**.
2. Click **Start** to begin the countdown.
3. Use **Pause** to hold and **Reset** to return to the selected mode's full time.

---

## 🧠 How It Works

| File | Responsibility |
|------|----------------|
| `index.html` | Page structure: timer, sound cards, and audio elements |
| `styles.css` | Layout, colors, glass effect, and responsive grid |
| `script.js` | Play/pause logic, volume control, and timer countdown |

**Key concepts used**
- `<audio>` element with the `loop` attribute
- `async/await` with `try/catch` for audio playback errors
- `setInterval` / `clearInterval` for the timer
- `classList` to toggle the active (glowing) state
- CSS Grid with `auto-fit` and `minmax` for responsiveness
- `data-*` attributes to store timer durations

---

## 🛠️ Troubleshooting

| Problem | Likely cause | Fix |
|---------|--------------|-----|
| Nothing happens when clicking Play | `script.js` not loading | Check the file name and path |
| `404` error in console | Wrong audio file name or path | Make sure the names match exactly |
| `ERR_CONNECTION_REFUSED` | Local server has stopped | Restart Live Server or reopen via `file:///` |
| `NotSupportedError` | File is not a real MP3 | Re-export or convert the audio |
| No sound but no errors | System or tab is muted, or volume is 0 | Check volume sliders and device audio |

Press **F12** to open the browser console and Network tab for details.

---

## 🔮 Future Improvements

- [ ] Chime sound when the timer ends (instead of `alert`)
- [ ] Long break mode (15 minutes)
- [ ] Custom timer durations
- [ ] Save volume settings with `localStorage`
- [ ] Master volume slider
- [ ] Keyboard shortcuts (Space to start/pause)
- [ ] More sounds (ocean, thunderstorm, white noise)

---

## 🧰 Built With

- HTML5
- CSS3 (Flexbox, Grid, backdrop-filter)
- Vanilla JavaScript (ES6+)

---

## 🤖 AI Assistance

AI tools (Claude by Anthropic) were used to help improve this project, including code review, debugging audio issues and refining the Pomodoro timer logic. All code was reviewed and tested by the author.

---

## 🔊 Audio Credits

Sounds are sourced from free audio libraries (e.g., Pixabay / Freesound). Check each file's license before sharing or publishing the project, and add attribution where required.

---

## 📄 License

This project is open for learning and personal use. Add a license of your choice (e.g., MIT) before distributing.