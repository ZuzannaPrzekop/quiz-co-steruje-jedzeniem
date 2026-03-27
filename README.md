# Quiz „Co steruje Twoim jedzeniem?" — dr Zuzanna Przekop

Lead magnet / quiz diagnostyczny do umieszczenia na zuzannaprzekop.pl.

---

## Jak uruchomić lokalnie

```bash
# 1. Zainstaluj zależności
npm install

# 2. Utwórz plik z ustawieniami
cp .env.example .env.local

# 3. Uruchom lokalnie
npm run dev
```

Strona będzie dostępna pod adresem: **http://localhost:3000**

---

## Jak edytować treści

### Pytania i wyniki
Wszystkie teksty są w jednym pliku:

```
src/data/quiz.ts
```

Otwórz ten plik i edytuj:
- `questions` — lista 15 pytań
- `categories` — opisy 4 wyników
- `title` / `subtitle` — tytuł i podtytuł quizu

### Kolory i wygląd
Kolory marki są zdefiniowane w:
```
tailwind.config.ts
```

---

## Jak wdrożyć na Vercel

1. Wrzuć projekt na GitHub:
```bash
git init
git add .
git commit -m "init: quiz co steruje jedzeniem"
git remote add origin https://github.com/TWÓJ_LOGIN/NAZWA_REPO.git
git push -u origin main
```

2. Zaloguj się na [vercel.com](https://vercel.com)
3. Kliknij **Add New → Project**
4. Wybierz swoje repozytorium
5. Kliknij **Deploy** — gotowe!

Opcjonalnie dodaj zmienne środowiskowe (Settings → Environment Variables):
- `WEBHOOK_URL` — jeśli chcesz powiadomienia na Zapier/Make
- `MAILERLITE_API_KEY` + `MAILERLITE_GROUP_ID` — jeśli chcesz automatyczny zapis do listy

---

## Gdzie są leady

Po każdym zapisie formularza tworzy się plik `leads.csv` w katalogu projektu.

Format:
```
timestamp,email,primaryCategory
2024-01-15T12:30:00Z,email@example.com,stress
```

> **Uwaga:** Na Vercel system plików jest tymczasowy — po redeploymencie plik może zniknąć.
> Do produkcji podepnij webhook lub integrację mailingową (MailerLite/Brevo).

---

## Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
