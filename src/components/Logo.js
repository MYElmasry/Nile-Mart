import { Link } from "react-router-dom";
import "./Logo.scss";
function Logo() {
  return (
    <Link to="/" className="logo pl-2 text-2xl md:text-4xl mt-1">
      Nile <span>Mart</span>
    </Link>
  );
}

export default Logo;
