import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer w-full bg-neutral text-neutral-content p-10">
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Painting</a>
        <a className="link link-hover">Drawing</a>
        <a className="link link-hover">Nature</a>
        <a className="link link-hover">Art</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">Painting and Drawing</a>
        <Link to="/all-arts" className="link link-hover">
          All Arts
        </Link>
        <Link to="/add-craft" className="link link-hover">
          Add Craft
        </Link>
        <Link to="/my-crafts" className="link link-hover">
          My Crafts
        </Link>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
    </footer>
  );
};

export default Footer;
