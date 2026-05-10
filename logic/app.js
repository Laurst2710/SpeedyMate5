/**
 * Speedy-MATE5 - Aplicație Principală
 * Simulator Matematică Clasa a V-a
 */

class SpeedyMateApp {
    constructor() {
        this.motorProbleme = null;
        this.sistemIncarcare = null;
        this.testCurent = null;
        this.raspunsuriUtilizator = {};
        this.indexProblemaCurenta = 0;
        this.timerInterval = null;
        this.timpStart = null;
        
        this.init();
    }

    init() {
        try {
            // Inițializăm motorul
            this.motorProbleme = new MotorProbleme();
            
            // Adăugăm event listeners direct
            this.adaugaEventListeners();
            
            console.log('Aplicația Speedy-MATE5 a fost inițializată cu motor dinamic');
        } catch (error) {
            console.error('Eroare la inițializare:', error);
        }
    }

    adaugaEventListeners() {
        // Selectare nivel
        document.querySelectorAll('.nivel-card').forEach(card => {
            card.addEventListener('click', () => {
                const nivel = card.dataset.nivel;
                if (nivel && !card.hasAttribute('disabled')) {
                    if (nivel === 'standard') {
                        this.arataSelectieCapitole();
                    } else if (nivel === 'olimpiada') {
                        this.porneșteTestOlimpiada();
                    } else {
                        this.porneșteTest(nivel);
                    }
                }
            });
        });

        // Buton pentru a reveni la selecția de niveluri
        document.getElementById('back-to-nivel').addEventListener('click', () => {
                    this.ascundeSelectieCapitole();
                });

        // Butoane navigare test
        document.getElementById('prev-btn').addEventListener('click', () => this.problemaAnterioara());
        document.getElementById('next-btn').addEventListener('click', () => this.problemaUrmatoare());
        document.getElementById('finish-btn').addEventListener('click', () => this.termineTest());

        // Butoane rezultate
        document.getElementById('new-test').addEventListener('click', () => this.testNou());
        document.getElementById('review-answers').addEventListener('click', () => this.revizuireRaspunsuri());
        
        // Buton pentru a reveni la capitole
        const backToChaptersBtn = document.getElementById('back-to-chapters');
        if (backToChaptersBtn) {
            backToChaptersBtn.addEventListener('click', () => this.revenireLaCapitole());
        }
    }

    porneșteTest(nivel) {
        try {
            // Obținem problemele direct din baza de date
            let probleme = [];
            
            if (nivel === 'standard') {
                probleme = DATABASE_NIVEL_STANDARD.probleme;
            } else if (nivel === 'avansat') {
                probleme = DATABASE_NIVEL_AVANSAT.probleme;
            } else if (nivel === 'olimpiada') {
                probleme = DATABASE_NIVEL_OLIMPIADA.probleme;
            }
            
            if (probleme.length === 0) {
                alert(`Nu există probleme pentru nivelul: ${nivel}`);
                return;
            }
            
            // Selectăm probleme aleatorii
            const numarProbleme = nivel === 'olimpiada' ? probleme.length : 5;
            const problemeSelectate = [];
            const problemeCopie = [...probleme];
            
            for (let i = 0; i < numarProbleme && i < problemeCopie.length; i++) {
                const indexAleatoriu = Math.floor(Math.random() * problemeCopie.length);
                const problemaSelectata = problemeCopie.splice(indexAleatoriu, 1)[0];
                problemeSelectate.push(problemaSelectata);
            }
            
            // Creăm testul
            this.testCurent = {
                nivel: nivel,
                probleme: problemeSelectate,
                indexCurent: 0,
                raspunsuri: {},
                timpStart: Date.now()
            };
            
            // Afișăm testul
            this.afiseazaTest();
            
            // Pornim timer-ul
            this.pornesteTimer();
            
        } catch (error) {
            console.error('Eroare la pornirea testului:', error);
            alert('A apărut o eroare la pornirea testului');
        }
    }

    porneșteTestOlimpiada() {
        // Apelează direct porneșteTest pentru nivelul olimpiadă
        this.porneșteTest('olimpiada');
    }

    afiseazaTest() {
        // Ascundem secțiunea principală
        document.querySelector('.main-content').classList.add('hidden');
        
        // Afișăm containerul de test
        document.getElementById('test-container').classList.remove('hidden');
        
        // Setăm titlul testului
        const titlu = `Test - Nivel ${this.testCurent.nivel.charAt(0).toUpperCase() + this.testCurent.nivel.slice(1)}`;
        document.getElementById('test-title').textContent = titlu;
        
        // Afișăm prima problemă
        this.afiseazaProblema(0);
    }

    afiseazaProblema(index) {
        if (index < 0 || index >= this.testCurent.probleme.length) {
            return;
        }
        
        const problema = this.testCurent.probleme[index];
        
        // Actualizăm progresul
        document.getElementById('progress').textContent = `Problema ${index + 1}/${this.testCurent.probleme.length}`;
        
        // Afișăm enunțul
        document.getElementById('problem-text').innerHTML = `
            <div class="problem-content">
                <h3>Problema ${index + 1}</h3>
                <p>${problema.enunt}</p>
            </div>
        `;
        
        // Afișăm variantele
        const containerVariante = document.getElementById('answers-container');
        containerVariante.innerHTML = '';
        
        ['a', 'b', 'c', 'd'].forEach(litera => {
            const variantaDiv = document.createElement('div');
            variantaDiv.className = 'answer-option';
            variantaDiv.innerHTML = `
                <input type="radio" name="answer" value="${litera}" id="answer-${litera}">
                <label for="answer-${litera}">
                    <strong>${litera.toUpperCase()}.</strong> ${problema.variante[litera]}
                </label>
            `;
            
            // Adăugăm event listener
            variantaDiv.addEventListener('click', () => {
                document.querySelectorAll('.answer-option').forEach(opt => opt.classList.remove('selected'));
                variantaDiv.classList.add('selected');
                document.getElementById(`answer-${litera}`).checked = true;
                this.salveazaRaspuns(problema.id, litera);
            });
            
            containerVariante.appendChild(variantaDiv);
        });
        
        // Restaurăm răspunsul salvat dacă există
        const raspunsSalvat = this.raspunsuriUtilizator[problema.id];
        if (raspunsSalvat) {
            document.getElementById(`answer-${raspunsSalvat}`).checked = true;
            document.querySelector(`#answer-${raspunsSalvat}`).parentElement.classList.add('selected');
        }
        
        // Actualizăm butoanele de navigare
        this.actualizeazaButoaneNavigare();
    }

    salveazaRaspuns(problemaId, raspuns) {
        this.raspunsuriUtilizator[problemaId] = raspuns;
    }

    problemaAnterioara() {
        if (this.indexProblemaCurenta > 0) {
            this.indexProblemaCurenta--;
            this.afiseazaProblema(this.indexProblemaCurenta);
        }
    }

    problemaUrmatoare() {
        if (this.indexProblemaCurenta < this.testCurent.probleme.length - 1) {
            this.indexProblemaCurenta++;
            this.afiseazaProblema(this.indexProblemaCurenta);
        }
    }

    actualizeazaButoaneNavigare() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const finishBtn = document.getElementById('finish-btn');
        
        // Butonul anterior
        prevBtn.disabled = this.indexProblemaCurenta === 0;
        
        // Butonul următor/terminare
        if (this.indexProblemaCurenta === this.testCurent.probleme.length - 1) {
            nextBtn.style.display = 'none';
            finishBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            finishBtn.style.display = 'none';
        }
    }

    async termineTest() {
        // Oprim timer-ul
        this.opresteTimer();
        
        try {
            // Calculăm punctajul
            const rezultate = this.motorProbleme.calculeazaPunctaj(this.testCurent, this.raspunsuriUtilizator);
            
            // Afișăm rezultatele
            this.afiseazaRezultate(rezultate);
            
        } catch (error) {
            console.error('Eroare la calcularea rezultatelor:', error);
            this.afiseazaEroare('Nu s-au putut calcula rezultatele');
        }
    }

    afiseazaRezultate(rezultate) {
        // Ascundem containerul de test
        document.getElementById('test-container').classList.add('hidden');
        
        // Afișăm containerul de rezultate
        document.getElementById('results-container').classList.remove('hidden');
        
        const isChapter1 = this.testCurent && this.testCurent.capitol === 'cap_1';
        
        // Afișăm scorul (doar dacă nu e Capitolul 1)
        const scoreDisplay = document.querySelector('.score-display');
        if (isChapter1) {
            scoreDisplay.style.display = 'none';
            document.querySelector('.results-header h2').textContent = 'Revizuire Exerciții - Capitolul 1';
        } else {
            scoreDisplay.style.display = 'flex';
            document.getElementById('score-percentage').textContent = `${rezultate.procentaj}%`;
            document.getElementById('score-text').textContent = 
                `Ai obținut ${rezultate.punctaj_total} din ${rezultate.punctaj_maxim} puncte`;
        }
        
        // Afișăm detaliile
        const containerDetalii = document.getElementById('results-details');
        containerDetalii.innerHTML = '';
        
        rezultate.rezultate_detaliate.forEach((rezultat, index) => {
            const problema = this.testCurent.probleme[index];
            const rezultatDiv = document.createElement('div');
            
            if (isChapter1) {
                rezultatDiv.className = 'result-item neutral';
                rezultatDiv.innerHTML = `
                    <h4>Exercițiul ${rezultat.ordine}</h4>
                    <p><strong>Enunț:</strong> ${problema.enunt}</p>
                    <p><strong>Răspunsul tău:</strong> ${rezultat.raspuns_utilizator || 'Nu a răspuns'}</p>
                    <div class="explanation-box">
                        <p><strong>Explicație și Rezolvare:</strong></p>
                        <p>${rezultat.explicatie}</p>
                    </div>
                `;
            } else {
                rezultatDiv.className = `result-item ${rezultat.corect ? 'correct' : 'incorrect'}`;
                rezultatDiv.innerHTML = `
                    <h4>Problema ${rezultat.ordine}</h4>
                    <p><strong>Enunț:</strong> ${problema.enunt}</p>
                    <p><strong>Răspunsul tău:</strong> ${rezultat.raspuns_utilizator || 'Nu a răspuns'}</p>
                    <p><strong>Răspuns corect:</strong> ${rezultat.raspuns_corect}</p>
                    <p><strong>Explicație:</strong> ${rezultat.explicatie}</p>
                `;
            }
            
            containerDetalii.appendChild(rezultatDiv);
        });
    }

    testNou() {
        // Dacă suntem în Capitolul 1, generăm direct un test nou dinamic
        if (this.testCurent && this.testCurent.capitol === 'cap_1') {
            const capitolId = this.testCurent.capitol;
            const tip = this.testCurent.tip;
            
            // Resetăm starea internă
            this.testCurent = null;
            this.raspunsuriUtilizator = {};
            this.indexProblemaCurenta = 0;
            this.opresteTimer();
            
            // Pornim testul nou direct
            this.porneșteTestCapitol(capitolId, tip === 'evaluare');
            
            // Ascundem rezultatele
            document.getElementById('results-container').classList.add('hidden');
            return;
        }

        // Altfel, comportamentul standard: revenire la meniu
        document.getElementById('results-container').classList.add('hidden');
        document.getElementById('test-container').classList.add('hidden');
        document.querySelector('.main-content').classList.remove('hidden');
        
        this.testCurent = null;
        this.raspunsuriUtilizator = {};
        this.indexProblemaCurenta = 0;
        this.opresteTimer();
    }

    revizuireRaspunsuri() {
        // Revenim la test pentru a revizui răspunsurile
        document.getElementById('results-container').classList.add('hidden');
        document.getElementById('test-container').classList.remove('hidden');
        
        // Dezactivăm butoanele de navigare și răspunsuri
        document.querySelectorAll('.answer-option input').forEach(input => input.disabled = true);
        document.getElementById('prev-btn').disabled = true;
        document.getElementById('next-btn').disabled = true;
        document.getElementById('finish-btn').style.display = 'none';
        
        // Afișăm prima problemă
        this.afiseazaProblema(0);
    }

    revenireLaCapitole() {
        // Ascundem toate containerele de test/rezultate
        document.getElementById('test-container').classList.add('hidden');
        document.getElementById('results-container').classList.add('hidden');
        
        // Afișăm selecția de capitole
        document.getElementById('capitol-selection').classList.remove('hidden');
        document.querySelector('.nivel-selection').classList.add('hidden');
        
        // Resetăm starea
        this.testCurent = null;
        this.raspunsuriUtilizator = {};
        this.indexProblemaCurenta = 0;
        
        // Oprim timer-ul
        this.opresteTimer();
    }

    pornesteTimer() {
        this.timpStart = Date.now();
        this.timerInterval = setInterval(() => {
            const timpTrecut = Math.floor((Date.now() - this.timpStart) / 1000);
            const minute = Math.floor(timpTrecut / 60);
            const secunde = timpTrecut % 60;
            
            document.getElementById('timer').textContent = 
                `${minute.toString().padStart(2, '0')}:${secunde.toString().padStart(2, '0')}`;
        }, 1000);
    }

    opresteTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    async incarcaDate() {
        try {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            
            input.onchange = async (event) => {
                const file = event.target.files[0];
                if (file) {
                    const text = await file.text();
                    const data = JSON.parse(text);
                    
                    // Încărcăm datele în sistem
                    const nivel = prompt('Introdu nivelul (standard/avansat):');
                    if (nivel) {
                        this.sistemIncarcare.adaugaProbleme(nivel, data.probleme || data);
                        alert('Datele au fost încărcate cu succes!');
                    }
                }
            };
            
            input.click();
        } catch (error) {
            console.error('Eroare la încărcarea datelor:', error);
            this.afiseazaEroare('Nu s-au putut încărca datele');
        }
    }

    async adaugaProbleme() {
        // Aici ar putea fi o interfață mai complexă pentru adăugare probleme
        const problemaText = prompt('Introdu problema în format JSON:');
        if (problemaText) {
            try {
                const problema = JSON.parse(problemaText);
                const nivel = prompt('Introdu nivelul (standard/avansat):');
                if (nivel) {
                    this.sistemIncarcare.adaugaProbleme(nivel, [problema]);
                    alert('Problema a fost adăugată cu succes!');
                }
            } catch (error) {
                this.afiseazaEroare('Format JSON invalid');
            }
        }
    }

    async exportaDate() {
        try {
            const nivel = prompt('Introdu nivelul de exportat (standard/avansat):');
            if (nivel) {
                await this.sistemIncarcare.salveazaDatele(nivel);
            }
        } catch (error) {
            console.error('Eroare la exportarea datelor:', error);
            this.afiseazaEroare('Nu s-au putut exporta datele');
        }
    }

    afiseazaEroare(mesaj) {
        alert(`Eroare: ${mesaj}`);
    }

    arataSelectieCapitole() {
        // Ascundem selecția de niveluri
        document.querySelector('.nivel-selection').classList.add('hidden');
        
        // Afișăm selecția de capitole
        document.getElementById('capitol-selection').classList.remove('hidden');
        
        // Încărcăm capitolele
        this.incarcaCapitole();
    }

    ascundeSelectieCapitole() {
        // Ascundem selecția de capitole
        document.getElementById('capitol-selection').classList.add('hidden');
        
        // Afișăm selecția de niveluri
        document.querySelector('.nivel-selection').classList.remove('hidden');
    }

    incarcaCapitole() {
        const container = document.getElementById('capitol-cards');
        if (!container) {
            console.error('Containerul #capitol-cards nu a fost găsit!');
            return;
        }
        
        container.innerHTML = '';

        CAPITOLE_STANDARD.forEach(capitol => {
            const card = document.createElement('div');
            card.className = 'capitol-card';
            
            // Forțăm butonul "TESTEAZĂ CUNOȘTINȚELE" pentru Capitolul 1
            const buttonHtml = `<button class="btn btn-test" onclick="app.porneșteTestCapitol('${capitol.id}', false)">TESTEAZĂ CUNOȘTINȚELE</button>`;

            card.innerHTML = `
                <div class="capitol-header">
                    <h3>${capitol.nume}</h3>
                    <span class="badge">ACTIV</span>
                </div>
                <div class="capitol-info">
                    <p><strong>Descriere:</strong> ${capitol.descriere}</p>
                    <p><strong>Subiecte:</strong> ${capitol.subiecte.length} teme de studiu</p>
                </div>
                <div class="capitol-actions" style="justify-content: center; margin-top: 20px;">
                    ${buttonHtml}
                </div>
            `;
            
            container.appendChild(card);
        });
        
        console.log('Cardurile de capitol au fost injectate în DOM');
    }

    async porneșteTestCapitol(capitolId, evaluare = false) {
        try {
            if (capitolId === 'cap_1') {
                // Folosim generatorul dinamic pentru Capitolul 1
                const testDinamic = this.motorProbleme.genereazaTestDinamic();
                this.testCurent = {
                    ...testDinamic,
                    tip: evaluare ? 'evaluare' : 'exercitii'
                };
            } else {
                // Pentru alte capitole (dacă vor fi adăugate), folosim metoda veche
                const problemeCapitol = this.getProblemeCapitol(capitolId);
                if (problemeCapitol.length === 0) {
                    this.afiseazaEroare('Nu există probleme pentru acest capitol încă');
                    return;
                }
                const numarProbleme = Math.min(problemeCapitol.length, evaluare ? 10 : 5);
                const problemeTest = this.selecteazaProblemeAleatorii(problemeCapitol, numarProbleme);
                
                this.testCurent = {
                    probleme: problemeTest,
                    nivel: 'standard',
                    capitol: capitolId,
                    tip: evaluare ? 'evaluare' : 'exercitii'
                };
            }
            
            // Resetăm starea
            this.raspunsuriUtilizator = {};
            this.indexProblemaCurenta = 0;
            
            // Afișăm containerul de test
            this.afiseazaTest();
            
            // Începem timer-ul
            this.pornesteTimer();
            
            console.log(`Test pornit pentru capitolul ${capitolId}`);
        } catch (error) {
            console.error('Eroare la pornirea testului de capitol:', error);
            this.afiseazaEroare('Nu s-a putut porni testul de capitol');
        }
    }

    getProblemeCapitol(capitolId) {
        const capitol = CAPITOLE_STANDARD.find(c => c.id === capitolId);
        if (!capitol) return [];
        
        // Filtrăm problemele după subcompetențele capitolului
        return DATABASE_NIVEL_STANDARD.probleme.filter(problema => {
            return capitol.subcompetente.includes(problema.subcompetenta);
        });
    }

    selecteazaProblemeAleatorii(probleme, numar) {
        const problemeSelectate = [];
        const problemeDisponibile = [...probleme];
        
        for (let i = 0; i < numar && problemeDisponibile.length > 0; i++) {
            const indexAleatoriu = Math.floor(Math.random() * problemeDisponibile.length);
            problemeSelectate.push(problemeDisponibile[indexAleatoriu]);
            problemeDisponibile.splice(indexAleatoriu, 1);
        }
        
        return problemeSelectate;
    }

    async porneșteTestStandard() {
        // Aceasta este funcția originală pentru test standard
        await this.porneșteTest('standard');
    }
}

// Pornim aplicația când se încarcă pagina
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new SpeedyMateApp();
});
