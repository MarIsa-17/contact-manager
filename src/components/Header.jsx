import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="p-2 bg-emerald-900/20 shadow-md z-10">
      <nav>
        <ul className="flex flex-row gap-4 justify-end">
          <li>
            <Link to="/" className="text-shadow-white">
              🏠 Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-shadow-white">
              ℹ️ About
            </Link>
          </li>
          <li>
            <Link to= "/contact/:id" className="text-shadow-white">
              📋 Contact List
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
