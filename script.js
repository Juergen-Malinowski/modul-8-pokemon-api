document.addEventListener("DOMContentLoaded", loadPokemon);

document.addEventListener("submit", (event) => {
    if (event.target.id === "pokemon_search_form") {
        event.preventDefault();
        searchAndShowOnePoke();
    }
});

document.addEventListener("click", (event) => {
    const pokemonCard = event.target.closest("[data-pokemon-index]");
    if (pokemonCard) {
        showThisPokemon(Number(pokemonCard.dataset.pokemonIndex));
        return;
    }

    const suggestionButton = event.target.closest("[data-pokemon-name]");
    if (suggestionButton) {
        chooseThisPokemon(suggestionButton.dataset.pokemonName);
        return;
    }

    if (event.target.closest("#show_previous_button")) {
        showPrevious();
        return;
    }

    if (event.target.closest("#show_next_button")) {
        showNext();
    }
});

previousPokeButton.addEventListener("click", showPreviousPoke);
nextPokeButton.addEventListener("click", showNextPoke);

closeDialog.addEventListener("click", () => {
    audioClick.play();
    showOnePokemon.close();
});

closeDialogSearch.addEventListener("click", () => {
    audioClick.play();
    showSearchPokemon.close();
});

showOnePokemon.addEventListener("close", handleDialogClose);
showSearchPokemon.addEventListener("close", handleDialogClose);

async function loadPokemon() {
    try {
        if (firstLoad) {
            await goFirstLoad();
        }

        if (startIndex >= allPoke.length) {
            const limit = endIndex - startIndex + 1;
            const pokemonList = await fetchJson(`${POKE_API_BASE_URL}?limit=${limit}&offset=${startIndex - 1}`);

            for (const result of pokemonList.results) {
                const pokemon = await fetchJson(result.url);
                pokemon.name = capitalizeName(pokemon.name);
                allPoke.push(pokemon);
            }

            loadedPokemons += pokemonList.results.length;
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
    for (let index = startIndex - 1; index < endIndex && index < allPoke.length; index++) {
        arrayID = index;
        findBackgroundColor();
        findTypeIcons();
        document.getElementById('overview_poke').innerHTML += renderPokemon();
    }
}

function showPrevious() {
    audioClick.play();
    if (startIndex === 1) {
        startIndex = Math.max(1, allPoke.length - 7);
        endIndex = startIndex + 7;
    } else {
        startIndex = Math.max(1, startIndex - 8);
        endIndex = startIndex + 7;
    }
    showPokemon();
}

async function showNext() {
    audioClick.play();
    document.getElementById('show_next_button').disabled = true;
    document.getElementById('show_previous_button').disabled = true;
    document.getElementById('overview_poke').innerHTML = renderLoadingPicture();

    const previousStartIndex = startIndex;
    const previousEndIndex = endIndex;
    startIndex += 8;
    endIndex = startIndex + 7;

    const loaded = await loadPokemon();
    if (!loaded) {
        startIndex = previousStartIndex;
        endIndex = previousEndIndex;
        showPokemon();
        renderControlPanel();
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
    pokeAsJson.name = capitalizeName(pokeAsJson.name);
    showSearchPoke();
}

function showSearchPoke() {
    lastFocusedElement = document.activeElement;
    preparePokemonDetails();
    thisSearchPokemon.innerHTML = "";
    statsSearchPokemon.innerHTML = "";
    thisSearchPokemon.innerHTML = renderSearchPokemon();
    statsSearchPokemon.innerHTML = renderPokeStats();
    showSearchPokemon.showModal();
}

function showThisPokemon(pokemonIndex) {
    audioClick.play();
    lastFocusedElement = document.activeElement;
    arrayID = pokemonIndex;
    preparePokemonDetails();
    thisPokemon.innerHTML = "";
    statsPokemon.innerHTML = "";
    thisPokemon.innerHTML = renderOnePokemon(arrayID);
    statsPokemon.innerHTML = renderPokeStats();
    showOnePokemon.showModal();
}

function showPreviousPoke() {
    audioClick.play();
    if (arrayID == 0) {
        arrayID = allPoke.length - 1;
    } else {
        arrayID -= 1;
    }
    preparePokemonDetails();
    thisPokemon.innerHTML = renderOnePokemon(arrayID);
    statsPokemon.innerHTML = renderPokeStats();
}

function showNextPoke() {
    audioClick.play();
    if (arrayID == allPoke.length - 1) {
        arrayID = 0;
    } else {
        arrayID += 1;
    }
    preparePokemonDetails();
    thisPokemon.innerHTML = renderOnePokemon(arrayID);
    statsPokemon.innerHTML = renderPokeStats();
}

function handleDialogClose() {
    restoreLastFocus();
    const rotateHint = document.getElementById("rotate_to_portrait_hint");
    const isMobileLandscape = window.matchMedia("(max-height: 767px) and (orientation: landscape)").matches;
    rotateHint.classList.toggle("show_orientation_hint", isMobileLandscape);
}

window.addEventListener("orientationchange", () => {
    document.getElementById("rotate_to_portrait_hint").classList.remove("show_orientation_hint");
});

function restoreLastFocus() {
    if (lastFocusedElement && document.contains(lastFocusedElement)) {
        lastFocusedElement.focus();
    }
    lastFocusedElement = null;
}
