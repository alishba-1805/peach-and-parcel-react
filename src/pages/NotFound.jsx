import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <section className="empty-state">
      <p className="eyebrow">404 / A SMALL DETOUR</p>
      <h1>This page wandered off.</h1>
      <p>There are still lovely things on the menu.</p>
      <Link className="button" to="/shop">
        Explore the menu
      </Link>
    </section>
  );
}
