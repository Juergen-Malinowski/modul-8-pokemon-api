async function loadPokemon() {
    if (firstLoad) {
        goFristLoad();
    }
    if (startIndex >= allPoke.length) {
        for (index = startIndex; index <= endIndex; index++) {
            let getAdress = await fetch("https://pokeapi.co/api/v2/pokemon/" + index);
            pokeAsJson = await getAdress.json();
            allPoke.push(pokeAsJson);
            capitalized = allPoke[index - 1].name;
            capitalizedString();
            allPoke[index - 1].name = capitalized;
        }
        loadedPokemons = loadedPokemons + (endIndex - startIndex + 1);
    }
    document.getElementById('search_Mask').innerHTML = renderSearchBox();
    showPokemon();
    renderControlPanel();
}

function showPokemon() {
    document.getElementById('overview_poke').innerHTML = "";
    for (index = startIndex - 1; index < endIndex; index++) {
        arrayID = index;
        findBackgroundColor();
        findTypeIcons();
        document.getElementById('overview_poke').innerHTML += renderPokemon();
    }
}

function showPrevious() {
    audioClick.play();
    if (startIndex === 1) {
        startIndex = allPoke.length - 7;
        endIndex = startIndex + 7;
        showPokemon();
    } else {
        startIndex = startIndex - 8;
        endIndex = startIndex + 7;
        showPokemon();
    }
}

function showNext() {
    audioClick.play();
    document.getElementById('show_next_button').disabled = true;
    document.getElementById('show_previous_button').disabled = true;
    document.getElementById('overview_poke').innerHTML = "";
    document.getElementById('overview_poke').innerHTML = renderLodingPicture();
    startIndex = startIndex + 8;
    endIndex = startIndex + 7;
    loadPokemon();
}

function searchAndShowOnePoke() {
    audioClick.play();
    searchOnePoke = true;
    getInputForSearch();
    getPokeIdNumber();
    getPokeWithName();
    loadWithNameOrIdAndShow();
    searchOnePoke = false;
    inputUser.value = "";
}

async function loadWithNameOrIdAndShow() {
    if (inputUser.value != "") {
        if (pokeIdNumber == 2000 && pokeNotInAllPoke) {
            let getAdress = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
            pokeAsJson = await getAdress.json();
            capitalized = pokeAsJson.name;
            capitalizedString();
            pokeAsJson.name = capitalized;
            showSearchPoke();
        } else {
            if (pokeIdNumber != 2000 && pokeNotInAllPoke) {
                let getAPI = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokeIdNumber);
                pokeAsJson = await getAPI.json();
                capitalized = pokeAsJson.name;
                capitalizedString();
                pokeAsJson.name = capitalized;
                showSearchPoke();
            }
        }
    }
}

function showSearchPoke() {
    getAllInfoForRendern();
    thisSearchPokemon.innerHTML = "";
    statsSearchPokemon.innerHTML = "";
    showSearchPokemon.showModal();
    thisSearchPokemon.innerHTML = renderSearchPokemon();
    statsSearchPokemon.innerHTML = renderPokeStats();
}

closeDialogSearch.addEventListener("click", () => {
    audioClick.play();
    showSearchPokemon.close();
    showPokemon();
});

closeDialogSearch.addEventListener("keydown", (event) => {
    audioClick.play();
    if (event.key === "Enter") {
        showSearchPokemon.close();
        showPokemon();
    }
});

function showThisPokemon(getIDcode) {
    audioClick.play();
    getIDcode = String(getIDcode);
    arrayID = getIDcode.replace(/\D+/g, '');
    arrayID = Number(arrayID);
    getAllInfoForRendern();
    thisPokemon.innerHTML = "";
    statsPokemon.innerHTML = "";
    showOnePokemon.showModal();
    thisPokemon.innerHTML = renderOnePokemon(arrayID);
    statsPokemon.innerHTML = renderPokeStats();
}

closeDialog.addEventListener("click", () => {
    audioClick.play();
    showOnePokemon.close();
    showPokemon();
});

closeDialog.addEventListener("keydown", (event) => {
    audioClick.play();
    if (event.key === "Enter") {
        showOnePokemon.close();
        showPokemon();
    }
});

function showPreviousPoke() {
    audioClick.play();
    if (arrayID == 0) {
        arrayID = allPoke.length - 1;
        getAllInfoForRendern();
        thisPokemon.innerHTML = renderOnePokemon(arrayID);
        statsPokemon.innerHTML = renderPokeStats();
    } else {
        arrayID = arrayID - 1;
        getAllInfoForRendern();
        thisPokemon.innerHTML = renderOnePokemon(arrayID);
        statsPokemon.innerHTML = renderPokeStats();
    }
}

function showNextPoke() {
    audioClick.play();
    if (arrayID == allPoke.length - 1) {
        arrayID = 0;
        getAllInfoForRendern();
        thisPokemon.innerHTML = renderOnePokemon(arrayID);
        statsPokemon.innerHTML = renderPokeStats();
    } else {
        arrayID = arrayID + 1;
        getAllInfoForRendern();
        thisPokemon.innerHTML = renderOnePokemon(arrayID);
        statsPokemon.innerHTML = renderPokeStats();
    }
}
