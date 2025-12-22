import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="p-2 bg-emerald-900/30 shadow-md z-10">
      <nav>
        <ul className="flex flex-row gap-4 justify-end">
          <li>
            <Link to="/" className="text-white">
              🏠 Home
            </Link>
          </li>
          <li>
            <Link to="/formulario" className="text-white">
              📄 Formulario
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-white">
              ℹ️ About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
