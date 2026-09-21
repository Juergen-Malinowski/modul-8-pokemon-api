let allPoke = [];
let startIndex = 1;
let endIndex = startIndex + 7;
let firstLoad = true;

let arrayID = 0;
let pokeAsJson = "";
let apiLength = 0;
let loadedPokemons = 0;
let capitalized = "";
const buttonPreNext = document.getElementById('button_pre_next');

const audioClick = new Audio('./assets/sound/click.mp3');

let inputUser = document.getElementById('input_user');
let searchThisPoke = "";
let pokeIdNumber = "";
let pokeName = "";
let pokeNotInAllPoke = true;
let searchOnePoke = false;
let allPokeName = [];
const showSearchPokemon = document.getElementById("show_search_one_pokemon");
const closeDialogSearch = document.getElementById("close_dialog_search");
const thisSearchPokemon = document.getElementById('show_search_pokemon');
const statsSearchPokemon = document.getElementById('poke_search_stats');

const showOnePokemon = document.getElementById("show_one_pokemon");
const closeDialog = document.getElementById("close_dialog");
const thisPokemon = document.getElementById('show_pokemon');
const statsPokemon = document.getElementById('poke_stats');
let abilityOne = "";
let abilityTwo = "";
let abilityThree = "";
let maxValue = 0;

let stat0 = "█";
let stat1 = "█";
let stat2 = "█";
let stat3 = "█";
let stat4 = "█";
let stat5 = "█";
let statsProportionateValue = 0;
let pokeStats = [{ name: "", value: "" }];
