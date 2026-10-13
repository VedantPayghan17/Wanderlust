const stays = [
  {
    title: "Cozy Beachfront Cottage",
    description: "A relaxed coastal hideaway with ocean views and the beach just beyond the door.",
    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=1200&q=80",
    price: 1500,
    location: "Malibu",
    country: "United States",
  },
  {
    title: "Modern Loft in Downtown",
    description: "A light-filled city loft, perfectly placed for long walks, late dinners, and urban discovery.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    price: 1200,
    location: "New York City",
    country: "United States",
  },
  {
    title: "Mountain Retreat",
    description: "A quiet cabin wrapped in alpine scenery. Come for the fresh air; stay for the stillness.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
    price: 1000,
    location: "Aspen",
    country: "United States",
  },
  {
    title: "Historic Villa in Tuscany",
    description: "A restored country villa among rolling hills and vineyards, made for slow afternoons.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    price: 2500,
    location: "Florence",
    country: "Italy",
  },
  {
    title: "Beachfront Paradise",
    description: "Open the doors to warm sea air and spend the day between the terrace and the sand.",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80",
    price: 2000,
    location: "Cancun",
    country: "Mexico",
  },
  {
    title: "Ski-In/Ski-Out Chalet",
    description: "A welcoming chalet at the edge of the slopes, with mountain trails right outside.",
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=80",
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
  },
];

const grid = document.querySelector("#listing-grid");
const searchInput = document.querySelector("#destination");
const countryFilter = document.querySelector("#country-filter");
const resultCount = document.querySelector(".result-count");
const emptyState = document.querySelector(".empty-state");
const dialog = document.querySelector(".stay-dialog");

const formatPrice = (price) => new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
}).format(price);

function renderStays() {
  const query = searchInput.value.trim().toLowerCase();
  const country = countryFilter.value;
  const filteredStays = stays.filter((stay) => {
    const matchesQuery = `${stay.title} ${stay.location} ${stay.country}`.toLowerCase().includes(query);
    return matchesQuery && (!country || stay.country === country);
  });

  grid.replaceChildren(...filteredStays.map((stay) => {
    const card = document.createElement("button");
    card.className = "listing-card";
    card.type = "button";
    card.setAttribute("aria-label", `View ${stay.title} in ${stay.location}`);

    const image = document.createElement("img");
    image.src = stay.image;
    image.alt = stay.title;
    image.loading = "lazy";

    const meta = document.createElement("div");
    meta.className = "card-meta";
    const location = document.createElement("p");
    location.className = "card-location";
    location.textContent = `${stay.location}, ${stay.country}`;
    const rating = document.createElement("span");
    rating.className = "card-rating";
    rating.textContent = "★ 4.9";
    meta.append(location, rating);

    const title = document.createElement("p");
    title.className = "card-title";
    title.textContent = stay.title;
    const price = document.createElement("p");
    price.className = "card-price";
    const priceValue = document.createElement("strong");
    priceValue.textContent = formatPrice(stay.price);
    price.append(priceValue, " / night");

    card.append(image, meta, title, price);
    card.addEventListener("click", () => showStay(stay));
    return card;
  }));

  resultCount.textContent = `${filteredStays.length} ${filteredStays.length === 1 ? "stay" : "stays"}`;
  emptyState.hidden = filteredStays.length > 0;
}

function showStay(stay) {
  dialog.querySelector(".dialog-image").src = stay.image;
  dialog.querySelector(".dialog-image").alt = stay.title;
  dialog.querySelector(".dialog-location").textContent = `${stay.location}, ${stay.country}`;
  dialog.querySelector("#dialog-title").textContent = stay.title;
  dialog.querySelector(".dialog-description").textContent = stay.description;
  dialog.querySelector(".dialog-price").textContent = `${formatPrice(stay.price)} / night`;
  dialog.showModal();
}

searchInput.addEventListener("input", renderStays);
countryFilter.addEventListener("change", renderStays);
dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

renderStays();