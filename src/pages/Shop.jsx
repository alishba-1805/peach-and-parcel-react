import ProductCard from "../components/ProductCard.jsx";
export default function Shop({
  products,
  filters,
  setFilters,
  onAdd,
  cart = [],
}) {
  const { search, category, eggFree, sort } = filters;
  const query = search.trim().toLowerCase();
  const matches = products.filter((product) => {
    const searchableText = (
      product.name +
      " " +
      product.description +
      " " +
      product.category
    ).toLowerCase();
    const matchesSearch = searchableText.includes(query);
    const matchesCategory = category === "All" || product.category === category;
    const matchesRecipe = !eggFree || product.eggFree;
    return matchesSearch && matchesCategory && matchesRecipe;
  });

  const visible = matches.slice();
  if (sort === "low") visible.sort((a, b) => a.price - b.price);
  if (sort === "high") visible.sort((a, b) => b.price - a.price);
  function updateFilter(field, value) {
    setFilters((previous) => ({ ...previous, [field]: value }));
  }
  function reset() {
    setFilters({ search: "", category: "All", eggFree: false, sort: "studio" });
  }
  return (
    <>
      <section className="page-heading">
        <p className="eyebrow">THE DESSERT EDIT / 12 STUDIO RECIPES</p>
        <h1>
          A little box of <em>lovely.</em>
        </h1>
        <p>
          Cakes for two, treats to share, and a few reasons to celebrate
          Tuesday.
        </p>
      </section>
      <section aria-label="Find your dessert" className="filters">
        <label className="search-label" htmlFor="product-search">
          Find something sweet
          <input
            id="product-search"
            type="search"
            placeholder="Try strawberry, chocolate, or cupcakes"
            value={search}
            onChange={(e) => updateFilter("search", e.target.value)}
          />
        </label>
        <label htmlFor="product-category">
          Category
          <select
            id="product-category"
            aria-label="Category"
            value={category}
            onChange={(e) => updateFilter("category", e.target.value)}
          >
            {["All", "Cakes", "Cupcakes", "Cookies & bars", "Dessert cups"].map(
              (value) => (
                <option key={value}>{value}</option>
              ),
            )}
          </select>
        </label>
        <label htmlFor="product-sort">
          Sort by
          <select
            id="product-sort"
            aria-label="Sort by"
            value={sort}
            onChange={(e) => updateFilter("sort", e.target.value)}
          >
            <option value="studio">Studio favourites</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </label>
        <label className="check-label" htmlFor="egg-free-filter">
          <input
            id="egg-free-filter"
            type="checkbox"
            checked={eggFree}
            onChange={(e) => updateFilter("eggFree", e.target.checked)}
          />
          Egg-free recipes
        </label>
      </section>
      <div className="results-heading">
        <p aria-live="polite">
          {visible.length} {visible.length === 1 ? "dessert" : "desserts"} to
          discover
        </p>
        <button className="text-button" onClick={reset}>
          Reset filters
        </button>
      </div>
      {visible.length ? (
        <section className="product-grid" aria-label="Desserts">
          {visible.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={onAdd}
              selected={
                cart.find((item) => item.id === product.id)?.quantity || 0
              }
            />
          ))}
        </section>
      ) : (
        <section className="empty-state">
          <h2>No desserts match your search</h2>
          <p>
            Try a different flavour or clear the filters to see the whole menu.
          </p>
          <button className="button" onClick={reset}>
            Reset filters
          </button>
        </section>
      )}
      <p className="recipe-note">
        Egg-free is a simulated recipe label, not an allergy or
        cross-contamination guarantee.
      </p>
    </>
  );
}
