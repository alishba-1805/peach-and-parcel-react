export default function CatalogStatus({ status, error, onRetry }) {
  if (status === "loading")
    return (
      <section className="empty-state" role="status">
        <p className="eyebrow">UNWRAPPING THE MENU</p>
        <h1>A little sweetness is on its way.</h1>
        <p>Loading the local demo catalog…</p>
      </section>
    );
  if (status === "error")
    return (
      <section className="empty-state">
        <p className="eyebrow">A SMALL HICCUP</p>
        <h1>The menu needs a moment.</h1>
        <p role="alert">{error}</p>
        <button className="button" onClick={onRetry}>
          Retry loading
        </button>
      </section>
    );
  return (
    <section className="empty-state">
      <p className="eyebrow">EMPTY DEMO CATALOG</p>
      <h1>No desserts in the catalog yet.</h1>
      <p>
        The loader returned zero records. This is different from a search with
        no matches. Your saved parcel is kept.
      </p>
      <button className="button" onClick={onRetry}>
        Restore catalog
      </button>
    </section>
  );
}
