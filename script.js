// DEFINITION of VARIBALES ...

// GLOBAL ...

let allPoke = [];     // Array nimmt alle geladenen Pokemons auf

let startIndex = 1;   // startIndex gibt die NUMMER des ersten zu ladenen POKEMONs vor !
let endIndex = startIndex + 7;  // Entscheidet, wieviele POKEMONs geladen werden ... derzeit 8 Pokemons

let firstLoad = true;  // überwacht, dass bestimmte BEFEHLE nur beim ERST-Start ablaufen ! 
// loadPokemon() kann dadurch grundsätzlich aufgerufen werden !

let arrayID = 0;    // enthält immer die ARRAY-ID des Start-Pokemons beim Bildaufbau

// for AUDIO
// to start AUDIO:   audioClick.play();
const audioClick = new Audio('./assets/sound/click.mp3')

// ZUORDNUNGEN zu TYPES ... passende Hintergrundfarbe und TYPE-ICONs ...
let normal = "#ffffff";
let fire = "#f22121";
let water = "#1e9cd2";
let electric = "#ebee44";
let grass = "#14d411";
let ice = "#66e0f0";
let fighting = "#f55d42";
let poison = "#349864";
let ground = "#9a6042";
let flying = "#1fe0dd";
let psychic = "#bc209f";
let bug = "#6aa81f";
let rock = "#5b241a";
let ghost = "#cba4d5";
let dragon = "#c70505";
let dark = "#5b5552";
let steel = "#918b88";
let fairy = "#7923e1";
let stellar = "#e1c823";
let backgroundColor = "";
let pokeTypeIcon1 = "";
let pokeTypeIcon2 = "";
let pokeTypeSearch = "";

// for the DIALOG "Show-One-Pokemon" ...
const showOnePokemon = document.getElementById("show_one_pokemon");
const closeDialog = document.getElementById("close_dialog");
const openDialog = document.getElementById("open_dialog");
const thisPokemon = document.getElementById('show_pokemon');
const statsPokemon = document.getElementById('poke_stats');
let abilityOne = "";
let abilityTwo = "";
let abilityThree = "";
let evoOneOfPokePic = "";
let evoOneOfPokeName = "";
let evoOneOfPokeID = "";
let evoTwoOfPokePic = "";
let evoTwoOfPokeName = "";
let evoTwoOfPokeID = "";

// leerer Array zur Aufnahme ALLER EIGENSCHAFTEN des AKTUELLEN Pokemons ...
let pokeStats = [{ name: "", value: "", }];


// BASIC-Functions  "Pokemon-OVERVIEW-Show" ...

async function loadPokemon() {
    if (firstLoad) {
        // HINWEIS auf LADE-VORGANG beim ersten Programm-Start mit ONLOAD ...
        document.getElementById('overview_poke').innerHTML = `<p class="Laden_grafik">Pokemons werden geladen ...</p>`;
    }
    if (startIndex >= allPoke.length) {
        // NUR neue Pokemons laden, WENN angeforderte Poke NICHT im Array "allPoke" enthalten
        for (index = startIndex; index <= endIndex; index++) {
            let getAdress = await fetch("https://pokeapi.co/api/v2/pokemon/" + index);
            let pokeAsJson = await getAdress.json();
            allPoke.push(pokeAsJson);
        }
    }
    console.log(allPoke);
    showPokemon();
    if (firstLoad) {
        // beim ONLOAD die Buttons für "<<<<<<" und ">>>>>" setzen
        document.getElementById('button_pre_next').innerHTML += setPreviousButtons();
        document.getElementById('button_pre_next').innerHTML += setNextButtons();
        // ERSTES Laden (ONLOAD) nun deaktivieren !!!
        firstLoad = false;
    }
    // NACHDEM neue Pokemons geladen wurden, wird BUTTON "nächste" wieder aktiviert !!!
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
    if (startIndex == 1) {
        // Sprung über den ERSTEN Pokemon bedeutet ==> ans "ENDE" des Array springen ...
        startIndex = allPoke.length - 7;
        endIndex = startIndex + 7;
    } else {
        // vorherigen Pokemons zeigen ...
        startIndex = startIndex - 8;
        endIndex = startIndex + 7;
    }
    showPokemon();
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



// FUNCTIONs for DIALOG "Show-ONE-Pokemon"

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
        thisPokemon.innerHTML = renderOnePokemon(arrayID);
        statsPokemon.innerHTML = renderPokeStats();
    } else {
        arrayID = arrayID - 1;
        whatAbilities();
        // ERMITTELN: passende Background-Color für das POKE UND die ICONS für die POKE-Types ...
        findBackgroundColor();
        findTypeIcons();
        getAllStats();
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
        thisPokemon.innerHTML = renderOnePokemon(arrayID);
        statsPokemon.innerHTML = renderPokeStats();
    } else {
        arrayID = arrayID + 1;
        whatAbilities();
        findBackgroundColor();
        findTypeIcons();
        getAllStats();
        thisPokemon.innerHTML = renderOnePokemon(arrayID);
        statsPokemon.innerHTML = renderPokeStats();
    }
}





