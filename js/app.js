// ============================================
// APP CONTROLLER - Navigation, state, init
// ============================================

let isTeacher = false;
let currentGrade = '';
let teacherQuestions = [{q: '', a: '', h: 'Přelož:'}];
let pendingQuestions = [];
let pendingSubject = '';
let pendingTopic = '';

// ===== SCREEN MANAGEMENT =====
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active-screen'));
    const screen = document.getElementById(id);
    if (screen) {
        screen.classList.add('active-screen');
        screen.style.animation = 'none';
        screen.offsetHeight;
        screen.style.animation = '';
    }
    Audio.click();
    
    // Special renders
    if (id === 'stats-screen') Stats.renderStats();
    if (id === 'achievements-screen') Achievements.renderFull('achievements-full');
    if (id === 'main-menu') {
        Stats.updateTopBar();
        Stats.renderRecentActivity();
        Achievements.renderMini('achievements-mini');
    }
}

function goHome() {
    clearInterval(Game.getState().timerInterval);
    clearInterval(Game.getState().speedInterval);
    showScreen('main-menu');
}

// ===== TOAST =====
function showToast(text) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = text;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ===== DARK MODE =====
function toggleDarkMode() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('honza_dark', isDark ? 'on' : 'off');
    const icon = document.querySelector('#dark-mode-toggle i');
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    // Re-render charts if on stats
    if (document.getElementById('stats-screen').classList.contains('active-screen')) {
        Stats.renderAccuracyChart();
        Stats.renderSubjectChart();
    }
}

function initDarkMode() {
    if (localStorage.getItem('honza_dark') === 'on') {
        document.body.classList.add('dark');
        const icon = document.querySelector('#dark-mode-toggle i');
        if (icon) icon.className = 'fas fa-sun';
    }
}

// ===== SOUND =====
function toggleSound() {
    Audio.toggle();
}

// ===== LOGIN =====
function login() {
    const name = document.getElementById('login-name').value;
    const pass = document.getElementById('login-pass').value;
    if (name === 'Honza' && pass === 'Honza98') {
        isTeacher = true;
        document.getElementById('login-msg').textContent = 'Vítej, pane učiteli! ✅';
        document.getElementById('login-msg').className = 'message win';
        Audio.correct();
        setTimeout(() => showScreen('main-menu'), 1000);
    } else {
        document.getElementById('login-msg').textContent = 'Chybné údaje ❌';
        document.getElementById('login-msg').className = 'message error';
        Audio.wrong();
    }
}

// ===== ENGLISH NAVIGATION =====
function showEnGrades() { showScreen('en-grades'); }

function showEnSub(grade) {
    currentGrade = grade;
    const list = document.getElementById('en-sub-list');
    list.innerHTML = '';
    document.getElementById('en-menu-title').textContent = `${grade}. Třída - Témata 🇬🇧`;

    const topics = GRADE_TOPICS[grade] || [];
    topics.forEach(t => {
        const div = document.createElement('div');
        div.className = 'sub-item';
        const name = TOPIC_NAMES[t] || t.toUpperCase();
        
        // Check if completed before
        const history = Stats.getHistory();
        const completed = history.some(h => h.topic === t && h.accuracy >= 70);
        
        div.innerHTML = `${name} ${completed ? '<span class="topic-check">✅</span>' : ''}`;
        div.onclick = () => {
            pendingQuestions = DATA.en[t];
            pendingSubject = 'en';
            pendingTopic = t;
            showModeSelect();
        };
        list.appendChild(div);
    });

    renderMyExercises(grade);

    if (isTeacher) {
        const div = document.createElement('div');
        div.className = 'sub-item';
        div.style.borderColor = 'var(--secondary)';
        div.style.color = 'var(--secondary)';
        div.textContent = '⚙️ VYTVOŘIT VLASTNÍ';
        div.onclick = () => {
            teacherQuestions = [{q: '', a: '', h: 'Přelož:'}];
            document.getElementById('lesson-name-input').value = '';
            renderEditor();
            showScreen('custom-create');
        };
        list.appendChild(div);
    }

    showScreen('en-menu');
}

function renderMyExercises(grade) {
    const section = document.getElementById('my-exercises-section');
    const list = document.getElementById('my-exercises-list');
    const savedLessons = JSON.parse(localStorage.getItem(`my_exercises_grade_${grade}`)) || [];
    
    if (savedLessons.length > 0) {
        section.style.display = 'block';
        list.innerHTML = '';
        savedLessons.forEach(lesson => {
            const div = document.createElement('div');
            div.className = 'sub-item';
            div.style.borderColor = 'var(--warning)';
            div.style.color = 'var(--warning)';
            div.textContent = '⭐ ' + lesson.name;
            div.onclick = () => {
                pendingQuestions = lesson.questions;
                pendingSubject = 'teacher';
                pendingTopic = lesson.name;
                showModeSelect();
            };
            list.appendChild(div);
        });
    } else {
        section.style.display = 'none';
    }
}

// ===== MODE SELECTION =====
function showModeSelect() {
    showScreen('mode-select');
}

function selectMode(gameMode) {
    Audio.click();
    Game.setup(gameMode, pendingSubject, pendingTopic, pendingQuestions);
}

// ===== MATH & CZECH START =====
function startMath() {
    // Math is infinite mode - only typing makes sense, but we allow choice too
    pendingSubject = 'math';
    pendingTopic = 'math';
    // Generate 20 random math questions for choice/flash/speed
    const mathQs = [];
    for (let i = 0; i < 20; i++) {
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        mathQs.push({ q: `${a} × ${b}`, a: (a * b).toString(), h: 'Vypočítej:' });
    }
    pendingQuestions = mathQs;
    showModeSelect();
}

function startCzech() {
    pendingSubject = 'czech';
    pendingTopic = 'czech';
    pendingQuestions = DATA.czech;
    showModeSelect();
}

// ===== GAME ACTIONS (wired from HTML) =====
function checkAnswer() { Game.checkTypingAnswer(); }
function showHint() { Game.showTypingHint(); }
function skipQuestion() { Game.skipTypingQuestion(); }
function flipCard() { Game.flipCard(); }
function flashRate(known) { Game.flashRate(known); }

// ===== ROUND COMPLETE ACTIONS =====
function replayRound() {
    Audio.click();
    Game.setup(Game.getState().mode, pendingSubject, pendingTopic, pendingQuestions);
}

function practiceWrong() {
    const wrongOnes = Game.getState().wrongAnswers;
    if (wrongOnes.length > 0) {
        Audio.click();
        Game.setup(Game.getState().mode, pendingSubject, pendingTopic, wrongOnes);
    }
}

// ===== EDITOR =====
function renderEditor() {
    const container = document.getElementById('custom-list');
    container.innerHTML = '';
    teacherQuestions.forEach((item, i) => {
        const row = document.createElement('div');
        row.className = 'q-row';
        row.innerHTML = `
            <span>${i + 1}.</span>
            <input placeholder="Zadání" value="${item.q}" oninput="teacherQuestions[${i}].q = this.value">
            <input placeholder="Odpověď" value="${item.a}" oninput="teacherQuestions[${i}].a = this.value">
            <input placeholder="Hint" value="${item.h}" oninput="teacherQuestions[${i}].h = this.value">
        `;
        container.appendChild(row);
    });
}

function addQuestion() {
    teacherQuestions.push({q: '', a: '', h: 'Přelož:'});
    renderEditor();
    Audio.click();
}

function removeQuestion() {
    if (teacherQuestions.length > 1) teacherQuestions.pop();
    renderEditor();
    Audio.click();
}

function saveAndPlay() {
    const name = document.getElementById('lesson-name-input').value || 'Vlastní lekce';
    const valid = teacherQuestions.filter(q => q.q && q.a);
    if (valid.length === 0) {
        showToast('⚠️ Přidej aspoň jednu otázku s odpovědí!');
        return;
    }
    
    let savedLessons = JSON.parse(localStorage.getItem(`my_exercises_grade_${currentGrade}`)) || [];
    savedLessons.push({ name, questions: [...valid] });
    localStorage.setItem(`my_exercises_grade_${currentGrade}`, JSON.stringify(savedLessons));
    
    pendingQuestions = valid;
    pendingSubject = 'teacher';
    pendingTopic = name;
    showToast('✅ Lekce uložena!');
    showModeSelect();
}

// ===== BACK BUTTONS =====
document.getElementById('game-back-btn').onclick = () => {
    clearInterval(Game.getState().timerInterval);
    if (pendingSubject === 'en' || pendingSubject === 'teacher') {
        showEnSub(currentGrade);
    } else {
        showScreen('main-menu');
    }
};

document.getElementById('choice-back-btn').onclick = () => {
    clearInterval(Game.getState().timerInterval);
    if (pendingSubject === 'en' || pendingSubject === 'teacher') {
        showEnSub(currentGrade);
    } else {
        showScreen('main-menu');
    }
};

document.getElementById('flash-back-btn').onclick = () => {
    if (pendingSubject === 'en' || pendingSubject === 'teacher') {
        showEnSub(currentGrade);
    } else {
        showScreen('main-menu');
    }
};

document.getElementById('speed-back-btn').onclick = () => {
    clearInterval(Game.getState().speedInterval);
    Game.getState().isSpeedActive = false;
    if (pendingSubject === 'en' || pendingSubject === 'teacher') {
        showEnSub(currentGrade);
    } else {
        showScreen('main-menu');
    }
};

document.getElementById('mode-back-btn').onclick = () => {
    if (pendingSubject === 'en' || pendingSubject === 'teacher') {
        showEnSub(currentGrade);
    } else {
        showScreen('main-menu');
    }
};

// ===== ACHIEVEMENTS LINK =====
document.querySelector('.achievements-preview h3').onclick = () => showScreen('achievements-screen');

// ===== INIT =====
function init() {
    initDarkMode();
    Audio.init();
    Stats.updateTopBar();
    Stats.renderRecentActivity();
    Achievements.renderMini('achievements-mini');
}

init();
