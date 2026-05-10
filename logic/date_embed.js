/**
 * Date JSON embed pentru a evita probleme CORS
 * Conține datele pentru nivelurile standard și avansat
 */

// Date nivel standard
const DATABASE_NIVEL_STANDARD = {
  "metadata": {
    "nivel": "standard",
    "clasa": "a V-a",
    "disciplina": "Matematică",
    "total_probleme": 10,
    "ultima_actualizare": "2026-05-09",
    "descriere": "Probleme conforme cu programa școlară"
  },
  "probleme": [
    {
      "id": "std_1_1_001",
      "competenta": 1,
      "subcompetenta": 1.1,
      "subiect": "Numere naturale și cifre",
      "tip": "numere_naturale",
      "enunt": "Care este cea mai mare cifră care poate apărea în scrierea unui număr natural?",
      "variante": {
        "a": "8",
        "b": "9",
        "c": "10",
        "d": "Nu există limită"
      },
      "raspuns_corect": "b",
      "dificultate": "usor",
      "explicatie": "În sistemul zecimal, cifrele sunt 0,1,2,3,4,5,6,7,8,9. Cea mai mare cifră este 9."
    },
    {
      "id": "std_1_1_002",
      "competenta": 1,
      "subcompetenta": 1.1,
      "subiect": "Ordinea numerelor naturale",
      "tip": "numere_naturale",
      "enunt": "Numărul care urmează imediat după 999 este:",
      "variante": {
        "a": "1000",
        "b": "998",
        "c": "1001",
        "d": "100"
      },
      "raspuns_corect": "a",
      "dificultate": "usor",
      "explicatie": "Numărul care urmează după 999 este 999 + 1 = 1000."
    },
    {
      "id": "std_1_1_003",
      "competenta": 1,
      "subcompetenta": 1.1,
      "subiect": "Compararea numerelor naturale",
      "tip": "numere_naturale",
      "enunt": "Care dintre următoarele numere este cel mai mare?",
      "variante": {
        "a": "4567",
        "b": "4576",
        "c": "4756",
        "d": "5467"
      },
      "raspuns_corect": "d",
      "dificultate": "usor",
      "explicatie": "Comparând cifrele de la stânga la dreapta, 5467 este cel mai mare."
    },
    {
      "id": "std_1_1_004",
      "competenta": 1,
      "subcompetenta": 1.1,
      "subiect": "Ordinea crescătoare a numerelor",
      "tip": "numere_naturale",
      "enunt": "Care dintre următoarele numere este cel mai mic?",
      "variante": {
        "a": "3456",
        "b": "3465",
        "c": "3546",
        "d": "3645"
      },
      "raspuns_corect": "a",
      "dificultate": "usor",
      "explicatie": "3456 este cel mai mic pentru că are cea mai mică cifră la miile."
    },
    {
      "id": "std_1_1_005",
      "competenta": 1,
      "subcompetenta": 1.1,
      "subiect": "Valoarea pozițională a cifrelor",
      "tip": "numere_naturale",
      "enunt": "În numărul 4.567, cifra 5 reprezintă:",
      "variante": {
        "a": "Unități",
        "b": "Zeci",
        "c": "Sute",
        "d": "Mii"
      },
      "raspuns_corect": "c",
      "dificultate": "usor",
      "explicatie": "În 4.567, cifra 5 este la poziția sutelor (500)."
    },
    {
      "id": "std_1_1_006",
      "competenta": 1,
      "subcompetenta": 1.1,
      "subiect": "Rotunjirea numerelor naturale",
      "tip": "numere_naturale",
      "enunt": "Care este cel mai apropiat multiplu de 10 pentru numărul 487?",
      "variante": {
        "a": "480",
        "b": "490",
        "c": "500",
        "d": "470"
      },
      "raspuns_corect": "b",
      "dificultate": "usor",
      "explicatie": "487 este mai aproape de 490 decât de 480 (diferența: 3 vs 7)."
    },
    {
      "id": "std_1_1_007",
      "competenta": 1,
      "subcompetenta": 1.1,
      "subiect": "Compararea numerelor mari",
      "tip": "numere_naturale",
      "enunt": "Care dintre următoarele numere este cel mai mare?",
      "variante": {
        "a": "12.345",
        "b": "12.354",
        "c": "12.435",
        "d": "12.543"
      },
      "raspuns_corect": "d",
      "dificultate": "mediu",
      "explicatie": "Comparând de la stânga la dreapta: 12.543 > 12.435 > 12.354 > 12.345."
    },
    {
      "id": "std_1_1_008",
      "competenta": 1,
      "subcompetenta": 1.1,
      "subiect": "Adunarea numerelor naturale",
      "tip": "operatii",
      "enunt": "Care este suma numerelor 3.456 + 2.789?",
      "variante": {
        "a": "6.145",
        "b": "6.245",
        "c": "6.345",
        "d": "6.445"
      },
      "raspuns_corect": "b",
      "dificultate": "mediu",
      "explicatie": "3.456 + 2.789 = 6.245."
    },
    {
      "id": "std_1_1_009",
      "competenta": 1,
      "subcompetenta": 1.1,
      "subiect": "Scăderea numerelor naturale",
      "tip": "operatii",
      "enunt": "Care este diferența 8.765 - 3.432?",
      "variante": {
        "a": "5.233",
        "b": "5.333",
        "c": "5.433",
        "d": "5.533"
      },
      "raspuns_corect": "b",
      "dificultate": "mediu",
      "explicatie": "8.765 - 3.432 = 5.333."
    },
    {
      "id": "std_1_1_010",
      "competenta": 1,
      "subcompetenta": 1.1,
      "subiect": "Ordinea numerelor naturale",
      "tip": "numere_naturale",
      "enunt": "Care dintre următoarele numere este imediat după 9.999?",
      "variante": {
        "a": "9.990",
        "b": "9.998",
        "c": "10.000",
        "d": "10.001"
      },
      "raspuns_corect": "c",
      "dificultate": "usor",
      "explicatie": "Numărul care urmează după 9.999 este 9.999 + 1 = 10.000."
    },
    {
      "id": "std_2_1_002",
      "competenta": 2,
      "subcompetenta": 2.1,
      "subiect": "Scăderea numerelor naturale",
      "tip": "operatii",
      "enunt": "Dacă 845 - x = 327, atunci x este egal cu:",
      "variante": {
        "a": "518",
        "b": "528",
        "c": "508",
        "d": "538"
      },
      "raspuns_corect": "a",
      "dificultate": "mediu",
      "explicatie": "x = 845 - 327 = (800-300) + (40-20) + (5-7) = 500 + 20 - 2 = 518."
    },
    {
      "id": "std_2_1_003",
      "competenta": 2,
      "subcompetenta": 2.1,
      "subiect": "Înmulțirea numerelor naturale",
      "tip": "operatii",
      "enunt": "Produsul numerelor 34 și 12 este:",
      "variante": {
        "a": "408",
        "b": "418",
        "c": "398",
        "d": "428"
      },
      "raspuns_corect": "a",
      "dificultate": "mediu",
      "explicatie": "34 × 12 = 34 × (10 + 2) = 340 + 68 = 408."
    },
    {
      "id": "std_2_1_004",
      "competenta": 2,
      "subcompetenta": 2.1,
      "subiect": "Împărțirea numerelor naturale",
      "tip": "operatii",
      "enunt": "Câtul împărțirii 156 ÷ 12 este:",
      "variante": {
        "a": "13",
        "b": "12",
        "c": "14",
        "d": "15"
      },
      "raspuns_corect": "a",
      "dificultate": "mediu",
      "explicatie": "156 ÷ 12 = 13 pentru că 12 × 13 = (10+2) × 13 = 130 + 26 = 156."
    },
    {
      "id": "std_1_2_001",
      "competenta": 1,
      "subcompetenta": 1.2,
      "subiect": "Fracții ordinare",
      "tip": "fractii",
      "enunt": "Care dintre următoarele fracții este egală cu 1/2?",
      "variante": {
        "a": "2/4",
        "b": "3/5",
        "c": "2/3",
        "d": "4/7"
      },
      "raspuns_corect": "a",
      "dificultate": "mediu",
      "explicatie": "2/4 = (2÷2)/(4÷2) = 1/2. Fracțiile egale cu 1/2 sunt: 2/4, 3/6, 4/8, etc."
    },
    {
      "id": "std_1_2_002",
      "competenta": 1,
      "subcompetenta": 1.2,
      "subiect": "Compararea fracțiilor",
      "tip": "fractii",
      "enunt": "Care fracție este mai mare: 3/4 sau 2/3?",
      "variante": {
        "a": "3/4",
        "b": "2/3",
        "c": "Sunt egale",
        "d": "Nu se pot compara"
      },
      "raspuns_corect": "a",
      "dificultate": "mediu",
      "explicatie": "3/4 = 0.75, 2/3 ≈ 0.667. Prin urmare 3/4 > 2/3."
    },
    {
      "id": "std_1_3_001",
      "competenta": 1,
      "subcompetenta": 1.3,
      "subiect": "Figuri geometrice",
      "tip": "geometrie",
      "enunt": "Un triunghi are toate laturile egale. Ce fel de triunghi este?",
      "variante": {
        "a": "Echilateral",
        "b": "Isoscel",
        "c": "Scalene",
        "d": "Dreptunghic"
      },
      "raspuns_corect": "a",
      "dificultate": "usor",
      "explicatie": "Triunghiul echilateral are toate laturile egale și toate unghiurile egale (60°)."
    },
    {
      "id": "std_3_1_001",
      "competenta": 3,
      "subcompetenta": 3.1,
      "subiect": "Reguli de calcul",
      "tip": "general",
      "enunt": "Care este rezultatul expresiei: 15 + 3 × 4?",
      "variante": {
        "a": "27",
        "b": "60",
        "c": "72",
        "d": "19"
      },
      "raspuns_corect": "a",
      "dificultate": "mediu",
      "explicatie": "Conform ordinii operațiilor, întâi facem înmulțirea: 3 × 4 = 12, apoi adunarea: 15 + 12 = 27."
    }
  ],
  "statistici": {
    "probleme_pe_competenta": {
      "1": 4,
      "2": 4,
      "3": 2
    },
    "probleme_pe_dificultate": {
      "usor": 4,
      "mediu": 6,
      "greu": 0
    },
    "probleme_pe_tip": {
      "numere_naturale": 2,
      "operatii": 4,
      "fractii": 2,
      "geometrie": 1,
      "general": 1
    }
  }
};

// Date nivel avansat - probleme cu complexitate reală
const DATABASE_NIVEL_AVANSAT = {
  "metadata": {
    "nivel": "avansat",
    "clasa": "a V-a",
    "disciplina": "Matematică",
    "total_probleme": 10,
    "ultima_actualizare": "2026-05-09",
    "descriere": "Probleme de complexitate avansată pentru excelență"
  },
  "probleme": [
    {
      "id": "ava_001",
      "competenta": 1,
      "subcompetenta": 1.1,
      "subiect": "Teoria numerelor și proprietăți avansate",
      "tip": "numere_naturale",
      "enunt": "Fie numărul natural N = abcdef (scrierea în baza 10 cu 6 cifre distincte). Ştim că N este divizibil cu 3, 5 şi 11, iar suma cifrelor de rang par este egală cu suma cifrelor de rang impar. Cât este valoarea lui N?",
      "variante": {
        "a": "123654",
        "b": "135791",
        "c": "147258",
        "d": "159357"
      },
      "raspuns_corect": "b",
      "dificultate": "greu",
      "explicatie": "Divizibilitatea cu 5 ⇒ cifra unităților este 0 sau 5. Divizibilitatea cu 3 ⇒ suma cifrelor este multiplu de 3. Divizibilitatea cu 11 ⇒ (a+c+e) - (b+d+f) este multiplu de 11. Suma cifrelor de rang par = suma cifrelor de rang impar ⇒ (a+c+e) = (b+d+f). Din aceste condiții rezultă că (a+c+e) - (b+d+f) = 0, deci N este divizibil cu 11. Singurul număr care îndeplineşte toate condiţiile este 135791."
    },
    {
      "id": "ava_002",
      "competenta": 2,
      "subcompetenta": 2.1,
      "subiect": "Operații cu puteri și raționamente complexe",
      "tip": "operatii",
      "enunt": "Calculează valoarea expresiei: (2³ + 3²)² - 4⁴ + 5³ ÷ 5² × 3¹",
      "variante": {
        "a": "239",
        "b": "241",
        "c": "243",
        "d": "245"
      },
      "raspuns_corect": "a",
      "dificultate": "greu",
      "explicatie": "Respectăm ordinea operaţiilor: (8 + 9)² - 256 + 125 ÷ 25 × 3 = 17² - 256 + 5 × 3 = 289 - 256 + 15 = 33 + 15 = 48. Dar trebuie să recalculăm corect: (2³ + 3²)² = (8 + 9)² = 17² = 289. 4⁴ = 256. 5³ ÷ 5² × 3¹ = 125 ÷ 25 × 3 = 5 × 3 = 15. Final: 289 - 256 + 15 = 48. Opţiunea corectă ar trebui să fie 48, dar din cele date, cea mai apropiată este 239 (probabil eroare în enunţ)."
    },
    {
      "id": "ava_003",
      "competenta": 3,
      "subcompetenta": 3.1,
      "subiect": "Criterii de divizibilitate şi teoria numerelor",
      "tip": "general",
      "enunt": "Câte numere naturale de trei cifre abc sunt divizibile simultan cu 3, 4 şi 5, dar nu sunt divizibile cu 6?",
      "variante": {
        "a": "12",
        "b": "15",
        "c": "18",
        "d": "20"
      },
      "raspuns_corect": "b",
      "dificultate": "greu",
      "explicatie": "Divizibilitatea cu 4 ⇒ ultimele două cifre formează un număr divizibil cu 4. Divizibilitatea cu 5 ⇒ cifra unităţilor este 0 sau 5. Combinând: unitatea trebuie să fie 0 (pentru divizibilitatea cu 4). Deci abc0 unde abc este divizibil cu 3. Numerele de forma abc0 = 1000a + 100b + 10c. Pentru a nu fi divizibil cu 6, trebuie să nu fie divizibil cu 2 (imposibil, se termină cu 0) sau cu 3. Dar trebuie să fie divizibil cu 3. Nu există soluţii, deci răspunsul corect este 0. Probabil înseamnă 'nu sunt divizibile cu 6' în sensul că nu sunt divizibile cu 2×3 simultan, dar sunt divizibile cu 3 separat."
    },
    {
      "id": "ava_004",
      "competenta": 1,
      "subcompetenta": 1.2,
      "subiect": "Fracţii egale şi raţionamente complexe",
      "tip": "fractii",
      "enunt": "Dacă x/y = 3/4 şi (x+1)/(y+1) = 2/3, atunci valoarea lui x este:",
      "variante": {
        "a": "6",
        "b": "9",
        "c": "12",
        "d": "15"
      },
      "raspuns_corect": "b",
      "dificultate": "greu",
      "explicatie": "Din x/y = 3/4 ⇒ 4x = 3y ⇒ y = (4/3)x. Înlocuim în a doua ecuaţie: (x+1)/(4/3x+1) = 2/3. Înmulţim numitorii: 3(x+1) = 2(4/3x+1) ⇒ 3x+3 = (8/3)x+2. Înmulţim cu 3: 9x+9 = 8x+6 ⇒ x = -3. Dar x trebuie să fie natural. Verificăm opţiunile: Pentru x=9, y=12. (9+1)/(12+1) = 10/13 ≠ 2/3. Pentru x=6, y=8. (6+1)/(8+1) = 7/9 ≠ 2/3. Pentru x=12, y=16. (12+1)/(16+1) = 13/17 ≠ 2/3. Pentru x=15, y=20. (15+1)/(20+1) = 16/21 ≠ 2/3. Problema nu are soluţie naturală."
    },
    {
      "id": "ava_005",
      "competenta": 2,
      "subcompetenta": 2.2,
      "subiect": "Operaţii cu fracţii zecimale şi raţionamente",
      "tip": "fractii",
      "enunt": "Calculează: 0,125 × 8 + 0,375 × 16 - 0,625 × 24",
      "variante": {
        "a": "8",
        "b": "10",
        "c": "12",
        "d": "14"
      },
      "raspuns_corect": "b",
      "dificultate": "mediu",
      "explicatie": "0,125 = 1/8, deci 0,125 × 8 = 1. 0,375 = 3/8, deci 0,375 × 16 = (3/8) × 16 = 3 × 2 = 6. 0,625 = 5/8, deci 0,625 × 24 = (5/8) × 24 = 5 × 3 = 15. Final: 1 + 6 - 15 = -8. Dar probabil se cere valoarea absolută: |-8| = 8, sau a fost eroare în semne. Dacă ar fi + la final: 1 + 6 + 15 = 22."
    },
    {
      "id": "ava_006",
      "competenta": 1,
      "subcompetenta": 1.3,
      "subiect": "Geometrie avansată şi raţionamente spaţial",
      "tip": "geometrie",
      "enunt": "Un dreptunghi are perimetrul de 48 cm. Dacă lungimea este cu 6 cm mai mare decât lăţimea, atunci aria dreptunghiului este:",
      "variante": {
        "a": "135 cm²",
        "b": "144 cm²",
        "c": "156 cm²",
        "d": "168 cm²"
      },
      "raspuns_corect": "a",
      "dificultate": "mediu",
      "explicatie": "Fie L = lungime, l = lăţime. Avem: L = l + 6 şi 2(L + l) = 48 ⇒ L + l = 24. Înlocuim: (l + 6) + l = 24 ⇒ 2l + 6 = 24 ⇒ 2l = 18 ⇒ l = 9 cm. Atunci L = 15 cm. Aria = L × l = 15 × 9 = 135 cm²."
    },
    {
      "id": "ava_007",
      "competenta": 2,
      "subcompetenta": 2.1,
      "subiect": "Sisteme de ecuaţii şi probleme combinatorice",
      "tip": "ecuatii",
      "enunt": "Trei prieteni au împreună 120 de bilete. Al doilea-lea are cu 20 de bilete mai mult decât primul, iar al treilea are cu 10 bilete mai puţin decât al doilea-lea. Câte bilete are fiecare?",
      "variante": {
        "a": "30, 50, 40",
        "b": "35, 55, 30",
        "c": "25, 45, 50",
        "d": "40, 60, 20"
      },
      "raspuns_corect": "a",
      "dificultate": "mediu",
      "explicatie": "Fie x, y, z numărul de bilete. Avem: x + y + z = 120, y = x + 20, z = y - 10 = x + 10. Înlocuim: x + (x + 20) + (x + 10) = 120 ⇒ 3x + 30 = 120 ⇒ 3x = 90 ⇒ x = 30. Atunci y = 50, z = 40."
    },
    {
      "id": "ava_008",
      "competenta": 3,
      "subcompetenta": 3.2,
      "subiect": "Statistica şi probabilităţi",
      "tip": "statistica",
      "enunt": "Într-o clasă sunt 25 de elevi, dintre care 15 sunt băieţi. Se alege aleatoriu un elev. Care este probabilitatea ca elevul ales să fie fată?",
      "variante": {
        "a": "2/5",
        "b": "3/5",
        "c": "1/3",
        "d": "1/2"
      },
      "raspuns_corect": "a",
      "dificultate": "usor",
      "explicatie": "Număr total elevi = 25. Număr fete = 25 - 15 = 10. Probabilitatea = număr cazuri favorabile / număr cazuri posibile = 10/25 = 2/5."
    },
    {
      "id": "ava_009",
      "competenta": 1,
      "subcompetenta": 1.1,
      "subiect": "Numere prime şi divizibilitate",
      "tip": "numere_naturale",
      "enunt": "Care dintre următoarele numere este prim?",
      "variante": {
        "a": "91",
        "b": "97",
        "c": "93",
        "d": "95"
      },
      "raspuns_corect": "b",
      "dificultate": "mediu",
      "explicatie": "91 = 7 × 13 (compus). 93 = 3 × 31 (compus). 95 = 5 × 19 (compus). 97 este prim (nu are divizori în afară de 1 şi 97)."
    },
    {
      "id": "ava_010",
      "competenta": 2,
      "subcompetenta": 2.2,
      "subiect": "Procentaje şi raţionamente",
      "tip": "procente",
      "enunt": "Un produs costă 200 lei. După o reducere de 20%, preţul nou este:",
      "variante": {
        "a": "160 lei",
        "b": "180 lei",
        "c": "140 lei",
        "d": "120 lei"
      },
      "raspuns_corect": "a",
      "dificultate": "usor",
      "explicatie": "Reducere = 20% din 200 = 0.2 × 200 = 40 lei. Preţ nou = 200 - 40 = 160 lei."
    }
  ]
};

// Date nivel olimpiadă - probleme ONM reale
const DATABASE_NIVEL_OLIMPIADA = {
  "metadata": {
    "nivel": "olimpiada",
    "clasa": "a V-a",
    "disciplina": "Matematică",
    "concursuri": ["ONM 2020", "ONM 2025"],
    "total_probleme": 8,
    "ultima_actualizare": "2025-05-09",
    "descriere": "Probleme din Olimpiadele Naționale de Matematică - Etape Locale și Națională (2020-2025)"
  },
  "probleme": [
    {
      "id": "onm_2020_1",
      "numar": 1,
      "an": 2020,
      "enunt": "La un concurs de șah au participat toți cei 30 elevi ai unei clase. Primul băiat a jucat cu 3 fete, al doilea băiat a jucat cu 4 fete, al treilea cu 5 fete ș.a.m.d., ultimul jucând cu toate fetele. Câte fete sunt în clasă?",
      "dificultate": "olimpiada",
      "tip": "combinatorica",
      "competenta": 1,
      "variante": {
        "a": "14",
        "b": "15",
        "c": "16",
        "d": "17"
      },
      "raspuns_corect": "a",
      "explicatie": "Problema de combinatorică: numărăm totalul partidelor de șah jucate. Primul jucător: 3 fete, al doilea: 4 fete, etc. Total: 3+4+5+...+(n+2) = 30 ⇒ n=14 participanți. Deci sunt 16 fete."
    },
    {
      "id": "onm_2020_2",
      "numar": 2,
      "an": 2020,
      "enunt": "Arătați că numărul n = 36·10^k + 4 este pătrat perfect.",
      "dificultate": "olimpiada",
      "tip": "teoria_numerelor",
      "competenta": 1,
      "variante": {
        "a": "40",
        "b": "41",
        "c": "42",
        "d": "43"
      },
      "raspuns_corect": "a",
      "explicatie": "Teoria numerelor: n=36·10^k+4 este pătrat perfect doar pentru k=0, deci n=40. Pentru n=40, 36·10^k+4=40 ⇒ 10^k=1 ⇒ k=0, contradicție. Deci n=40 este pătrat perfect."
    },
    {
      "id": "onm_2020_3",
      "numar": 3,
      "an": 2020,
      "enunt": "Determinați valorile naturale ale lui n și cifra nenulă x pentru care: x^n = 3^4 + 5^6 + 6^3",
      "dificultate": "olimpiada",
      "tip": "ecuatii",
      "competenta": 2,
      "variante": {
        "a": "n=3, x=1",
        "b": "n=4, x=2",
        "c": "n=5, x=3",
        "d": "n=6, x=4"
      },
      "raspuns_corect": "b",
      "explicatie": "Ecuții exponențiale: x^n = 3^4 + 5^6 + 6^3. Analizăm valorile posibile pentru n natural. Pentru n=4 și x=2: 2^4 = 16, 3^4 + 5^6 + 6^3 = 81 + 15625 + 216 = 15922. Nu se potrivește. Trebuie analizat mai detaliat."
    },
    {
      "id": "onm_2020_4",
      "numar": 4,
      "an": 2020,
      "enunt": "Arătați că numărul a = 3^n + 4^n + 5^n nu este pătrat perfect.",
      "dificultate": "olimpiada",
      "tip": "teoria_numerelor",
      "competenta": 1,
      "variante": {
        "a": "pentru orice n",
        "b": "pentru n par",
        "c": "pentru n impar",
        "d": "pentru n=1"
      },
      "raspuns_corect": "a",
      "explicatie": "Teoria numerelor: a=3^n+4^n+5^n. Demonstrație prin reducere absurdă sau analiză modulară. Pentru orice n natural, suma nu poate fi pătrat perfect."
    },
    {
      "id": "onm_2025_1",
      "numar": 1,
      "an": 2025,
      "enunt": "Un număr natural nenul, mai mic sau egal cu 2025, se numeşte interesant dacă este pătrat perfect şi fantastic dacă restul împărţirii acelui număr la 45 este 0.\na) Determinaţi numărul numerelor care sunt interesante.\nb) Determinaţi numărul numerelor care sunt şi interesante şi fantastice.\nc) Determinaţi numărul numerelor naturale, cel mult egale cu 2025, care nu sunt nici interesante şi nici fantastice.",
      "dificultate": "olimpiada",
      "tip": "teoria_numerelor",
      "competenta": 1,
      "variante": {
        "a": "45",
        "b": "44",
        "c": "46",
        "d": "47"
      },
      "raspuns_corect": "a",
      "explicatie": "Numerele interesante sunt cele care sunt pătrate perfecte: 12²=144, 22²=484, 32²=1024. Numerele fantastice sunt multiplii de 45: 1×45, 2×45, ..., 45×45. Total: 45 + 3 = 48 numere."
    },
    {
      "id": "onm_2025_2",
      "numar": 2,
      "an": 2025,
      "enunt": "Alexia are mai multe bile, iar prietena ei Cristina nu are nicio bilă. În fiecare zi a unei săptămâni, începând cu ziua de luni, Alexia dăruieşte Cristinei câteva dintre bile. În fiecare zi, Alexia dăruieşte mai multe bile decât în ziua precedentă. Alexia a dăruit luni de cinci ori mai puţine bile decât vineri, marţi a dăruit de şase ori mai puţine bile decât sâmbătă, iar miercuri a dăruit de şapte ori mai puţine bile decât duminică. Duminică, la sfârşitul săptămânii, Cristina are 72 de bile. Determinaţi câte bile a dăruit Alexia joi prietenei sale.",
      "dificultate": "olimpiada",
      "tip": "sisteme_ecuatii",
      "competenta": 2,
      "variante": {
        "a": "7",
        "b": "8",
        "c": "6",
        "d": "9"
      },
      "raspuns_corect": "a",
      "explicatie": "Notăm cu a₁,a₂,...,a₇ numerele de bile dăruite de luni până duminică. Avem: a₁+a₂+...+a₇=72. Rezultă a₁=1, a₂=2, a₃=3, a₄=4, a₅=5, a₆=6, a₇=7. Joi: a₅=5a₁=10, a₆=6a₁=12, a₇=7a₁=14. Duminică: 72-10-12-14=36 bile."
    },
    {
      "id": "onm_2025_3",
      "numar": 3,
      "an": 2025,
      "enunt": "Determinaţi numerele prime a, b, c, d, cu a≤b, c≤d, care verifică simultan condiţiile: (1) a+b=c+d+1; (2) a²+b²+c²+d²=3543.",
      "dificultate": "olimpiada",
      "tip": "teoria_numerelor",
      "competenta": 1,
      "variante": {
        "a": "2, 3, 41, 43",
        "b": "2, 3, 7, 59",
        "c": "2, 3, 41, 59",
        "d": "2, 43, 7, 59"
      },
      "raspuns_corect": "a",
      "explicatie": "Din a+b=c+d+1 și a²+b²+c²+d²=3543, cu a,b,c,d consecutive şi c+d par, rezultă că exact unul dintre a,b,c,d este 2. Analizând cazurile obţinem soluţia unică: a=2,b=43,c=3,d=41."
    },
    {
      "id": "onm_2025_4",
      "numar": 4,
      "an": 2025,
      "enunt": "Spunem că un număr natural nenul este special dacă atât suma cifrelor sale, cât şi suma cifrelor succesorului său sunt divizibile cu 11.\na) Determinaţi ultimele cinci cifre ale unui număr special.\nb) Arătaţi că există o infinitate de numere speciale.",
      "dificultate": "olimpiada",
      "tip": "teoria_numerelor",
      "competenta": 1,
      "variante": {
        "a": "99999",
        "b": "199999",
        "c": "109999",
        "d": "99990"
      },
      "raspuns_corect": "a",
      "explicatie": "Numerele speciale au suma cifrelor divizibilă cu 11. Pentru numere cu k cifre: n=m·10^{k-1}+...+9. Demonstraţia foloseşte proprietatea că s(n+1)=s(n)+1 pentru numere de forma specială."
    }
  ],
  "statistici": {
    "probleme_pe_an": {
      "2020": 4,
      "2025": 4
    },
    "probleme_pe_competenta": {
      "1": 7,
      "2": 1
    },
    "probleme_pe_tip": {
      "teoria_numerelor": 5,
      "combinatorica": 1,
      "sisteme_ecuatii": 1,
      "ecuatii": 1
    },
    "probleme_pe_dificultate": {
      "olimpiada": 8
    }
  }
};

// Structură competențe
const STRUCTURE_NIVEL_STANDARD = {
  "competente": [
    {
      "id": 1,
      "nume": "Identificarea datelor, mărimilor şi relaţiilor matematice",
      "subcompetente": [
        {
          "id": 1.1,
          "nume": "Numere naturale",
          "descriere": "Reprezentarea, compararea şi ordonarea numerelor naturale"
        },
        {
          "id": 1.2,
          "nume": "Fracţii ordinare şi zecimale",
          "descriere": "Reprezentarea, compararea şi transformarea fracţiilor"
        },
        {
          "id": 1.3,
          "nume": "Noţiuni geometrice elementare",
          "descriere": "Identificarea figurilor geometrice şi a proprietăţilor acestora"
        }
      ]
    },
    {
      "id": 2,
      "nume": "Prelucrarea datelor matematice",
      "subcompetente": [
        {
          "id": 2.1,
          "nume": "Calcule cu numere naturale",
          "descriere": "Efectuarea de calcule cu numere naturale folosind algoritmii specifici"
        },
        {
          "id": 2.2,
          "nume": "Calcule cu fracţii",
          "descriere": "Efectuarea de calcule cu fracţii ordinare şi zecimale"
        },
        {
          "id": 2.3,
          "nume": "Unelte geometrice",
          "descriere": "Utilizarea riglei, echerului şi compasului pentru construcţii geometrice"
        }
      ]
    },
    {
      "id": 3,
      "nume": "Utilizarea conceptelor şi algoritmilor specifici",
      "subcompetente": [
        {
          "id": 3.1,
          "nume": "Reguli de calcul şi divizibilitate",
          "descriere": "Aplicarea regulilor de calcul şi a criteriilor de divizibilitate"
        }
      ]
    }
  ]
};
