// ###########################
// all   SHORT   Function  ...
// ###########################

async function howMuchPokeExist() {
    apiLength = 0;
    let getAdress = await fetch("https://pokeapi.co/api/v2/pokemon");
    let data = await getAdress.json();
    apiLength = data.count;
}

function capitalizedString() {
    // nimmt den STRING aus "capitalized" und gibt ihn mit ersten Buchstaben GROSS zurück in "capitalized" ...
    // charAt holt erstes Zeichen, toUpperCase macht das Zeichen GROSS und slice entfernt das alte, kleine Zeichen ...
    capitalized = capitalized.charAt(0).toUpperCase() + capitalized.slice(1);
}

function goFristLoad() {
    // NUR beim ERSTEN LADEN von Pokedex auszuführen ...
    loadedPokemons = 0;             // Zähler
    howMuchPokeExist();             // Anzahl ALLER Pokemons ermitteln
    // HINWEIS auf LADE-VORGANG beim ersten Programm-Start mit ONLOAD ...
    document.getElementById('overview_poke').innerHTML = `<p class="Laden_grafik">Pokemons werden geladen ...</p>`;
    // ERSTES Laden (ONLOAD) nun deaktivieren ...
    firstLoad = false;
}

function renderControlPanel() {
    // STEUERUNGS-Buttons für "<<<<<<" und ">>>>>" und COUNTER setzen ...
    buttonPreNext.innerHTML = "";
    buttonPreNext.innerHTML = setButtonsAndCounter();   // in template.js
    // BUTTON show "NEXT Pokemons" now SET WORKING again ...
    document.getElementById('show_next_button').disabled = false;
}

function getAllInfoForRendern() {
    // ALLE Voreinstellungen und Datenbeschaffungen VORM RENDERN ...
    whatAbilities();            // ERMITTELN der besonderen Fähigkeiten
    findBackgroundColor();      // ERMITTELN: Background-Color für das POKEMON
    findTypeIcons();            // ERMITTELN: ICONS für die POKE-Types
    // ERMITTELN: WERTE zur Darstellung PROCESS-BAR und alle EINGENSCHAFTEN mit WERTEN ...
    getMaxValueFromAllStats();
}

function whatAbilities() {
    // VORGABE: -KEINE- Fähigkeiten vorhanden ...
    abilityOne = "";
    abilityTwo = "";
    abilityThree = "";
    // Fähigkeiten auslesen ...
    for (let index = 0; index < allPoke[arrayID].abilities.length; index++) {
        switch (index) {  // Fähigkeit 1-3 werden ausgelesen und zugeordnet + gespeichert ...
            case 0: abilityOne = allPoke[arrayID].abilities[index].ability.name; break;
            case 1: abilityTwo = allPoke[arrayID].abilities[index].ability.name; break;
            case 2: abilityThree = allPoke[arrayID].abilities[index].ability.name; break;
            default: break;
        }
    }
}

function findBackgroundColor() {
    // POKEMON erhält eine zum Haupt-TYP passende BG-Color ...
    backgroundColor = allPoke[arrayID].types[0].type.name;  // BASIS-Typ ermitteln!
    // dann prüfen ob Basis-Typ normal, ABER ein zweiter NICHT "normaler" Typ ist vorhanden ...
    if (backgroundColor == "normal" && allPoke[arrayID].types.length > 1) {
        // Übernahme background-Color vom 2.Typ, da 1.Typ normal war ...
        backgroundColor = allPoke[arrayID].types[1].type.name;
    }
    // ZUORDNUNG BG-Color entsprechend des POKE-Haupt-TYPES ...
    getTheColorCode();  // FUNKTION in data.JS !
}


function findTypeIcons() {
    pokeTypeIcon1 = "";
    pokeTypeIcon2 = "normal.jpg";
    pokeTypeSearch = "";
    // ERMITTELN der Pokemon-Typen (max 2 vorhanden) und Zuordnung der Icons ...
    for (let index = 0; index < allPoke[arrayID].types.length; index++) {
        if (index == 1) {
            // TYPE 1 holen ...
            pokeTypeIcon2 = allPoke[arrayID].types[index].type.name;
            pokeTypeSearch = pokeTypeIcon2;  // Wert für Suche bei ZUORDNUNG übergeben
            getTheTypeIcons();  // in data.JS ! (über VAR "PokeTypeSearch" erfolgt ZUORDNUNG)
            pokeTypeIcon2 = pokeTypeSearch;  // "Dateinamen.JPG" nun zuweisen für das Rendern
        } else {
            // TYPE 0 holen ...
            pokeTypeIcon1 = allPoke[arrayID].types[index].type.name;
            pokeTypeSearch = pokeTypeIcon1;
            getTheTypeIcons();
            pokeTypeIcon1 = pokeTypeSearch;
        }
    }
}

function getAllStats() {
    // globaler ARRAY "pokeStats" nimmt 6 Datensätze auf = je EIGENSCHAFT + WERT ...
    pokeStats = [];
    // leere "Array-Variable" zur Aufnahme des GESAMTEN Datensatz zum AKTUELLEN Pokemon...
    let thisPokeAllData = {};
    thisPokeAllData = allPoke[arrayID].stats;  // übernimmt NUR alle Eigenschaften in das Objekt

    // ALLE Eigenschaften des POKEMONs aus dem Datensatz des aktuellen Pokemons auslesen ...
    for (let index = 0; index < thisPokeAllData.length; index++) {
        let allStats = thisPokeAllData[index];  // speichern aller Eigenschaften aus allPoke
        let statName = allStats.stat.name;            // entnehme Eigenschaft-NANE in eine Variable
        statName = statName.toUpperCase();            // für spätere Ausgabe alles in GROSSSCHRIFT !
        let statValue = allStats.base_stat;           // entnehme Eigenschaft-WERT in eine Variable
        pokeStats.push({ name: statName, value: statValue, });  // Werte in Array für Eigenschaften schieben
    }
}

function getMaxValueFromAllStats() {
    getAllStats();       // ERMITTELN: alle EIGENSCHAFTEN und zugehörigen Value
    // FINDE den größten Stats-Wert ... wird für Balkendiagramm "Processbar" als 100 % Wert verwendet.
    // globale Variable maxValue speichert den höchsten stats-WERT
    // RECHNET für alle Processbalken den width-WERT aus für spätere Verwendung
    maxValue = 0;                          // Startwert 0
    for (let index = 0; index < pokeStats.length; index++) {
        let stat = pokeStats[index];       // aktuelles Objekt
        if (stat.value > maxValue) {       // vergleichen
            maxValue = stat.value;         // neuen max-Wert merken
        }
    }
    stat0 = "█"; stat1 = "█"; stat2 = "█"; stat3 = "█"; stat4 = "█"; stat5 = "█";
    getValueFromAllStatsForProcessBar();  // Einzelwerte der stats für PROCESS-BAR ermitteln / in data.js
}

