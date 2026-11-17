export default function ScenarioChecks({ onLoad, onStock, onReset }) {
  return (
    <details className="scenario-checks">
      <summary>Catalog scenarios</summary>
      <p>
        These controls simulate catalog states. They keep your selected items.
      </p>
      <div className="scenario-buttons">
        <button onClick={() => onLoad("failure")}>
          Simulate loading failure
        </button>
        <button onClick={() => onLoad("empty")}>Simulate empty catalog</button>
        <button onClick={onStock}>Reduce stock</button>
        <button onClick={onReset}>Reset catalog</button>
      </div>
      <p className="fine">
        Reduced stock: Strawberry Sunday Bento → 0; Vanilla Cloud Cupcakes → 2.
        View the menu or parcel to check. Reset restores stock and catalog,
        keeping the parcel.
      </p>
    </details>
  );
}
