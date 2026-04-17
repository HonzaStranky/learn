// ============================================
// GAME ENGINE - All 4 game modes
// ============================================

const Game = (() => {
    let state = {
        mode: '',           // 'typing', 'choice', 'flashcard', 'speed'
        subject: '',        // 'math', 'czech', 'en', 'teacher'
        topic: '',          // topic key
        questions: [],      // shuffled questions
        questionIndex: 0,
        score: 0,
        correct: 0,
        wrong: 0,
        streak: 0,
        maxStreak: 0,
        secondsPassed: 0,
        timerInterval: null,
        currentAnswer: '',
        currentQuestion: null,
        wrongAnswers: [],   // for spaced repetition
        // Flash-specific
        flashKnown: 0,
        flashUnknown: 0,
        // Speed-specific
        speedTimeLeft: 60,
        speedInterval: null,
        isSpeedActive: false,
        // hint used
        hintUsed: false
    };

    // Utility
    function shuffle(arr) {
        let s = [...arr];
        for (let i = s.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [s[i], s[j]] = [s[j], s[i]];
        }
        return s;
    }

    function resetState() {
        clearInterval(state.timerInterval);
        clearInterval(state.speedInterval);
        state.score = 0;
        state.correct = 0;
        state.wrong = 0;
        state.streak = 0;
        state.maxStreak = 0;
        state.secondsPassed = 0;
        state.questionIndex = 0;
        state.wrongAnswers = [];
        state.flashKnown = 0;
        state.flashUnknown = 0;
        state.speedTimeLeft = 60;
        state.isSpeedActive = false;
        state.hintUsed = false;
    }

    // ===== SETUP =====
    function setup(gameMode, subject, topic, questions) {
        resetState();
        state.mode = gameMode;
        state.subject = subject;
        state.topic = topic;
        state.questions = shuffle(questions);
        
        updateStreakDisplay(0);

        switch (gameMode) {
            case 'typing': startTyping(); break;
            case 'choice': startChoice(); break;
            case 'flashcard': startFlashcard(); break;
            case 'speed': startSpeed(); break;
        }
    }

    function getState() { return state; }

    // ===== TYPING MODE =====
    function startTyping() {
        showScreen('game-screen');
        state.score = 0;
        document.getElementById('score').textContent = '0';
        startTimer('timer-val');
        updateProgress('game-progress-bar', 'progress-val');
        createKeyboard();
        nextTypingQuestion();
    }

    function nextTypingQuestion() {
        document.getElementById('ans-input').value = '';
        document.getElementById('msg').textContent = '';
        document.getElementById('ans-input').className = '';
        state.hintUsed = false;

        const qEl = document.getElementById('q-text');
        const hEl = document.getElementById('hint-text');

        if (state.subject === 'math') {
            let a = Math.floor(Math.random() * 10) + 1;
            let b = Math.floor(Math.random() * 10) + 1;
            state.currentAnswer = (a * b).toString();
            qEl.textContent = `${a} × ${b}`;
            hEl.textContent = 'Vypočítej:';
            state.currentQuestion = { q: `${a} × ${b}`, a: state.currentAnswer };
        } else {
            if (state.questionIndex >= state.questions.length) {
                finishRound();
                return;
            }
            const item = state.questions[state.questionIndex];
            state.currentAnswer = item.a;
            state.currentQuestion = item;
            qEl.textContent = item.q;
            hEl.textContent = item.h || 'Přelož:';
            state.questionIndex++;
        }
        updateProgress('game-progress-bar', 'progress-val');
    }

    function checkTypingAnswer() {
        const input = document.getElementById('ans-input');
        const val = input.value.trim().toLowerCase();
        const msg = document.getElementById('msg');

        if (!val) return;

        if (val === state.currentAnswer.toLowerCase()) {
            // Correct!
            const points = state.hintUsed ? 5 : 10;
            state.score += points;
            state.correct++;
            state.streak++;
            if (state.streak > state.maxStreak) state.maxStreak = state.streak;

            msg.textContent = getRandomCorrectMsg();
            msg.className = 'message win';
            input.className = 'input-correct';
            
            Audio.correct();
            if (state.streak > 0 && state.streak % 5 === 0) {
                Audio.streak();
                showToast(`🔥 ${state.streak}x série!`);
            }
            
            confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
            document.getElementById('score').textContent = state.score;
            updateStreakDisplay(state.streak);

            if (state.subject === 'math') {
                setTimeout(nextTypingQuestion, 800);
            } else {
                setTimeout(nextTypingQuestion, 800);
            }
        } else {
            // Wrong
            state.wrong++;
            state.streak = 0;
            msg.textContent = 'Zkus to znovu 💪';
            msg.className = 'message error';
            input.className = 'input-wrong';
            
            Audio.wrong();
            updateStreakDisplay(0);

            if (state.currentQuestion && !state.wrongAnswers.find(w => w.q === state.currentQuestion.q)) {
                state.wrongAnswers.push({ ...state.currentQuestion });
            }

            setTimeout(() => { input.className = ''; }, 600);
        }
    }

    function showTypingHint() {
        state.hintUsed = true;
        const msg = document.getElementById('msg');
        msg.textContent = `💡 Odpověď: ${state.currentAnswer}`;
        msg.style.color = 'var(--warning)';
        msg.className = 'message';
    }

    function skipTypingQuestion() {
        if (state.currentQuestion) {
            state.wrong++;
            if (!state.wrongAnswers.find(w => w.q === state.currentQuestion.q)) {
                state.wrongAnswers.push({ ...state.currentQuestion });
            }
        }
        state.streak = 0;
        updateStreakDisplay(0);
        
        if (state.subject === 'math') {
            nextTypingQuestion();
        } else {
            nextTypingQuestion();
        }
    }

    // ===== MULTIPLE CHOICE MODE =====
    function startChoice() {
        showScreen('choice-screen');
        state.score = 0;
        document.getElementById('choice-score').textContent = '0';
        startTimer('choice-timer-val');
        updateProgress('choice-progress-bar', 'choice-progress-val');
        nextChoiceQuestion();
    }

    function nextChoiceQuestion() {
        document.getElementById('choice-msg').textContent = '';

        if (state.questionIndex >= state.questions.length) {
            finishRound();
            return;
        }

        const item = state.questions[state.questionIndex];
        state.currentAnswer = item.a;
        state.currentQuestion = item;
        
        document.getElementById('choice-q').textContent = item.q;
        document.getElementById('choice-hint').textContent = item.h || 'Přelož:';

        // Generate 4 choices (1 correct + 3 random wrong)
        let allAnswers = state.questions.map(q => q.a);
        let wrongOptions = allAnswers.filter(a => a.toLowerCase() !== item.a.toLowerCase());
        wrongOptions = shuffle(wrongOptions).slice(0, 3);
        let options = shuffle([item.a, ...wrongOptions]);

        const grid = document.getElementById('choices-grid');
        grid.innerHTML = '';
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = opt;
            btn.onclick = () => checkChoice(btn, opt);
            grid.appendChild(btn);
        });

        state.questionIndex++;
        updateProgress('choice-progress-bar', 'choice-progress-val');
    }

    function checkChoice(btn, selected) {
        const buttons = document.querySelectorAll('#choices-grid .choice-btn');
        buttons.forEach(b => { b.onclick = null; b.style.pointerEvents = 'none'; });

        if (selected.toLowerCase() === state.currentAnswer.toLowerCase()) {
            btn.classList.add('choice-correct');
            state.score += 10;
            state.correct++;
            state.streak++;
            if (state.streak > state.maxStreak) state.maxStreak = state.streak;
            Audio.correct();
            
            if (state.streak > 0 && state.streak % 5 === 0) {
                Audio.streak();
                showToast(`🔥 ${state.streak}x série!`);
            }
            confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });
        } else {
            btn.classList.add('choice-wrong');
            state.streak = 0;
            state.wrong++;
            Audio.wrong();
            
            // Highlight correct
            buttons.forEach(b => {
                if (b.textContent.toLowerCase() === state.currentAnswer.toLowerCase()) {
                    b.classList.add('choice-correct');
                }
            });

            if (state.currentQuestion && !state.wrongAnswers.find(w => w.q === state.currentQuestion.q)) {
                state.wrongAnswers.push({ ...state.currentQuestion });
            }
        }

        document.getElementById('choice-score').textContent = state.score;
        document.getElementById('choice-streak').textContent = state.streak;
        updateStreakDisplay(state.streak);

        setTimeout(nextChoiceQuestion, 1000);
    }

    // ===== FLASHCARD MODE =====
    function startFlashcard() {
        showScreen('flash-screen');
        state.flashKnown = 0;
        state.flashUnknown = 0;
        updateFlashProgress();
        nextFlashcard();
    }

    function nextFlashcard() {
        const card = document.getElementById('flashcard');
        card.classList.remove('flipped');

        if (state.questionIndex >= state.questions.length) {
            finishRound();
            return;
        }

        const item = state.questions[state.questionIndex];
        state.currentQuestion = item;
        document.getElementById('flash-front-word').textContent = item.q;
        document.getElementById('flash-back-word').textContent = item.a;
        document.getElementById('flash-hint').textContent = item.h || 'Přelož:';
        
        state.questionIndex++;
        updateFlashProgress();
    }

    function flipCard() {
        const card = document.getElementById('flashcard');
        card.classList.toggle('flipped');
        Audio.flipCard();
    }

    function flashRate(known) {
        if (known) {
            state.flashKnown++;
            state.correct++;
            state.score += 10;
            Audio.correct();
        } else {
            state.flashUnknown++;
            state.wrong++;
            Audio.wrong();
            if (state.currentQuestion && !state.wrongAnswers.find(w => w.q === state.currentQuestion.q)) {
                state.wrongAnswers.push({ ...state.currentQuestion });
            }
        }
        document.getElementById('flash-known').textContent = state.flashKnown;
        document.getElementById('flash-unknown').textContent = state.flashUnknown;
        nextFlashcard();
    }

    function updateFlashProgress() {
        const total = state.questions.length;
        const done = state.questionIndex;
        const pct = total > 0 ? (done / total) * 100 : 0;
        document.getElementById('flash-progress-bar').style.width = pct + '%';
        document.getElementById('flash-progress-val').textContent = `${done}/${total}`;
    }

    // ===== SPEED ROUND MODE =====
    function startSpeed() {
        showScreen('speed-screen');
        state.score = 0;
        state.speedTimeLeft = 60;
        state.isSpeedActive = false;
        document.getElementById('speed-score').textContent = '0';
        document.getElementById('speed-time-left').textContent = '60';

        // Countdown 3-2-1-GO
        const overlay = document.getElementById('speed-countdown');
        const numEl = document.getElementById('countdown-num');
        overlay.style.display = 'flex';

        let count = 3;
        numEl.textContent = count;
        Audio.countdown();

        const countInterval = setInterval(() => {
            count--;
            if (count > 0) {
                numEl.textContent = count;
                numEl.style.animation = 'none';
                numEl.offsetHeight;
                numEl.style.animation = '';
                Audio.countdown();
            } else if (count === 0) {
                numEl.textContent = 'GO!';
                numEl.style.animation = 'none';
                numEl.offsetHeight;
                numEl.style.animation = '';
                Audio.countdownGo();
            } else {
                clearInterval(countInterval);
                overlay.style.display = 'none';
                state.isSpeedActive = true;
                startSpeedTimer();
                nextSpeedQuestion();
            }
        }, 800);
    }

    function startSpeedTimer() {
        updateSpeedRing();
        state.speedInterval = setInterval(() => {
            state.speedTimeLeft--;
            document.getElementById('speed-time-left').textContent = state.speedTimeLeft;
            updateSpeedRing();
            
            if (state.speedTimeLeft <= 10) {
                document.getElementById('ring-fg').style.stroke = 'var(--danger)';
                Audio.tick();
            }

            if (state.speedTimeLeft <= 0) {
                clearInterval(state.speedInterval);
                state.isSpeedActive = false;
                finishRound();
            }
        }, 1000);
    }

    function updateSpeedRing() {
        const pct = state.speedTimeLeft / 60;
        const dashOffset = 283 * (1 - pct);
        document.getElementById('ring-fg').style.strokeDashoffset = dashOffset;
    }

    function nextSpeedQuestion() {
        if (!state.isSpeedActive) return;

        if (state.questionIndex >= state.questions.length) {
            state.questions = shuffle(state.questions);
            state.questionIndex = 0;
        }

        const item = state.questions[state.questionIndex];
        state.currentAnswer = item.a;
        state.currentQuestion = item;
        document.getElementById('speed-q').textContent = item.q;

        // Generate choices
        let allAnswers = state.questions.map(q => q.a);
        let wrongOptions = allAnswers.filter(a => a.toLowerCase() !== item.a.toLowerCase());
        wrongOptions = shuffle(wrongOptions).slice(0, 3);
        let options = shuffle([item.a, ...wrongOptions]);

        const grid = document.getElementById('speed-choices');
        grid.innerHTML = '';
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = opt;
            btn.onclick = () => checkSpeedChoice(btn, opt);
            grid.appendChild(btn);
        });

        state.questionIndex++;
    }

    function checkSpeedChoice(btn, selected) {
        if (!state.isSpeedActive) return;
        
        const buttons = document.querySelectorAll('#speed-choices .choice-btn');

        if (selected.toLowerCase() === state.currentAnswer.toLowerCase()) {
            btn.classList.add('choice-correct');
            state.score += 10;
            state.correct++;
            state.streak++;
            if (state.streak > state.maxStreak) state.maxStreak = state.streak;
            Audio.correct();
            
            if (state.streak > 0 && state.streak % 5 === 0) {
                Audio.streak();
            }
        } else {
            btn.classList.add('choice-wrong');
            state.streak = 0;
            state.wrong++;
            Audio.wrong();
            
            buttons.forEach(b => {
                if (b.textContent.toLowerCase() === state.currentAnswer.toLowerCase()) {
                    b.classList.add('choice-correct');
                }
            });

            if (state.currentQuestion && !state.wrongAnswers.find(w => w.q === state.currentQuestion.q)) {
                state.wrongAnswers.push({ ...state.currentQuestion });
            }
        }

        document.getElementById('speed-score').textContent = state.score;
        updateStreakDisplay(state.streak);

        setTimeout(() => {
            if (state.isSpeedActive) nextSpeedQuestion();
        }, 500);
    }
    // ===== ty hacker? =====
    console.log("%cHej! Ty jsi taky hacker? Pozdravuj učitele! 👋", "color: #ff4500; font-size: 20px; font-weight: bold;");
    // ===== COMMON FUNCTIONS =====
    function startTimer(elementId) {
        state.secondsPassed = 0;
        clearInterval(state.timerInterval);
        state.timerInterval = setInterval(() => {
            state.secondsPassed++;
            const el = document.getElementById(elementId);
            if (el) el.textContent = state.secondsPassed + 's';
        }, 1000);
    }

    function updateProgress(barId, textId) {
        const total = state.questions.length;
        const done = state.questionIndex;
        const pct = total > 0 ? (done / total) * 100 : 0;
        const bar = document.getElementById(barId);
        const text = document.getElementById(textId);
        if (bar) bar.style.width = pct + '%';
        if (text) text.textContent = `${done}/${total}`;
    }

    function updateStreakDisplay(val) {
        const els = ['streak-count', 'game-streak', 'choice-streak'];
        els.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = val;
        });
    }

    function createKeyboard() {
        const kb = document.getElementById('keyboard');
        if (!kb) return;
        kb.innerHTML = '';

        if (state.subject === 'math') {
            // Number keyboard
            const numRows = [['7','8','9'],['4','5','6'],['1','2','3'],['0']];
            numRows.forEach(row => {
                const rowDiv = document.createElement('div');
                rowDiv.className = 'keyboard-row';
                row.forEach(n => {
                    const b = document.createElement('button');
                    b.className = 'key key-num';
                    b.textContent = n;
                    b.onclick = () => {
                        document.getElementById('ans-input').value += n;
                        Audio.keyPress();
                    };
                    rowDiv.appendChild(b);
                });
                kb.appendChild(rowDiv);
            });
            // Bottom row
            const bottomRow = document.createElement('div');
            bottomRow.className = 'keyboard-row';
            
            let del = document.createElement('button');
            del.className = 'key key-num key-del';
            del.textContent = '⌫';
            del.onclick = () => {
                document.getElementById('ans-input').value = document.getElementById('ans-input').value.slice(0, -1);
                Audio.keyPress();
            };
            
            let enter = document.createElement('button');
            enter.className = 'key key-num key-enter';
            enter.textContent = '✓ OK';
            enter.onclick = () => checkTypingAnswer();

            bottomRow.appendChild(del);
            bottomRow.appendChild(enter);
            kb.appendChild(bottomRow);
        } else {
            // Letter keyboard
            const rows = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
            rows.forEach(row => {
                const rowDiv = document.createElement('div');
                rowDiv.className = 'keyboard-row';
                row.split('').forEach(l => {
                    const b = document.createElement('button');
                    b.className = 'key';
                    b.textContent = l;
                    b.onclick = () => {
                        document.getElementById('ans-input').value += l;
                        Audio.keyPress();
                    };
                    rowDiv.appendChild(b);
                });
                kb.appendChild(rowDiv);
            });
            // Bottom row
            const bottomRow = document.createElement('div');
            bottomRow.className = 'keyboard-row';

            let space = document.createElement('button');
            space.className = 'key key-space';
            space.textContent = 'mezera';
            space.onclick = () => {
                document.getElementById('ans-input').value += ' ';
                Audio.keyPress();
            };

            let del = document.createElement('button');
            del.className = 'key key-del';
            del.textContent = '⌫';
            del.onclick = () => {
                document.getElementById('ans-input').value = document.getElementById('ans-input').value.slice(0, -1);
                Audio.keyPress();
            };

            let enter = document.createElement('button');
            enter.className = 'key key-enter';
            enter.textContent = '✓ OK';
            enter.onclick = () => checkTypingAnswer();

            bottomRow.appendChild(del);
            bottomRow.appendChild(space);
            bottomRow.appendChild(enter);
            kb.appendChild(bottomRow);
        }
    }

    // ===== FINISH ROUND =====
    function finishRound() {
        clearInterval(state.timerInterval);
        clearInterval(state.speedInterval);
        state.isSpeedActive = false;

        const total = state.correct + state.wrong;
        const accuracy = total > 0 ? Math.round((state.correct / total) * 100) : 0;

        // Calculate XP
        let xpGain = state.score;
        if (accuracy === 100 && total >= 5) xpGain += 20; // Perfect bonus
        if (state.maxStreak >= 10) xpGain += 15; // Streak bonus
        xpGain = Math.max(xpGain, 0);

        const xpResult = Stats.addXP(xpGain);

        // Record session
        Stats.recordSession({
            subject: state.subject,
            topic: state.topic,
            gameMode: state.mode,
            score: state.score,
            correct: state.correct,
            total,
            accuracy,
            time: state.secondsPassed,
            maxStreak: state.maxStreak
        });

        // Check achievements
        const overview = Stats.getOverview();
        Achievements.check({
            score: state.score,
            streak: state.streak,
            maxStreak: state.maxStreak,
            accuracy,
            gameMode: state.mode,
            totalSessions: overview.totalSessions,
            level: xpResult.level,
            totalXP: Stats.getTotalXP() + xpGain,
            subject: state.subject,
            flashAllKnown: state.mode === 'flashcard' && state.flashUnknown === 0 && state.flashKnown > 0
        });

        // Show complete screen
        showScreen('complete-screen');

        // Pick icon & title based on accuracy
        let icon = '🏆', title = 'Skvělá práce!';
        if (accuracy >= 90) { icon = '🌟'; title = 'Fenomenální!'; }
        else if (accuracy >= 70) { icon = '💪'; title = 'Dobrá práce!'; }
        else if (accuracy >= 50) { icon = '📈'; title = 'Jde to!'; }
        else { icon = '💡'; title = 'Příště to zvládneš!'; }

        document.getElementById('complete-icon').textContent = icon;
        document.getElementById('complete-title').textContent = title;
        document.getElementById('comp-score').textContent = state.score;
        document.getElementById('comp-correct').textContent = state.correct;
        document.getElementById('comp-accuracy').textContent = accuracy + '%';
        document.getElementById('comp-time').textContent = state.secondsPassed + 's';
        document.getElementById('comp-streak').textContent = state.maxStreak;
        document.getElementById('comp-xp').textContent = '+' + xpGain;

        // XP bar
        const xpPct = xpResult.xpNeeded > 0 ? (xpResult.xp / xpResult.xpNeeded) * 100 : 0;
        document.getElementById('xp-gain-text').textContent = `Lv. ${xpResult.level} — ${xpResult.xp}/${xpResult.xpNeeded} XP`;
        setTimeout(() => {
            document.getElementById('xp-gain-fill').style.width = xpPct + '%';
        }, 300);

        if (xpResult.leveledUp) {
            Audio.levelUp();
            showToast(`🎉 Level UP! Nyní jsi Lv. ${xpResult.level}`);
        }

        // Wrong answers review
        const wrongDiv = document.getElementById('wrong-review');
        const wrongList = document.getElementById('wrong-list');
        const btnPractice = document.getElementById('btn-practice-wrong');
        
        if (state.wrongAnswers.length > 0) {
            wrongDiv.style.display = 'block';
            btnPractice.style.display = 'inline-flex';
            wrongList.innerHTML = '';
            state.wrongAnswers.forEach(w => {
                const item = document.createElement('div');
                item.className = 'wrong-item';
                item.innerHTML = `<span class="wrong-item-q">${w.q}</span><span class="wrong-item-a">${w.a}</span>`;
                wrongList.appendChild(item);
            });
        } else {
            wrongDiv.style.display = 'none';
            btnPractice.style.display = 'none';
        }

        confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
    }

    // ===== HELPERS =====
    function getRandomCorrectMsg() {
        const msgs = ['SKVĚLE! 🌟', 'Výborně! ✨', 'Super! 🎉', 'Správně! 💯', 'Přesně tak! 🔥', 'Perfektní! 👏'];
        return msgs[Math.floor(Math.random() * msgs.length)];
    }

    return {
        setup, getState, 
        checkTypingAnswer, showTypingHint, skipTypingQuestion, nextTypingQuestion,
        flipCard, flashRate,
        finishRound, shuffle
    };
})();
