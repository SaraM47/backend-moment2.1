# Work Experience REST API

Detta repository är en del för uppgift 1 som innehåller kod för ett enklare REST API byggt med Node.js och Express. API:et är byggt för att hantera CV-relaterade poster såsom tidigare arbetserfarenheter, så som arbetsplats, roll, anställningsperiod och beskrivning. Grundläggande funktionalitet för CRUD (Create, Read, Update, Delete) är implementerad.

---

## Länk
En publik version av API:et kan testas här: [Work Experience API på Render](https://backend-moment2-1-ga1k.onrender.com/)

---

## Databas
Nedan visas en PostgreSQL-tabell med namnet workexperience kommer att skapas med följande kolumner:

| Fält        | Datatyp            | Beskrivning                              |
|-------------|--------------------|-------------------------------------------|
| id          | SERIAL PRIMARY KEY | Unikt ID för varje post                   |
| companyname | TEXT NOT NULL      | Namn på företaget                         |
| jobtitle    | TEXT NOT NULL      | Titel eller befattning                    |
| location    | TEXT NOT NULL      | Stad eller plats där arbetet utfördes    |
| startdate   | DATE               | Datum då anställningen började           |
| enddate     | DATE               | Datum då anställningen avslutades        |
| description | TEXT               | Kortfattad beskrivning av arbetsuppgifter|

---

## Användning 

Det här API:et är byggt för att hantera poster med arbetserfarenheter. Det stödjer fyra grundläggande HTTP-metoder som används för att hämta, lägga till, uppdatera och ta bort data. Alla anrop skickas och tas emot i JSON-format. När du skickar ett GET-anrop till /api/workexperience får du tillbaka en lista med samtliga arbetserfarenheter i databasen – det finns ingen funktion för att hämta enskilda poster med ID.

För att lägga till en ny post används POST, där du skickar med uppgifterna i en JSON-body. Vill du uppdatera en befintlig post använder du PUT, och då behöver du ange ID:t i URL:en samt skicka uppdaterad information i bodyn. Radering sker med DELETE, där du också anger postens ID i URL:en.

I tabellen nedan visas en översikt över de metoder och endpoints som API:et använder:


| Metod  | Ändpunkt                       | Body krävs | Beskrivning                                          |
|--------|--------------------------------|-------------|------------------------------------------------------|
| GET    | `/api/workexperience`         | Nej         | Hämtar alla arbetserfarenheter                      |
| GET    | `/api/workexperience/:id`     | Nej         | Hämtar en specifik arbetserfarenhet via ID          |
| POST   | `/api/workexperience`         | Ja          | Lägger till en ny arbetserfarenhet                  |
| PUT    | `/api/workexperience/:id`     | Ja          | Uppdaterar en befintlig post via ID                 |
| DELETE | `/api/workexperience/:id`     | Nej         | Raderar en post med angivet ID                      |

---

### Exempel på `POST`-body (JSON)
```json
{
  "companyname": "Mittuniversitetet",
  "jobtitle": "Labbhandledare",
  "location": "Sundsvall",
  "startdate": "2022-01-01",
  "enddate": "2022-06-30",
  "description": "Handledde studenter i programmering"
}
```
Vid fel returnerar API:et ett JSON-objekt med felmeddelande:

{
  "error": "Fel vid hämtning av data"
}
