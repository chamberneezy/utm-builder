# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**UTM Builder** is a web application designed by 20min's Data Team to generate URLs with UTM parameters for tracking marketing campaigns. Users can input base URLs and configure UTM parameters (source, medium, campaign, term) either manually or through preset buttons for specific platforms (Instagram, Facebook, Twitter, WhatsApp, TikTok, LinkedIn, etc.).

## Tech Stack

- **HTML5**: Page structure and form layout
- **CSS3**: Styling with custom BatonTurbo font family and responsive design
- **Vanilla JavaScript**: No frameworks or build tools
- **No dependencies**: This is a static site with no build process or package manager

## How to Run

Since this is a static HTML/CSS/JS application, it can be opened directly in a browser:

```bash
# Option 1: Open the file directly in your browser
open index.html

# Option 2: Use a local HTTP server (Python 3)
python -m http.server 8000
# Then navigate to http://localhost:8000

# Option 3: Use Node.js if available
npx http-server
```

## File Structure

- **index.html**: Main form with URL inputs, preset buttons (grouped by Social Media and Newsletter), and UTM parameter inputs
- **script.js**: Core JavaScript functionality including URL generation, preset handling, and copy-to-clipboard
- **styles.css**: Styling including custom fonts (@font-face for BatonTurbo), responsive layout, and button animations
- **fonts/**: Custom BatonTurbo font files in multiple weights (Regular, Bold, Book/Thin)
- **img/**: Logo assets

## Architecture & Key Functions

### Form Structure (index.html)
The form has three main sections:
1. **URL Container**: Dynamic inputs for base URLs (users can add multiple with the "Add more URL(s)" button)
2. **Preset Buttons**: Quick-select buttons organized into "Social Media" and "NeXt GEN NewsLetter" categories, each with predefined data attributes (source, medium, campaign, term)
3. **UTM Parameters**: Manual input fields for source, medium, campaign, and term

### Core JavaScript Functions (script.js)

- **`buildUTMUrl(baseURL, utmSource, utmMedium, utmCampaign, utmTerm)`**: Constructs a URL with UTM query parameters using the native `URL` and `URLSearchParams` API. Only adds parameters that have values.

- **Add URL functionality**: Clicking "Add more URL(s)" dynamically creates new URL input fields with incrementing IDs (url-0, url-1, etc.) tracked by `urlCount`.

- **Preset button handling**: Click listeners on preset buttons populate the UTM parameter fields based on `data-` attributes. Buttons have hardcoded mappings like `data-source="instagram"`, `data-medium="social"`, `data-campaign="story"`.

- **Form submission**: On form submit, iterates through all URL inputs (0 to urlCount), builds UTM URLs for each, and displays them in `#generated-urls-container` with copy buttons.

- **Copy-to-clipboard**: Uses `textarea` approach (create temporary textarea, select, execCommand) to copy URLs and show a confirmation alert.

- **Logo reset**: Clicking the logo refreshes the page.

### Styling Notes

- **Color scheme**: Primary (#07184D - dark blue), accent (#C929FF - purple), background (#EDF4FF - light blue)
- **Responsive**: Mobile breakpoint at 768px with adjusted padding and flex layout
- **Preset buttons**: Use purple (#C929FF), with hover effects including color change to purple and slight scale transform
- **Font**: Custom BatonTurbo font with fallback to Arial; used in various weights

## Common Development Tasks

### Adding a New Preset Button
1. Add a new `<button class="preset">` in the appropriate section (Social Media or Newsletter)
2. Add `data-source`, `data-medium`, `data-campaign` (optional), and `data-term` (optional) attributes
3. The existing event listener on `.preset` buttons will automatically handle it

### Modifying UTM Parameters
Edit the `buildUTMUrl()` function to change how parameters are appended to URLs or add new ones.

### Styling Changes
All styles are in `styles.css`. The custom fonts are loaded via @font-face from the `fonts/` directory.

## Important Notes

- The application uses `document.execCommand('copy')`, which is deprecated but still functional for this use case. If browser compatibility becomes an issue, consider migrating to the modern Clipboard API.
- URL validation happens via HTML5 `<input type="url">`, not custom JavaScript.
- The preset buttons directly manipulate form input values rather than passing data through the DOM, making the flow straightforward but relying on consistent input field IDs.
- There is a reference to `#linkedin-personal` event listener in the code but no matching button exists in the HTML; this code is unused.
- don't create node modules for this project, use only html, css and js to make changes