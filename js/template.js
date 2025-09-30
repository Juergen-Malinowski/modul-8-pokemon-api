

function renderPokemon(arrayID) {
    // RENDER ONE Pokemon in the SLIDE-Show
    return `
        <div id="pic_${arrayID}" class="one_pokemon"  onclick="showThisPokemon('pic_' + ${arrayID})"> 
            <span class="name_poke">${allPoke[arrayID].name} (ID: #${allPoke[arrayID].id})</span>
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

function renderPokeStats() {
    return`
        <hr class="line_grafik_evolution">
        <table border="20" class="holeTable">
            <thead>
                <tr>
                    <th class="table_title">Eigenschaft</th>
                    <th class="table_title">Wert</th>
                    <th class="table_title">Diagramm ... </th>
                </tr>
            </thead>
                <tbody>
                <tr class="table_contens_hp">
                    <td>${pokeStats[0].name}:</td>
                    <td>${pokeStats[0].value}</td>
                    <td>XXXXXXXXXXXXXX</td>
                </tr>
                <tr class="table_contens_attack">
                    <td>${pokeStats[1].name}:</td>
                    <td>${pokeStats[1].value}</td>
                    <td>XXXXXXXXXXXXXXXX</td>
                </tr>
                <tr class="table_contens_defense">
                    <td>${pokeStats[2].name}:</td>
                    <td>${pokeStats[2].value}</td>
                    <td>XXXXXXXXXXXXXXXX</td>
                </tr>
                <tr class="table_contens_spatk">
                    <td>${pokeStats[3].name}:</td>
                    <td>${pokeStats[3].value}</td>
                    <td>XXXXXXXXXXXXXXXXXXXXXXXXX</td>
                </tr>
                <tr class="table_contens_spdef">
                    <td>${pokeStats[4].name}:</td>
                    <td>${pokeStats[4].value}</td>
                    <td>XXXXXXXXXXXXXXXXXXXXXXXXX</td>
                </tr>
                <tr class="table_contens_speed">
                    <td>${pokeStats[5].name}:</td>
                    <td>${pokeStats[5].value}</td>
                    <td>XXXXXXXXXXXXXX</td>
                </tr>
            </tbody>
        </table>
        <hr class="line_grafik_evolution">
    `
};

