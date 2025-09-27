

function renderPokemon(index) {
    let arrayID = index;
    // console.log("arrayID für Zugriff auf Array = ", arrayID);
    return `
            <div id="one_pokemon" class="one_pokemon">
                <img class="img_poke" src="${allPoke[arrayID].sprites.other.home.front_default}" id="pic_${arrayID}" 
                   alt="picture of Pokemon">
                <p class="id_poke">Pokemon-ID: #${allPoke[arrayID].id}<br></p>
                <p class="id_poke">Name: ${allPoke[arrayID].name}<br></p>
            </div>
        `
}


function setPreviousButtons() {
    return `
        <button id="show_previous_button"  class="buttons_grafik" onclick="showPrevious()">zurück</button>
       `
}

function setNextButtons() {
    return `
        <button id="show_next_button" class="buttons_grafik" onclick="showNext()">nächste</button> 
       `
}