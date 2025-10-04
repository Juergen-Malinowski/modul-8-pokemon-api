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
            // API-Datensatz aus URL hochladen und in getAdress ablegen ...
            // und "await" pausiert den CODE bis "fetch" abgeschlossen ist ...
            let getAdress = await fetch("https://pokeapi.co/api/v2/pokemon/" + index);
            // mit ".json()" wird der API-Datensatz in das json-Format umgewandelt ...
            // und "await" lässt CODE erst weiterlaufen, wenn dies abgeschlossen ist ...
            pokeAsJson = await getAdress.json();
            allPoke.push(pokeAsJson);
            capitalized = allPoke[index - 1].name;
            capitalizedString();        // wirkt auf Variable "capitalized" (erstes Zeichen wird GROSS) / in shorts.js
            allPoke[index - 1].name = capitalized;     // POKE-Name mit ersten Zeichen GROSS im Array abgelegt
        }
        loadedPokemons = loadedPokemons + (endIndex - startIndex + 1);   // HOCHZÄHLEN geladener POKEMONs
    }
    console.log(allPoke);  // während ENTWICKLUNG ... ARRAY-Aufbau immer "griffbereit"
    document.getElementById('search_Mask').innerHTML = renderSearchBox();
    showPokemon();
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
    // RENDERN "Warte-Bildschirm", bis API-LADEN abgeschlossen ist ...
    document.getElementById('overview_poke').innerHTML = renderLodingPicture();
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
    getPokeWithName();      // INPUT-Name auf Kleinschreibung setzen, denn so muss die SUCHE im API erfolgen ... speichern in pokeName / in shors.js
    loadWithNameOrIdAndShow();   // Funktion klärt, LADEN mit NAMEN oder ID ... danach AUSGABE Search-Pokemon ... / in shorts.js
    searchOnePoke = false;       // searchOnePoke wieder auf NORMAL-Zustand "false" stellen
    inputUser.value = "";        // INPUT-Feld wieder zurücksetzen (LEEREN)
}

function showSearchPoke() {
    getAllInfoForRendern();       // ALLE Voreinstellungen und Datenbeschaffungen VORM RENDERN !!! / in shorts.js
    thisSearchPokemon.innerHTML = "";
    statsSearchPokemon.innerHTML = "";
    showSearchPokemon.showModal(); // OPEN DIALOG für SEARCH-POKE mit MODAL => nur Dialog-BOX ist aktiv !
    thisSearchPokemon.innerHTML = renderSearchPokemon();   // DETAILS vom Pokemon rendern ...
    statsSearchPokemon.innerHTML = renderPokeStats();  // EIGENSCHAFTEN und WERTE rendern ...    
}

closeDialogSearch.addEventListener("click", () => {
    // CLOSE DIALOG "SEARCH-One-Pokemon" bei Mausklick ...
    audioClick.play();
    showSearchPokemon.close();  // Dialog schließen
    showPokemon();           // POKE-Overview zeigen
});

closeDialogSearch.addEventListener("keydown", (event) => {
    // CLOSE DIALOG "SEARCH-One-Pokemon" bei Betätigen von ENTER ...
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
    // CLOSE DIALOG "Show-One-Pokemon" bei Mausklick ...
    audioClick.play();
    showOnePokemon.close();  // Dialog schließen
    showPokemon();           // POKE-Overview zeigen
});

closeDialog.addEventListener("keydown", (event) => {
    // CLOSE DIALOG "Show-One-Pokemon" bei Betätigen von ENTER ...
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








