/**
 * Motor de Generare Dinamică Probleme - Capitolul 1
 * Speedy-MATE5
 */

class MotorProbleme {
    constructor() {
        this.initializat = true;
    }

    /**
     * Generator de numere aleatorii între min și max (inclusiv)
     */
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Amestecă un array (Fisher-Yates)
     */
    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    /**
     * Template-uri pentru Capitolul 1 - Numere Naturale
     */
    get TemplatesCap1() {
        return [
            // 1. Comparare
            () => {
                const x = this.randomInt(100, 999);
                let y;
                do { y = this.randomInt(100, 999); } while (x === y);
                
                const corect = x > y ? x : y;
                const incorect = x > y ? y : x;
                const varC = corect;
                const varI1 = incorect;
                const varI2 = this.randomInt(100, 999);
                const varI3 = this.randomInt(100, 999);

                const variante = this.shuffle([
                    { text: varC.toString(), val: 'c' },
                    { text: varI1.toString(), val: 'i' },
                    { text: varI2.toString(), val: 'i' },
                    { text: varI3.toString(), val: 'i' }
                ]);

                return {
                    id: `din_comp_${Date.now()}`,
                    enunt: `Care dintre următoarele numere este mai mare: <strong>${x}</strong> sau <strong>${y}</strong>?`,
                    variante: {
                        a: variante[0].text,
                        b: variante[1].text,
                        c: variante[2].text,
                        d: variante[3].text
                    },
                    raspuns_corect: ['a', 'b', 'c', 'd'][variante.findIndex(v => v.val === 'c')],
                    explicatie: `Comparând cifrele de la stânga la dreapta, observăm că ${corect} este mai mare decât ${incorect}.`
                };
            },

            // 2. Succesor
            () => {
                const x = this.randomInt(1000, 9999);
                const corect = x + 1;
                const variante = this.shuffle([
                    { text: (x + 1).toString(), val: 'c' },
                    { text: (x - 1).toString(), val: 'i' },
                    { text: (x + 10).toString(), val: 'i' },
                    { text: (x + 2).toString(), val: 'i' }
                ]);

                return {
                    id: `din_succ_${Date.now()}`,
                    enunt: `Care este numărul care urmează imediat după <strong>${x}</strong> (succesorul)?`,
                    variante: {
                        a: variante[0].text,
                        b: variante[1].text,
                        c: variante[2].text,
                        d: variante[3].text
                    },
                    raspuns_corect: ['a', 'b', 'c', 'd'][variante.findIndex(v => v.val === 'c')],
                    explicatie: `Succesorul unui număr se obține adunând 1 la acel număr: ${x} + 1 = ${corect}.`
                };
            },

            // 3. Cifra pozițională
            () => {
                const x = this.randomInt(1000, 9999);
                const cifre = x.toString().split('');
                const pozitii = ['miilor', 'sutelor', 'zecilor', 'unităților'];
                const posIdx = this.randomInt(0, 3);
                const corect = cifre[posIdx];

                const variantePool = new Set([corect]);
                while(variantePool.size < 4) {
                    variantePool.add(this.randomInt(0, 9).toString());
                }
                const varianteArr = this.shuffle(Array.from(variantePool).map(v => ({ text: v, val: v === corect ? 'c' : 'i' })));

                return {
                    id: `din_pos_${Date.now()}`,
                    enunt: `În numărul <strong>${x}</strong>, care este cifra <strong>${pozitii[posIdx]}</strong>?`,
                    variante: {
                        a: varianteArr[0].text,
                        b: varianteArr[1].text,
                        c: varianteArr[2].text,
                        d: varianteArr[3].text
                    },
                    raspuns_corect: ['a', 'b', 'c', 'd'][varianteArr.findIndex(v => v.val === 'c')],
                    explicatie: `Pozițiile cifrelor în ${x} sunt: ${cifre[0]} (mii), ${cifre[1]} (sute), ${cifre[2]} (zeci), ${cifre[3]} (unități).`
                };
            },

            // 4. Rotunjire la sute
            () => {
                const x = this.randomInt(1000, 9000);
                const rest = x % 100;
                const corect = rest < 50 ? x - rest : x + (100 - rest);
                
                const variante = this.shuffle([
                    { text: corect.toString(), val: 'c' },
                    { text: (corect - 100).toString(), val: 'i' },
                    { text: (corect + 100).toString(), val: 'i' },
                    { text: (x - (x % 10)).toString(), val: 'i' }
                ]);

                return {
                    id: `din_rot_${Date.now()}`,
                    enunt: `Rotunjiți numărul <strong>${x}</strong> la cea mai apropiată <strong>sută</strong>:`,
                    variante: {
                        a: variante[0].text,
                        b: variante[1].text,
                        c: variante[2].text,
                        d: variante[3].text
                    },
                    raspuns_corect: ['a', 'b', 'c', 'd'][variante.findIndex(v => v.val === 'c')],
                    explicatie: `Pentru rotunjirea la sute, privim cifra zecilor. Dacă este < 5, rotunjim prin lipsă. Dacă este >= 5, rotunjim prin adaos. ${x} este mai aproape de ${corect}.`
                };
            },

            // 5. Formare număr
            () => {
                const sute = this.randomInt(1, 9);
                const zeci = this.randomInt(0, 9);
                const unitati = this.randomInt(0, 9);
                const corect = sute * 100 + zeci * 10 + unitati;

                const variante = this.shuffle([
                    { text: corect.toString(), val: 'c' },
                    { text: `${unitati}${zeci}${sute}`, val: 'i' },
                    { text: `${sute}0${zeci}${unitati}`, val: 'i' },
                    { text: `${sute}${zeci}0${unitati}`, val: 'i' }
                ]);

                return {
                    id: `din_form_${Date.now()}`,
                    enunt: `Ce număr este format din <strong>${sute} sute</strong>, <strong>${zeci} zeci</strong> și <strong>${unitati} unități</strong>?`,
                    variante: {
                        a: variante[0].text,
                        b: variante[1].text,
                        c: variante[2].text,
                        d: variante[3].text
                    },
                    raspuns_corect: ['a', 'b', 'c', 'd'][variante.findIndex(v => v.val === 'c')],
                    explicatie: `${sute} sute = ${sute * 100}, ${zeci} zeci = ${zeci * 10}, ${unitati} unități = ${unitati}. Suma: ${corect}.`
                };
            },

            // 6. Suma cifrelor
            () => {
                const x = this.randomInt(100, 999);
                const digits = x.toString().split('').map(Number);
                const corect = digits.reduce((a, b) => a + b, 0);

                const variantePool = new Set([corect]);
                while(variantePool.size < 4) {
                    variantePool.add(this.randomInt(1, 27));
                }
                const varianteArr = this.shuffle(Array.from(variantePool).map(v => ({ text: v.toString(), val: v === corect ? 'c' : 'i' })));

                return {
                    id: `din_sumc_${Date.now()}`,
                    enunt: `Care este suma cifrelor numărului <strong>${x}</strong>?`,
                    variante: {
                        a: varianteArr[0].text,
                        b: varianteArr[1].text,
                        c: varianteArr[2].text,
                        d: varianteArr[3].text
                    },
                    raspuns_corect: ['a', 'b', 'c', 'd'][varianteArr.findIndex(v => v.val === 'c')],
                    explicatie: `Cifrele numărului ${x} sunt ${digits.join(', ')}. Suma lor este ${digits.join(' + ')} = ${corect}.`
                };
            },

            // 7. Par/Impar
            () => {
                const tip = Math.random() > 0.5 ? 'par' : 'impar';
                let corect, i1, i2, i3;
                if (tip === 'par') {
                    corect = this.randomInt(50, 500) * 2;
                    i1 = this.randomInt(50, 500) * 2 + 1;
                    i2 = this.randomInt(50, 500) * 2 + 3;
                    i3 = this.randomInt(50, 500) * 2 + 5;
                } else {
                    corect = this.randomInt(50, 500) * 2 + 1;
                    i1 = this.randomInt(50, 500) * 2;
                    i2 = this.randomInt(50, 500) * 2 + 2;
                    i3 = this.randomInt(50, 500) * 2 + 4;
                }

                const variante = this.shuffle([
                    { text: corect.toString(), val: 'c' },
                    { text: i1.toString(), val: 'i' },
                    { text: i2.toString(), val: 'i' },
                    { text: i3.toString(), val: 'i' }
                ]);

                return {
                    id: `din_par_${Date.now()}`,
                    enunt: `Care dintre următoarele numere este un număr <strong>${tip}</strong>?`,
                    variante: {
                        a: variante[0].text,
                        b: variante[1].text,
                        c: variante[2].text,
                        d: variante[3].text
                    },
                    raspuns_corect: ['a', 'b', 'c', 'd'][variante.findIndex(v => v.val === 'c')],
                    explicatie: `Un număr este par dacă ultima sa cifră este 0, 2, 4, 6 sau 8. Altfel, este impar.`
                };
            },

            // 8. Predecesor
            () => {
                const x = this.randomInt(100, 9999);
                const corect = x - 1;
                const variante = this.shuffle([
                    { text: (x - 1).toString(), val: 'c' },
                    { text: (x + 1).toString(), val: 'i' },
                    { text: (x - 10).toString(), val: 'i' },
                    { text: (x - 2).toString(), val: 'i' }
                ]);

                return {
                    id: `din_pred_${Date.now()}`,
                    enunt: `Care este numărul care se află imediat înaintea lui <strong>${x}</strong> (predecesorul)?`,
                    variante: {
                        a: variante[0].text,
                        b: variante[1].text,
                        c: variante[2].text,
                        d: variante[3].text
                    },
                    raspuns_corect: ['a', 'b', 'c', 'd'][variante.findIndex(v => v.val === 'c')],
                    explicatie: `Predecesorul unui număr se obține scăzând 1 din acel număr: ${x} - 1 = ${corect}.`
                };
            },

            // 9. Cel mai mare număr de 3 cifre cu condiție
            () => {
                const cifre = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
                this.shuffle(cifre);
                const c1 = cifre[0] === 0 ? cifre[1] : cifre[0];
                const c2 = cifre[2];
                const c3 = cifre[3];
                const nums = [c1, c2, c3].sort((a, b) => b - a);
                const corect = nums.join('');

                const variante = this.shuffle([
                    { text: corect, val: 'c' },
                    { text: nums.reverse().join(''), val: 'i' },
                    { text: '999', val: 'i' },
                    { text: '100', val: 'i' }
                ]);

                return {
                    id: `din_maxc_${Date.now()}`,
                    enunt: `Care este cel mai mare număr care se poate forma folosind exact o singură dată cifrele: <strong>${c1}, ${c2}, ${c3}</strong>?`,
                    variante: {
                        a: variante[0].text,
                        b: variante[1].text,
                        c: variante[2].text,
                        d: variante[3].text
                    },
                    raspuns_corect: ['a', 'b', 'c', 'd'][variante.findIndex(v => v.val === 'c')],
                    explicatie: `Pentru a forma cel mai mare număr, așezăm cifrele în ordine descrescătoare: ${nums.sort((a,b)=>b-a).join(' > ')}.`
                };
            },

            // 10. Descompunere
            () => {
                const a = this.randomInt(1, 9);
                const b = this.randomInt(0, 9);
                const c = this.randomInt(0, 9);
                const num = a * 100 + b * 10 + c;
                const corect = `${a}x100 + ${b}x10 + ${c}`;
                
                const variante = this.shuffle([
                    { text: corect, val: 'c' },
                    { text: `${a}x100 + ${b}x100 + ${c}`, val: 'i' },
                    { text: `${a} + ${b} + ${c}`, val: 'i' },
                    { text: `${a}x10 + ${b}x10 + ${c}`, val: 'i' }
                ]);

                return {
                    id: `din_desc_${Date.now()}`,
                    enunt: `Care este descompunerea corectă a numărului <strong>${num}</strong> în funcție de puterile lui 10?`,
                    variante: {
                        a: variante[0].text,
                        b: variante[1].text,
                        c: variante[2].text,
                        d: variante[3].text
                    },
                    raspuns_corect: ['a', 'b', 'c', 'd'][variante.findIndex(v => v.val === 'c')],
                    explicatie: `Numărul ${num} are ${a} sute, ${b} zeci și ${c} unități. Deci: ${a}x100 + ${b}x10 + ${c}.`
                };
            }
        ];
    }

    /**
     * Generează un test de 10 probleme folosind template-uri diferite
     */
    genereazaTestDinamic() {
        const templatePool = [...this.TemplatesCap1];
        this.shuffle(templatePool);
        
        // Luăm primele 10 template-uri (avem exact 10 acum)
        const probleme = templatePool.slice(0, 10).map((templateFunc, index) => {
            const problema = templateFunc();
            return {
                ...problema,
                ordine: index + 1
            };
        });

        return {
            id_test: 'din_test_' + Date.now(),
            data_creare: new Date().toISOString(),
            probleme: probleme,
            nivel: 'standard',
            capitol: 'cap_1'
        };
    }

    /**
     * Calculează punctajul (necesar pentru compatibilitate cu app.js)
     */
    calculeazaPunctaj(test, raspunsuri) {
        let punctajTotal = 0;
        let rezultateDetaliate = [];

        test.probleme.forEach((problema, index) => {
            const raspunsUtilizator = raspunsuri[problema.id];
            const corect = raspunsUtilizator === problema.raspuns_corect;
            
            rezultateDetaliate.push({
                problema_id: problema.id,
                ordine: index + 1,
                corect: corect,
                punctaj: corect ? 1 : 0,
                raspuns_utilizator: raspunsUtilizator,
                raspuns_corect: problema.raspuns_corect,
                explicatie: problema.explicatie
            });

            if (corect) punctajTotal++;
        });

        return {
            punctaj_total: punctajTotal,
            punctaj_maxim: test.probleme.length,
            procentaj: Math.round((punctajTotal / test.probleme.length) * 100),
            rezultate_detaliate: rezultateDetaliate
        };
    }
}

// Export pentru utilizare
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MotorProbleme;
} else {
    window.MotorProbleme = MotorProbleme;
}
