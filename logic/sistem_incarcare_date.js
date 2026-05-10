/**
 * Sistem de Încărcare Date pentru Simulator Matematică
 * Suportă încărcare probleme pentru nivelurile standard și avansat
 */

class SistemIncarcareDate {
    constructor() {
        this.niveluri = {
            standard: null,
            avansat: null,
            expert: null
        };
        this.initializat = false;
    }

    /**
     * Inițializează sistemul și încarcă datele existente
     */
    async init() {
        try {
            // Încarcă nivelul standard
            await this.incarcaNivel('standard');
            
            // Încarcă nivelul avansat (dacă există)
            await this.incarcaNivel('avansat');
            
            // Încarcă nivelul olimpiadă
            await this.incarcaNivel('olimpiada');
            
            // Încarcă nivelul expert (dacă există)
            await this.incarcaNivel('expert');
            
            this.initializat = true;
            console.log('Sistem de încărcare date inițializat');
        } catch (error) {
            console.error('Eroare la inițializare:', error);
        }
    }

    /**
     * Încarcă datele pentru un nivel specific
     */
    async incarcaNivel(nivel) {
        try {
            // Folosim datele embed pentru a evita probleme CORS
            if (nivel === 'standard') {
                this.niveluri[nivel] = DATABASE_NIVEL_STANDARD;
                console.log(`Nivel ${nivel} încărcat cu ${this.niveluri[nivel].probleme.length} probleme`);
            } else if (nivel === 'avansat') {
                this.niveluri[nivel] = DATABASE_NIVEL_AVANSAT;
                console.log(`Nivel ${nivel} încărcat cu ${this.niveluri[nivel].probleme.length} probleme`);
            } else if (nivel === 'olimpiada') {
                this.niveluri[nivel] = DATABASE_NIVEL_OLIMPIADA;
                console.log(`Nivel ${nivel} încărcat cu ${this.niveluri[nivel].probleme.length} probleme`);
            } else {
                console.log(`Nivelul ${nivel} nu există încă`);
            }
        } catch (error) {
            console.log(`Nu s-a putut încărca nivelul ${nivel}:`, error.message);
        }
    }

    /**
     * Adaugă probleme noi în baza de date
     */
    adaugaProbleme(nivel, problemeNoi) {
        if (!this.niveluri[nivel]) {
            throw new Error(`Nivelul ${nivel} nu este inițializat`);
        }

        // Validează problemele noi
        const problemeValidate = problemeNoi.map((problema, index) => {
            return this.valideazaProblema(problema, nivel, index);
        });

        // Adaugă problemele validate
        this.niveluri[nivel].probleme.push(...problemeValidate);
        
        // Actualizează metadatele
        this.niveluri[nivel].metadata.total_probleme = this.niveluri[nivel].probleme.length;
        this.niveluri[nivel].metadata.ultima_actualizare = new Date().toISOString();

        // Recalculează statisticile
        this.recalculeazaStatistici(nivel);

        console.log(`Am adăugat ${problemeNoi.length} probleme la nivelul ${nivel}`);
        return problemeValidate;
    }

    /**
     * Validează o problemă înainte de adăugare
     */
    valideazaProblema(problema, nivel, index) {
        const erori = [];

        // Verificări obligatorii
        if (!problema.enunt || problema.enunt.trim() === '') {
            erori.push('Enunțul este obligatoriu');
        }

        if (!problema.variante || !problema.variante.a || !problema.variante.b || !problema.variante.c || !problema.variante.d) {
            erori.push('Toate cele 4 variante de răspuns sunt obligatorii');
        }

        if (!problema.raspuns_corect || !['a', 'b', 'c', 'd'].includes(problema.raspuns_corect.toLowerCase())) {
            erori.push('Răspunsul corect trebuie să fie a, b, c sau d');
        }

        if (!problema.competenta || problema.competenta < 1 || problema.competenta > 3) {
            erori.push('Competența trebuie să fie între 1 și 3');
        }

        if (!problema.subcompetenta) {
            erori.push('Subcompetența este obligatorie');
        }

        if (!['usor', 'mediu', 'greu'].includes(problema.dificultate)) {
            erori.push('Dificultatea trebuie să fie usor, mediu sau greu');
        }

        if (erori.length > 0) {
            throw new Error(`Problema ${index + 1} conține erori: ${erori.join(', ')}`);
        }

        // Generează ID unic dacă nu există
        if (!problema.id) {
            problema.id = this.genereazaIdProblema(nivel);
        }

        // Asigură formatul corect
        return {
            id: problema.id,
            competenta: problema.competenta,
            subcompetenta: problema.subcompetenta,
            subiect: problema.subiect || 'General',
            tip: problema.tip || 'general',
            enunt: problema.enunt.trim(),
            variante: {
                a: problema.variante.a.trim(),
                b: problema.variante.b.trim(),
                c: problema.variante.c.trim(),
                d: problema.variante.d.trim()
            },
            raspuns_corect: problema.raspuns_corect.toLowerCase(),
            dificultate: problema.dificultate,
            explicatie: problema.explicatie || 'Explicație indisponibilă'
        };
    }

    /**
     * Generează un ID unic pentru problemă
     */
    genereazaIdProblema(nivel) {
        const prefix = nivel.substring(0, 3); // std, ava, exp
        const timestamp = Date.now();
        const random = Math.random().toString(36).substr(2, 6);
        return `${prefix}_${timestamp}_${random}`;
    }

    /**
     * Recalculează statisticile pentru un nivel
     */
    recalculeazaStatistici(nivel) {
        const probleme = this.niveluri[nivel].probleme;
        
        const statistici = {
            probleme_pe_competenta: {},
            probleme_pe_dificultate: {},
            probleme_pe_tip: {}
        };

        probleme.forEach(problema => {
            // Statistici pe competență
            statistici.probleme_pe_competenta[problema.competenta] = 
                (statistici.probleme_pe_competenta[problema.competenta] || 0) + 1;

            // Statistici pe dificultate
            statistici.probleme_pe_dificultate[problema.dificultate] = 
                (statistici.probleme_pe_dificultate[problema.dificultate] || 0) + 1;

            // Statistici pe tip
            statistici.probleme_pe_tip[problema.tip] = 
                (statistici.probleme_pe_tip[problema.tip] || 0) + 1;
        });

        this.niveluri[nivel].statistici = statistici;
    }

    /**
     * Importă probleme din format JSON
     */
    importProblemeJSON(nivel, jsonData) {
        try {
            const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
            
            if (!Array.isArray(data)) {
                throw new Error('Datele trebuie să fie un array de probleme');
            }

            return this.adaugaProbleme(nivel, data);
        } catch (error) {
            throw new Error(`Eroare la import JSON: ${error.message}`);
        }
    }

    /**
     * Exportă problemele unui nivel în format JSON
     */
    exportProblemeJSON(nivel) {
        if (!this.niveluri[nivel]) {
            throw new Error(`Nivelul ${nivel} nu există`);
        }

        return JSON.stringify(this.niveluri[nivel], null, 2);
    }

    /**
     * Salvează datele în fișier (simulare - în realitate ar necesita backend)
     */
    async salveazaDatele(nivel) {
        if (!this.niveluri[nivel]) {
            throw new Error(`Nivelul ${nivel} nu există`);
        }

        // Într-o implementare reală, aici s-ar face un request către server
        // Pentru acum, doar returnăm datele pentru a fi descărcate
        const data = this.exportProblemeJSON(nivel);
        
        // Creăm un blob pentru descărcare
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `database_nivel_${nivel}_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        console.log(`Datele pentru nivelul ${nivel} au fost descărcate`);
    }

    /**
     * Caută probleme duplicate
     */
    cautaProblemeDuplicate(nivel) {
        if (!this.niveluri[nivel]) {
            return [];
        }

        const probleme = this.niveluri[nivel].probleme;
        const duplicate = [];
        
        for (let i = 0; i < probleme.length; i++) {
            for (let j = i + 1; j < probleme.length; j++) {
                if (probleme[i].enunt === probleme[j].enunt) {
                    duplicate.push({
                        problema1: probleme[i].id,
                        problema2: probleme[j].id,
                        enunt: probleme[i].enunt
                    });
                }
            }
        }

        return duplicate;
    }

    /**
     * Șterge o problemă după ID
     */
    stergeProblema(nivel, problemaId) {
        if (!this.niveluri[nivel]) {
            throw new Error(`Nivelul ${nivel} nu există`);
        }

        const index = this.niveluri[nivel].probleme.findIndex(p => p.id === problemaId);
        if (index === -1) {
            throw new Error(`Problema cu ID ${problemaId} nu a fost găsită`);
        }

        this.niveluri[nivel].probleme.splice(index, 1);
        this.recalculeazaStatistici(nivel);
        
        console.log(`Problema ${problemaId} a fost ștearsă din nivelul ${nivel}`);
    }

    /**
     * Obține statistici complete pentru toate nivelurile
     */
    getStatisticiComplete() {
        const stats = {};
        
        Object.keys(this.niveluri).forEach(nivel => {
            if (this.niveluri[nivel]) {
                stats[nivel] = {
                    total_probleme: this.niveluri[nivel].probleme.length,
                    ultima_actualizare: this.niveluri[nivel].metadata.ultima_actualizare,
                    statistici: this.niveluri[nivel].statistici
                };
            }
        });

        return stats;
    }

    /**
     * Creează structura pentru un nou nivel
     */
    creeazaStructuraNivel(nivel, titlu, descriere) {
        if (this.niveluri[nivel]) {
            throw new Error(`Nivelul ${nivel} există deja`);
        }

        this.niveluri[nivel] = {
            metadata: {
                nivel: nivel,
                titlu: titlu,
                descriere: descriere,
                disciplina: "Matematică",
                clasa: "a V-a",
                total_probleme: 0,
                ultima_actualizare: new Date().toISOString()
            },
            probleme: [],
            statistici: {
                probleme_pe_competenta: {},
                probleme_pe_dificultate: {},
                probleme_pe_tip: {}
            }
        };

        console.log(`Structura pentru nivelul ${nivel} a fost creată`);
    }
}

// Exportă clasa pentru utilizare
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SistemIncarcareDate;
} else {
    window.SistemIncarcareDate = SistemIncarcareDate;
}
