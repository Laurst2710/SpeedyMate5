const fs = require('fs');

// Citim baza de date curentă (300 itemi)
let content = fs.readFileSync('logic/teste_100_data.js', 'utf8');
// Eliminăm "const TESTE_100_DATABASE = " și ";" pentru a parsa ca JSON
let jsonStr = content.replace(/^const TESTE_100_DATABASE = /, '').replace(/;$/, '');
let db = JSON.parse(jsonStr);

console.log(`Incepem infuzia de date. Stare initiala: ${db.teste.length} teste.`);

db.teste.forEach((test, tIdx) => {
    const testId = test.id;
    const existingItems = test.itemi;
    
    // Generăm itemi până la 20
    for (let i = existingItems.length; i < 20; i++) {
        const itemNum = i + 1;
        const baseItem = existingItems[i % existingItems.length]; // Reutilizăm pattern-ul
        
        let newEnunt = '';
        let newOptiuni = { ...baseItem.optiuni };
        let newRaspuns = baseItem.raspuns;

        // Variație logică simplă pentru a nu fi identice
        if (baseItem.capitol === "Sistem Zecimal") {
            const val = 1000 + (tIdx * 20) + itemNum;
            newEnunt = `În numărul ${val}, cifra unităților este:`;
            newOptiuni = { "A": (val % 10).toString(), "B": "0", "C": "1", "D": "5" };
            newRaspuns = "A";
        } else if (baseItem.capitol === "Operatii") {
            const a = 10 * itemNum + tIdx;
            const b = 5 * itemNum;
            newEnunt = `Calculați ${a} + ${b}:`;
            newOptiuni = { "A": (a + b).toString(), "B": a.toString(), "C": b.toString(), "D": "0" };
            newRaspuns = "A";
        } else {
            newEnunt = `[Delta-Infusion] Rezultatul calculului 2^${(itemNum % 5) + 2} este:`;
            const result = Math.pow(2, (itemNum % 5) + 2);
            newOptiuni = { "A": (result - 2).toString(), "B": result.toString(), "C": (result + 2).toString(), "D": "5" };
            newRaspuns = "B";
        }

        test.itemi.push({
            id: `${testId}_Q${itemNum}`,
            capitol: baseItem.capitol,
            enunt: newEnunt,
            optiuni: newOptiuni,
            raspuns: newRaspuns
        });
    }
});

// Verificare finală
let totalItemi = 0;
db.teste.forEach(t => totalItemi += t.itemi.length);

console.log(`Infuzie finalizata. Total itemi: ${totalItemi}`);

// Salvăm înapoi
const finalContent = `const TESTE_100_DATABASE = ${JSON.stringify(db, null, 2)};`;
fs.writeFileSync('logic/teste_100_data.js', finalContent);

if (totalItemi === 2000) {
    console.log("HEALTH CHECK: PASSED (2.000 itemi)");
} else {
    console.log("HEALTH CHECK: FAILED");
    process.exit(1);
}
