// ─── DANE QUIZU — tutaj edytujesz pytania i wyniki ───────────────────────────
//
// Żeby zmienić pytanie: znajdź je w tablicy questions i edytuj pole "text".
// Żeby zmienić wynik:   znajdź kategorię w obiekcie categories i edytuj opisy.
// Żeby zmienić scoring: zmień przypisanie kategorii w polu "category" pytania.

import type { QuizData } from "@/types/quiz";

export const QUIZ_DATA: QuizData = {
  title: "Co steruje Twoim jedzeniem?",
  subtitle:
    "Odpowiedz na kilka krótkich pytań i sprawdź, co najbardziej wpływa na Twoje decyzje jedzeniowe.",

  // ── Opcje odpowiedzi ────────────────────────────────────────────────────────
  answers: {
    often:     { label: "Często",    value: 2 },
    sometimes: { label: "Czasami",   value: 1 },
    rarely:    { label: "Rzadko",    value: 0 },
  },

  // ── Pytania ─────────────────────────────────────────────────────────────────
  // category: "stress" | "chaos" | "emotions" | "allOrNothing"
  questions: [
    // STRES — pytania 1–4
    {
      id: 1,
      category: "stress",
      text: "Kiedy jestem zestresowana albo przeciążona, częściej sięgam po jedzenie, nawet jeśli nie czuję wyraźnego głodu.",
    },
    {
      id: 2,
      category: "stress",
      text: "Po trudnym dniu jedzenie działa u mnie jak szybki sposób na ulgę, wyciszenie albo nagrodę.",
    },
    {
      id: 3,
      category: "stress",
      text: "W napięciu trudno mi zatrzymać się i świadomie zdecydować, czy naprawdę chcę teraz jeść.",
    },
    {
      id: 4,
      category: "stress",
      text: "Najtrudniejsze momenty z jedzeniem pojawiają się u mnie wtedy, gdy jestem zmęczona, pod presją albo emocjonalnie przebodźcowana.",
    },

    // CHAOS DNIA — pytania 5–8
    {
      id: 5,
      category: "chaos",
      text: "Moje posiłki często wypadają nieregularnie, bo dzień mnie wciąga i jem dopiero wtedy, gdy jestem już bardzo głodna.",
    },
    {
      id: 6,
      category: "chaos",
      text: "Zdarza mi się odkładać jedzenie przez obowiązki, a potem nadrabiać wieczorem albo podjadać bez planu.",
    },
    {
      id: 7,
      category: "chaos",
      text: "Mam poczucie, że moje jedzenie zależy bardziej od tempa dnia niż od realnych potrzeb organizmu.",
    },
    {
      id: 8,
      category: "chaos",
      text: "Nawet gdy wiem, co byłoby dla mnie dobre, trudno mi ułożyć jedzenie tak, żeby działało w zwykłym życiu.",
    },

    // EMOCJE — pytania 9–12
    {
      id: 9,
      category: "emotions",
      text: "Czasami jem i dopiero po fakcie widzę, że to nie był fizyczny głód, tylko potrzeba ulgi, pocieszenia albo odwrócenia uwagi.",
    },
    {
      id: 10,
      category: "emotions",
      text: "Trudno mi rozpoznać, czy to, co czuję, to głód, napięcie, nuda, samotność czy po prostu zmęczenie.",
    },
    {
      id: 11,
      category: "emotions",
      text: "Bywa, że mam ochotę na jedzenie, choć moje ciało nie daje wyraźnych sygnałów głodu.",
    },
    {
      id: 12,
      category: "emotions",
      text: "Jedzenie pomaga mi radzić sobie z emocjami, nawet jeśli tylko na chwilę.",
    },

    // WSZYSTKO ALBO NIC — pytania 13–15
    {
      id: 13,
      category: "allOrNothing",
      text: 'Kiedy wypadnę z planu, łatwo wchodzę w myślenie: "to już bez sensu".',
    },
    {
      id: 14,
      category: "allOrNothing",
      text: "Potrafię dobrze zacząć, ale trudno mi utrzymać zmiany, gdy pojawia się gorszy dzień, wyjazd, stres albo potknięcie.",
    },
    {
      id: 15,
      category: "allOrNothing",
      text: "Mam poczucie, że zdrowe jedzenie wymaga ode mnie ciągłego pilnowania się i silnej woli.",
    },
  ],

  // ── Wyniki — opisy kategorii ─────────────────────────────────────────────────
  categories: {
    stress: {
      id: "stress",
      name: "Stres przejmuje stery",
      shortPreview:
        "Wygląda na to, że jedzenie często pełni u Ciebie funkcję szybkiego regulatora napięcia. To ważna informacja — i dobry punkt startowy.",
      fullDescription:
        "Jedzenie często pełni u Ciebie funkcję szybkiego regulatora napięcia. W trudnych momentach organizm może szukać ulgi tu i teraz — i to właśnie wtedy jedzenie przejmuje stery. To nie jest kwestia słabej woli — to mechanizm regulacji, którego można się oduczyć.",
    },
    chaos: {
      id: "chaos",
      name: "Chaos dnia rozregulowuje Ci jedzenie",
      shortPreview:
        "Problem może nie wynikać z braku wiedzy, tylko z braku stabilnych ram w ciągu dnia. To dobra wiadomość — to da się poukładać.",
      fullDescription:
        "U Ciebie problem może nie wynikać z braku wiedzy, tylko z braku stabilnych ram w ciągu dnia. Kiedy rytm jedzenia się rozjeżdża, dużo trudniej podejmować spokojne i wspierające decyzje. Nie chodzi o perfekcyjny plan — chodzi o wystarczająco dobry rytm.",
    },
    emotions: {
      id: "emotions",
      name: "Emocje mylą się z głodem",
      shortPreview:
        "Jedzenie bywa odpowiedzią nie tylko na potrzeby ciała, ale też na emocje i stany wewnętrzne. Rozróżnienie tego to pierwszy krok.",
      fullDescription:
        "Ten wynik sugeruje, że jedzenie bywa odpowiedzią nie tylko na potrzeby ciała, ale też na emocje i stany wewnętrzne. W takiej sytuacji kluczowe staje się rozróżnianie głodu fizycznego od potrzeby ukojenia. To umiejętność — można ją rozwinąć.",
    },
    allOrNothing: {
      id: "allOrNothing",
      name: 'Schemat "wszystko albo nic" odbiera Ci stabilność',
      shortPreview:
        "Największą trudnością nie jest sam start, ale utrzymanie zmian po pierwszym potknięciu. To bardzo często spotykany mechanizm.",
      fullDescription:
        'Wygląda na to, że największą trudnością nie jest sam start, ale utrzymanie zmian po pierwszym potknięciu. Wtedy bardziej niż kolejnych zasad potrzebujesz systemu, który pomaga wracać do równowagi — bez oceniania siebie i bez zaczynania od zera.',
    },
  },
};
