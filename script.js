async function loadPokemon() {
    try {
        if (firstLoad) {
            await goFristLoad();
        }

        if (startIndex >= allPoke.length) {
            for (let index = startIndex; index <= endIndex; index++) {
                const pokemon = await fetchJson(`${POKE_API_BASE_URL}/${index}`);
                capitalized = pokemon.name;
                capitalizedString();
                pokemon.name = capitalized;
                allPoke.push(pokemon);
            }
            loadedPokemons = loadedPokemons + (endIndex - startIndex + 1);
        }

        document.getElementById('search_Mask').innerHTML = renderSearchBox();
        showPokemon();
        renderControlPanel();
        return true;
    } catch (error) {
        document.getElementById('overview_poke').textContent = "Pokémon data could not be loaded. Please try again.";
        if (allPoke.length > 0) {
            renderControlPanel();
        }
        return false;
    }
}

function showPokemon() {
    document.getElementById('overview_poke').innerHTML = "";
    for (let index = startIndex - 1; index < endIndex; index++) {
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
    } else {
        startIndex = startIndex - 8;
        endIndex = startIndex + 7;
    }
    showPokemon();
}

async function showNext() {
    audioClick.play();
    document.getElementById('show_next_button').disabled = true;
    document.getElementById('show_previous_button').disabled = true;
    document.getElementById('overview_poke').innerHTML = renderLodingPicture();

    const previousStartIndex = startIndex;
    const previousEndIndex = endIndex;
    startIndex = startIndex + 8;
    endIndex = startIndex + 7;

    const loaded = await loadPokemon();
    if (!loaded) {
        startIndex = previousStartIndex;
        endIndex = previousEndIndex;
    }
}

async function searchAndShowOnePoke() {
    audioClick.play();
    searchOnePoke = true;
    getInputForSearch();

    if (!searchThisPoke) {
        showSearchError("Please enter a Pokémon name or ID.");
        searchOnePoke = false;
        return;
    }

    getPokeIdNumber();
    getPokeWithName();

    try {
        await loadWithNameOrIdAndShow();
    } catch (error) {
        showSearchError("The Pokémon could not be loaded.");
    } finally {
        searchOnePoke = false;
        inputUser.value = "";
    }
}

async function loadWithNameOrIdAndShow() {
    if (!pokeNotInAllPoke || !inputUser || !inputUser.value.trim()) {
        return;
    }

    const identifier = pokeIdNumber !== null ? pokeIdNumber : pokeName;
    pokeAsJson = await fetchJson(`${POKE_API_BASE_URL}/${identifier}`);
    capitalized = pokeAsJson.name;
    capitalizedString();
    pokeAsJson.name = capitalized;
    showSearchPoke();
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
    arrayID = Number(getIDcode.replace(/\D+/g, ''));
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
    } else {
        arrayID = arrayID - 1;
    }
    getAllInfoForRendern();
    thisPokemon.innerHTML = renderOnePokemon(arrayID);
    statsPokemon.innerHTML = renderPokeStats();
}

function showNextPoke() {
    audioClick.play();
    if (arrayID == allPoke.length - 1) {
        arrayID = 0;
    } else {
        arrayID = arrayID + 1;
    }
    getAllInfoForRendern();
    thisPokemon.innerHTML = renderOnePokemon(arrayID);
    statsPokemon.innerHTML = renderPokeStats();
}
