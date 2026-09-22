async function fetchJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }
    return response.json();
}

function capitalizeName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

async function goFirstLoad() {
    loadedPokemons = 0;
    document.getElementById('overview_poke').innerHTML = renderLoadingPicture();
    await loadPokemonIndex();
    firstLoad = false;
}

async function loadPokemonIndex() {
    const data = await fetchJson(`${POKE_API_BASE_URL}?limit=100000&offset=0`);
    apiLength = data.count;
    allPokeName = data.results.map((pokemon) => {
        const parts = pokemon.url.split("/");
        return {
            name: pokemon.name,
            id: parts[parts.length - 2]
        };
    });
}

function renderControlPanel() {
    buttonPreNext.innerHTML = setButtonsAndCounter();
    document.getElementById('show_next_button').disabled = false;
    document.getElementById('show_previous_button').disabled = false;
}

function findBackgroundColor() {
    if (searchOnePoke) {
        backgroundColor = pokeAsJson.types[0].type.name;
        if (backgroundColor == "normal" && pokeAsJson.types.length > 1) {
            backgroundColor = pokeAsJson.types[1].type.name;
        }
    } else {
        backgroundColor = allPoke[arrayID].types[0].type.name;
        if (backgroundColor == "normal" && allPoke[arrayID].types.length > 1) {
            backgroundColor = allPoke[arrayID].types[1].type.name;
        }
    }
    getTheColorCode();
}

function getInputForSearch() {
    inputUser = document.getElementById('input_user');
    searchThisPoke = inputUser.value.trim();
}

function getPokeIdNumber() {
    pokeIdNumber = /^\d+$/.test(searchThisPoke) ? Number(searchThisPoke) : null;
}

function getPokeWithName() {
    if (pokeIdNumber !== null) {
        return;
    }

    pokeName = searchThisPoke.toLowerCase();
    pokeNotInAllPoke = true;

    const loadedPokemon = allPoke.find((pokemon) => pokemon.name.toLowerCase() === pokeName);
    if (loadedPokemon) {
        pokeNotInAllPoke = false;
        pokeAsJson = loadedPokemon;
        showSearchPoke();
        return;
    }

    searchStringInName();
}

function searchStringInName() {
    const result = findPokemonNameUnique();
    const output = document.getElementById("input_incorrect");
    output.innerHTML = "";

    if (result.status === "none") {
        output.innerHTML = "❌ This Pokémon does not exist.";
        inputUser.value = "";
        pokeNotInAllPoke = false;
        return;
    }

    if (result.status === "too_short") {
        output.innerHTML = "⚠️ Please enter at least 3 letters.";
        inputUser.value = "";
        pokeNotInAllPoke = false;
        return;
    }

    if (result.status === "multiple") {
        pokeNotInAllPoke = false;
        renderSuggestionList(result.suggestions);
        return;
    }

    pokeName = result.name;
}

function findPokemonNameUnique() {
    if (!inputUser) {
        return { status: "none" };
    }

    const searchText = pokeName;
    if (searchText.length < 3) {
        return { status: "too_short" };
    }

    const matches = allPokeName.filter((pokemon) => pokemon.name.includes(searchText));

    if (matches.length === 0) {
        return { status: "none" };
    }

    if (matches.length > 1) {
        return {
            status: "multiple",
            suggestions: matches.map((pokemon) => pokemon.name)
        };
    }

    return {
        status: "one",
        name: matches[0].name,
        id: matches[0].id
    };
}

function renderSuggestionList(nameList) {
    const output = document.getElementById("input_incorrect");
    let html = "<p>Multiple hits – please select:</p>";
    html += "<ul class='suggestion_list'>";
    for (let i = 0; i < nameList.length; i++) {
        html += `<li><button class="suggestion_button" type="button"
            data-pokemon-name="${nameList[i]}">${nameList[i]}</button></li>`;
    }
    html += "</ul>";
    output.innerHTML = html;
}

async function chooseThisPokemon(namePoke) {
    searchOnePoke = true;
    pokeName = namePoke;
    pokeIdNumber = null;
    pokeNotInAllPoke = true;
    inputUser.value = pokeName;

    try {
        await loadWithNameOrIdAndShow();
    } catch (error) {
        showSearchError("The selected Pokémon could not be loaded.");
    } finally {
        searchOnePoke = false;
        inputUser.value = "";
    }
}

function showSearchError(message) {
    const output = document.getElementById("input_incorrect");
    if (output) {
        output.textContent = message;
    }
}

function preparePokemonDetails() {
    whatAbilities();
    findBackgroundColor();
    findTypeIcons();
    getMaxValueFromAllStats();
}

function findTypeIcons() {
    pokeTypeIcon1 = "";
    pokeTypeIcon2 = "";
    pokeTypeSearch = "";
    if (searchOnePoke) {
        getIconsSearchPoke();
    } else {
        getIconsOnePoke();
    }
}

function getIconsSearchPoke() {
    for (let index = 0; index < pokeAsJson.types.length; index++) {
        if (index == 1) {
            pokeTypeIcon2 = pokeAsJson.types[index].type.name;
            pokeTypeSearch = pokeTypeIcon2;
            getTheTypeIcons();
            pokeTypeIcon2 = pokeTypeSearch;
        } else {
            pokeTypeIcon1 = pokeAsJson.types[index].type.name;
            pokeTypeSearch = pokeTypeIcon1;
            getTheTypeIcons();
            pokeTypeIcon1 = pokeTypeSearch;
        }
    }
}

function getIconsOnePoke() {
    for (let index = 0; index < allPoke[arrayID].types.length; index++) {
        if (index == 1) {
            pokeTypeIcon2 = allPoke[arrayID].types[index].type.name;
            pokeTypeSearch = pokeTypeIcon2;
            getTheTypeIcons();
            pokeTypeIcon2 = pokeTypeSearch;
        } else {
            pokeTypeIcon1 = allPoke[arrayID].types[index].type.name;
            pokeTypeSearch = pokeTypeIcon1;
            getTheTypeIcons();
            pokeTypeIcon1 = pokeTypeSearch;
        }
    }
}

function whatAbilities() {
    abilityOne = "";
    abilityTwo = "";
    abilityThree = "";
    const abilities = searchOnePoke ? pokeAsJson.abilities : allPoke[arrayID].abilities;

    for (let index = 0; index < abilities.length; index++) {
        switch (index) {
            case 0: abilityOne = abilities[index].ability.name; break;
            case 1: abilityTwo = abilities[index].ability.name; break;
            case 2: abilityThree = abilities[index].ability.name; break;
            default: break;
        }
    }
}

function getAllStats() {
    pokeStats = [];
    const stats = searchOnePoke ? pokeAsJson.stats : allPoke[arrayID].stats;

    for (let index = 0; index < stats.length; index++) {
        const stat = stats[index];
        pokeStats.push({
            name: stat.stat.name.toUpperCase(),
            value: stat.base_stat
        });
    }
}

function getMaxValueFromAllStats() {
    getAllStats();
    maxValue = 0;
    for (let index = 0; index < pokeStats.length; index++) {
        if (pokeStats[index].value > maxValue) {
            maxValue = pokeStats[index].value;
        }
    }
    stat0 = "█";
    stat1 = "█";
    stat2 = "█";
    stat3 = "█";
    stat4 = "█";
    stat5 = "█";
    getValueFromAllStatsForProcessBar();
}
