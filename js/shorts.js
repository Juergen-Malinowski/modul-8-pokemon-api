// #############################################################################################
// all   SHORTs   Function / ausgegliederte "Kurz-Funktionen" als Teil einer Haupt-Funktion  ...
// #############################################################################################


// ##########################
// SHORTs   for MAIN-Page ...
// ##########################

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
    loadAllPokemonNames();          // ALLE Pokemon-Namen und -ID´s von API holen und in "allPokeName" speichern
    // HINWEIS auf LADE-VORGANG beim ersten Programm-Start mit ONLOAD ...
    document.getElementById('overview_poke').innerHTML = "";
    document.getElementById('overview_poke').innerHTML = renderLodingPicture();
    // ERSTES Laden (ONLOAD) nun deaktivieren ...
    firstLoad = false;
}

async function loadAllPokemonNames() {
    // ALLE Pokemon-Namen und -ID´s von API holen und in "allPokeName" speichern ...
    let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1302");
    let data = await response.json();
    let results = data.results;        // "results" übernimmt die Daten aus der API (alle)
    for (let index = 0; index < results.length; index++) {
        // ALLE Pokemons-Namen und -IDs nun als Datensätze in "pokeData" ablegen ...
        let thisPokemon = results[index];
        let pokeName = thisPokemon.name;
        let pokeURL = thisPokemon.url;
        // aus der URL nun die Poke-ID rausholen ...
        let parts = pokeURL.split("/");
        let pokeID = parts[parts.length - 2];
        let pokeData = { name: pokeName, id: pokeID };   // name und id abspeichern
        allPokeName.push(pokeData);                      // Array "allPokeName" erhält den Datensatz
    }
}

function renderControlPanel() {
    // STEUERUNGS-Buttons für "<<<<<<" und ">>>>>" und COUNTER setzen ...
    buttonPreNext.innerHTML = "";
    buttonPreNext.innerHTML = setButtonsAndCounter();   // in template.js
    // BUTTONs show "Nächste und Vorherige Pokemons" now SET WORKING again ...
    document.getElementById('show_next_button').disabled = false;
    document.getElementById('show_previous_button').disabled = false;
}

function findBackgroundColor() {
    // POKEMON erhält eine zum Haupt-TYP passende BG-Color ...
    if (searchOnePoke) {
        // Background-Color ermitteln für "SEARCH-One-Pokemon" ...
        backgroundColor = pokeAsJson.types[0].type.name;  // BASIS-Typ ermitteln!
        // dann prüfen ob Basis-Typ normal, ABER ein zweiter NICHT "normaler" Typ ist vorhanden ...
        if (backgroundColor == "normal" && pokeAsJson.types.length > 1) {
            // Übernahme background-Color vom 2.Typ, da 1.Typ normal war ...
            backgroundColor = pokeAsJson.types[1].type.name;
        }
    } else {
        // Background-Color ermitteln für "Show-ONE-Pokemon" ...
        backgroundColor = allPoke[arrayID].types[0].type.name;  // BASIS-Typ ermitteln!
        // dann prüfen ob Basis-Typ normal, ABER ein zweiter NICHT "normaler" Typ ist vorhanden ...
        if (backgroundColor == "normal" && allPoke[arrayID].types.length > 1) {
            // Übernahme background-Color vom 2.Typ, da 1.Typ normal war ...
            backgroundColor = allPoke[arrayID].types[1].type.name;
        }
    }
    // ZUORDNUNG BG-Color entsprechend des POKE-Haupt-TYPES ...
    getTheColorCode();  // FUNKTION in data.JS !
}


// #################################
// SHORTs   for  SEARCH Pokemon  ...
// #################################

function getInputForSearch() {
    // INPUT-Daten mit ID einlesen ...
    inputUser = document.getElementById('input_user');
    searchThisPoke = "";
    searchThisPoke = inputUser.value.trim();      // Übernahme in "searchThisPoke" OHNE Leerzeichen
}

function getPokeIdNumber() {
    // USER-Eingabe ... ID extrahieren und Ergebnis am Ende in pokeIdNumber speichern ...
    pokeIdNumber = searchThisPoke;                    // Übergabe SUCH-Inhalt an pokeIdNumber zur Bearbeitung
    pokeIdNumber = String(pokeIdNumber);              // wandelt in STRING um 
    pokeIdNumber = pokeIdNumber.replace(/\D+/g, '');  // entfernt alle Zeichen, Zahlen bleiben
    pokeIdNumber = Number(pokeIdNumber);              // wandelt in eine Zahl um (in Zahl Null, wenn PokeIdNumber LEER ist, da keine Zahl vorhanden)
    if (pokeIdNumber != 0) {
        pokeAsJson.id = pokeIdNumber;
    }
    if (pokeIdNumber == 0) {
        pokeIdNumber = 2000;
    }
}

function getPokeWithName() {
    // USER-Eingabe ... NAME ... Eingabe für SUCHE kpl. in Kleinbuchstaben ... 
    pokeName = searchThisPoke;            // Übergabe SUCH-Inhalt an pokeName zur Bearbeitung
    pokeName = pokeName.toLowerCase();    // Name in Kleinbuchstaben umwandeln
    pokeNotInAllPoke = true;              // ANNAHME, Pokemon muss geladen werden, da nicht in Array allPoke
    if (pokeIdNumber == 2000) {           // NULL liegt vor, wenn KEINE ID vorgegeben wurde (getPokeIdNumber) !!!
        for (let index = 0; index < allPoke.length; index++) {
            let checkPokeName = allPoke[index].name.toLowerCase();
            if (pokeName == checkPokeName) {
                pokeNotInAllPoke = false;             // POKE-NAME ist in allPoke enthalten ... jetzt RENDERN !!!
                capitalized = pokeName;               // capitalized nimmt Namen auf
                capitalizedString();                  // wirkt auf Variable "capitalized" (erstes Zeichen wird GROSS) / in shorts.js
                pokeAsJson.name = capitalized;        // NAME Pokemon an Ausgabe-Array pokeAsJson übergeben
                pokeAsJson.id = allPoke[index].id;    // ID Pokemon an Ausgabe-Array pokeAsJson übergeben
                showSearchPoke();                     // RENDERN auslösen ...
            }
        }
        if (pokeNotInAllPoke) {
            console.log("in IF pokeNotInAllPoke REINGEGANGEN was nur bei TRUE erlaubt wäre", pokeNotInAllPoke);
            searchStringInName();                 // aus Such-Teilstring einen passenden Poke-Namen SUCHEN starten ...            
        }
    }
}

function searchStringInName() {
    // aus SUCH-Teilstring nach passenden Pokemon-Namen suchen ...
    let result = findPokemonNameUnique();                       // Suche nach passenden Poke-Namen
    let output = document.getElementById("input_incorrect");    // FEHLER-Ausgabe vorbereiten
    output.innerHTML = "";
    // AUSWERTEN der Suchergebnisse ...
    if (result.status === "none") {
        output.innerHTML = "❌ This pokemon do not exist !";
        inputUser.value = ""; return;   // mit ""-Zuweisung bricht die SUCHE ab und geht zum IMPUT zurück
    }
    if (result.status === "too_short") {
        output.innerHTML = "⚠️ Please enter at least 3 letters ...";
        inputUser.value = ""; return;   // mit ""-Zuweisung bricht die SUCHE ab und geht zum IMPUT zurück
    }
    if (result.status === "multiple") {
        // MEHR als EIN TREFFER ... USER muss Auswahl treffen ...
        renderSuggestionList(result.suggestions); return;       // AUSWAHL rendern !
    }
    if (result.status === "one") { pokeName = result.name; }    // Nur ein Treffer ... zum RENDERN bereit ...
}

function findPokemonNameUnique() {
    // PRÜFUNG, wie VIELE Pokemon-Namen mit dem SUCH-String übereinstimmen ...
    if (inputUser === undefined || inputUser === null) {   // FEHLER ... KEINE Eingabe ist erfolgt !
        return { status: "error", message: "Please write something ..." };
    }
    let searchText = pokeName;     // Übernahme des Pokemon-Namens (kleingeschrieben OHNE Leerstellen)
    console.log("SUCH-Test-Name ist = ", searchText);
    if (searchText.length < 3) {                           // FEHLER ... zu wenige Zeichen vorgegeben !
        return { status: "too_short", message: "Please enter at least 3 letters ..." };
    }
    let matches = [];             // Array "matches" sammelt Treffer mit dem Suchbegriff bei den Pokemon-Namen
    for (let index = 0; index < allPokeName.length; index++) {
        // Array allPokeName nun auf Treffer mit SUCH-Begriff prüfen ...
        let loadPokemon = allPokeName[index];
        let thisName = loadPokemon.name;
        if (thisName.includes(searchText)) {
            matches.push(loadPokemon);                     // Treffer in "matches" schieben
        }
    }
    if (matches.length === 0) { return { status: "none", message: "This pokemon do not exist !" }; }
    if (matches.length > 1) {     // NUR durchlaufen, wenn MEHR als ein passender Poke-NAME gefunden wurde !
        let names = [];
        for (let i = 0; i < matches.length; i++) {
            names.push(matches[i].name);                    // NAMEN-Treffer in "names" schieben
        }
        pokeNotInAllPoke = false;                           // KEINE Bildausgabe - erst auf ONCLICK in Auswahlliste
        return { status: "multiple", suggestions: names };  // MEHRERE Treffer (status) ... AUSWAHL aus names (suggestions)
    }
    let uniquePokemon = matches[0];     // wenn nur EIN Poke-NAME passt, kann AUSGABE erfolgen !
    return { status: "one", name: uniquePokemon.name, id: uniquePokemon.id };
}

function renderSuggestionList(nameList) {
    // AUSGABE der Trefferliste ... danach Auswahl durch USER möglich durch ONCLICK ...
    let output = document.getElementById("input_incorrect");
    let html = "<p>Multiple HITS – please, select:</p>";
    html += "<ul class='suggestion_list'>";
    for (let i = 0; i < nameList.length; i++) {
        html += `<li><button class="suggestion_button" 
            onclick="chooseThisPokemon('${nameList[i]}')">${nameList[i]}</button></li>`;
    }
    html += "</ul>";
    output.innerHTML = html;
}

function chooseThisPokemon(namePoke) {
    pokeName = namePoke;         // ÜBERNAHME Name des POKEMONs aus der AUSWAHL-Liste
    pokeIdNumber = 2000;         // SCHALTER für fetch aktivieren
    pokeNotInAllPoke = true;     // SCHALTER für fetch aktivieren
    inputUser.value = pokeName;
    console.log("chooseThisPokemon() wurde bearbeitet. pokeName ist = ", pokeName);
    console.log("inputUser = ", inputUser.value);
    loadWithNameOrIdAndShow();   // AUSGABE des Pokemons veranlassen
}

function findPokemonName(userInput) {
    // 1. Prüfen, ob eine Eingabe vorhanden ist
    if (userInput === undefined || userInput === null) {
        console.log("Keine Eingabe vorhanden.");
        return;
    }
    // if (inputUser.value != "") { return; }

    // 2. Eingabe in Kleinbuchstaben umwandeln (Groß-/Kleinschreibung ignorieren)
    let searchText = userInput.toLowerCase();

    // 3. Prüfen, ob mindestens 3 Zeichen eingegeben wurden
    if (searchText.length < 3) {
        console.log("Bitte mindestens 3 Zeichen eingeben.");
        return;
    }
    // 4. Durchsuche den Array allPokeName
    for (let index = 0; index < allPokeName.length; index++) {
        let thisPokemon = allPokeName[index];
        let thisName = thisPokemon.name;

        // 5. Wenn der Pokémon-Name den Suchtext enthält (Teilstring-Suche)
        if (thisName.includes(searchText)) {
            // Treffer gefunden → vollständigen Namen zurückgeben
            console.log("Pokemon gefunden:", thisName);
            return thisName;
        }
    }
    // 6. Wenn kein Treffer gefunden wurde
    console.log("Kein Pokemon gefunden, das zu '" + userInput + "' passt.");
    return null;
}



// #################################
// SHORTs   for SHOW-One-Pokemon ...
// #################################

function getAllInfoForRendern() {
    // ALLE Voreinstellungen und Datenbeschaffungen VORM RENDERN ...
    whatAbilities();            // ERMITTELN der besonderen Fähigkeiten
    findBackgroundColor();      // ERMITTELN: Background-Color für das POKEMON
    findTypeIcons();            // ERMITTELN: ICONS für die POKE-Types
    // ERMITTELN: WERTE zur Darstellung PROCESS-BAR und alle EINGENSCHAFTEN mit WERTEN ...
    getMaxValueFromAllStats();
}

function findTypeIcons() {
    // ERMITTELN der Pokemon-Typen (max 2 vorhanden) und Zuordnung der Icons ...
    pokeTypeIcon1 = "";
    pokeTypeIcon2 = "normal.jpg";
    pokeTypeSearch = "";
    if (searchOnePoke) {
        getIconsSearchPoke();  // TypeIcons ermitteln für "SEARCH-One-Pokemon" ...
    } else {
        getIconsOnePoke();     // TypeIcons ermitteln für "Show-ONE-Pokemon" ...
    }
}

function getIconsSearchPoke() {
    // TypeIcons ermitteln für "SEARCH-One-Pokemon" ...
    for (let index = 0; index < pokeAsJson.types.length; index++) {
        if (index == 1) {
            // TYPE 1 holen ...
            pokeTypeIcon2 = pokeAsJson.types[index].type.name;
            pokeTypeSearch = pokeTypeIcon2;  // Wert für Suche bei ZUORDNUNG übergeben
            getTheTypeIcons();  // in data.JS ! (über VAR "PokeTypeSearch" erfolgt ZUORDNUNG)
            pokeTypeIcon2 = pokeTypeSearch;  // "Dateinamen.JPG" nun zuweisen für das Rendern
        } else {
            // TYPE 0 holen ...
            pokeTypeIcon1 = pokeAsJson.types[index].type.name;
            pokeTypeSearch = pokeTypeIcon1;
            getTheTypeIcons();
            pokeTypeIcon1 = pokeTypeSearch;
        }
    }
}

function getIconsOnePoke() {
    // TypeIcons ermitteln für "Show-ONE-Pokemon" ...
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


function whatAbilities() {
    // VORGABE: -KEINE- Fähigkeiten vorhanden ...
    abilityOne = "";
    abilityTwo = "";
    abilityThree = "";
    // Fähigkeiten AUSLESEN für das RENDERN ...
    if (searchOnePoke) {
        // Fähigkeiten auslesen für "SEARCH-One-Pokemon" ...
        for (let index = 0; index < pokeAsJson.abilities.length; index++) {
            switch (index) {  // Fähigkeit 1-3 werden ausgelesen und zugeordnet + gespeichert ...
                case 0: abilityOne = pokeAsJson.abilities[index].ability.name; break;
                case 1: abilityTwo = pokeAsJson.abilities[index].ability.name; break;
                case 2: abilityThree = pokeAsJson.abilities[index].ability.name; break;
                default: break;
            }
        }
    } else {
        // Fähigkeiten auslesen für "Show-ONE-Pokemon" ...
        for (let index = 0; index < allPoke[arrayID].abilities.length; index++) {
            switch (index) {  // Fähigkeit 1-3 werden ausgelesen und zugeordnet + gespeichert ...
                case 0: abilityOne = allPoke[arrayID].abilities[index].ability.name; break;
                case 1: abilityTwo = allPoke[arrayID].abilities[index].ability.name; break;
                case 2: abilityThree = allPoke[arrayID].abilities[index].ability.name; break;
                default: break;
            }
        }
    }
}

function getAllStats() {
    // globaler ARRAY "pokeStats" nimmt 6 Datensätze auf = je EIGENSCHAFT + WERT ...
    pokeStats = [];
    // leere "Array-Variable" zur Aufnahme des GESAMTEN Datensatz zum AKTUELLEN Pokemon...
    let thisPokeAllData = {};
    if (searchOnePoke) {
        // Datensatz für "SEARCH-One-Pokemon" übernehmen ...
        thisPokeAllData = pokeAsJson.stats;  // übernimmt alle Eigenschaften in das Objekt
    } else {
        // Datensatz für "Show-ONE-Pokemon" übernehmen ...
        thisPokeAllData = allPoke[arrayID].stats;  // übernimmt alle Eigenschaften in das Objekt
    }
    // ALLE Eigenschaften des POKEMONs aus dem Datensatz des Pokemons auslesen ...
    for (let index = 0; index < thisPokeAllData.length; index++) {
        let allStats = thisPokeAllData[index];        // speichern aller Eigenschaften aus allPoke
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




