// ###########################
// DEFINITION of VARIBALES ...
// ###########################

// GLOBAL ...
let allPoke = [];     // Array nimmt alle geladenen Pokemons auf
let startIndex = 1;   // startIndex gibt die NUMMER des ersten zu ladenen POKEMONs vor !
let endIndex = startIndex + 7;  // Entscheidet, wieviele POKEMONs geladen werden ... derzeit 8 Pokemons
let firstLoad = true;  // überwacht, dass bestimmte BEFEHLE nur beim ERST-Start ablaufen ! ...
// ... loadPokemon() kann dadurch grundsätzlich aufgerufen werden !

let arrayID = 0;          // enthält immer die ARRAY-ID des Start-Pokemons beim Bildaufbau
let apiLength = 0;        // Anzahl ALLER vorhandenen Pokemons werden hier später abgelegt
let loadedPokemons = 0;   // ANZAHL derzeit geladener Pokemons
let capitalized = "";     // Manipulation POKE-NAME mit ersten Buchstaben in GROSS-Schrift
const buttonPreNext = document.getElementById('button_pre_next');

// for AUDIO
// to start AUDIO:   audioClick.play();
const audioClick = new Audio('./assets/sound/click.mp3');

// for the DIALOG "Show-One-Pokemon" ...
const showOnePokemon = document.getElementById("show_one_pokemon");
const closeDialog = document.getElementById("close_dialog");
const openDialog = document.getElementById("open_dialog");
const thisPokemon = document.getElementById('show_pokemon');
const statsPokemon = document.getElementById('poke_stats');
let abilityOne = "";
let abilityTwo = "";
let abilityThree = "";
let maxValue = 0;
// VARIBALEN für die PROCESSBAR-Werte zur Anzeige in Show-One-Poke ...
let stat0 = "█"; let stat1 = "█"; let stat2 = "█"; let stat3 = "█"; let stat4 = "█"; let stat5 = "█";
let statsProportionateValue = 0;    // nimmt den anteiligen Diagramm-Wert eines STATS auf 
// leerer Array zur Aufnahme ALLER EIGENSCHAFTEN des AKTUELLEN Pokemons ...
let pokeStats = [{ name: "", value: "", }];


// ############################################
// BASIC-Functions  "Pokemon-OVERVIEW-Show" ...
// ############################################


async function howMuchPokeExist() {
    apiLength = 0;
    let getAdress = await fetch("https://pokeapi.co/api/v2/pokemon");
    let data = await getAdress.json();
    apiLength = data.count;
}

async function loadPokemon() {  // LADEN und AUSGABE ...
    if (firstLoad) {
        goFristLoad();
    }
    if (startIndex >= allPoke.length) {
        // NUR neue Pokemons laden, WENN angeforderte Poke NICHT im Array "allPoke" enthalten
        for (index = startIndex; index <= endIndex; index++) {
            let getAdress = await fetch("https://pokeapi.co/api/v2/pokemon/" + index);
            let pokeAsJson = await getAdress.json();
            allPoke.push(pokeAsJson);
            capitalized = allPoke[index - 1].name;
            capitalizedString();                     // wirkt auf Variable "capitalized" (erstes Zeichen wir GROSS)
            allPoke[index - 1].name = capitalized;     // POKE-Name mit ersten Zeichen GROSS im Array abgelegt
        }
        loadedPokemons = loadedPokemons + (endIndex - startIndex + 1);   // HOCHZÄHLEN geladener POKEMONs
    }
    console.log(allPoke);  // während ENTWICKLUNG ... ARRAY-Aufbau immer "griffbereit"
    showPokemon();
    renderControlPanel();
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

function capitalizedString() {
    // nimmt den STRING aus "capitalized" und gibt ihn mit ersten Buchstaben GROSS zurück in "capitalized" ...
    // charAt holt erstes Zeichen, toUpperCase macht das Zeichen GROSS und slice entfernt das alte, kleine Zeichen ...
    capitalized = capitalized.charAt(0).toUpperCase() + capitalized.slice(1);
}

function renderControlPanel() {
    // STEUERUNGS-Buttons für "<<<<<<" und ">>>>>" und COUNTER setzen ...
    buttonPreNext.innerHTML = "";
    buttonPreNext.innerHTML = setButtonsAndCounter();
    // BUTTON show "NEXT Pokemons" now SET WORKING again ...
    document.getElementById('show_next_button').disabled = false;
}


function showPokemon() {
    // RENDERN der auszugebenen Pokemons VORBEREITEN ...
    document.getElementById('overview_poke').innerHTML = "";
    for (index = startIndex - 1; index < endIndex; index++) {
        arrayID = index;
        // ermittle passende Background-Color für das POKE UND die ICONS für die POKE-Types ...
        findBackgroundColor();
        findTypeIcons();
        document.getElementById('overview_poke').innerHTML += renderPokemon();  // jetzt RENDERN ...
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

function showPrevious() {
    // ZEIGE die vorherigen Pokemons ...
    audioClick.play();
    if (startIndex === 1) {
        // Sprung über den ERSTEN Pokemon bedeutet ==> ans "ENDE" des Array springen ...
        startIndex = allPoke.length - 7;
        endIndex = startIndex + 7;
        showPokemon();
    } else {
        // vorherigen Pokemons zeigen ...
        startIndex = startIndex - 8;
        endIndex = startIndex + 7;
        showPokemon();
    }
}

function showNext() {
    // ZEIGE die nächste Pokemons ... falls mehr als in ARRAY "allPoke", dann über API-Nachladen ...
    audioClick.play();
    // deaktiviert BUTTON "nächste", damit kein weiterer LOAD ausgelöst werden kann, ...
    // während von API nächste Pokemons NOCH geladen werden !!!
    document.getElementById('show_next_button').disabled = true;
    // HINWEIS geben, LADE-VORGANG läuft noch !!! ...
    document.getElementById('overview_poke').innerHTML = "";
    document.getElementById('overview_poke').innerHTML = `<p class="Laden_grafik">Pokemons werden geladen ...</p>`;
    startIndex = startIndex + 8;
    endIndex = startIndex + 7;
    loadPokemon();  // laden UND showPokemon()
}


// #######################################
// FUNCTIONs for DIALOG "Show-ONE-Pokemon"
// #######################################


function showThisPokemon(getIDcode) {
    // ausgelöst durch ONCLICK auf einem Pokemon-Bild ...
    // WIRD die in "getIDcode" (id vom Ausgabe-div) gespeicherte arrayID zum Bild rausgefiltert ...
    audioClick.play();
    // ALLE Zeichen entfernen, um ArrayID freizulegen ...
    getIDcode = String(getIDcode);            // wandelt in STRING um 
    arrayID = getIDcode.replace(/\D+/g, '');  // entfernt alle Zeichen, Zahlen bleiben
    arrayID = Number(arrayID);                // wandelt in eine Zahl um
    whatAbilities();  // ERMITTELN der besonderen Fähigkeiten
    findBackgroundColor();    // ERMITTELN: Background-Color für das POKEMON
    findTypeIcons();          // ERMITTELN: ICONS für die POKE-Types
    getAllStats();            // ERMITTELN: alle EIGENSCHAFTEN und zugehörigen Value 
    getMaxValueFromAllStats();// ERMITTELN: WERTE zur Darstellung PROCESS-BAR
    thisPokemon.innerHTML = "";
    statsPokemon.innerHTML = "";
    showOnePokemon.showModal(); // OPEN DIALOG with MODAL => only Dialog-BOX is working !
    thisPokemon.innerHTML = renderOnePokemon(arrayID);   // DETAILS vom Pokemon rendern ...
    statsPokemon.innerHTML = renderPokeStats();  // EIGENSCHAFTEN und WERTE rendern ...
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
    // FINDE den größten Stats-Wert ... wird für Balkendiagramm "Processbar" als 100 % Wert verwendet.
    // globale Variable maxValue speichert den höchsten stats-WERT
    // RECHNET für alle Processbalken den width-WERT aus für spätere Verwendung
    maxValue = 0;                      // Startwert 0
    for (let index = 0; index < pokeStats.length; index++) {
        let stat = pokeStats[index];       // aktuelles Objekt
        if (stat.value > maxValue) {       // vergleichen
            maxValue = stat.value;         // neuen max-Wert merken
        }
    }
    stat0 = "█"; stat1 = "█"; stat2 = "█"; stat3 = "█"; stat4 = "█"; stat5 = "█";
    getValueFromAllStatsForProcessBar();  // Einzelwerte der stats für PROCESS-BAR ermitteln / in data.js
}

closeDialog.addEventListener("click", () => {
    // CLOSE DIALOG "Show-One-Pokemon"
    audioClick.play();
    showOnePokemon.close();  // Dialog schließen
    showPokemon();           // POKE-Overview zeigen
});

function showPreviousPoke() {
    // ONCLICK ... den vorherigen Pokemon zeigen
    audioClick.play();
    if (arrayID < 0) {
        arrayID = allPoke.length - 1;
        whatAbilities();
        // ERMITTELN: passende Background-Color für das POKE UND die ICONS für die POKE-Types  ...
        findBackgroundColor();
        findTypeIcons();
        getAllStats();
        getMaxValueFromAllStats();
        thisPokemon.innerHTML = renderOnePokemon(arrayID);
        statsPokemon.innerHTML = renderPokeStats();
    } else {
        arrayID = arrayID - 1;
        whatAbilities();
        // ERMITTELN: passende Background-Color für das POKE UND die ICONS für die POKE-Types ...
        findBackgroundColor();
        findTypeIcons();
        getAllStats();
        getMaxValueFromAllStats();
        thisPokemon.innerHTML = renderOnePokemon(arrayID);
        statsPokemon.innerHTML = renderPokeStats();
    }
}

function showNextPoke() {
    // ONCLICK ... nächsten Pokemon zeigen
    audioClick.play();
    if (arrayID == allPoke.length - 1) {  // wenn der nächste Array-Zugriff über array-ENDE hinausgeht ...
        // arrayID wird durch "ELSE" solange durch ONCLICK erhöht, 
        // bis arrayID die Bedingung erfüllt. Dann wird wieder ...
        // bei Poke mit ArrayID=0 fortgefahren!
        arrayID = 0;
        whatAbilities();
        findBackgroundColor();
        findTypeIcons();
        getAllStats();
        getMaxValueFromAllStats();
        thisPokemon.innerHTML = renderOnePokemon(arrayID);
        statsPokemon.innerHTML = renderPokeStats();
    } else {
        arrayID = arrayID + 1;
        whatAbilities();
        findBackgroundColor();
        findTypeIcons();
        getAllStats();
        getMaxValueFromAllStats();
        thisPokemon.innerHTML = renderOnePokemon(arrayID);
        statsPokemon.innerHTML = renderPokeStats();
    }
}

