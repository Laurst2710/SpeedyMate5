# Changelog Speedy-MATE5

## [1.2.0] - 2026-05-10

### Added
- Arhitectură **Single-File**: Toată logica (motor + aplicație) consolidată în `index.html`.
- Forțare vizuală Logo (120px) via `!important` pentru consistență.
- Buton „TESTEAZĂ CUNOȘTINȚELE” restabilit cu stilizare premium (mov închis).

### Fixed
- Eliminat erorile de tip „Function not defined” cauzate de încărcarea asincronă a scripturilor.
- Inițializat variabile globale pentru a preveni crash-uri la navigare.
- Eliminat alerte de eroare inutile în favoarea consolei (F12).

### Technical
- Consolidarea codului pentru a elimina problemele de CORS și dependențe externe.
- Curățarea interfeței de elemente experimentale (Nivel Avansat/Olimpiadă ascunse).


## [1.1.0] - 2026-05-10

### Added
- Generator Masiv de Probleme (1000+ variante) pentru Capitolul 1
- 10 Template-uri dinamice (Comparare, Rotunjire, Cifră Pozițională, etc.)
- Buton „Generează Test Nou” pentru resetare și generare instantanee
- Logica de diversitate tematică (fără repetiție de template în același test)

### Changed
- Aplicația focalizată exclusiv pe Capitolul 1 conform noilor directive
- Eliminat sistemul de scoring/evaluare pentru Capitolul 1 pentru a încuraja învățarea
- Rezultatele Capitolului 1 sunt acum prezentate neutru, cu accent pe explicații

### Technical
- Trecerea de la baza de date statică la generare algoritmică on-the-fly
- Optimizare motor de generare pentru parametri variabili (min, max)


## [1.0.0] - 2026-05-10

### Added
- Aplicație complet funcțională cu 3 nivele (Standard, Avansat, Olimpiadă)
- Design original păstrat integral
- Versiune standalone pentru distribuție externă
- Probleme ONM 2020-2025 integrate
- Sistem de timer și scor
- Navigare între probleme
- Rezultate detaliate cu explicații
- Selecție capitole pentru nivel standard
- Funcționalități de export date

### Fixed
- Probleme de inițializare a testelor
- Corectare erori în logica de generare probleme
- Optimizare performanță pentru versiune standalone

### Technical
- Implementat management configurație
- Adăugat sistem de versionare
- Creată structură de build automat
- Documentație completă a proiectului

---

## [0.9.0] - 2026-05-09

### Added
- Structură inițială a proiectului
- Design carduri nivel
- Bază de date probleme
- Interfață principală

---

## [0.1.0] - 2026-05-08

### Added
- Inițializare proiect
- Concept și arhitectură
