

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
    console.log("all Pokemon: ", allPoke);

    document.getElementById('pokemon').innerHTML = `Name Pokemon: ${allPoke[0].name}<br>`;

    // let type = pokeAsJson.types[0].type.name;
    // console.log(type);
    // document.getElementById('pokemon').innerHTML += pokeAsJson.types[0].type.name;
};


loadPokemon();