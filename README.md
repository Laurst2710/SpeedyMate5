# Speedy-MATE5 - Simulator Matematică Clasa a V-a

## Descriere

Speedy-MATE5 este o aplicație self-contained pentru simularea și testarea cunoștințelor de matematică pentru clasa a V-a, conform programa școlară românească.

## Structura Proiectului

```
Speedy-MATE5/
├── data/                           # Baze de date și fișiere JSON
│   ├── database_nivel_standard.json  # Probleme nivel standard
│   ├── database_nivel_avansat.json  # Probleme nivel avansat
│   ├── structure_nivel_standard.json # Structura competențe standard
│   └── probleme_*.json            # Fișiere temporare de extracție
├── logic/                          # Logica aplicației și interfață
│   ├── index.html                  # Pagina principală
│   ├── style.css                   # Stiluri CSS
│   ├── app.js                      # Aplicația principală
│   ├── motor_generare_probleme.js   # Motor de generare probleme
│   └── sistem_incarcare_date.js    # Sistem încărcare date
├── Clasa 5/                       # Manuale și surse PDF
│   ├── Matematica.pdf              # Programă școlară
│   ├── AVANSAT *.pdf              # Probleme nivel avansat
│   └── A*.pdf                     # Manuale școlare
└── README.md                       # Acest fișier
```

## Niveluri Disponibile

### 1. Nivel Standard
- **Conform programa școlară** - Structurat pe 3 competențe principale
- **10 probleme sample** - Acoperire completă a competențelor
- **Dificultate graduală** - De la usor la mediu
- **Validare automată** - Cu explicații detaliate

### 2. Nivel Avansat
- **Probleme din concursuri** - Județene și locale
- **10 probleme selectate** - Dificultate mediu și greu
- **Complexitate ridicată** - Logică și raționament
- **Explicații complete** - Pentru fiecare problemă

### 3. Nivel Olimpiadă
- **În dezvoltare** - Așteaptă link pentru extragere
- **Probleme naționale** - Din olimpiade școlare
- **Nivel maxim dificultate** - Pentru performanță

## Funcționalități

### Motor de Generare Probleme
- **Generare aleatorie** - Filtre pe competențe și dificultate
- **Test personalizat** - Număr variabil de probleme
- **Validare răspunsuri** - Verificare automată
- **Calcul punctaj** - Procentaj și detalii

### Sistem de Încărcare Date
- **Import JSON** - Adăugare probleme noi
- **Export date** - Descărcare fișiere JSON
- **Validare automată** - Verificare integritate
- **Detectare duplicate** - Evitare redundanțe

### Interfață Utilizator
- **Design modern** - Responsive și intuitiv
- **Timer integrat** - Monitorizare timp
- **Navigare ușoară** - Între probleme
- **Rezultate detaliate** - Cu explicații

## Tehnologii Folosite

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Date**: JSON (self-contained)
- **Design**: Responsive, Mobile-first
- **Arhitectură**: Modulară, scalabilă

## Instalare și Utilizare

### 1. Deschiderea Aplicației
```bash
# Navighează în folderul logic
cd logic

# Deschide index.html în browser
# Sau folosește un server local
python -m http.server 8000
```

### 2. Adăugare Probleme Noi
1. Folosește butonul "Încarcă Date" din interfață
2. Selectează un fișier JSON valid
3. Alege nivelul (standard/avansat)
4. Problemele vor fi validate și adăugate

### 3. Export Date
1. Folosește butonul "Exportă Date"
2. Alege nivelul dorit
3. Fișierul JSON va fi descărcat

## Format Probleme JSON

```json
{
  "id": "std_1_1_001",
  "competenta": 1,
  "subcompetenta": 1.1,
  "subiect": "Subiect specific",
  "tip": "operatii",
  "enunt": "Enunțul problemei...",
  "variante": {
    "a": "Variantă A",
    "b": "Variantă B", 
    "c": "Variantă C",
    "d": "Variantă D"
  },
  "raspuns_corect": "a",
  "dificultate": "mediu",
  "explicatie": "Explicație detaliată..."
}
```

## Structură Competențe

### Competența 1: Identificarea datelor, mărimilor și relațiilor matematice
- **1.1** - Numere naturale
- **1.2** - Fracții ordinare și zecimale
- **1.3** - Noțiuni geometrice elementare

### Competența 2: Prelucrarea datelor matematice
- **2.1** - Calcule cu numere naturale
- **2.2** - Calcule cu fracții
- **2.3** - Unelte geometrice

### Competența 3: Utilizarea conceptelor și algoritmilor specifici
- **3.1** - Reguli de calcul și divizibilitate

## Dezvoltare Viitoare

### Short Term
- [ ] Finalizare nivel olimpiadă
- [ ] Adăugare timer per problemă
- [ ] Istoric rezultate
- [ ] Modul de învățare

### Long Term
- [ ] Sincronizare cloud
- [ ] Profil utilizator
- [ ] Analiză performanță
- [ ] Gamification

## Contribuții

Pentru adăugarea de probleme noi:
1. Respectă formatul JSON specificat
2. Asigură acoperirea competențelor
3. Verifică corectitudinea răspunsurilor
4. Adaugă explicații clare

## Contact și Suport

Pentru întrebări sau suport tehnic, verificați documentația din fișierele sursă sau contactați echipa de dezvoltare.

---

**Speedy-MATE5** - Platformă completă pentru învățarea matematicii la clasa a V-a

## Niveluri Disponibile

### 1. Nivel Standard
- **Conform programa școlară** - Structurat pe 3 competențe principale
- **10 probleme sample** - Acoperire completă a competențelor
- **Dificultate graduală** - De la usor la mediu
- **Validare automată** - Cu explicații detaliate

### 2. Nivel Avansat
- **Probleme din concursuri** - Județene și locale
- **10 probleme selectate** - Dificultate mediu și greu
- **Complexitate ridicată** - Logică și raționament
- **Explicații complete** - Pentru fiecare problemă

### 3. Nivel Olimpiadă
- **În dezvoltare** - Așteaptă link pentru extragere
- **Probleme naționale** - Din olimpiade școlare
- **Nivel maxim dificultate** - Pentru performanță

## Funcționalități

### Motor de Generare Probleme
- **Generare aleatorie** - Filtre pe competențe și dificultate
- **Test personalizat** - Număr variabil de probleme
- **Validare răspunsuri** - Verificare automată
- **Calcul punctaj** - Procentaj și detalii

### Sistem de Încărcare Date
- **Import JSON** - Adăugare probleme noi
- **Export date** - Descărcare fișiere JSON
- **Validare automată** - Verificare integritate
- **Detectare duplicate** - Evitare redundanțe

### Interfață Utilizator
- **Design modern** - Responsive și intuitiv
- **Timer integrat** - Monitorizare timp
- **Navigare ușoară** - Între probleme
- **Rezultate detaliate** - Cu explicații

## Tehnologii Folosite

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Date**: JSON (self-contained)
- **Design**: Responsive, Mobile-first
- **Arhitectură**: Modulară, scalabilă

## Instalare și Utilizare

### 1. Deschiderea Aplicației
```bash
# Navighează în folderul logic
cd logic

# Deschide index.html în browser
# Sau folosește un server local
python -m http.server 8000
```

### 2. Adăugare Probleme Noi
1. Folosește butonul "Încarcă Date" din interfață
2. Selectează un fișier JSON valid
3. Alege nivelul (standard/avansat)
4. Problemele vor fi validate și adăugate

### 3. Export Date
1. Folosește butonul "Exportă Date"
2. Alege nivelul dorit
3. Fișierul JSON va fi descărcat

## Format Probleme JSON

```json
{
  "id": "std_1_1_001",
  "competenta": 1,
  "subcompetenta": 1.1,
  "subiect": "Subiect specific",
  "tip": "operatii",
  "enunt": "Enunțul problemei...",
  "variante": {
    "a": "Variantă A",
    "b": "Variantă B", 
    "c": "Variantă C",
    "d": "Variantă D"
  },
  "raspuns_corect": "a",
  "dificultate": "mediu",
  "explicatie": "Explicație detaliată..."
}
```

## Structură Competențe

### Competența 1: Identificarea datelor, mărimilor și relațiilor matematice
- **1.1** - Numere naturale
- **1.2** - Fracții ordinare și zecimale
- **1.3** - Noțiuni geometrice elementare

### Competența 2: Prelucrarea datelor matematice
- **2.1** - Calcule cu numere naturale
- **2.2** - Calcule cu fracții
- **2.3** - Unelte geometrice

### Competența 3: Utilizarea conceptelor și algoritmilor specifici
- **3.1** - Reguli de calcul și divizibilitate

## Dezvoltare Viitoare

### Short Term
- [ ] Finalizare nivel olimpiadă
- [ ] Adăugare timer per problemă
- [ ] Istoric rezultate
- [ ] Modul de învățare

### Long Term
- [ ] Sincronizare cloud
- [ ] Profil utilizator
- [ ] Analiză performanță
- [ ] Gamification

## Contribuții

Pentru adăugarea de probleme noi:
1. Respectă formatul JSON specificat
2. Asigură acoperirea competențelor
3. Verifică corectitudinea răspunsurilor
4. Adaugă explicații clare

## Contact și Suport

Pentru întrebări sau suport tehnic, verificați documentația din fișierele sursă sau contactați echipa de dezvoltare.

---

**Speedy-MATE5** - Platformă completă pentru învățarea matematicii la clasa a V-a
