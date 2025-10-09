// ############################################
// BASIC-Functions  "Pokemon-OVERVIEW-Show" ...
// ############################################

async function loadPokemon() {  // LADEN und AUSGABE ...
    if (firstLoad) {
        goFristLoad();     // in shorts.js
    }
    if (startIndex >= allPoke.length) {
        // NUR neue Pokemons laden, WENN angeforderte Poke NICHT im Array "allPoke" enthalten
        for (index = startIndex; index <= endIndex; index++) {
            let getAdress = await fetch("https://pokeapi.co/api/v2/pokemon/" + index);  // mit API-Server verbinden zu dem Pokemon
            // ... "await" pausiert Programmlauf, BIS "fetch" abgeschlossen ist !!!
            pokeAsJson = await getAdress.json();   // Datensatz von API abholen und in json-Format umwandeln; speichern in pokeAsJson
            allPoke.push(pokeAsJson);              // neun Datensatz in allPoke speichern
            capitalized = allPoke[index - 1].name;
            capitalizedString();        // wirkt auf Variable "capitalized" (erstes Zeichen wird GROSS) / in shorts.js
            allPoke[index - 1].name = capitalized;     // POKE-Name mit ersten Zeichen GROSS im Array abgelegt
        }
        loadedPokemons = loadedPokemons + (endIndex - startIndex + 1);   // HOCHZÄHLEN geladener POKEMONs
    }
    document.getElementById('search_Mask').innerHTML = renderSearchBox();   // Pokemon-SUCHEN-Eingabe-Maske RENDERN
    showPokemon();   // START Abwicklung RENDERN des Pokemon-OVERVIEWs
    renderControlPanel();  // in shorts.js
}

function showPokemon() {
    // RENDERN der auszugebenen Pokemons VORBEREITEN ...
    document.getElementById('overview_poke').innerHTML = "";
    for (index = startIndex - 1; index < endIndex; index++) {
        arrayID = index;
        // ermittle passende Background-Color für das POKE UND die ICONS für die POKE-Types ...
        findBackgroundColor();     // in shorts.js
        findTypeIcons();           // in shorts.js
        document.getElementById('overview_poke').innerHTML += renderPokemon();  // jetzt RENDERN ...
    }
}

function showPrevious() {
    // ZEIGE die vorherigen Pokemons ...
    audioClick.play();
    if (startIndex === 1) {
        // Sprung über den ERSTEN Pokemon bedeutet ==> ans "ENDE" des Array springen ...
        startIndex = allPoke.length - 7;
        endIndex = startIndex + 7;
        showPokemon();   // START Abwicklung RENDERN des Pokemon-OVERVIEWs
    } else {
        // vorherige Pokemons zeigen ...
        startIndex = startIndex - 8;
        endIndex = startIndex + 7;
        showPokemon();   // START Abwicklung RENDERN des Pokemon-OVERVIEWs
    }
}

function showNext() {
    // ZEIGE die nächsten Pokemons ... falls mehr als im ARRAY "allPoke", dann über API-Nachladen ...
    audioClick.play();
    // BUTTONs "nächste" und "vorherige" DEAKTIVIEREN, damit kein weiterer LOAD ausgelöst werden kann, ...
    // während von API nächste Pokemons NOCH geladen werden ...
    document.getElementById('show_next_button').disabled = true;
    document.getElementById('show_previous_button').disabled = true;
    document.getElementById('overview_poke').innerHTML = "";
    document.getElementById('overview_poke').innerHTML = renderLodingPicture();   // RENDERN "Warte-Bildschirm", bis API-LADEN abgeschlossen ist ...
    startIndex = startIndex + 8;
    endIndex = startIndex + 7;
    loadPokemon();  // laden UND showPokemon()
}


// ##########################################
// FUNCTIONs for SEARCH and SHOW this Pokemon
// ##########################################

function searchAndShowOnePoke() {
    // Pokemon SUCHEN über Name oder ID und dann SHOW this Poke ...
    audioClick.play();
    searchOnePoke = true;   // TRUE sorgt für andere Arbeitsweise der Funktionen unter getAllInfoForRendern() !!!
    getInputForSearch();    // Daten INPUT einlesen / in shorts.js
    getPokeIdNumber();      // INPUT auf ID-Number prüfen und verarbeiten / SCHALTER für IF, ob ID oder Name relevant / in shorts.js
    getPokeWithName();      // INPUT-Name auf Kleinschreibung setzen, POKEMON-Namen-SUCHEN ... speichern in pokeName / in shors.js
    loadWithNameOrIdAndShow();   // Funktion klärt, LADEN mit NAMEN oder ID ... danach AUSGABE des gesuchten Pokemon
    searchOnePoke = false;       // searchOnePoke wieder auf NORMAL-Zustand "false" stellen
    inputUser.value = "";        // INPUT-Feld wieder zurücksetzen (LEEREN)
}

async function loadWithNameOrIdAndShow() {
    // Funktion klärt, LADEN mit NAMEN oder ID ... danach AUSGABE des gesuchten Pokemons ...
    if (inputUser.value != "") {  // gab es überhaupt eine INPUT-Eingabe des Users ?
        // NUR, WENN eine VORGABE des User vor Button-Click erfolgte  ...
        if (pokeIdNumber == 2000 && pokeNotInAllPoke) {    // NICHT in allPoke (TRUE) = Laden über pokeName
            // SUCHE über NAME ... getPokeIdNumber() ergibt für "pokeIdNumber" den Wert 2000, wenn ein STRING vorliegt! 
            let getAdress = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);  // API für Zugriff vorbereiten   

            console.log("pokeName = ", pokeName, " bei fetch-Zugriff !!!");

            pokeAsJson = await getAdress.json();                                            // Auslesen Datensatz in pokeAsJson
            capitalized = pokeAsJson.name;   // capitalized nimmt Namen auf
            capitalizedString();             // wirkt auf Variable "capitalized" (erstes Zeichen wird GROSS) / in shorts.js
            pokeAsJson.name = capitalized;   // POKE-Name mit ersten Zeichen GROSS im Array abgelegt
            showSearchPoke();                // RENDERN einleiten
        } else {
            if (pokeIdNumber != 2000 && pokeNotInAllPoke) {    // NICHT in allPoke (TRUE) = Laden über pokeName

                // SUCHE über ID ... (getPokeIdNumber() gibt zurück eine Zahl UNGLEICH Null !)
                // über ID das Poke suchen + anzeigen ...
                let getAPI = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokeIdNumber);  // API für Zugriff vorbereiten
                pokeAsJson = await getAPI.json();                                               // Auslesen Datensatz in pokeASJson
                capitalized = pokeAsJson.name;   // capitalized nimmt Namen auf
                capitalizedString();             // wirkt auf Variable "capitalized" (erstes Zeichen wird GROSS) / in shorts.js
                pokeAsJson.name = capitalized;   // POKE-Name mit ersten Zeichen GROSS im Array abgelegt
                showSearchPoke();                // RENDERN einleiten
            }
        }
    }
}

function showSearchPoke() {
    // RENDERN des gesuchten Pokemons einleiten ...
    getAllInfoForRendern();       // ALLE Voreinstellungen und Datenbeschaffungen VORM RENDERN !!! / in shorts.js
    thisSearchPokemon.innerHTML = "";
    statsSearchPokemon.innerHTML = "";
    showSearchPokemon.showModal(); // OPEN DIALOG für SHOW-SEARCH-POKE mit MODAL => nur Dialog-BOX ist aktiv !
    thisSearchPokemon.innerHTML = renderSearchPokemon();   // DETAILS vom Pokemon RENDERN ...
    statsSearchPokemon.innerHTML = renderPokeStats();      // EIGENSCHAFTEN und WERTE RENDERN ...    
}

closeDialogSearch.addEventListener("click", () => {
    // CLOSE DIALOG "SEARCH-One-Pokemon" mit Mausklick ...
    audioClick.play();
    showSearchPokemon.close();  // Dialog schließen
    showPokemon();              // POKE-Overview zeigen
});

closeDialogSearch.addEventListener("keydown", (event) => {
    // CLOSE DIALOG "SEARCH-One-Pokemon" mit Betätigen von ENTER ...
    audioClick.play();
    if (event.key === "Enter") {
        showSearchPokemon.close();  // Dialog schließen
        showPokemon();              // POKE-Overview zeigen
    }
});


// #######################################
// FUNCTIONs for DIALOG "Show-ONE-Pokemon"
// #######################################

function showThisPokemon(getIDcode) {
    // ausgelöst durch ONCLICK auf einem Pokemon-Bild ...
    // WIRD die in "getIDcode" (id vom Ausgabe-div) gespeicherte arrayID (z.B."pic_9") zum Bild rausgefiltert ...
    audioClick.play();
    // ALLE Zeichen entfernen, um ArrayID freizulegen ...
    getIDcode = String(getIDcode);            // wandelt in STRING um 
    arrayID = getIDcode.replace(/\D+/g, '');  // entfernt alle Zeichen, Zahlen bleiben
    arrayID = Number(arrayID);                // wandelt in eine Zahl um
    getAllInfoForRendern();                   // ALLE Voreinstellungen und Datenbeschaffungen VORM RENDERN !!! / in shorts.js
    thisPokemon.innerHTML = "";
    statsPokemon.innerHTML = "";
    showOnePokemon.showModal(); // OPEN DIALOG für SHOW-One-Poke mit MODAL => nur Dialog-BOX ist aktiv !
    thisPokemon.innerHTML = renderOnePokemon(arrayID);   // DETAILS vom Pokemon rendern ...
    statsPokemon.innerHTML = renderPokeStats();  // EIGENSCHAFTEN und WERTE rendern ...
}

closeDialog.addEventListener("click", () => {
    // CLOSE DIALOG "Show-One-Pokemon" mit Mausklick ...
    audioClick.play();
    showOnePokemon.close();  // Dialog schließen
    showPokemon();           // POKE-Overview zeigen
});

closeDialog.addEventListener("keydown", (event) => {
    // CLOSE DIALOG "Show-One-Pokemon" mit Betätigen von ENTER ...
    audioClick.play();
    if (event.key === "Enter") {
        showOnePokemon.close();   // Dialog schließen
        showPokemon();            // POKE-Overview zeigen
    }
});

function showPreviousPoke() {
    // ONCLICK ... den vorherigen Pokemon zeigen
    audioClick.play();
    if (arrayID == 0) {
        arrayID = allPoke.length - 1;
        getAllInfoForRendern();         // beschafft alles, was für das RENDERN ONE-Pokemon erforderlich ist ...
        thisPokemon.innerHTML = renderOnePokemon(arrayID);
        statsPokemon.innerHTML = renderPokeStats();
    } else {
        arrayID = arrayID - 1;
        getAllInfoForRendern();
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
        getAllInfoForRendern();          // beschafft alles, was für das RENDERN erforderlich ist ! /  in shorts.js
        thisPokemon.innerHTML = renderOnePokemon(arrayID);
        statsPokemon.innerHTML = renderPokeStats();
    } else {
        arrayID = arrayID + 1;
        getAllInfoForRendern();
        thisPokemon.innerHTML = renderOnePokemon(arrayID);
        statsPokemon.innerHTML = renderPokeStats();
    }
}

