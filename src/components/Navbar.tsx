
import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Placeholder function for demo purposes
  const toggleLogin = () => setIsLoggedIn(!isLoggedIn);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <span className="text-primary font-bold text-xl">ElegantStay</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link 
            to="/properties"
            className="text-foreground hover:text-primary transition-colors"
          >
            Propriétés
          </Link>
          <Link 
            to="/cities"
            className="text-foreground hover:text-primary transition-colors"
          >
            Destinations
          </Link>
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">Tableau de bord</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/messages">Messages</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/bookings">Mes réservations</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/properties/add">Ajouter une propriété</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={toggleLogin}>
                  Se déconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={toggleLogin}>Connexion</Button>
          )}
          <ThemeToggle />
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu} 
            className="md:hidden"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          "fixed inset-0 top-[57px] bg-background z-40 md:hidden transition-transform duration-300 transform",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
          <Link 
            to="/properties"
            className="text-foreground hover:text-primary py-2 transition-colors"
            onClick={closeMenu}
          >
            Propriétés
          </Link>
          <Link 
            to="/cities"
            className="text-foreground hover:text-primary py-2 transition-colors"
            onClick={closeMenu}
          >
            Destinations
          </Link>
          {isLoggedIn ? (
            <>
              <Link 
                to="/dashboard" 
                className="text-foreground hover:text-primary py-2 transition-colors" 
                onClick={closeMenu}
              >
                Tableau de bord
              </Link>
              <Link 
                to="/messages" 
                className="text-foreground hover:text-primary py-2 transition-colors" 
                onClick={closeMenu}
              >
                Messages
              </Link>
              <Link 
                to="/bookings" 
                className="text-foreground hover:text-primary py-2 transition-colors" 
                onClick={closeMenu}
              >
                Mes réservations
              </Link>
              <Link 
                to="/properties/add" 
                className="text-foreground hover:text-primary py-2 transition-colors" 
                onClick={closeMenu}
              >
                Ajouter une propriété
              </Link>
              <Button 
                variant="ghost" 
                className="justify-start px-0 hover:bg-transparent" 
                onClick={() => { toggleLogin(); closeMenu(); }}
              >
                Se déconnecter
              </Button>
            </>
          ) : (
            <Button onClick={() => { toggleLogin(); closeMenu(); }}>
              Connexion
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
