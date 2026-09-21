async function howMuchPokeExist() {
    apiLength = 0;
    let getAdress = await fetch("https://pokeapi.co/api/v2/pokemon");
    let data = await getAdress.json();
    apiLength = data.count;
}

function capitalizedString() {
    capitalized = capitalized.charAt(0).toUpperCase() + capitalized.slice(1);
}

function goFristLoad() {
    loadedPokemons = 0;
    howMuchPokeExist();
    loadAllPokemonNames();
    document.getElementById('overview_poke').innerHTML = "";
    document.getElementById('overview_poke').innerHTML = renderLodingPicture();
    firstLoad = false;
}

async function loadAllPokemonNames() {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1302");
    let data = await response.json();
    let results = data.results;
    for (let index = 0; index < results.length; index++) {
        let thisPokemon = results[index];
        let pokeName = thisPokemon.name;
        let pokeURL = thisPokemon.url;
        let parts = pokeURL.split("/");
        let pokeID = parts[parts.length - 2];
        let pokeData = { name: pokeName, id: pokeID };
        allPokeName.push(pokeData);
    }
}

function renderControlPanel() {
    buttonPreNext.innerHTML = "";
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
    searchThisPoke = "";
    searchThisPoke = inputUser.value.trim();
}

function getPokeIdNumber() {
    pokeIdNumber = searchThisPoke;
    pokeIdNumber = String(pokeIdNumber);
    pokeIdNumber = pokeIdNumber.replace(/\D+/g, '');
    pokeIdNumber = Number(pokeIdNumber);
    if (pokeIdNumber != 0) {
        pokeAsJson.id = pokeIdNumber;
    }
    if (pokeIdNumber == 0) {
        pokeIdNumber = 2000;
    }
}

function getPokeWithName() {
    pokeName = searchThisPoke;
    pokeName = pokeName.toLowerCase();
    pokeNotInAllPoke = true;
    if (pokeIdNumber == 2000) {
        for (let index = 0; index < allPoke.length; index++) {
            let checkPokeName = allPoke[index].name.toLowerCase();
            if (pokeName == checkPokeName) {
                pokeNotInAllPoke = false;
                capitalized = pokeName;
                capitalizedString();
                pokeAsJson.name = capitalized;
                pokeAsJson.id = allPoke[index].id;
                showSearchPoke();
            }
        }
        if (pokeNotInAllPoke) {
            searchStringInName();
        }
    }
}

function searchStringInName() {
    let result = findPokemonNameUnique();
    let output = document.getElementById("input_incorrect");
    output.innerHTML = "";
    if (result.status === "none") {
        output.innerHTML = "❌ This pokemon do not exist !";
        inputUser.value = "";
        return;
    }
    if (result.status === "too_short") {
        output.innerHTML = "⚠️ Please enter at least 3 letters ...";
        inputUser.value = "";
        return;
    }
    if (result.status === "multiple") {
        renderSuggestionList(result.suggestions);
        return;
    }
    if (result.status === "one") {
        pokeName = result.name;
    }
}

function findPokemonNameUnique() {
    if (inputUser === undefined || inputUser === null) {
        return { status: "error", message: "Please write something ..." };
    }
    let searchText = pokeName;
    if (searchText.length < 3) {
        return { status: "too_short", message: "Please enter at least 3 letters ..." };
    }
    let matches = [];
    for (let index = 0; index < allPokeName.length; index++) {
        let loadPokemon = allPokeName[index];
        let thisName = loadPokemon.name;
        if (thisName.includes(searchText)) {
            matches.push(loadPokemon);
        }
    }
    if (matches.length === 0) {
        return { status: "none", message: "This pokemon do not exist !" };
    }
    if (matches.length > 1) {
        let names = [];
        for (let i = 0; i < matches.length; i++) {
            names.push(matches[i].name);
        }
        pokeNotInAllPoke = false;
        return { status: "multiple", suggestions: names };
    }
    let uniquePokemon = matches[0];
    return { status: "one", name: uniquePokemon.name, id: uniquePokemon.id };
}

function renderSuggestionList(nameList) {
    let output = document.getElementById("input_incorrect");
    let html = "<p>Multiple HITS – please, select:</p>";
    html += "<ul class='suggestion_list'>";
    for (let i = 0; i < nameList.length; i++) {
        html += `<li><button class="suggestion_button" 
            onclick="chooseThisPokemon('${nameList[i]}')">${nameList[i]}</button></li>`;
    }
    html += "</ul>";
    output.innerHTML = html;
}

function chooseThisPokemon(namePoke) {
    pokeName = namePoke;
    pokeIdNumber = 2000;
    pokeNotInAllPoke = true;
    inputUser.value = pokeName;
    loadWithNameOrIdAndShow();
}

function getAllInfoForRendern() {
    whatAbilities();
    findBackgroundColor();
    findTypeIcons();
    getMaxValueFromAllStats();
}

function findTypeIcons() {
    pokeTypeIcon1 = "";
    pokeTypeIcon2 = "normal.jpg";
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
    if (searchOnePoke) {
        for (let index = 0; index < pokeAsJson.abilities.length; index++) {
            switch (index) {
                case 0: abilityOne = pokeAsJson.abilities[index].ability.name; break;
                case 1: abilityTwo = pokeAsJson.abilities[index].ability.name; break;
                case 2: abilityThree = pokeAsJson.abilities[index].ability.name; break;
                default: break;
            }
        }
    } else {
        for (let index = 0; index < allPoke[arrayID].abilities.length; index++) {
            switch (index) {
                case 0: abilityOne = allPoke[arrayID].abilities[index].ability.name; break;
                case 1: abilityTwo = allPoke[arrayID].abilities[index].ability.name; break;
                case 2: abilityThree = allPoke[arrayID].abilities[index].ability.name; break;
                default: break;
            }
        }
    }
}

function getAllStats() {
    pokeStats = [];
    let thisPokeAllData = {};
    if (searchOnePoke) {
        thisPokeAllData = pokeAsJson.stats;
    } else {
        thisPokeAllData = allPoke[arrayID].stats;
    }
    for (let index = 0; index < thisPokeAllData.length; index++) {
        let allStats = thisPokeAllData[index];
        let statName = allStats.stat.name;
        statName = statName.toUpperCase();
        let statValue = allStats.base_stat;
        pokeStats.push({ name: statName, value: statValue });
    }
}

function getMaxValueFromAllStats() {
    getAllStats();
    maxValue = 0;
    for (let index = 0; index < pokeStats.length; index++) {
        let stat = pokeStats[index];
        if (stat.value > maxValue) {
            maxValue = stat.value;
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
