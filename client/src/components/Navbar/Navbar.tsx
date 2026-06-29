import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (

    <nav className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo with gradient text to match the home page */}
        <Link 
          to="/" 
          className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
        >
          Job Portal
        </Link>

        <div className="flex gap-2 sm:gap-4 items-center">
          {isAuthenticated ? (
            <>
              <span className="hidden sm:inline text-sm text-zinc-400">
                Hi, {user?.name}
              </span>
              
              <Button asChild variant="ghost" className="text-zinc-300 hover:text-white hover:bg-zinc-800">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              
              <Button 
                onClick={logout} 
                variant="outline" 
                className="border-zinc-700 bg-transparent text-zinc-100 hover:bg-zinc-800 hover:text-white"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" className="text-zinc-300 hover:text-white hover:bg-zinc-800">
                <Link to="/login">Login</Link>
              </Button>
              
              {/* Inverted white button to match the Home page CTA */}
              <Button asChild className="bg-white text-zinc-900 hover:bg-zinc-200">
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}