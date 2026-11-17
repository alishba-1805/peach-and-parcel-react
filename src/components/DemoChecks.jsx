export default function DemoChecks({ onLoad, onStock, onReset }) {
  return (
    <details className="demo-checks">
      <summary>Demo checks · for assessment</summary>
      <p>
        These controls simulate catalog states. They keep your selected items.
      </p>
      <div className="demo-buttons">
        <button onClick={() => onLoad("failure")}>
          Simulate loading failure
        </button>
        <button onClick={() => onLoad("empty")}>Simulate empty catalog</button>
        <button onClick={onStock}>Reduce demo stock</button>
        <button onClick={onReset}>Reset demo data</button>
      </div>
      <p className="fine">
        Reduced stock: Strawberry Sunday Bento → 0; Vanilla Cloud Cupcakes → 2.
        View the menu or parcel to check. Reset restores stock and catalog,
        keeping the parcel.
      </p>
    </details>
  );
}
