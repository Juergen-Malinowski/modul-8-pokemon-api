

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
        <img id="pre_poke" class="buttons_pre_poke" src="./assets/img/hand-left.png" onclick="showPreviousPoke()">    
        <div class="get_color">
            <img src="${allPoke[arrayID].sprites.other.home.front_default}" class="img_pokemon" alt="Bild Pokemon"><br>
        </div>
        <div class="all_poke_details">
            <div class="get_color">
                <div class="poke_personal">Name: ${allPoke[arrayID].name}</div>
                <br>
                <div class="poke_personal">Poke-ID: ${allPoke[arrayID].id}</div>
                <div class="poke_personal">Spezies: ${allPoke[arrayID].species.name}</div>
                <br>
            </div>
            <hr class="line_grafik">
            <br>
            <div class="get_color">
                <div class="poke_details">Größe: ${allPoke[arrayID].height}<br></div>
                <div class="poke_details">Gewicht: ${allPoke[arrayID].weight}</div>
                <br>
            </div>
            <div class="get_color">
                <div class="poke_details">Type 0: ${allPoke[arrayID].types[0].type.name}</div>
            </div>
        </div>
        <img id="next_poke" class="buttons_next_poke" src="./assets/img/hand-right.png" onclick="showNextPoke()"> 
    `
}