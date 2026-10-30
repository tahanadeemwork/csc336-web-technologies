# CSC336 Web Technologies: Lab Mid Term

- **Name:** Taha Nadeem
- **Roll number:** FA24-BCS-109
- **N** = 9 (last two digits of the roll number)
- **BP** = 600 + 9 = **609px**
- **H** = (9 x 7) mod 360 = **63**, accent colour `hsl(63, 70%, 45%)`
- **K** = (9 mod 3) + 3 = **3** categories (so 4 radio buttons: All + 3)
- Sticky offset = (9 mod 40) + 70 = **79px**
- Premium price limit = 9 x 100 = **Rs. 900**

Starting point: `midterm/` is a copy of my `assignment-2/` work (commit "midterm: baseline copy").

## Files changed

- `index.html`
- `product.html`
- `css/styles.css`
- `script.js` (new)
- `README.md` (replaced with this file)
- `screenshots/` (new, screenshots used in the PDF)
- `FA24-BCS-109-midterm.pdf` (new, replaces the copied Assignment 2 PDF)

## Task 1: CSS-only category filter

- **index.html:** every product column got one of 3 category classes (`tops`, `bottoms`, `accessories`), and 4 radio buttons with labels (All, Tops, Bottoms, Accessories) were added above the grid. "All" is `checked` so it is selected on load.
- **css/styles.css:** rules like `main:has(#cat-tops:checked) .col:not(.tops) { display: none; }` hide every card that does not belong to the checked category. The hidden column is removed from the layout, so the grid leaves no gaps. The selected label gets the accent colour 63 through `.filters input:checked + label`.
- **Why:** `:has()` lets the page react to the checked radio button without any JavaScript.

## Task 2: Product page with CSS Grid and a sticky details box

- **product.html:** the Bootstrap row/column wrapper was replaced by one `product-layout` container with three blocks: `product-image`, `product-details` (holding a `details-box`) and `product-description`. The description was made longer so the page scrolls.
- **css/styles.css:** `.product-layout` is a CSS Grid with `grid-template-areas`. Below 609px the areas are stacked ("image", "details", "description"). From 609px the areas are "image details" and "description description". Inside the media query the `details-box` gets `position: sticky; top: 79px;`.
- **Why:** the sticky box sits inside `product-details`, which is as tall as the image row, so the box stops at the end of that row and never covers the description.

## Task 3: JavaScript live search and price sort

- **index.html:** added a search box, a "Sort by price" button, a hidden "No products found" message, `id="productGrid"` on the grid row, and the `script.js` link.
- **script.js:** `getPrice()` reads each price from the card itself. A search handler hides cards whose name does not contain the typed text, counts the cards that are really visible (the CSS category filter may hide others) and shows "No products found" in place of the grid when none are visible. The sort button re-orders the existing cards with `appendChild`, low to high first, then high to low. On page load a "Premium" label is added to every card priced above Rs. 900.
- **css/styles.css:** a `.premium-label` style using the accent colour.
- **Note:** every product costs more than Rs. 900, so every card gets the Premium label. I did not change the Assignment 2 prices.

## AI tools used

Claude (Anthropic) was used to help write and test the code. I reviewed the code and can explain every part.
