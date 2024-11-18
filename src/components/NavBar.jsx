import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../helper";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = isAuthenticated();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="navbar">
      <img src="/logo.jpg" alt="logo" className="size-20 bg-red-500" />
      {isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>{user.username}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigate("/admin")}
              disabled={user.role === "STUDENT"}
            >
              لوحة التحكم
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut}>
              تسجيل الخروج
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={() => navigate("/sign-in")}>تسجيل</Button>
      )}
    </div>
  );
};
