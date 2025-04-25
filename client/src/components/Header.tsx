import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b-2 border-b-black py-6 bg-black">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold tracking-tight text-white">
          Lock In
        </Link>
      </nav>
    </header>
  );
};

export default Header;
