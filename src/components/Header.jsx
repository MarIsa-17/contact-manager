import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="p-4 bg-blue-200 fixed top-0 left-0 right-0 shadow-md z-10">
      <nav>
        <ul className="flex flex-row gap-4 justify-end">
          <li>
            <Link to="/" style={{ textDecoration: "none", color: "#333" }}>
              🏠 Home
            </Link>
          </li>
          <li>
            <Link to="/about" style={{ textDecoration: "none", color: "#333" }}>
              ℹ️ About
            </Link>
          </li>
          <li>
            <Link to= "/contact/:id" style={{ textDecoration: "none", color: "#333" }}>
              📋 Contact List
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
