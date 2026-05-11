/**
 * SPEEDY-MATE5 - REFACTORED ENGINE (DELTA PROTOCOL)
 * Strictly reports to 20 total items. No text labels. Modularized.
 */

class SpeedyMateApp {
    constructor() {
        this.testCurent = null;
        this.raspunsuri = {};
        this.indexCurent = 0;
        this.progresMaxim = 0;
        this.timer = null;
        this.timpStart = null;
        this.lastWrongAnswers = [];
        this.incercari = [];
        this.init();
    }

    init() {
        this.loadState();
        this.adaugaEventListeners();
        this.verificareIncarcareDate();
        console.log("Speedy-MATE5 (Modular) Engine Initialized.");
    }

    verificareIncarcareDate() {
        if (typeof TESTE_100_DATABASE === 'undefined') {
            document.getElementById('error-overlay').classList.remove('hidden');
            document.querySelector('.main-content').style.display = 'none';
            if (document.getElementById('test-container')) document.getElementById('test-container').style.display = 'none';
            if (document.getElementById('results-container')) document.getElementById('results-container').style.display = 'none';
            console.error("CRITICAL: TESTE_100_DATABASE missing.");
        }
    }

    loadState() {
        const saved = localStorage.getItem('speedy_mate_state');
        if (saved) {
            const state = JSON.parse(saved);
            this.incercari = state.incercari || [];
        }
    }

    saveState() {
        const state = {
            incercari: this.incercari
        };
        localStorage.setItem('speedy_mate_state', JSON.stringify(state));
    }

    adaugaEventListeners() {
        document.querySelectorAll('.nivel-card').forEach(card => {
            card.addEventListener('click', () => {
                if (card.dataset.nivel === 'standard') this.arataCapitole();
            });
        });

        document.getElementById('back-to-nivel').onclick = () => this.ascundeCapitole();
        document.getElementById('exit-test-btn').onclick = () => {
            if (confirm('Progresul va fi pierdut. Confirmați ieșirea?')) this.revenireCapitole();
        };

        document.getElementById('prev-btn').onclick = () => this.navigatie(-1);
        document.getElementById('next-btn').onclick = () => this.navigatie(1);
        document.getElementById('finish-btn').onclick = () => this.terminaTest();
        document.getElementById('new-test').onclick = () => this.testNou();
        document.getElementById('back-to-chapters').onclick = () => this.revenireCapitole();
        document.getElementById('show-explanations-btn').onclick = () => this.toggleExplicații();
    }

    arataCapitole() {
        document.querySelector('.nivel-selection').classList.add('hidden');
        document.getElementById('capitol-selection').classList.remove('hidden');
        this.incarcaCapitole();
    }

    ascundeCapitole() {
        document.getElementById('capitol-selection').classList.add('hidden');
        document.querySelector('.nivel-selection').classList.remove('hidden');
    }

    incarcaCapitole() {
        const container = document.getElementById('capitol-cards');
        container.innerHTML = `
            <div class="capitol-card">
                <div class="capitol-header"><h3>Capitolul 1: Numere Naturale</h3><span class="badge">ACTIV</span></div>
                <div class="capitol-info"><p>Sistemul zecimal, comparare, rotunjire.</p></div>
                <div class="capitol-actions" style="display: flex; flex-direction: column; align-items: center; gap: 10px; margin-top: 20px;">
                    <button class="btn btn-info" onclick="app.deschideTeorie()">RECAPITULARE TEORIE</button>
                    <button class="btn btn-test" onclick="app.pornesteTest100()">TESTEAZĂ CUNOȘTINȚELE</button>
                </div>
            </div>
        `;
    }

    generateRandomTest() {
        if (typeof TESTE_100_DATABASE === 'undefined') return [];
        
        let allQuestions = [];
        TESTE_100_DATABASE.teste.forEach(t => {
            allQuestions = allQuestions.concat(t.itemi);
        });

        // Fisher-Yates Shuffle
        for (let i = allQuestions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
        }

        return allQuestions.slice(0, 20).map(q => ({
            id: q.id,
            enunt: q.enunt,
            variante: { a: q.optiuni.A, b: q.optiuni.B, c: q.optiuni.C, d: q.optiuni.D },
            raspuns_corect: q.raspuns.toLowerCase(),
            explicatie: "Rigoare Matematică Delta Protocol."
        }));
    }

    pornesteTest100() {
        const selectedQuestions = this.generateRandomTest();
        if (selectedQuestions.length === 0) return;

        this.testCurent = { exercitii: selectedQuestions };
        this.raspunsuri = {};
        this.indexCurent = 0;
        this.progresMaxim = 0;
        
        document.querySelector('.main-content').classList.add('hidden');
        document.getElementById('capitol-selection').classList.add('hidden');
        document.getElementById('test-container').classList.remove('hidden');
        
        this.afiseazaExercitiu(0);
        this.startTimer();
    }

    afiseazaExercitiu(idx) {
        this.indexCurent = idx;
        if (idx > this.progresMaxim) this.progresMaxim = idx;
        
        const p = this.testCurent.exercitii[idx];
        document.getElementById('exercise-text').innerHTML = `<p>${p.enunt}</p>`;
        
        const container = document.getElementById('answers-container');
        container.innerHTML = '';
        ['a', 'b', 'c', 'd'].forEach(lit => {
            const label = document.createElement('label');
            label.className = 'answer-label' + (this.raspunsuri[p.id] === lit ? ' selected' : '');
            label.innerHTML = `
                <input type="radio" name="ans" value="${lit}" class="radio-hidden" ${this.raspunsuri[p.id] === lit ? 'checked' : ''}>
                <div class="custom-radio"></div>
                <span class="answer-text"><strong>${lit.toUpperCase()}.</strong> ${p.variante[lit]}</span>
            `;
            label.onclick = () => {
                this.raspunsuri[p.id] = lit;
                this.afiseazaExercitiu(idx); // Refresh UI
                this.actualizeazaProgresLive();
            };
            container.appendChild(label);
        });

        this.actualizeazaButoane();
        this.actualizeazaProgresLive();
    }

    actualizeazaProgresLive() {
        const total = 20; 
        
        // Progres = (Index + 1) / 20 (Directiva Delta: 5% la prima intrebare)
        const procentParcurs = Math.round(((this.indexCurent + 1) / total) * 100);
        
        let corecte = 0;
        this.testCurent.exercitii.forEach(ex => {
            if (this.raspunsuri[ex.id] === ex.raspuns_corect) corecte++;
        });
        
        // Acuratete = Corecte / 20 (Directiva Delta)
        const acuratete = Math.round((corecte / total) * 100);

        // Update Bars Only
        const quantBar = document.getElementById('progress-bar-quant');
        const qualBar = document.getElementById('progress-bar-qual');
        
        if (quantBar) quantBar.style.width = `${procentParcurs}%`;
        if (qualBar) qualBar.style.width = `${acuratete}%`;
        
        let color = '#ff0055';
        if (acuratete >= 75) color = '#00ff88';
        else if (acuratete >= 50) color = '#faff00';
        
        if (qualBar) {
            qualBar.style.backgroundColor = color;
            qualBar.style.boxShadow = `0 0 15px ${color}`;
        }
    }

    actualizeazaButoane() {
        const isLast = (this.indexCurent === 19);
        const raspunsDat = !!this.raspunsuri[this.testCurent.exercitii[this.indexCurent].id];
        
        document.getElementById('prev-btn').disabled = (this.indexCurent === 0);
        document.getElementById('next-btn').style.display = isLast ? 'none' : 'block';
        document.getElementById('next-btn').disabled = !raspunsDat;
        
        document.getElementById('finish-btn').style.display = isLast ? 'block' : 'none';
        document.getElementById('finish-btn').disabled = !raspunsDat;
    }

    navigatie(dir) {
        this.indexCurent += dir;
        this.afiseazaExercitiu(this.indexCurent);
    }

    terminaTest() {
        clearInterval(this.timer);
        let corecte = 0;
        this.lastWrongAnswers = [];
        
        this.testCurent.exercitii.forEach((ex, idx) => {
            const ans = this.raspunsuri[ex.id];
            if (ans === ex.raspuns_corect) corecte++;
            else {
                this.lastWrongAnswers.push({
                    ordine: idx + 1,
                    enunt: ex.enunt,
                    raspuns_utilizator: ans,
                    raspuns_corect: ex.raspuns_corect,
                    variante: ex.variante,
                    explicatie: ex.explicatie
                });
            }
        });

        const scor = Math.round((corecte / 20) * 100);
        this.incercari.push({ scor: scor });
        this.saveState();
        this.afiseazaRezultate(corecte, scor);
    }

    afiseazaRezultate(punctaj, procent) {
        document.getElementById('test-container').classList.add('hidden');
        const res = document.getElementById('results-container');
        res.classList.remove('hidden');
        
        const msg = document.getElementById('verdict-message');
        const donut = document.getElementById('donut-segment');
        const succes = punctaj >= 15;

        if (succes) {
            msg.textContent = "FELICITĂRI! CAPITOL DEBLOCAT.";
            msg.className = 'verdict-success';
            donut.style.stroke = '#00ff88';
            document.body.classList.remove('code-red');
        } else {
            msg.textContent = "REIA! SCOR SUB PRAGUL DE 75%.";
            msg.className = 'verdict-retry';
            donut.style.stroke = '#ff0055';
            document.body.classList.add('code-red');
        }

        const offset = 251.2 - (procent / 100) * 251.2;
        donut.style.strokeDasharray = "251.2 251.2";
        donut.style.strokeDashoffset = "251.2";
        setTimeout(() => {
            donut.style.transition = 'stroke-dashoffset 1.5s ease-out';
            donut.style.strokeDashoffset = offset;
        }, 100);

        const historyEl = document.getElementById('attempts-history');
        historyEl.innerHTML = this.incercari.map((inc, i) => 
            `<span style="color: ${inc.scor >= 75 ? '#00ff88' : '#ff0055'}">●</span> Sesiunea ${i+1}`
        ).join(' | ');

        document.getElementById('show-explanations-btn').classList.toggle('hidden', this.lastWrongAnswers.length === 0);
        if (this.lastWrongAnswers.length > 0) this.toggleExplicații(true);
    }

    toggleExplicații(force = false) {
        const container = document.getElementById('explanations-container');
        if (!container.classList.contains('hidden') && !force) {
            container.classList.add('hidden');
            return;
        }
        
        const list = document.getElementById('explanations-list');
        list.innerHTML = this.lastWrongAnswers.map(wa => `
            <div class="explanation-card">
                <div class="explanation-card-header">
                    <h4>Exercițiul ${wa.ordine}</h4>
                    <span class="wrong-badge">Incorect</span>
                </div>
                <p class="enunt-mini">${wa.enunt}</p>
                <div class="feedback-box">
                    <p><strong>Răspuns:</strong> ${wa.variante[wa.raspuns_utilizator] || 'Niciunul'}</p>
                    <p><strong>Corect:</strong> ${wa.variante[wa.raspuns_corect]}</p>
                </div>
                <div class="mentor-box"><strong>💡 Sfat:</strong> ${wa.explicatie}</div>
            </div>
        `).join('');
        container.classList.remove('hidden');
    }

    deschideTeorie() { 
        document.getElementById('teorie-container').classList.remove('hidden'); 
    }
    inchideTeorie() { 
        document.getElementById('teorie-container').classList.add('hidden'); 
    }
    revenireCapitole() { 
        document.getElementById('results-container').classList.add('hidden');
        document.getElementById('test-container').classList.add('hidden');
        document.querySelector('.main-content').classList.remove('hidden');
    }
    testNou() { this.pornesteTest100(); }

    startTimer() {
        this.timpStart = Date.now();
        if (this.timer) clearInterval(this.timer);
        this.timer = setInterval(() => {
            const s = Math.floor((Date.now() - this.timpStart) / 1000);
            const m = Math.floor(s / 60);
            document.getElementById('timer').textContent = `${m.toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;
        }, 1000);
    }
}

let app;
window.onload = () => { app = new SpeedyMateApp(); };
