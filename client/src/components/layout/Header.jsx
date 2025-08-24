import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import "./Header.css";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="app-header">
      <div className="container header-container navbar-line">
        <Link to="/" className="header-brand">
          <h1 className="text-2xl font-bold">Store_Review_Hub</h1>
        </Link>

        <nav className="header-nav">
          <Link to="/">Home</Link>

          {isAuthenticated ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="nav-ghost-btn">
                    My Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {user?.role === "ADMIN" && (
                    <DropdownMenuItem onClick={() => navigate("/admin")}>
                      Admin Dashboard
                    </DropdownMenuItem>
                  )}
                  {user?.role === "OWNER" && (
                    <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                      Owner Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    Change Password
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-500"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <span className="user-greeting">Hey {user?.name || "User"}</span>
            </>
          ) : (
            <Link to="/login" className="login-button">
              My Account
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
