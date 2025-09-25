https://pokeapi.co/api/v2/pokemon/1   // lädt das 1. Pokemon ... 1 durch index mit Schleife ersetzen und z.B. 10 Pokemons laden

// let type = [];

// async function loadPoke() {
//     let adress = await fetch("https://pokeapi.co/api/v2/pokemon/1");
//     let pokeAsJson = await adress.json();
//     console.log(type);
//     document.getElementById('pokemon').innerHTML = pokeAsJson.types[0].type.name;
//     type = pokeAsJson.types[0].type.name;
//     showPokemon();
// }

// async function showPokemon() {
//     console.log(type);
//     document.getElementById('pokemon').innerHTML = pokeAsJson.types[0].type.name;
// };


// showPokemon();



async function showPokemon() {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/1");
    let responseAsJson = await response.json();
    let type = responseAsJson.types[0].type.name;
    console.log(type);
    document.getElementById('pokemon').innerHTML = responseAsJson.types[0].type.name;
};


showPokemon();
