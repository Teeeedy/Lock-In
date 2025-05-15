import { Link, useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const logout = async () => {
    try {
      await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
          <div className="gap-5 flex justify-between items-center">
            <ModeToggle></ModeToggle>
            {user && <Button onClick={() => logout()}>Logout</Button>}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
