// DEFINITION of VARIBALES

let allPoke = [];  // Array nimmt alle geladenen Pokemons auf
let startIndex = 1;   // startIndex gibt die Nr. des ersten zu ladenen Pokemons vor ... dann werden derzeit 12 insgesamt geladen
let endIndex = startIndex + 35;


// BASIC-Functions
async function loadPokemon() {
    for (index = startIndex; index <= endIndex; index++) {
        let getAdress = await fetch("https://pokeapi.co/api/v2/pokemon/" + index);
        let pokeAsJson = await getAdress.json();
        allPoke.push(pokeAsJson);
    }
    console.log(allPoke);
    showPokemon();
    document.getElementById('button_pre_next').innerHTML += setPreviousButtons();
    document.getElementById('button_pre_next').innerHTML += setNextButtons();
}


function showPokemon() {
    for (index = startIndex-1; index < endIndex; index++) {
        console.log("index bei start nächster Durchlauf FOR ist = ", index);
        
        document.getElementById('overview_poke').innerHTML += renderPokemon(index);
        index = index + 2;      // Sprung über die 2 Entwicklungsstufen hinweg zum nächsten Pokemon
        console.log("index nach +2 = ", index);
    }
}

function renderPokemon(index) {
    let arrayID = index;
    console.log("arrayID für Zugriff auf Array = ", arrayID);
    
    return `
            <div id="one_pokemon" class="one_pokemon">
                <img class="img_poke" src="${allPoke[arrayID].sprites.other.home.front_default}" alt="">
                <p class="id_poke">Pokemon-ID: #${allPoke[arrayID].id}<br></p>
                <p class="id_poke">Name: ${allPoke[arrayID].name}<br></p>
            </div>
        `
}

function setPreviousButtons() {
    return `
        <button class="button_pre_grafik" onclick="showPrevious()">zurück</button>
       `
}

function setNextButtons() {
    return `
        <button class="button_next_grafik" onclick="showNext()" >nächste</button> 
       `
}

function showPrevious() {
    if (startIndex = 1 ) {

    } else {

    }
}


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