// DEFINITION of VARIBALES ...

// GLOBAL ...
let allPoke = [];     // Array nimmt alle geladenen Pokemons auf

let startIndex = 1;   // startIndex gibt die Nr. des ersten zu ladenen Pokemons vor !
let endIndex = startIndex + 7;  // Entscheidet, wieviele POKEMONs geladen werden ...
// (jedes Poke hat 3 aufeinanderfolgende Datensätze, mit den Entwicklungsstufen. Also ...
// alle 4 Datensätze ein NEUES Pokemon!!! ). Derzeit werden 24 Datensätze am Stück geladen,
// für 8 zu zeigende Pokemons.

let firstLoad = true;  // überwacht, dass bestimmte BEFEHLE nur beim ERST-Start ablaufen !

let arrayID = 0;    // enthält immer die ARRAY-ID des Start-Pokemons beim Bildaufbau

// for the DIALOG "Show-One-Pokemon" ...
const showOnePokemon = document.getElementById("show_one_pokemon");
const closeDialog = document.getElementById("close_dialog");
const openDialog = document.getElementById("open_dialog");
const thisPokemon = document.getElementById('show_pokemon');
const evoPokemon = document.getElementById('poke_evolution');
let abilityOne = "";
let abilityTwo = "";
let abilityThree = "";
let evoOneOfPokePic = "";
let evoOneOfPokeName = "";
let evoOneOfPokeID = "";
let evoTwoOfPokePic = "";
let evoTwoOfPokeName = "";
let evoTwoOfPokeID = "";

// for AUDIO
// to start AUDIO:   audioClick.play();
const audioClick = new Audio('./assets/sound/click.mp3')


// BASIC-Functions  "Pokemon-Slide-Show" ...

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
        document.getElementById('overview_poke').innerHTML += renderPokemon(arrayID);  // jetzt RENDERN ...
        // Sprung über die 2 Entwicklungsstufen des Poke hinweg zum nächsten NEUEN Pokemon
        // index = index + 2;
    }
}

function showPrevious() {
    // ZEIGE die vorherigen Pokemons ...
    audioClick.play();
    if (startIndex == 1) {
        // Sprung über den ERSTEN Pokemon bedeutet ==> ans "ENDE" des Array springen
        startIndex = allPoke.length - 7;
        endIndex = startIndex + 7;
    } else {
        // vorherigen Pokemons zeigen
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
    loadPokemon();
}



// FUNCTIONs for DIALOG "Show-One-Pokemon"

function showThisPokemon(getIDcode) {
    // ausgelöst durch ONCLICK auf einem Pokemon-Bild ...
    audioClick.play();
    // ALLE Zeichen entfernen, um ArrayID freizulegen ...
    getIDcode = String(getIDcode);            // wandelt in STRING um 
    arrayID = getIDcode.replace(/\D+/g, '');  // entfernt alle Zeichen, Zahlen bleiben
    arrayID = Number(arrayID);                // wandelt in eine Zahl um
    whatAbilities();  // ERMITTELN der besonderen Fähigkeiten
    // getNextEvolutionsFromPoke();  // Evolutions-Stufen des Pokemons laden
    thisPokemon.innerHTML = "";
    evoPokemon.innerHTML = "";
    showOnePokemon.showModal(); // OPEN DIALOG with MODAL = only Dialog-BOX is working !
    thisPokemon.innerHTML = renderOnePokemon(arrayID);   // DETAILS vom Pokemon rendern ...
    evoPokemon.innerHTML =  renderPokeEvolution();  // EVOLUTIONS-Stufe rendern ...
}

function whatAbilities() {
    // VORGABE: -KEINE- Fähigkeiten vorhanden ...
    abilityOne = "";
    abilityTwo = "";
    abilityThree = "";
    // Fähigkeiten auslesen ...
    for (let index = 0; index < allPoke[arrayID].abilities.length; index++) {
        if (index == 0) {
            // Fähigkeit 1 für Ausgabe aus Array holen
            abilityOne = allPoke[arrayID].abilities[index].ability.name;
            // console.log("Fähigkeit 1 = ", abilityOne);
        }
        if (index == 1) {
            // Fähigkeit 2 für Ausgabe aus Array holen
            abilityTwo = allPoke[arrayID].abilities[index].ability.name;
            // console.log("Fähigkeit 2 = ", abilityTwo);
        }
        if (index == 2) {
            // Fähigkeit 2 für Ausgabe aus Array holen
            abilityThree = allPoke[arrayID].abilities[index].ability.name;
            // console.log("Fähigkeit 3 = ", abilityThree);
        }
    }
}

// function getNextEvolutionsFromPoke() {
//     // Einlesen der beiden Entwicklungsstufen des Pokemon (name und Poke-ID) ...
//     evoOneOfPokePic = allPoke[arrayID+1].sprites.other.home.front_default;
//     evoOneOfPokeName = allPoke[arrayID+1].name;
//     evoOneOfPokeID = allPoke[arrayID+1].id;
//     evoTwoOfPokePic = allPoke[arrayID+2].sprites.other.home.front_default;
//     evoTwoOfPokeName = allPoke[arrayID+2].name;
//     evoTwoOfPokeID = allPoke[arrayID+2].id;
// }

closeDialog.addEventListener("click", () => {
    // CLOSE DIALOG "Show-One-Pokemon"
    audioClick.play();
    showOnePokemon.close();
    showPokemon();
});

function showPreviousPoke() {
    // ONCLICK ... den vorherigen Pokemon zeigen
    audioClick.play();
    if (arrayID < 0) {
        arrayID = allPoke.length - 1;
        whatAbilities();
        // getNextEvolutionsFromPoke()
        thisPokemon.innerHTML = renderOnePokemon(arrayID);
        evoPokemon.innerHTML =  renderPokeEvolution();
    } else {
        arrayID = arrayID - 1;
        whatAbilities();
        // getNextEvolutionsFromPoke()
        thisPokemon.innerHTML = renderOnePokemon(arrayID);
        evoPokemon.innerHTML =  renderPokeEvolution();
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
        // getNextEvolutionsFromPoke()
        thisPokemon.innerHTML = renderOnePokemon(arrayID);
        evoPokemon.innerHTML =  renderPokeEvolution();
    } else {
        arrayID = arrayID + 1;
        whatAbilities();
        // getNextEvolutionsFromPoke()
        thisPokemon.innerHTML = renderOnePokemon(arrayID);
        evoPokemon.innerHTML =  renderPokeEvolution();
    }
}






