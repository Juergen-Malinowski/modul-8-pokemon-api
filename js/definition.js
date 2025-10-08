// ###########################
// DEFINITION of VARIBALES ...
// ###########################

// ####################
// #####  GLOBAL  ##### ...
let allPoke = [];     // Array nimmt alle geladenen Pokemons auf
let startIndex = 1;   // startIndex gibt die NUMMER des ersten zu ladenen POKEMONs vor !
let endIndex = startIndex + 7;  // Entscheidet, wieviele POKEMONs geladen werden ... derzeit 8 Pokemons
let firstLoad = true;  // überwacht, dass bestimmte BEFEHLE nur beim ERST-Start ablaufen ! ...
// ... loadPokemon() kann dadurch grundsätzlich aufgerufen werden !

let arrayID = 0;          // enthält immer die ARRAY-ID des Start-Pokemons beim Bildaufbau
let pokeAsJson = "";      // speichert einen geladenen API-Datensatz im JSON-Format zur weiteren Verarbeitung
let apiLength = 0;        // Anzahl ALLER vorhandenen Pokemons werden hier später abgelegt
let loadedPokemons = 0;   // ANZAHL derzeit geladener Pokemons
let capitalized = "";     // Manipulation POKE-NAME mit ersten Buchstaben in GROSS-Schrift
const buttonPreNext = document.getElementById('button_pre_next');

// #####  for AUDIO  ##### ...
const audioClick = new Audio('./assets/sound/click.mp3');


// ###########################################
// #####  for the SEARCH of ONE Pokemon  ##### ...
let inputUser = document.getElementById('input_user');  // Übernahme INPUT des Users
let searchThisPoke = "";    // speichert den INPUT des Users für die Pokemon-Suche
let pokeIdNumber = "";      // speichert ID des Pokemons für SUCHE
let pokeName = "";          // speicher NAME des Pokemons für SUCHE
let pokeNotInAllPoke = true;  // speichert Prüfung, ob gesuchter POKE-NAME in allPoke enthalten ist UND direkt ausgegeben werden kann
let searchOnePoke = false;  // SCHALTER "searchOnePoke" wirt auf die Funktionen unter getAllInfoForRendern() und ändert die Info-Beschafffung
let allPokeName = [];
const showSearchPokemon = document.getElementById("show_search_one_pokemon");   // ID der DIALOG-BOX  "Show-One-Pokemon"
const closeDialogSearch = document.getElementById("close_dialog_search");       // ID vom CLOSE-Button / Überwachung EventListener
const thisSearchPokemon = document.getElementById('show_search_pokemon');       // Ausgabe-ID für SEARCH-One-Pokemon
const statsSearchPokemon = document.getElementById('poke_search_stats');        // Ausgabe-ID für Eigenschaften SEARCH-One-Pokemon


// ################################################
// ######  for the DIALOG "Show-One-Pokemon"  ##### ...
const showOnePokemon = document.getElementById("show_one_pokemon");   // ID der DIALOG-BOX  "Show-One-Pokemon"
const closeDialog = document.getElementById("close_dialog");          // ID vom CLOSE-Button / Überwachung EventListener
const thisPokemon = document.getElementById('show_pokemon');          // Ausgabe-ID für Daten ONE Pokemon
const statsPokemon = document.getElementById('poke_stats');           // Ausgabe-ID für Eigenschaften(stats) ONE Pokemon
let abilityOne = "";     // speichret Fähigkeit-1
let abilityTwo = "";     // speichert Fähigkeit-2
let abilityThree = "";   // speichert Fähigkeit-3
let maxValue = 0;        // speichert den höchsten Eigenschaftswert unter den Eigenschaften (dient als Referenzwert für PROCESS-BAR)

// VARIBALEN für die PROCESSBAR-Werte zur Anzeige in Show-One-Poke ...
let stat0 = "█"; let stat1 = "█"; let stat2 = "█"; let stat3 = "█"; let stat4 = "█"; let stat5 = "█";
let statsProportionateValue = 0;    // nimmt den anteiligen Diagramm-Wert eines STATS auf 
// leerer Array zur Aufnahme ALLER EIGENSCHAFTEN und WERTE des AKTUELLEN Pokemons ...
let pokeStats = [{ name: "", value: "", }];

