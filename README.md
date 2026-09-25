# Pokedex

A responsive frontend application that loads Pokémon data from the public [PokéAPI](https://pokeapi.co/) and presents an interactive overview, search, and detail view.

This project was originally created during an early frontend learning phase and has since been refactored for portfolio use with a stronger focus on maintainability, accessibility, responsive behavior, error handling, and documentation.

## Local Setup

No build process, package installation, backend, or API key is required. The project only needs to be served through a local HTTP server.

Requirements:

- Git
- a modern web browser
- either Python or another local HTTP server such as VS Code Live Server

Clone the repository, enter the project folder, and start a local HTTP server. The Git commands are identical on Windows, macOS, and Linux. Only the Python start command usually differs between operating systems.

```text
git clone https://github.com/Juergen-Malinowski/modul-8-pokemon-api.git
cd modul-8-pokemon-api

# Windows with the Python Launcher:
py -m http.server 5500

# macOS or Linux:
python3 -m http.server 5500
```

After starting the server, open:

`http://localhost:5500`

Stop the local server with `Ctrl + C`.

Alternatively, open the repository in VS Code and serve `index.html` with the Live Server extension. A local HTTP server is recommended instead of opening the HTML file directly from the file system.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [API](#api)
- [Search](#search)
- [Pokémon Details](#pokémon-details)
- [Responsive Design](#responsive-design)
- [Accessibility](#accessibility)
- [Project Structure](#project-structure)
- [Legal, Privacy, and Credits](#legal-privacy-and-credits)
- [Known Limitations](#known-limitations)
- [Development Background](#development-background)
- [Author](#author)

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
- Provides orientation guidance for Pokémon detail views on narrow mobile devices

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

The application uses shared base styles together with separate stylesheets for desktop, tablet, and mobile layouts.

Responsive breakpoints:

- Desktop: `1280 px` and above
- Tablet: `768 px` to `1279 px`
- Mobile: `767 px` and below

The Pokémon overview adapts from a four-column desktop grid to a two-column tablet layout and finally to a single-column mobile layout.

On sufficiently tall desktop viewports, the complete game area is centered horizontally and vertically. On lower-height viewports, the layout keeps its intended card structure and allows normal vertical scrolling instead of shrinking the content beyond a practical size.

On narrow mobile devices, Pokémon detail dialogs provide an orientation hint when the detail view is opened in portrait mode. The detail layout is optimized for landscape orientation, and a return hint can guide the user back to portrait mode for the overview.

Responsive behavior has been validated across representative desktop, tablet, mobile, and landscape viewport sizes, including widths down to `320 px` and widescreen layouts up to `3440 × 1440`.

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

## Project Structure

```text
modul-8-pokemon-api/
├── assets/
│   ├── icon/
│   ├── img/
│   └── sound/
├── css/
│   ├── standard.css
│   ├── style_desktop.css
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
