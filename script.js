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

async function searchAndShowOnePoke() {
    // Pokemon SUCHEN über Name oder ID und dann SHOW this Poke ...
    audioClick.play();
    searchOnePoke = true;   // TRUE sorgt für andere Arbeitsweise der AUSGABE-Funktionen
    getInputForSearch();    // Daten INPUT einlesen / in shorts.js
    getPokeIdNumber();      // INPUT auf ID-Number prüfen und verarbeiten / in shorts.js
    console.log("pokeIdNumber NACH Funktion getPokeIdNumber() : ", pokeIdNumber);

    if (inputUser.value != "") {  // gab es überhaupt eine INPUT-Vorgabe ?
        // NUR, WENN eine VORGABE des User vor Button-Click erfolgte  ...
        if (pokeIdNumber == 0) {
            // SUCHE über NAME ...  (Wert NULL ergibt getPokeIdNumber(), wenn ein STRING vorliegt !)
            console.log("IF hat festgestellt, pokeIdNumber ist NULL = ein STRING liegt vor : ", pokeIdNumber);
            console.log("Der STRING ist : ", searchThisPoke);

            // MIT searchThisPoke über NAMEN des pokemon SUCHEN ...
            // ACHTUNG .... den NAMEN komplett in KLEIN-Buchstaben umwandeln für SUCHE !!!

            // var ergebnis = textEingabe.toLowerCase();


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



        } else {
            // SUCHE über ID ... (getPokeIdNumber() enthält Zahl UNGLEICH Null !)
            console.log("IF hat festgestellt, pokeIdNumber ist eine NUMBER (NICHT NULL) : ", pokeIdNumber);

            // über ID das Poke suchen + anzeigen
            let getAPI = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokeIdNumber);
            let pokeAsJson = await getAPI.json();
            console.log("geladener Pokemon-ARRAY ", pokeAsJson);
            rememberArrayID = arrayID;  // speichert vorübergehend den STAND von arrayID
            arrayID = pokeIdNumber - 1; // arrayID für Datenzugriff aktualisieren
            showSearchPoke();



            arrayID = rememberArrayID;  // gibt NACH der SUCHE den ALTEN Stand von arrayID zurück
        }
    }
    else {
        // ERROR-Meldung UND zur EINGABE auffordern, da KEINE Eingabe vorliegt ! ...
    }
    searchOnePoke = false;
}

function showSearchPoke() {
    // ausgelöst durch searchAndShowOnePoke() nach INPUT USER ...
    getAllInfoForRendern();       // ALLE Voreinstellungen und Datenbeschaffungen VORM RENDERN !!! / in shorts.js
    thisPokemon.innerHTML = "";
    statsPokemon.innerHTML = "";
    showOnePokemon.showModal(); // OPEN DIALOG with MODAL => only Dialog-BOX is working !
    thisPokemon.innerHTML = renderOnePokemon(arrayID);   // DETAILS vom Pokemon rendern ...
    statsPokemon.innerHTML = renderPokeStats();  // EIGENSCHAFTEN und WERTE rendern ...    
}


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
    showOnePokemon.showModal(); // OPEN DIALOG with MODAL => only Dialog-BOX is working !
    thisPokemon.innerHTML = renderOnePokemon(arrayID);   // DETAILS vom Pokemon rendern ...
    statsPokemon.innerHTML = renderPokeStats();  // EIGENSCHAFTEN und WERTE rendern ...
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
    console.log("aktueller WERT arrayID VOR IF-Anweisung = ", arrayID);
    if (arrayID == 0) {
        console.log("IF arrayID = 0 hat AUSGELÖST ... ", arrayID);        
        arrayID = allPoke.length - 1;
        getInfoOnePokemon();         // beschafft alles, was für das RENDERN ONE-Pokemon erforderlich ist ...
        thisPokemon.innerHTML = renderOnePokemon(arrayID);
        statsPokemon.innerHTML = renderPokeStats();
    } else {
        arrayID = arrayID - 1;
        getInfoOnePokemon();
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
        getInfoOnePokemon();          // beschafft alles, was für das RENDERN erforderlich ist ! /  in shorts.js
        thisPokemon.innerHTML = renderOnePokemon(arrayID);
        statsPokemon.innerHTML = renderPokeStats();
    } else {
        arrayID = arrayID + 1;
        getInfoOnePokemon();
        thisPokemon.innerHTML = renderOnePokemon(arrayID);
        statsPokemon.innerHTML = renderPokeStats();
    }
}








