import { Link } from "react-router-dom";
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">SMALL CELEBRATIONS. LOVELY LITTLE PARCELS.</p>
          <h1>
            For the moments
            <br />
            that call for
            <br />
            <em>something sweet.</em>
          </h1>
          <p>
            From a just-because bento to a box worth sharing. Thoughtfully
            imagined desserts for your everyday celebrations.
          </p>
          <Link className="button" to="/shop">
            Explore the menu <span aria-hidden="true">↗</span>
          </Link>
          <p className="fine">
            A student project · Every order is a simulation.
          </p>
        </div>
        <div className="hero-art">
          <img
            src="/images/strawberry-bento.svg"
            alt="Original studio illustration of our strawberry bento cake"
          />
          <span className="art-caption">01 / THE STRAWBERRY SUNDAY BENTO</span>
          <span className="round-label">
            a little
            <br />
            <em>joy, boxed.</em>
          </span>
        </div>
      </section>
      <section className="studio-note">
        <p className="eyebrow">THE PEACH & PARCEL WAY</p>
        <h2>
          Little details.
          <br />A sweeter experience.
        </h2>
        <div>
          <p>
            See the serving size, recipe label and available stock before you
            choose. Your parcel stays with you as you explore.
          </p>
          <p>
            Our fictional delivery area: F-6, F-7, F-8, G-9 and G-10, Islamabad.
            Product subtotal from PKR 1,200, plus a flat PKR 200 delivery fee.
          </p>
          <Link className="text-link" to="/shop">
            Find your next favourite →
          </Link>
        </div>
      </section>
    </>
  );
}
