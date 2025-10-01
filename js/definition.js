// ###########################
// DEFINITION of VARIBALES ...
// ###########################

// GLOBAL ...
let allPoke = [];     // Array nimmt alle geladenen Pokemons auf
let startIndex = 1;   // startIndex gibt die NUMMER des ersten zu ladenen POKEMONs vor !
let endIndex = startIndex + 7;  // Entscheidet, wieviele POKEMONs geladen werden ... derzeit 8 Pokemons
let firstLoad = true;  // überwacht, dass bestimmte BEFEHLE nur beim ERST-Start ablaufen ! ...
// ... loadPokemon() kann dadurch grundsätzlich aufgerufen werden !

let arrayID = 0;          // enthält immer die ARRAY-ID des Start-Pokemons beim Bildaufbau
let apiLength = 0;        // Anzahl ALLER vorhandenen Pokemons werden hier später abgelegt
let loadedPokemons = 0;   // ANZAHL derzeit geladener Pokemons
let capitalized = "";     // Manipulation POKE-NAME mit ersten Buchstaben in GROSS-Schrift
const buttonPreNext = document.getElementById('button_pre_next');


// for AUDIO
// to start AUDIO:   audioClick.play();
const audioClick = new Audio('./assets/sound/click.mp3');


// for the DIALOG "Show-One-Pokemon" ...
const showOnePokemon = document.getElementById("show_one_pokemon");
const closeDialog = document.getElementById("close_dialog");
const openDialog = document.getElementById("open_dialog");
const thisPokemon = document.getElementById('show_pokemon');
const statsPokemon = document.getElementById('poke_stats');
let abilityOne = "";
let abilityTwo = "";
let abilityThree = "";
let maxValue = 0;
// VARIBALEN für die PROCESSBAR-Werte zur Anzeige in Show-One-Poke ...
let stat0 = "█"; let stat1 = "█"; let stat2 = "█"; let stat3 = "█"; let stat4 = "█"; let stat5 = "█";
let statsProportionateValue = 0;    // nimmt den anteiligen Diagramm-Wert eines STATS auf 
// leerer Array zur Aufnahme ALLER EIGENSCHAFTEN und WERTE des AKTUELLEN Pokemons ...
let pokeStats = [{ name: "", value: "", }];

