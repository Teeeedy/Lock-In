import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { ModeToggle } from "./ModeToggle";

const Header = () => {
  return (
    <header>
      <div className="py-6 ">
        <nav className="container mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="text-3xl font-bold tracking-tight flex justify-center items-center gap-1">
            <Lock className="font-bold" />
            Lock In
          </Link>
          <ModeToggle></ModeToggle>
        </nav>
      </div>
    </header>
  );
};

export default Header;
