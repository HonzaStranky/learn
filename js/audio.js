// ============================================
// AUDIO MODULE - Sound effects via Web Audio API
// ============================================

const Audio = (() => {
    let ctx = null;
    let enabled = true;

    function getCtx() {
        if (!ctx) {
            ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        return ctx;
    }

    function isEnabled() { return enabled; }

    function toggle() {
        enabled = !enabled;
        localStorage.setItem('honza_sound', enabled ? 'on' : 'off');
        document.body.classList.toggle('sound-off', !enabled);
        const icon = document.querySelector('#sound-toggle i');
        if (icon) {
            icon.className = enabled ? 'fas fa-volume-high' : 'fas fa-volume-xmark';
        }
        return enabled;
    }

    function init() {
        const saved = localStorage.getItem('honza_sound');
        if (saved === 'off') {
            enabled = false;
            document.body.classList.add('sound-off');
            const icon = document.querySelector('#sound-toggle i');
            if (icon) icon.className = 'fas fa-volume-xmark';
        }
    }

    function playTone(freq, duration, type = 'sine', volume = 0.3) {
        if (!enabled) return;
        try {
            const c = getCtx();
            const osc = c.createOscillator();
            const gain = c.createGain();
            osc.connect(gain);
            gain.connect(c.destination);
            osc.type = type;
            osc.frequency.setValueAtTime(freq, c.currentTime);
            gain.gain.setValueAtTime(volume, c.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
            osc.start(c.currentTime);
            osc.stop(c.currentTime + duration);
        } catch (e) {}
    }

    function correct() {
        if (!enabled) return;
        // Happy ascending arpeggio
        playTone(523.25, 0.15, 'sine', 0.25); // C5
        setTimeout(() => playTone(659.25, 0.15, 'sine', 0.25), 80); // E5
        setTimeout(() => playTone(783.99, 0.2, 'sine', 0.3), 160); // G5
        setTimeout(() => playTone(1046.50, 0.3, 'sine', 0.2), 240); // C6
    }

    function wrong() {
        if (!enabled) return;
        // Descending minor feel
        playTone(330, 0.2, 'sawtooth', 0.15);
        setTimeout(() => playTone(277, 0.3, 'sawtooth', 0.12), 150);
    }

    function click() {
        if (!enabled) return;
        playTone(800, 0.05, 'sine', 0.15);
    }

    function keyPress() {
        if (!enabled) return;
        playTone(600 + Math.random() * 200, 0.04, 'sine', 0.08);
    }

    function levelUp() {
        if (!enabled) return;
        // Fanfare
        const notes = [523, 659, 783, 1046, 1318];
        notes.forEach((freq, i) => {
            setTimeout(() => playTone(freq, 0.25, 'sine', 0.2), i * 120);
        });
    }

    function achievement() {
        if (!enabled) return;
        // Special sparkle
        playTone(880, 0.15, 'sine', 0.2);
        setTimeout(() => playTone(1108, 0.15, 'sine', 0.2), 100);
        setTimeout(() => playTone(1318, 0.2, 'sine', 0.25), 200);
        setTimeout(() => playTone(1760, 0.4, 'sine', 0.15), 300);
    }

    function countdown() {
        if (!enabled) return;
        playTone(440, 0.3, 'square', 0.1);
    }

    function countdownGo() {
        if (!enabled) return;
        playTone(880, 0.4, 'square', 0.15);
    }

    function flipCard() {
        if (!enabled) return;
        playTone(500, 0.08, 'sine', 0.12);
        setTimeout(() => playTone(700, 0.08, 'sine', 0.12), 60);
    }

    function streak() {
        if (!enabled) return;
        // Quick rising sparkle
        playTone(700, 0.08, 'sine', 0.2);
        setTimeout(() => playTone(900, 0.08, 'sine', 0.2), 50);
        setTimeout(() => playTone(1100, 0.12, 'sine', 0.15), 100);
    }

    function tick() {
        if (!enabled) return;
        playTone(1000, 0.03, 'sine', 0.05);
    }

    return {
        init, toggle, isEnabled,
        correct, wrong, click, keyPress, levelUp,
        achievement, countdown, countdownGo,
        flipCard, streak, tick
    };
})();
