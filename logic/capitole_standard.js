/**
 * Structura capitolelor pentru nivelul standard - Clasa a V-a
 * Conform programa școlară de matematică
 */

const CAPITOLE_STANDARD = [
    {
        "id": "cap_1",
        "nume": "Capitolul 1: Numere Naturale",
        "subcompetente": [1.1],
        "tip_activ": "exercitii", // Poate fi 'exercitii' sau 'evaluare'
        "descriere": "Scrierea, citirea și compararea numerelor naturale",
        "subiecte": [
            "Scrierea și citirea numerelor naturale în sistemul zecimal",
            "Identificarea numerelor în diagrame, grafice, tabele",
            "Determinarea numerelor pe baza condițiilor impuse cifrelor",
            "Metode aritmetice adecvate pentru rezolvarea problemelor"
        ]
    }
];

// Funcție pentru a obține problemele pentru un capitol specific
function getProblemeCapitol(capitolId, probleme) {
    const capitol = CAPITOLE_STANDARD.find(c => c.id === capitolId);
    if (!capitol) return [];
    
    return probleme.filter(problema => {
        return capitol.subcompetente.includes(problema.competenta);
    });
}

// Funcție pentru a obține toate problemele (toată materia)
function getToateProblemele(probleme) {
    return probleme;
}

// Export pentru utilizare în alte fișiere
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CAPITOLE_STANDARD,
        getProblemeCapitol,
        getToateProblemele
    };
}
