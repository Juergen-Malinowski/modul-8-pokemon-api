// ###########################################################
// Funktionen zur Manipulation des Inhalts globaler Variablen,
// die sich dem POKEMON entsprechend anpassen müssen ...
// ###########################################################

function getTheColorCode() {
    // WEISE backgroundColor den passenden HEX-Farbcode zum TYPE zu ...
    switch (backgroundColor) {
        case "normal": backgroundColor = "#ffffff"; break;
        case "fire": backgroundColor = "#f22121"; break;
        case "water": backgroundColor = "#1e9cd2"; break;
        case "electric": backgroundColor = "#ebee44"; break;
        case "grass": backgroundColor = "#14d411"; break;
        case "ice": backgroundColor = "#66e0f0"; break;
        case "fighting": backgroundColor = "#f55d42"; break;
        case "poison": backgroundColor = "#349864"; break;
        case "ground": backgroundColor = "#9a6042"; break;
        case "flying": backgroundColor = "#1fe0dd"; break;
        case "psychic": backgroundColor = "#bc209f"; break;
        case "bug": backgroundColor = "#6aa81f"; break;
        case "rock": backgroundColor = "#5b241a"; break;
        case "ghost": backgroundColor = "#cba4d5"; break;
        case "dragon": backgroundColor = "#c70505"; break;
        case "dark": backgroundColor = "#5b5552"; break;
        case "steel": backgroundColor = "#918b88"; break;
        case "fairy": backgroundColor = "#7923e1"; break;
        case "stellar": backgroundColor = "#e1c823"; break;
        default: break;
    }
}

function getTheTypeIcons() {
    // WEISE pokeTypeSearch das passende Bild vom TYPE zu ...
    switch (pokeTypeSearch) {    
        case "normal": pokeTypeSearch = "normal.jpg"; break;
        case "fire": pokeTypeSearch = "fire.jpg"; break;
        case "water": pokeTypeSearch = "water.jpg"; break;
        case "electric": pokeTypeSearch = "electric.jpg"; break;
        case "grass": pokeTypeSearch = "grass.jpg"; break;
        case "ice": pokeTypeSearch = "ice.jpg"; break;
        case "fighting": pokeTypeSearch = "fighting.jpg"; break;
        case "poison": pokeTypeSearch = "poison.jpg"; break;
        case "ground": pokeTypeSearch = "ground.jpg"; break;
        case "flying": pokeTypeSearch = "flying.jpg"; break;
        case "psychic": pokeTypeSearch = "psychic.jpg"; break;
        case "bug": pokeTypeSearch = "bug.jpg"; break;
        case "rock": pokeTypeSearch = "rock.jpg"; break;
        case "ghost": pokeTypeSearch = "ghost.jpg"; break;
        case "dragon": pokeTypeSearch = "dragon.jpg"; break;
        case "dark": pokeTypeSearch = "dark.jpg"; break;
        case "steel": pokeTypeSearch = "steel.jpg"; break;
        case "fairy": pokeTypeSearch = "fairy.jpg"; break;
        case "stellar": pokeTypeSearch = "normal.jpg"; break;
        default: break;
    }
}

function getValueFromAllStatsForProcessBar() {
    // ERMITTLE die Länge jedes Diagramm-Balkens zu jeder EIGENSCHAFT ...
    for (let index = 0; index < pokeStats.length; index++) {
        statsProportionateValue = 0;
        statsProportionateValue = Math.round(26 * pokeStats[index].value / maxValue);
        for (let i = 0; i < statsProportionateValue; i++) {
            switch (index) {
                case 0: stat0 = stat0 + "█"; break;
                case 1: stat1 = stat1 + "█"; break;
                case 2: stat2 = stat2 + "█"; break;
                case 3: stat3 = stat3 + "█"; break;
                case 4: stat4 = stat4 + "█"; break;
                case 5: stat5 = stat5 + "█"; break;
                default: break;
            }
        }
    }
}
