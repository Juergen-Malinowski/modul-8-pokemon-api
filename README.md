# Pokedex

A responsive frontend application that loads Pokémon data from the public [PokéAPI](https://pokeapi.co/) and presents an interactive overview, search, and detail view.

This project was originally created during an early frontend learning phase and has since been refactored for portfolio use with a stronger focus on maintainability, accessibility, responsive behavior, error handling, and documentation.

## Features

- Loads Pokémon data dynamically from PokéAPI
- Displays Pokémon cards with name, ID, image, and type information
- Loads additional Pokémon when navigating forward
- Supports previous and next navigation in the overview
- Provides a loading state during API requests
- Opens a modal detail view for individual Pokémon
- Shows abilities, height, weight, and base stats
- Supports navigation between loaded Pokémon inside the detail dialog
- Searches Pokémon by full name or numeric ID
- Supports partial-name search with a selectable result list
- Handles invalid searches and failed API requests
- Includes keyboard-accessible controls and semantic interactive elements
- Includes responsive layouts for desktop, tablet, and mobile viewports

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Fetch API
- REST API
- PokéAPI

No framework or backend is required.

## API

The application retrieves Pokémon data from:

`https://pokeapi.co/api/v2/pokemon`

PokéAPI is a free, public REST API. The application loads data directly in the browser and keeps already loaded Pokémon in memory during the current page session to avoid unnecessary repeat requests.

For further information, see the [PokéAPI documentation](https://pokeapi.co/docs/v2).

## Search

The search accepts:

- a complete Pokémon name
- a numeric Pokémon ID
- a partial Pokémon name with at least three characters

If a partial search matches multiple Pokémon, a result list is displayed so the user can choose the intended Pokémon.

## Pokémon Details

The detail dialog displays:

- name
- Pokédex ID
- Pokémon type or types
- image
- abilities
- height in meters
- weight in kilograms
- base stats with a relative text-based diagram

## Responsive Design

The application uses separate responsive stylesheets for tablet and mobile layouts in addition to the shared base styles.

The intended validation widths are:

- 1440 px
- 1024 px
- 768 px
- 767 px
- 600 px
- 390 px
- 375 px
- 360 px
- 320 px

Final visual validation should cover the overview, search, navigation, detail dialog, and legal information page at these widths.

## Accessibility

The refactored version includes:

- semantic buttons for interactive controls
- keyboard-operable Pokémon cards and navigation
- visible focus states
- accessible labels for navigation and search controls
- native HTML dialogs
- focus restoration after closing a dialog
- `aria-live` regions for loading and search feedback
- descriptive alternative text where images convey content

## Local Setup

No build process is required.

1. Clone the repository.
2. Open the project folder in VS Code or another editor.
3. Serve the project through a local HTTP server, for example VS Code Live Server.
4. Open `index.html` through the local server.

A local HTTP server is recommended instead of opening the HTML file directly from the file system.

## Project Structure

```text
modul-8-pokemon-api/
├── assets/
│   ├── icon/
│   ├── img/
│   └── sound/
├── css/
│   ├── standard.css
│   ├── style_mobile.css
│   └── style_tablet.css
├── html/
│   └── info.html
├── js/
│   ├── data.js
│   ├── definition.js
│   ├── shorts.js
│   └── template.js
├── index.html
├── script.js
├── style.css
└── README.md
```

## Legal, Privacy, and Credits

The application contains a dedicated legal and privacy information page under `html/info.html`.

The project uses PokéAPI for Pokémon data and images. Pokémon and Pokémon character names are trademarks of Nintendo. This is an independent, non-commercial portfolio and learning project and is not affiliated with or endorsed by Nintendo or PokéAPI.

Additional image and sound assets are credited on the information page. Pixabay attribution is retained even though the current Pixabay Content License does not generally require attribution.

## Known Limitations

- The project depends on the availability of PokéAPI.
- Pokémon images are loaded from external PokéAPI sprite URLs.
- Final cross-browser and viewport validation should be completed before public deployment.
- A public live-demo URL will be added after final deployment.

## Development Background

The original implementation was created as part of frontend training. The later portfolio refactoring focused on preserving the working application while improving code quality instead of rebuilding the project from scratch.

Key refactoring areas include:

- removal of obsolete development code and comments
- API error handling
- asynchronous loading flow
- search-state handling
- responsive CSS cleanup
- accessibility improvements
- asset and font cleanup
- legal and privacy information
- repository documentation

## Author

Jürgen Malinowski

GitHub: [Juergen-Malinowski](https://github.com/Juergen-Malinowski)

Repository: [modul-8-pokemon-api](https://github.com/Juergen-Malinowski/modul-8-pokemon-api)
