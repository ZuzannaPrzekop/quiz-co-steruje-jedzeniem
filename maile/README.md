# Sekwencje mailowe — quiz „Co steruje Twoim jedzeniem?"

## Struktura

```
maile/
├── stres/
│   ├── email-1-wynik.md           → natychmiast po zapisie
│   ├── email-2-video-cwiczenie.md → 2 dni po email 1
│   └── email-3-krok-dalej.md      → 4–5 dni po email 1
├── chaos/
│   ├── email-1-wynik.md
│   ├── email-2-rytm.md
│   └── email-3-krok-dalej.md
├── emocje/
│   ├── email-1-wynik.md
│   ├── email-2-glod-emocjonalny.md
│   ├── email-3-krok-dalej.md
│   └── materialy/
│       └── karta-obserwacji-godu.md   ← do przygotowania jako PDF
└── wszystko-albo-nic/
    ├── email-1-wynik.md
    ├── email-2-schemat.md
    ├── email-3-krok-dalej.md
    └── materialy/
        └── protokol-powrotu.md        ← do przygotowania jako PDF
```

---

## Jak wpiąć w MailerLite

### 1. Utwórz 4 osobne automatyzacje — po jednej na kategorię

Trigger dla każdej: **"Subscriber joins group"**
- Stres → grupa „Quiz - Stres"
- Chaos → grupa „Quiz - Chaos"
- Emocje → grupa „Quiz - Emocje"
- Wszystko albo nic → grupa „Quiz - Wszystko albo nic"

### 2. Timing maili w automatyzacji

```
Trigger: dołącza do grupy
    ↓
Email 1 — natychmiast (delay: 0)
    ↓
Czekaj 2 dni
    ↓
Email 2
    ↓
Czekaj 2–3 dni
    ↓
Email 3
```

### 3. Co uzupełnić przed wdrożeniem

W każdym pliku maila znajdziesz znaczniki `[LINK DO KONSULTACJI]` i `[LINK DO KARTY]` / `[LINK DO PROTOKOŁU]`.

Przed wdrożeniem zamień je na:
- `[LINK DO KONSULTACJI]` → link do Calendly lub strony /konsultacja
- `[LINK DO KARTY]` → link do PDF karty obserwacji głodu (gdy będzie gotowa)
- `[LINK DO PROTOKOŁU]` → link do PDF protokołu powrotu (gdy będzie gotowy)

---

## Materiały do przygotowania

| Materiał | Dla kogo | Plik z treścią | Status |
|----------|----------|----------------|--------|
| Karta obserwacji głodu | Emocje, email 2 | `emocje/materialy/karta-obserwacji-godu.md` | ⬜ do zaprojektowania |
| Protokół powrotu | Wszystko albo nic, email 3 | `wszystko-albo-nic/materialy/protokol-powrotu.md` | ⬜ do zaprojektowania |

Treści do obu są gotowe — potrzebują tylko oprawy graficznej (Canva lub grafik).
