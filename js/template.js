function renderSearchBox() {
    return `
        <form id="pokemon_search_form" class="search_form">
            <input class="input_user" id="input_user" type="text"
                placeholder="Please enter a full name or ID" aria-label="Pokémon name or ID" required>
            <button class="buttons_grafik" type="submit">Search</button>
            <div class="input_incorrect" id="input_incorrect" aria-live="polite"></div>
        </form>
    `;
}

function renderTypeIcon(iconFile, className, altText) {
    if (!iconFile) {
        return "";
    }
    return `<img src="./assets/icon/${iconFile}" class="${className}" alt="${altText}">`;
}

function renderPokemon() {
    return `
        <button id="pic_${arrayID}" class="one_pokemon" type="button"
            data-pokemon-index="${arrayID}" aria-label="Open details for ${allPoke[arrayID].name}">
            <span class="name_poke">${allPoke[arrayID].name} (ID: #${allPoke[arrayID].id})</span>
            <img class="img_poke" src="${allPoke[arrayID].sprites.other.home.front_default}"
               style="background-color: ${backgroundColor};" alt="${allPoke[arrayID].name}">
            <span class="type_icon_position">
                ${renderTypeIcon(pokeTypeIcon1, "type_icon_overview", "Primary Pokémon type")}
                ${renderTypeIcon(pokeTypeIcon2, "type_icon_overview", "Secondary Pokémon type")}
            </span>
        </button>
    `;
}

function setButtonsAndCounter() {
    return `
        <button id="show_previous_button" class="buttons_grafik" type="button" aria-label="Show previous Pokémon"> &lt;&lt;&lt;&lt;&lt;&lt; </button>
        <p class="counter_grafik">${loadedPokemons} from ${apiLength} Pokémon</p>
        <button id="show_next_button" class="buttons_grafik" type="button" aria-label="Show next Pokémon"> &gt;&gt;&gt;&gt;&gt;&gt; </button>
    `;
}

function renderLoadingPicture() {
    return `
        <div class="loading_grafik" role="status" aria-live="polite">
            <p class="load_grafik">Pokémon L O A D I N G ...</p>
            <div class="loading_picture_container">
                <img class="loading_picture" src="./assets/img/betty-boop.png" alt="Betty Boop illustration">
                <img class="loading_picture" src="./assets/img/cartoon-bear.png" alt="Cartoon bear illustration">
            </div>
        </div>
    `;
}

function renderPokemonDetails(pokemon) {
    const heightInMeters = (pokemon.height / 10).toFixed(1);
    const weightInKilograms = (pokemon.weight / 10).toFixed(1);

    return `
        <div class="poke_personal_position">
            <div class="poke_personal_name">Name:</div>
            <div class="poke_personal_name_color">${pokemon.name}</div>
            <div class="poke_personal">Poke-ID: #${pokemon.id}</div>
            ${renderTypeIcon(pokeTypeIcon1, "type_icon", "Primary Pokémon type")}
            ${renderTypeIcon(pokeTypeIcon2, "type_icon", "Secondary Pokémon type")}
        </div>
        <div class="get_color">
            <img src="${pokemon.sprites.other.home.front_default}" class="img_pokemon"
                style="background-color: ${backgroundColor};" alt="${pokemon.name}">
        </div>
        <div class="all_poke_details">
            <div class="get_position">
                <div class="poke_personal_abi">Abilities:</div>
                <div class="poke_personal">${abilityOne}</div>
                <div class="poke_personal">${abilityTwo}</div>
                <div class="poke_personal">${abilityThree}</div>
            </div>
            <hr class="line_grafik">
            <div>
                <div class="poke_details">Height: ${heightInMeters} m</div>
                <div class="poke_details">Weight: ${weightInKilograms} kg</div>
            </div>
        </div>
    `;
}

function renderOnePokemon(arrayID) {
    return renderPokemonDetails(allPoke[arrayID]);
}

function renderSearchPokemon() {
    return renderPokemonDetails(pokeAsJson);
}

function renderPokeStats() {
    return `
        <hr class="line_grafik_evolution">
        <table border="20" class="stats_table">
            <thead>
                <tr class="table_th_grafik">
                    <th class="table_title">Properties</th>
                    <th class="table_title">Value</th>
                    <th class="table_title disable_this">Diagram
                        <span style="font-size: 20px; color: white;">(highest value = maximum)</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="table_content_hp">
                    <td>${pokeStats[0].name}</td>
                    <td>${pokeStats[0].value}</td>
                    <td class="disable_this">${stat0}</td>
                </tr>
                <tr class="table_content_attack">
                    <td>${pokeStats[1].name}</td>
                    <td>${pokeStats[1].value}</td>
                    <td class="disable_this">${stat1}</td>
                </tr>
                <tr class="table_content_defense">
                    <td>${pokeStats[2].name}</td>
                    <td>${pokeStats[2].value}</td>
                    <td class="disable_this">${stat2}</td>
                </tr>
                <tr class="table_content_spatk">
                    <td>${pokeStats[3].name}</td>
                    <td>${pokeStats[3].value}</td>
                    <td class="disable_this">${stat3}</td>
                </tr>
                <tr class="table_content_spdef">
                    <td>${pokeStats[4].name}</td>
                    <td>${pokeStats[4].value}</td>
                    <td class="disable_this">${stat4}</td>
                </tr>
                <tr class="table_content_speed">
                    <td>${pokeStats[5].name}</td>
                    <td>${pokeStats[5].value}</td>
                    <td class="disable_this">${stat5}</td>
                </tr>
            </tbody>
        </table>
        <hr class="line_grafik_evolution">
    `;
}
