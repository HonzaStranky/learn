// ============================================
// STATISTICS MODULE - Track & visualize progress
// ============================================

const Stats = (() => {
    const STORAGE_KEY = 'honza_stats';
    const XP_KEY = 'honza_xp';
    const LEVEL_KEY = 'honza_level';

    function getHistory() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    }

    function saveHistory(history) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }

    function getTotalXP() {
        return parseInt(localStorage.getItem(XP_KEY) || '0');
    }

    function getLevel() {
        return parseInt(localStorage.getItem(LEVEL_KEY) || '1');
    }

    function xpForLevel(level) {
        // XP needed for next level (exponential)
        return Math.floor(80 * Math.pow(1.3, level - 1));
    }

    function addXP(amount) {
        let xp = getTotalXP() + amount;
        let level = getLevel();
        let leveledUp = false;

        while (xp >= xpForLevel(level)) {
            xp -= xpForLevel(level);
            level++;
            leveledUp = true;
        }

        localStorage.setItem(XP_KEY, xp.toString());
        localStorage.setItem(LEVEL_KEY, level.toString());

        // Update UI
        updateTopBar();

        return { level, xp, leveledUp, xpNeeded: xpForLevel(level) };
    }

    function updateTopBar() {
        const xpEl = document.getElementById('total-xp');
        const lvlEl = document.getElementById('user-level');
        if (xpEl) xpEl.textContent = getTotalXP();
        if (lvlEl) lvlEl.textContent = getLevel();
    }

    function recordSession(sessionData) {
        // sessionData: { subject, topic, gameMode, score, correct, total, accuracy, time, maxStreak, date }
        const history = getHistory();
        sessionData.date = new Date().toISOString();
        sessionData.id = Date.now();
        history.unshift(sessionData); // newest first
        // Keep last 200 sessions
        if (history.length > 200) history.length = 200;
        saveHistory(history);
    }

    function getOverview() {
        const history = getHistory();
        const totalSessions = history.length;
        const totalCorrect = history.reduce((sum, s) => sum + (s.correct || 0), 0);
        const totalQuestions = history.reduce((sum, s) => sum + (s.total || 0), 0);
        const avgAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
        const totalXP = getTotalXP();
        const bestStreak = history.reduce((max, s) => Math.max(max, s.maxStreak || 0), 0);
        const totalTime = history.reduce((sum, s) => sum + (s.time || 0), 0);

        return { totalSessions, totalCorrect, avgAccuracy, totalXP, bestStreak, totalTime, level: getLevel() };
    }

    function getLast7DaysAccuracy() {
        const history = getHistory();
        const days = [];
        const labels = [];
        
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            labels.push(d.toLocaleDateString('cs-CZ', { weekday: 'short' }));
            
            const daySessions = history.filter(s => s.date && s.date.startsWith(dateStr));
            if (daySessions.length > 0) {
                const correct = daySessions.reduce((sum, s) => sum + (s.correct || 0), 0);
                const total = daySessions.reduce((sum, s) => sum + (s.total || 0), 0);
                days.push(total > 0 ? Math.round((correct / total) * 100) : 0);
            } else {
                days.push(null);
            }
        }
        return { labels, data: days };
    }

    function getSubjectDistribution() {
        const history = getHistory();
        const subjects = {};
        history.forEach(s => {
            const key = s.subject || 'other';
            subjects[key] = (subjects[key] || 0) + 1;
        });
        return subjects;
    }

    function renderStats() {
        const overview = getOverview();
        document.getElementById('stats-total-sessions').textContent = overview.totalSessions;
        document.getElementById('stats-total-correct').textContent = overview.totalCorrect;
        document.getElementById('stats-avg-accuracy').textContent = overview.avgAccuracy + '%';
        document.getElementById('stats-total-xp').textContent = overview.totalXP;
        document.getElementById('stats-best-streak').textContent = overview.bestStreak;
        document.getElementById('stats-total-time').textContent = Math.round(overview.totalTime / 60) + 'm';

        renderAccuracyChart();
        renderSubjectChart();
        renderHistory();
    }

    let accuracyChartInstance = null;
    let subjectChartInstance = null;

    function renderAccuracyChart() {
        const { labels, data } = getLast7DaysAccuracy();
        const canvas = document.getElementById('accuracy-chart');
        if (!canvas) return;

        if (accuracyChartInstance) accuracyChartInstance.destroy();

        const isDark = document.body.classList.contains('dark');
        const textColor = isDark ? '#94A3B8' : '#6B7280';
        const gridColor = isDark ? '#334155' : '#E5E7EB';

        accuracyChartInstance = new Chart(canvas, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: 'Přesnost %',
                    data,
                    borderColor: '#6C63FF',
                    backgroundColor: 'rgba(108, 99, 255, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#6C63FF',
                    pointRadius: 5,
                    spanGaps: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { min: 0, max: 100, ticks: { color: textColor }, grid: { color: gridColor } },
                    x: { ticks: { color: textColor }, grid: { color: gridColor } }
                },
                plugins: { legend: { labels: { color: textColor } } }
            }
        });
    }

    function renderSubjectChart() {
        const subjects = getSubjectDistribution();
        const canvas = document.getElementById('subject-chart');
        if (!canvas) return;

        if (subjectChartInstance) subjectChartInstance.destroy();

        const isDark = document.body.classList.contains('dark');
        const textColor = isDark ? '#94A3B8' : '#6B7280';

        const nameMap = { en: 'English', math: 'Matematika', czech: 'Čeština', teacher: 'Vlastní' };
        const colorMap = { en: '#00B4D8', math: '#6C63FF', czech: '#FF6584', teacher: '#F59E0B' };

        const labels = Object.keys(subjects).map(k => nameMap[k] || k);
        const data = Object.values(subjects);
        const colors = Object.keys(subjects).map(k => colorMap[k] || '#9CA3AF');

        subjectChartInstance = new Chart(canvas, {
            type: 'doughnut',
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor: colors,
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: textColor } } }
            }
        });
    }

    function renderHistory() {
        const history = getHistory();
        const container = document.getElementById('history-list');
        if (!container) return;
        container.innerHTML = '';

        history.slice(0, 20).forEach(s => {
            const div = document.createElement('div');
            div.className = 'history-item';
            const date = s.date ? new Date(s.date).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '';
            const topicName = s.topic ? (TOPIC_NAMES[s.topic] || s.topic) : (s.subject || '');
            const accClass = (s.accuracy || 0) >= 80 ? 'color: var(--success)' : (s.accuracy || 0) >= 50 ? 'color: var(--warning)' : 'color: var(--danger)';
            
            div.innerHTML = `
                <div class="history-item-left">
                    <span class="history-item-topic">${topicName}</span>
                    <span class="history-item-date">${date} · ${s.gameMode || 'typing'}</span>
                </div>
                <div class="history-item-right">
                    <span class="history-item-score">${s.score || 0} bodů</span>
                    <span class="history-item-acc" style="${accClass}">${s.accuracy || 0}%</span>
                </div>
            `;
            container.appendChild(div);
        });

        if (history.length === 0) {
            container.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:20px;">Zatím žádná historie</p>';
        }
    }

    function renderRecentActivity() {
        const history = getHistory();
        const container = document.getElementById('recent-list');
        const section = document.getElementById('recent-activity');
        if (!container || !section) return;

        if (history.length === 0) {
            section.style.display = 'none';
            return;
        }

        section.style.display = 'block';
        container.innerHTML = '';
        
        history.slice(0, 5).forEach(s => {
            const div = document.createElement('div');
            div.className = 'recent-item';
            const topicName = s.topic ? (TOPIC_NAMES[s.topic] || s.topic) : (s.subject || '');
            div.innerHTML = `
                <div class="recent-item-topic">${topicName}</div>
                <div class="recent-item-score">${s.score || 0} bodů · ${s.accuracy || 0}%</div>
            `;
            container.appendChild(div);
        });
    }

    return {
        getHistory, recordSession, getOverview, addXP, getTotalXP, getLevel,
        xpForLevel, updateTopBar, renderStats, renderRecentActivity,
        renderAccuracyChart, renderSubjectChart
    };
})();
