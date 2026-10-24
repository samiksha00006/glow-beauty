# Glow Beauty — React + Vite

A beginner-friendly, frontend-only beauty products store made with React, Vite, JavaScript, and CSS.

## Features
- Responsive beauty storefront
- Product search and category filters
- Add products to a shopping bag
- Increase/decrease item quantities and remove items
- Automatic subtotal and free-delivery message
- Favourite/heart buttons
- Newsletter demo form
- Demo checkout (does not take payments)

## Requirements
Install **Node.js LTS** from https://nodejs.org/ and **Visual Studio Code**.

## Run on Windows
1. Extract `glowbeauty-vite.zip`.
2. Open VS Code.
3. Choose **File → Open Folder** and select the `glowbeauty-vite` folder that contains `package.json` and `index.html`.
4. Open **Terminal → New Terminal**.
5. Run:

   ```bash
   npm install
   npm run dev
   ```

6. Vite prints a local address, usually `http://localhost:5173/`. Hold `Ctrl` and click it, or copy it into your browser.
7. To stop the server, click the terminal and press `Ctrl + C`.

## Create a production build
```bash
npm run build
npm run preview
```
The production files are created in the `dist` folder.

## Project structure
```text
glowbeauty-vite/
├── index.html
├── package.json
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    └── styles.css
```

## Explain it in simple words
- **index.html**: The starting HTML page. It contains the `root` element where React displays the website.
- **src/main.jsx**: Connects React to the HTML root and imports the CSS.
- **src/App.jsx**: The main website. It contains product data, page sections, search/filter logic, favourites, and shopping-bag behaviour.
- **src/styles.css**: Controls colours, fonts, spacing, product cards, mobile layout, and the shopping-bag drawer.
- **package.json**: Lists the libraries and terminal commands used by the project.
- **Vite**: Starts the local development server and builds the project.

## React concepts used
- **Component**: `App` is the main reusable piece of UI.
- **JSX**: HTML-like syntax written inside JavaScript.
- **useState**: Stores changing values such as search text, selected category, favourites, and cart items.
- **useMemo**: Filters the product list when the category or search changes.
- **map()**: Creates a product card for every product in the array.
- **onClick / onChange**: Respond to clicks and typing.
- **CSS media queries**: Make the layout adapt to phones, tablets, and desktops.

## Important notes
- This is a frontend-only learning/demo project. Cart data resets if you refresh the page.
- Checkout is a demo; it does not process payments or store orders.
- Product photos and Google Fonts load from the internet, so those visual assets need an internet connection.
