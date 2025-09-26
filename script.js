

let allPoke = [];  // Array nimmt alle geladenen Pokemons auf
let startIndex = 1;   // startIndex gibt die Nr. des ersten zu ladenen Pokemons vor ... dann werden derzeit 12 insgesamt geladen

async function loadPokemon() {
    for (index = startIndex; index < startIndex + 12; index++) {
        let getAdress = await fetch("https://pokeapi.co/api/v2/pokemon/" + index);
        let pokeAsJson = await getAdress.json();
        allPoke.push(pokeAsJson);
    }
    console.log(allPoke[0]);
    getInfo();
    // let type = pokeAsJson.types[0].type.name;
    // console.log(type);
    // document.getElementById('pokemon').innerHTML += pokeAsJson.types[0].type.name;
};


function getInfo() {

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
    for ( index = startIndex; index < 13; index++) {
            document.getElementById('overview_poke').innerHTML += returnPokemon(index);
        
    }


    function returnPokemon(index) {
        let arrayID = index-1;
        return `
            <div id="one_pokemon" class="one_pokemon">
                <img class="img_poke" src="${allPoke[arrayID].sprites.other.home.front_default}" alt="">
                <p class="id_poke">Pokemon-ID: #${allPoke[arrayID].id}<br></p>
                <p class="id_poke">Name: ${allPoke[0].name}<br></p>
            </div>
        `
    };
}

// function showPoke() {
//     document.getElementById('show_poke').innerHTML = renderPoke();
// }

// function renderPoke() {
//     return `
    
//     `
// }