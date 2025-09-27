// DEFINITION of VARIBALES ...

// GLOBAL ...
let allPoke = [];  // Array nimmt alle geladenen Pokemons auf
let startIndex = 1;   // startIndex gibt die Nr. des ersten zu ladenen Pokemons vor ... dann werden derzeit 12 insgesamt geladen
let endIndex = startIndex + 23;
let firstLoad = true;
let arrayID = 0;


// for the DIALOG "Show-One-Pokemon" ...
const showOnePokemon = document.getElementById("show_one_pokemon");
const closeDialog = document.getElementById("close_dialog");
const openDialog = document.getElementById("open_dialog");
const thisPokemon = document.getElementById('show_pokemon');

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
        // beim ONLOAD die Buttons für "nächste" und "zurück" setzen
        document.getElementById('button_pre_next').innerHTML += setPreviousButtons();
        document.getElementById('button_pre_next').innerHTML += setNextButtons();
        // ERSTES Laden (Onload) nun deaktivieren !!!
        firstLoad = false;
    }
    // NACHDEM neue Pokemons geladen wurden, wird BUTTON "nächste" wieder aktiviert !!!
    document.getElementById('show_next_button').disabled = false;
}

function showPokemon() {
    document.getElementById('overview_poke').innerHTML = "";
    for (index = startIndex - 1; index < endIndex; index++) {
        document.getElementById('overview_poke').innerHTML += renderPokemon(index);
        // Sprung über die 2 Entwicklungsstufen hinweg des Poke hinweg zum nächsten Pokemon
        index = index + 2;
    }
}

function showPrevious() {
    if (startIndex == 1) {
        // Sprung über den ERSTEN Pokemon bedeutet ==> ans "ENDE" des Array springen
        startIndex = allPoke.length - 23;
        endIndex = startIndex + 23;
    } else {
        // vorherigen Pokemons zeigen
        startIndex = startIndex - 24;
        endIndex = startIndex + 23;
    }
    showPokemon();
}

function showNext() {
    // deaktiviert BUTTON "nächste", damit kein weiterer LOAD ausgelöst werden kann, ...
    // während von API nächste Pokemons NOCH geladen werden !!!
    document.getElementById('show_next_button').disabled = true;
    // HINWEIS geben, LADE-VORGANG läuft noch !!! ...
    document.getElementById('overview_poke').innerHTML = "";
    document.getElementById('overview_poke').innerHTML = `<p class="Laden_grafik">Pokemons werden geladen ...</p>`;
    startIndex = startIndex + 24;
    endIndex = startIndex + 23;
    loadPokemon();
}


// Functions SHOW-ONE-Pokemon with DETAILS ...

// OPEN and CLOSE the DIALOG ...
openDialog.addEventListener("click", () => {
    thisPokemon.innerHTML = "";
    showOnePokemon.showModal(); // OPEN DIALOG with MODAL = only Dialog-BOX is working !

    // RENDERN des Pokemons JETZT ...

    thisPokemon.innerHTML = renderOnePokemon(arrayID);
});

closeDialog.addEventListener("click", () => {
    showOnePokemon.close(); // CLOSE DIALOG "Show-One-Pokemon"
});

function renderOnePokemon(arrayID) {
    return `    
        <div>
            <img src="${allPoke[arrayID].sprites.other.home.front_default}" class="img_pokemon" alt="Bild Pokemon"><br>
        </div>
        <div>
            <div class="poke_personal">Name Pokemon: ${allPoke[arrayID].name}<br></div>
            <div class="poke_personal">ID Pokemon: ${allPoke[arrayID].id}<br></div>
            <div class="poke_personal">Spezies Pokemon: ${allPoke[arrayID].species.name}<br></div>
        </div>
        <div>
            <div class="poke_details">Größe Pokemon: ${allPoke[arrayID].height}<br></div>
            <div class="poke_details">Gewicht Pokemon: ${allPoke[arrayID].weight}<br></div>
        </div>
        <div>
            <div class="poke_details">Type 0 Pokemon: ${allPoke[arrayID].types[0].type.name}<br></div>
            <div class="poke_details">Type 1 Pokemon: ${allPoke[arrayID].types[1].type.name}<br></div>
        </div>
    `
}

// <div>Name: ${allPoke[arrayID].name}<br></div>
// <div>Poke-ID: ${allPoke[arrayID].id}<br></div>
// <div>Type 0: ${allPoke[arrayID].types[0].type.name}<br></div>
// <div>Type 1: ${allPoke[arrayID].types[1].type.name}<br></div>
// <div>Größe: ${allPoke[arrayID].height}<br></div>
// <div>Gewicht: ${allPoke[arrayID].weight}<br></div>
// <div>Spezies: ${allPoke[arrayID].species.name}<br></div>
// <img src="${allPoke[arrayID].sprites.other.home.front_default}" class="img_poke" alt="Bild Pokemon"><br>

// document.getElementById('pokemon').innerHTML = `Name Pokemon: ${allPoke[0].name}<br>`;
// document.getElementById('pokemon').innerHTML += `ID Pokemon: ${allPoke[0].id}<br>`;
// document.getElementById('pokemon').innerHTML += `Type 0 Pokemon: ${allPoke[0].types[0].type.name}<br>`;
// document.getElementById('pokemon').innerHTML += `Type 1 Pokemon: ${allPoke[0].types[1].type.name}<br>`;
// document.getElementById('pokemon').innerHTML += `Größe Pokemon: ${allPoke[0].height}<br>`;
// document.getElementById('pokemon').innerHTML += `Gewicht Pokemon: ${allPoke[0].weight}<br>`;
// document.getElementById('pokemon').innerHTML += `Spezies Pokemon: ${allPoke[0].species.name}<br>`;
// document.getElementById('pokemon').innerHTML += `png-URL Pokemon: ${allPoke[0].sprites.front_shiny}<br>`;
// document.getElementById('pokemon').innerHTML += `<img src="${allPoke[0].sprites.front_shiny}" alt="Bild Pokemon"><br>`;
// document.getElementById('pokemon').innerHTML += `Bild Pokemon: ${allPoke[0].sprites.other.home.front_default}<br>`;
// document.getElementById('pokemon').innerHTML += `<img src="${allPoke[0].sprites.other.home.front_default}" alt="Bild Pokemon"><br>`;