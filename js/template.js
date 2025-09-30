

function renderPokemon(arrayID) {
    // RENDER ONE Pokemon in the SLIDE-Show
    return `
            <div id="pic_${arrayID}" class="one_pokemon"  onclick="showThisPokemon('pic_' + ${arrayID})"> 
                <span class="name_poke">${allPoke[arrayID].name} ( ID: #${allPoke[arrayID].id}  )</span>
                <span class="id_poke"></span>
                <img class="img_poke" src="${allPoke[arrayID].sprites.other.home.front_default}" 
                   style="background-color: ${backgroundColor};" alt="picture of Pokemon">
                <div class="type_icon_position">   
                    <img src="./assets/icon/${pokeTypeIcon1}" class="type_icon_overview" alt="ICON vom Type1">
                    <img src="./assets/icon/${pokeTypeIcon2}" class="type_icon_overview" alt="ICON vom Type1">                   
                </div> 
            </style=>
        `
}

function setPreviousButtons() {
    return `
        <button id="show_previous_button"  class="buttons_grafik" onclick="showPrevious()"> <<<<<< </button>
       `
}

function setNextButtons() {
    return `
        <button id="show_next_button" class="buttons_grafik" onclick="showNext()"> >>>>>> </button> 
       `
}

function renderOnePokemon(arrayID) {
    // RENDER in the DIALOG "Show-One-Pokemon" ALL contense
    return `    
        <div>
            <div class="poke_personal_name">Name: </div>
            <div class="poke_personal_name_color">${allPoke[arrayID].name}</div>
            <br>
            <div class="poke_personal">Poke-ID: #${allPoke[arrayID].id}</div><br>   

            <img src="./assets/icon/${pokeTypeIcon1}" class="type_icon" alt="ICON vom Type1"><br>
            <img src="./assets/icon/${pokeTypeIcon2}" class="type_icon" alt="ICON vom Type1">               
        </div>    
        <div class="get_color">
            <img src="${allPoke[arrayID].sprites.other.home.front_default}" class="img_pokemon"
                style="background-color: ${backgroundColor};" alt="Bild Pokemon"><br>
        </div>

        <div class="all_poke_details">
            <div class="get_position">
                <div class="poke_personal_abi">Fähigkeiten:</div>
                <div class="poke_personal">${abilityOne}</div>
                <div class="poke_personal">${abilityTwo}</div>
                <div class="poke_personal">${abilityThree}</div>
                <br>
            </div>
            <hr class="line_grafik">
            <br>

            <div >
                <div class="poke_details">Größe: ${allPoke[arrayID].height}</div>
                <div class="poke_details">Gewicht: ${allPoke[arrayID].weight}</div>
            </div>
        </div>
    `
}

function renderPokeEvolution() {
    return `
        <div class="poke_evo_grafik">
            <hr class="line_grafik_evolution"><br>
            <p class="poke_personal_evo">Evolutions-Stufen des Pokemons ...</p>
            <br>
        </div>
        <div class="show_evo_pokemons">
            <div class="evo_poke">
                <img src="${evoOneOfPokePic}" class="img_pokemon_evo" alt"Bild Pokemon Evo1>
                <div class="evo_poke_sort">
                    <div class="poke_personal">Name: ${evoOneOfPokeName}</div>
                    <div class="poke_personal">Poke-ID: ${evoOneOfPokeID}</div>
                </div>
            </div>
            <div class="evo_poke">
                <img src="${evoTwoOfPokePic}" class="img_pokemon_evo" alt"Bild Pokemon Evo2>
                <div class="evo_poke_sort">
                    <div class="poke_personal">Name: ${evoTwoOfPokeName}</div>
                    <div class="poke_personal">Poke-ID${evoTwoOfPokeID}</div>
                </div>
            </div>
        </div>
        <div>
            <hr class="line_grafik_evolution">
        </div>
    `
}

function getTheColorCode() {
    switch (backgroundColor) {
        case "normal": backgroundColor = "#ffffff"; break;
        case "fire": backgroundColor = "#f22121"; break;
        case "water": backgroundColor = "#1e9cd2"; break;
        case "electric": backgroundColor = "#ebee44"; break;
        case "grass": backgroundColor = "#14d411"; break;
        case "ice": backgroundColor = "#66e0f0"; break;
        case "fighting": backgroundColor = "#f55d42"; break;
        case "poison": backgroundColor = "#349864"; break;
        case "ground": backgroundColor = "#9a6042"; break;
        case "flying": backgroundColor = "#1fe0dd"; break;
        case "psychic": backgroundColor = "#bc209f"; break;
        case "bug": backgroundColor = "#6aa81f"; break;
        case "rock": backgroundColor = "#5b241a"; break;
        case "ghost": backgroundColor = "#cba4d5"; break;
        case "dragon": backgroundColor = "#c70505"; break;
        case "dark": backgroundColor = "#5b5552"; break;
        case "steel": backgroundColor = "#918b88"; break;
        case "fairy": backgroundColor = "#7923e1"; break;
        case "stellar": backgroundColor = "#e1c823"; break;
        default: break;
    }
    // console.log("zugeordneter Farbcode : ", backgroundColor);
}

function getTheTypeIcons() {
    console.log("übergebener TYPE für CASE : ", pokeTypeSearch);
    switch (pokeTypeSearch) {    
        case "normal": pokeTypeSearch = "normal.jpg"; break;
        case "fire": pokeTypeSearch = "fire.jpg"; break;
        case "water": pokeTypeSearch = "water.jpg"; break;
        case "electric": pokeTypeSearch = "electric.jpg"; break;
        case "grass": pokeTypeSearch = "grass.jpg"; break;
        case "ice": pokeTypeSearch = "ice.jpg"; break;
        case "fighting": pokeTypeSearch = "fighting.jpg"; break;
        case "poison": pokeTypeSearch = "poison.jpg"; break;
        case "ground": pokeTypeSearch = "ground.jpg"; break;
        case "flying": pokeTypeSearch = "flying.jpg"; break;
        case "psychic": pokeTypeSearch = "psychic.jpg"; break;
        case "bug": pokeTypeSearch = "bug.jpg"; break;
        case "rock": pokeTypeSearch = "rock.jpg"; break;
        case "ghost": pokeTypeSearch = "ghost.jpg"; break;
        case "dragon": pokeTypeSearch = "dragon.jpg"; break;
        case "dark": pokeTypeSearch = "dark.jpg"; break;
        case "steel": pokeTypeSearch = "steel.jpg"; break;
        case "fairy": pokeTypeSearch = "fairy.jpg"; break;
        case "stellar": pokeTypeSearch = "normal.jpg"; break;
        default: break;
    }
    console.log("zugeordnetes JPG-Bild zum TYPE in CASE : ", pokeTypeSearch);
}