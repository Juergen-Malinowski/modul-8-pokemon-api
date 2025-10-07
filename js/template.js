// ###########################
//  HTML-Templates  "RENDERN"
// ###########################

function renderButtonsOnePoke() {
    // Buttons für Pokemon-OVERVIEW RENDERN ...
    return`
        <div class="control_grafik">
        <!-- CONTROL-Panel -->
            <img id="pre_poke" class="buttons_pre_poke" src="./assets/img/hand-left.png"
                onclick="showPreviousPoke()" tabindex="0">
            <button id="close_dialog" class="buttons_grafik buttons_dialog_grafik" tabindex="0">CLOSE</button>
            <img id="next_poke" class="buttons_next_poke" src="./assets/img/hand-right.png"
                onclick="showNextPoke()" tabindex="0">
        </div>
    `
}

function renderSearchBox() {
    // SUCH-MAKE RENDERN ...
    return `       
        <input class="input_user" id="input_user" type="text" onkeydown="if(event.key==='Enter'){searchAndShowOnePoke()}"
            placeholder="Please full name or ID ..." required tabindex="0">
        <button class="buttons_grafik" onclick="searchAndShowOnePoke()" type="submit" tabindex="0">Search</button>
        <!-- Position für Ausgabe EINGABE-FEHLER ... -->
        <p class="input_incorrect" id="input_incorrect"></p>
    `
}

function renderPokemon() {
    // ONE Pokemon im Pokemon-OVERVIEW RENDERN ...
    return `
        <div id="pic_${arrayID}" class="one_pokemon"  onclick="showThisPokemon('pic_' + ${arrayID})" tabindex="0"> 
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
    // CONTROL-Center for Main-Page RENDERN ...
    return `
        <button id="show_previous_button"  class="buttons_grafik" onclick="showPrevious() "tabindex="0"> <<<<<< </button>
        <p class="counter_grafik"> ${loadedPokemons} from ${apiLength} Pokemons </p>
        <button id="show_next_button" class="buttons_grafik" onclick="showNext()" tabindex="0"> >>>>>> </button>         
    `
}

function renderLodingPicture() {
    // LADE-BILDSCHIRM für die Wartezeit während API-Zugriff erfolgt RENDERN  ...
    return `
        <div class="loding_grafik">
            <p class="load_grafik">Pokemons L O A D I N G ...</p>
            <div class="lodPic_grafik">
                <img class="loding_picture" src="./assets/img/betty-boop.png" alt="picture from Betty Boop">
                <img class="loding_picture" src="./assets/img/cartoon-bear.png" alt="picture from cartoon-bear"></img>
            </div>
        </div>
    `
}

function renderOnePokemon(arrayID) {
    // DIALOG "Show-One-Pokemon" RENDERN ... (ohne Eigenschaften, da eigene Funktion)
    return `    
        <div class="poke_personal_position">
            <div class="poke_personal_name">Name: </div>
            <div class="poke_personal_name_color">${allPoke[arrayID].name}</div>
            <br>
            <div class="poke_personal">Poke-ID: #${allPoke[arrayID].id}</div>
            <img src="./assets/icon/${pokeTypeIcon1}" class="type_icon" alt="ICON vom Type1">
            <img src="./assets/icon/${pokeTypeIcon2}" class="type_icon" alt="ICON vom Type1">               
        </div>    
        <div class="get_color">
            <img src="${allPoke[arrayID].sprites.other.home.front_default}" class="img_pokemon"
                style="background-color: ${backgroundColor};" alt="Picture Pokemon"><br>
        </div>
        <div class="all_poke_details">
            <div class="get_position">
                <div class="poke_personal_abi">Abilities:</div>
                <div class="poke_personal">${abilityOne}</div>
                <div class="poke_personal">${abilityTwo}</div>
                <div class="poke_personal">${abilityThree}</div>
                <br>
            </div>
            <hr class="line_grafik">
            <br>
            <div >
                <div class="poke_details">Size: ${allPoke[arrayID].height} feet</div>
                <div class="poke_details">Weight: ${allPoke[arrayID].weight} lbs</div>
            </div>
        </div>
    `
}


function renderSearchPokemon() {
    // DIALOG "Show-SEARCH-Pokemon" RENDERN ... (ohne Eigenschaften, da eigene Funktion)
    return `    
        <div>
            <div class="poke_personal_name">Name: </div>
            <div class="poke_personal_name_color">${pokeAsJson.name}</div>
            <br>
            <div class="poke_personal">Poke-ID: #${pokeAsJson.id}</div><br>   

            <img src="./assets/icon/${pokeTypeIcon1}" class="type_icon" alt="ICON vom Type1"><br>
            <img src="./assets/icon/${pokeTypeIcon2}" class="type_icon" alt="ICON vom Type1">               
        </div>    
        <div class="get_color">
            <img src="${pokeAsJson.sprites.other.home.front_default}" class="img_pokemon"
                style="background-color: ${backgroundColor};" alt="Bild Pokemon"><br>
        </div>
        <div class="all_poke_details">
            <div class="get_position">
                <div class="poke_personal_abi">Abilities:</div>
                <div class="poke_personal">${abilityOne}</div>
                <div class="poke_personal">${abilityTwo}</div>
                <div class="poke_personal">${abilityThree}</div>
                <br>
            </div>
            <hr class="line_grafik">
            <br>
            <div >
                <div class="poke_details">Size: ${pokeAsJson.height} feet</div>
                <div class="poke_details">Weight: ${pokeAsJson.weight} lbs</div>
            </div>
        </div>
    `
}

function renderPokeStats() {
    // DIALOG "Show-Pokemon ... ONE und SEARCH" alle EIGENSCHAFTEN RENDERN ...
    return `
        <hr class="line_grafik_evolution">
        <table border="20" class="holeTable">

            <thead>
                <tr class="table_th_grafik">
                    <th class="table_title">Properties</th>
                    <th class="table_title">Value</th>
                    <th class="table_title disable_this">Diagram 
                        <span style="font-size: 20px; color: white;">(highest Value = Maximum)</span>
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr class="table_contens_hp">
                    <td>${pokeStats[0].name} </td>
                    <td>${pokeStats[0].value} </td>
                    <td class="disable_this">${stat0}</td>                         
                </tr>
                <tr class="table_contens_attack">
                    <td>${pokeStats[1].name}</td>
                    <td>${pokeStats[1].value}</td>  
                    <td class="disable_this">${stat1}</td>               
                </tr>
                <tr class="table_contens_defense">
                    <td>${pokeStats[2].name}</td>
                    <td>${pokeStats[2].value}</td>
                    <td class="disable_this">${stat2}</td>                         
                </tr>
                <tr class="table_contens_spatk">
                    <td>${pokeStats[3].name} </td>
                    <td>${pokeStats[3].value}</td>
                    <td class="disable_this">${stat3}</td>                         
                </tr>
                <tr class="table_contens_spdef">
                    <td>${pokeStats[4].name} </td>
                    <td>${pokeStats[4].value}</td>
                    <td class="disable_this">${stat4}</td>     
                </tr>
                <tr class="table_contens_speed">
                    <td>${pokeStats[5].name}</td>
                    <td>${pokeStats[5].value}</td>
                    <td class="disable_this">${stat5}</td>                         
                </tr>
            </tbody>
        </table>
        <hr class="line_grafik_evolution">
    `
};


