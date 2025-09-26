

let allPoke = [];  // Array nimmt alle geladenen Pokemons auf
let startIndex = 1;   // startIndex gibt die Nr. des ersten zu ladenen Pokemons vor ... dann werden derzeit 12 insgesamt geladen

async function loadPokemon() {
    for (index = startIndex; index < startIndex + 12; index++) {
        let getAdress = await fetch("https://pokeapi.co/api/v2/pokemon/" + index);
        let pokeAsJson = await getAdress.json();
        allPoke.push(pokeAsJson);

        console.log("Index-Nr. ist: ", index);
        console.log(pokeAsJson);
    }
    // console.log("alle Pokemon: ", allPoke);

    document.getElementById('pokemon').innerHTML = `Name Pokemon: ${allPoke[0].name}<br>`;
    document.getElementById('pokemon').innerHTML += `ID Pokemon: ${allPoke[0].id}<br>`;
    document.getElementById('pokemon').innerHTML += `Type 0 Pokemon: ${allPoke[0].types[0].type.name}<br>`;
    document.getElementById('pokemon').innerHTML += `Type 1 Pokemon: ${allPoke[0].types[1].type.name}<br>`;
    document.getElementById('pokemon').innerHTML += `height Pokemon: ${allPoke[0].height}<br>`;
    document.getElementById('pokemon').innerHTML += `weight Pokemon: ${allPoke[0].weight}<br>`;
    document.getElementById('pokemon').innerHTML += `species Pokemon: ${allPoke[0].species.name}<br>`;
    document.getElementById('pokemon').innerHTML += `png-URL Pokemon: ${allPoke[0].sprites.front_shiny}<br>`;    
    // let type = pokeAsJson.types[0].type.name;
    // console.log(type);
    // document.getElementById('pokemon').innerHTML += pokeAsJson.types[0].type.name;
};
// "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/1.ogg"
// "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/legacy/1.ogg"
// loadPokemon();

function showPoke() {
    document.getElementById('show_poke').innerHTML = renderPoke();
}

function renderPoke () {
    return `
    
    `
}