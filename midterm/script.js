// Task 3: live search, price sort and Premium label
// N = 9, so a product is "Premium" if its price is more than 9 x 100 = 900

const searchBox = document.getElementById("searchBox");
const sortButton = document.getElementById("sortButton");
const grid = document.getElementById("productGrid");
const noResults = document.getElementById("noResults");
const radios = document.querySelectorAll('input[name="category"]');

// The 8 cards that already exist in the page (not rebuilt from an array)
const cards = document.querySelectorAll("#productGrid .col");

// Read the price from a card, e.g. "Rs. 6,450.00" becomes 6450.
// The current price is always the last text inside the price line,
// so a sale card (old price struck through) gives its sale price.
function getPrice(card) {
  const priceLine = card.querySelector(".price");
  const text = priceLine.lastChild.textContent;
  const cleaned = text.replace("Rs.", "").replaceAll(",", "").trim();
  return Number(cleaned);
}

// 1. Premium label, added once when the page loads
cards.forEach(function (card) {
  if (getPrice(card) > 900) {
    const label = document.createElement("span");
    label.textContent = "Premium";
    label.className = "premium-label";
    const body = card.querySelector(".card-body");
    body.insertBefore(label, body.firstChild);
  }
});

// 2. Search + category: a card shows only if it matches both
function updateGrid() {
  const text = searchBox.value.toLowerCase().trim();

  cards.forEach(function (card) {
    const name = card.querySelector(".product-name").textContent.toLowerCase();
    if (name.includes(text)) {
      card.classList.remove("d-none"); // matches the search
    } else {
      card.classList.add("d-none"); // does not match the search
    }
  });

  // Count the cards that are really visible (the category filter in CSS
  // may have hidden some of them too)
  let visible = 0;
  cards.forEach(function (card) {
    if (getComputedStyle(card).display !== "none") {
      visible++;
    }
  });

  if (visible === 0) {
    grid.classList.add("d-none");
    noResults.classList.remove("d-none");
  } else {
    grid.classList.remove("d-none");
    noResults.classList.add("d-none");
  }
}

searchBox.addEventListener("input", updateGrid);
radios.forEach(function (radio) {
  radio.addEventListener("change", updateGrid);
});

// 3. Sort by price: first click low to high, next click high to low, ...
let ascending = true;

sortButton.addEventListener("click", function () {
  const list = Array.from(grid.children);

  list.sort(function (a, b) {
    if (ascending) {
      return getPrice(a) - getPrice(b);
    }
    return getPrice(b) - getPrice(a);
  });

  // appendChild moves the existing card to the end, so after the loop
  // the cards are in the new order
  list.forEach(function (card) {
    grid.appendChild(card);
  });

  sortButton.textContent = ascending ? "Price: low to high" : "Price: high to low";
  ascending = !ascending;
});
