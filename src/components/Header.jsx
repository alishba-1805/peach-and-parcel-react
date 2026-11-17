import { NavLink, Link } from 'react-router-dom';
export default function Header({ count = 0 }) {
  return <><div className="announcement">A fictional dessert studio Â· Islamabad <span>Delivery PKR 200 Â· Product minimum PKR 1,200</span></div><header className="site-header"><Link className="brand" to="/" aria-label="Peach and Parcel home"><span className="brand-mark" aria-hidden="true">p.</span><span>peach <i>&</i> parcel<small>DESSERT STUDIO</small></span></Link><nav aria-label="Main navigation"><NavLink to="/" end>Our studio</NavLink><NavLink to="/shop">The menu</NavLink><NavLink className="bag" to="/cart">Your parcel <span className="count">{count}</span></NavLink></nav></header></>;
}
