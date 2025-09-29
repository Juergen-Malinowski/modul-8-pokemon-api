

function renderPokemon(arrayID) {
    // RENDER ONE Pokemon in the SLIDE-Show
    return `
            <div id="pic_${arrayID}" class="one_pokemon"  onclick="showThisPokemon('pic_' + ${arrayID})"> 
                <img class="img_poke" src="${allPoke[arrayID].sprites.other.home.front_default}" 
                   alt="picture of Pokemon">
                <p class="id_poke">Pokemon-ID: #${allPoke[arrayID].id}<br></p>
                <p class="id_poke">Name: ${allPoke[arrayID].name}<br></p>
            </div>
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
        <div class="get_color">
            <img src="${allPoke[arrayID].sprites.other.home.front_default}" class="img_pokemon" alt="Bild Pokemon"><br>
        </div>
        <div class="all_poke_details">
            <div class="get_color">
                <div class="poke_personal_name">Name: ${allPoke[arrayID].name}</div>
                <br>
                <div class="poke_personal">Poke-ID: ${allPoke[arrayID].id}</div><br>
                <hr class="line_grafik"><br>
                <div class="poke_personal_abi">Fähigkeiten:</div>
                <div class="poke_personal">${abilityOne}</div>
                <div class="poke_personal">${abilityTwo}</div>
                <div class="poke_personal">${abilityThree}</div>
                <br>
            </div>
            <hr class="line_grafik">
            <br>
            <div class="get_color">
                <div class="poke_details">Größe: ${allPoke[arrayID].height}</div>
                <div class="poke_details">Gewicht: ${allPoke[arrayID].weight}</div>
            </div>
        </div>
    `
}