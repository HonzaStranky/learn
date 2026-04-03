// ============================================
// ACHIEVEMENTS MODULE
// ============================================

const Achievements = (() => {
    const DEFINITIONS = [
        { id: 'first_game', icon: '🎮', name: 'První hra', desc: 'Dokonči svou první hru' },
        { id: 'streak_5', icon: '🔥', name: 'Na vlně', desc: 'Série 5 správných' },
        { id: 'streak_10', icon: '💥', name: 'Neporazitelný', desc: 'Série 10 správných' },
        { id: 'streak_20', icon: '🌟', name: 'Legenda', desc: 'Série 20 správných' },
        { id: 'perfect', icon: '💯', name: 'Perfektní', desc: '100% přesnost v kole' },
        { id: 'speed_50', icon: '⚡', name: 'Blesk', desc: '50+ bodů v bleskovém módu' },
        { id: 'speed_100', icon: '🚀', name: 'Raketa', desc: '100+ bodů v bleskovém módu' },
        { id: 'level_5', icon: '📈', name: 'Student', desc: 'Dosáhni level 5' },
        { id: 'level_10', icon: '🎓', name: 'Magistr', desc: 'Dosáhni level 10' },
        { id: 'level_20', icon: '👑', name: 'Profesor', desc: 'Dosáhni level 20' },
        { id: 'sessions_10', icon: '📚', name: 'Pilný', desc: '10 odehraných her' },
        { id: 'sessions_50', icon: '🏅', name: 'Veterán', desc: '50 odehraných her' },
        { id: 'flash_all', icon: '🃏', name: 'Kartičkář', desc: 'Označ vše "Znám" v kartičkách' },
        { id: 'math_master', icon: '🧮', name: 'Matikář', desc: '100+ bodů v násobení' },
        { id: 'night_owl', icon: '🦉', name: 'Noční sova', desc: 'Hraj po 21:00' },
        { id: 'early_bird', icon: '🐦', name: 'Ranní ptáče', desc: 'Hraj před 7:00' },
        { id: 'xp_500', icon: '⭐', name: 'Hvězda', desc: 'Získej 500 XP' },
        { id: 'xp_2000', icon: '🌠', name: 'Supernova', desc: 'Získej 2000 XP' },
    ];

    function getUnlocked() {
        return JSON.parse(localStorage.getItem('honza_achievements') || '[]');
    }

    function saveUnlocked(list) {
        localStorage.setItem('honza_achievements', JSON.stringify(list));
    }

    function unlock(id) {
        const unlocked = getUnlocked();
        if (unlocked.includes(id)) return false;
        unlocked.push(id);
        saveUnlocked(unlocked);
        
        // Show popup
        const def = DEFINITIONS.find(d => d.id === id);
        if (def) {
            showPopup(def);
            Audio.achievement();
        }
        return true;
    }

    function showPopup(def) {
        const popup = document.getElementById('achievement-popup');
        document.getElementById('ach-popup-icon').textContent = def.icon;
        document.getElementById('ach-popup-name').textContent = def.name;
        popup.style.display = 'block';
        popup.style.animation = 'none';
        popup.offsetHeight; // trigger reflow
        popup.style.animation = '';
        setTimeout(() => { popup.style.display = 'none'; }, 3500);
    }

    function check(context) {
        const { score, streak, maxStreak, accuracy, gameMode, totalSessions, level, totalXP, subject } = context;

        if (totalSessions >= 1) unlock('first_game');
        if (totalSessions >= 10) unlock('sessions_10');
        if (totalSessions >= 50) unlock('sessions_50');
        if (maxStreak >= 5) unlock('streak_5');
        if (maxStreak >= 10) unlock('streak_10');
        if (maxStreak >= 20) unlock('streak_20');
        if (accuracy === 100) unlock('perfect');
        if (gameMode === 'speed' && score >= 50) unlock('speed_50');
        if (gameMode === 'speed' && score >= 100) unlock('speed_100');
        if (level >= 5) unlock('level_5');
        if (level >= 10) unlock('level_10');
        if (level >= 20) unlock('level_20');
        if (totalXP >= 500) unlock('xp_500');
        if (totalXP >= 2000) unlock('xp_2000');
        if (subject === 'math' && score >= 100) unlock('math_master');
        if (gameMode === 'flashcard' && context.flashAllKnown) unlock('flash_all');

        const hour = new Date().getHours();
        if (hour >= 21) unlock('night_owl');
        if (hour < 7) unlock('early_bird');
    }

    function renderMini(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const unlocked = getUnlocked();
        container.innerHTML = '';
        DEFINITIONS.slice(0, 8).forEach(def => {
            const div = document.createElement('div');
            div.className = 'achievement-mini' + (unlocked.includes(def.id) ? ' unlocked' : '');
            div.textContent = def.icon;
            div.title = def.name + ': ' + def.desc;
            div.onclick = () => showScreen('achievements-screen');
            container.appendChild(div);
        });
    }

    function renderFull(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const unlocked = getUnlocked();
        container.innerHTML = '';
        DEFINITIONS.forEach(def => {
            const card = document.createElement('div');
            card.className = 'achievement-card' + (unlocked.includes(def.id) ? ' unlocked' : '');
            card.innerHTML = `
                <div class="achievement-card-icon">${def.icon}</div>
                <div class="achievement-card-name">${def.name}</div>
                <div class="achievement-card-desc">${def.desc}</div>
                ${unlocked.includes(def.id) ? '<div class="achievement-card-badge">✓</div>' : ''}
            `;
            container.appendChild(card);
        });
    }

    return { check, unlock, getUnlocked, renderMini, renderFull, DEFINITIONS };
})();
