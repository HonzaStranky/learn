# 🎓 HonzaUceni - Interactive Learning Platform (2026)

An interactive educational website for Czech students to practice Math, Czech, and English vocabulary across grades 4–9. Gamified learning with multiple game modes, achievements, and progress tracking.

## ✅ Implemented Features

### 🎮 4 Game Modes
- **Psaní (Typing)** — Type the correct answer using the on-screen keyboard
- **Výběr (Multiple Choice)** — Pick from 4 options, instant visual feedback
- **Kartičky (Flashcards)** — Flip to reveal, rate as "Znám" or "Neznám"
- **Bleskový (Speed Round)** — 60-second timed challenge with countdown animation

### 🔊 Audio Feedback (Web Audio API)
- Correct answer: ascending arpeggio
- Wrong answer: descending minor feel
- Keyboard presses: subtle click
- Streak milestones: sparkle sound
- Level up: fanfare
- Achievement unlock: special sparkle
- Speed countdown: tick sounds
- Flashcard flip: soft click
- Sound toggle (on/off) persisted in localStorage

### 📱 Mobile-Optimized Keyboard
- QWERTY layout matching real keyboards
- Large touch-friendly keys
- Number pad layout for Math mode
- Dedicated "Enter/OK" and "Delete" keys
- Space bar for multi-word answers
- Visual press feedback with active states

### 🌙 Dark Mode
- Full dark theme toggle in top bar
- All UI components properly themed
- Charts re-render with dark-appropriate colors
- Persisted in localStorage

### 📊 Statistics Dashboard
- Total sessions, correct answers, average accuracy
- Best streak, total time, total XP
- **7-day accuracy line chart** (Chart.js)
- **Subject distribution doughnut chart**
- Scrollable game history list (last 20 sessions)
- Recent activity cards on home screen

### 📈 Progress Tracking
- Progress bar during each game round
- Question counter (e.g. 5/15)
- Real-time streak counter with fire emoji
- Timer display for typing and choice modes
- Circular countdown timer ring for speed mode
- Topic completion checkmarks (✅) on menu

### ⭐ XP & Level System
- Earn XP based on score
- Bonus XP for 100% accuracy or 10+ streaks
- Exponential leveling curve
- Level displayed in top bar
- XP progress bar on round complete screen
- Level-up notification with fanfare sound

### 🏆 18 Achievements
- First Game, Streak 5/10/20, Perfect Score
- Speed 50/100 points, Level 5/10/20
- Session milestones 10/50, Flashcard master
- Math master, Night Owl, Early Bird
- XP milestones 500/2000
- Achievement popup notification when unlocked
- Mini grid on home screen, full gallery page

### 🔄 Spaced Repetition
- Wrong answers collected during each round
- Review section on round complete screen
- "Procvič chyby" button to replay only missed questions

### 👨‍🏫 Teacher Features
- Hidden login button (🔐)
- Custom lesson editor with dynamic question rows
- Saved exercises per grade (localStorage)
- All game modes available for custom lessons

### 🎨 Modern UI/UX
- Card-based layout with hover animations
- Screen transitions with fadeSlideIn
- Confetti on correct answers and round completion
- Shake animation on wrong answers
- Toast notifications for events
- Responsive design (mobile, tablet, desktop)
- Custom scrollbar styling

## 📁 Project Structure

```
index.html          — Main HTML with all screens
css/
  style.css         — Complete styling, dark mode, responsive
js/
  data.js           — Vocabulary data, topic mappings
  audio.js          — Web Audio API sound effects
  achievements.js   — Achievement definitions & tracking
  stats.js          — Statistics, XP/levels, Chart.js integration
  game.js           — Game engine (4 modes)
  app.js            — Navigation, init, glue logic
```

## 🌐 Entry Points

| Path | Description |
|------|-------------|
| `index.html` | Main application (SPA) |
| `#main-menu` | Home screen with subject selection |
| `#en-grades` | English grade picker (4–9) |
| `#en-menu` | Topic list for selected grade |
| `#mode-select` | Game mode picker |
| `#game-screen` | Typing mode |
| `#choice-screen` | Multiple choice mode |
| `#flash-screen` | Flashcard mode |
| `#speed-screen` | Speed round mode |
| `#complete-screen` | Round results & XP |
| `#stats-screen` | Statistics dashboard |
| `#achievements-screen` | Full achievements gallery |
| `#login-screen` | Teacher login |
| `#custom-create` | Lesson editor |

## 💾 Data Storage (localStorage)

| Key | Description |
|-----|-------------|
| `honza_sound` | Sound on/off |
| `honza_dark` | Dark mode on/off |
| `honza_stats` | Game session history (last 200) |
| `honza_xp` | Current XP progress |
| `honza_level` | Current level |
| `honza_achievements` | Unlocked achievement IDs |
| `my_exercises_grade_N` | Custom lessons per grade |

## 📦 External Libraries (CDN)

- **Canvas Confetti** 1.6.0 — Celebration animations
- **Chart.js** 4.4.0 — Statistics charts
- **Font Awesome** 6.4.0 — Icons
- **Google Fonts** — Fredoka One + Quicksand

## 🚀 Recommended Next Steps

1. **Multiplayer mode** — Compete with friends in real-time
2. **Sentence building** — Drag-and-drop word ordering exercises
3. **Listening mode** — Audio pronunciation using Web Speech API
4. **Export/import** — Share custom lessons as JSON files
5. **Progressive Web App** — Add service worker for offline play
6. **Leaderboard** — Track top scores across sessions
7. **More subjects** — Add Geography, History, Science
8. **Adaptive difficulty** — Auto-adjust based on performance
