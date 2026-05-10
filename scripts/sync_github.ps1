# SpeedyMATE5 - GitHub Sync Script
# Acest script sincronizează automat proiectul cu GitHub

# Nota: Token-ul este configurat in Git Remote, nu este nevoie sa fie stocat aici.
$repo_url = "https://github.com/Laurst2710/SpeedyMate5.git"

Write-Host "--- Incepere Sincronizare SpeedyMATE5 ---" -ForegroundColor Cyan

# Verificare daca Git este initializat
if (-not (Test-Path .git)) {
    Write-Host "Initializare Repository Git..."
    git init
    git remote add origin $repo_url
}

Write-Host "Adaugare fisiere..."
git add .

Write-Host "Creare Commit..."
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
git commit -m "Auto-sync: $timestamp"

Write-Host "Preluare actualizari (Pull)..."
git pull origin main --rebase

Write-Host "Push catre GitHub (main)..."
git push origin main

Write-Host "--- Sincronizare Finalizata cu Succes ---" -ForegroundColor Green
