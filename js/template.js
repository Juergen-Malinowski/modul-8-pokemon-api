function renderSearchBox() {
    // SUCH-MAKE rendern ...
    return `       
        <input class="input_user" id="input_user" type="text" placeholder="Pokemon-Name OR his ID ..." required>
        <button class="buttons_grafik" onclick="searchAndShowOnePoke()" 
            type="submit">Suche</button>
        <!-- Position für Ausgabe EINGABE-FEHLER ... -->
        <p class="input_incorrect" id="input_incorrect"></p>
    `
}

function renderPokemon() {
    // RENDER ONE Pokemon in the SLIDE-Show
    return `
        <div id="pic_${arrayID}" class="one_pokemon"  onclick="showThisPokemon('pic_' + ${arrayID})"> 
            <span class="name_poke">${allPoke[arrayID].name} (ID: #${allPoke[arrayID].id})</span>
            <img class="img_poke" src="${allPoke[arrayID].sprites.other.home.front_default}" 
               style="background-color: ${backgroundColor};" alt="picture of Pokemon">
            <div class="type_icon_position">   
                <img src="./assets/icon/${pokeTypeIcon1}" class="type_icon_overview" alt="ICON vom Type1">
                <img src="./assets/icon/${pokeTypeIcon2}" class="type_icon_overview" alt="ICON vom Type2">                   
            </div> 
        </div>
    `
}

function setButtonsAndCounter() {
    // CONTROL-Center for Main-Page ...
    return `
        <button id="show_previous_button"  class="buttons_grafik" onclick="showPrevious()"> <<<<<< </button>
        <p class="counter_grafik"> ${loadedPokemons} von ${apiLength} Pokemons </p>
        <button id="show_next_button" class="buttons_grafik" onclick="showNext()"> >>>>>> </button>         
    `
}

function renderLodingPicture() {
    // THIS is to SEE, while loading NEW Poke from API ...
    return `
        <div class="loding_grafik">
            <p class="load_grafik">Pokemons werden geladen ...</p>
            <div class="lodPic_grafik">
                <img class="loding_picture" src="./assets/img/betty-boop.png" alt="picture from Betty Boop">
                <img class="loding_picture" src="./assets/img/cartoon-bear.png" alt="picture from cartoon-bear"></img>
            </div>
        </div>
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
    // RENDERN aller Eigenschaften vom aktuellen POKE ...
    return `
        <hr class="line_grafik_evolution">
        <table border="20" class="holeTable">
            <thead>
                <tr class="table_th_grafik">
                    <th class="table_title">Eigenschaft</th>
                    <th class="table_title">Wert</th>
                    <th class="table_title">Diagramm 
                        <span style="font-size: 30px; color: white;">(bester Wert = Maximum)</span>
                    </th>
                </tr>
            </thead>
                <tbody>
                <tr class="table_contens_hp">
                    <td>${pokeStats[0].name}</td>
                    <td>${pokeStats[0].value}</td>
                    <td>${stat0}</td>                         
                </tr>
                <tr class="table_contens_attack">
                    <td>${pokeStats[1].name}</td>
                    <td>${pokeStats[1].value}</td>  
                    <td>${stat1}</td>               
                </tr>
                <tr class="table_contens_defense">
                    <td>${pokeStats[2].name}</td>
                    <td>${pokeStats[2].value}</td>
                    <td>${stat2}</td>                         
                </tr>
                <tr class="table_contens_spatk">
                    <td>${pokeStats[3].name}</td>
                    <td>${pokeStats[3].value}</td>
                    <td>${stat3}</td>                         
                </tr>
                <tr class="table_contens_spdef">
                    <td>${pokeStats[4].name}</td>
                    <td>${pokeStats[4].value}</td>
                    <td>${stat4}</td>     
                </tr>
                <tr class="table_contens_speed">
                    <td>${pokeStats[5].name}</td>
                    <td>${pokeStats[5].value}</td>
                    <td>${stat5}</td>                         
                </tr>
            </tbody>
        </table>
        <hr class="line_grafik_evolution">
    `
};


