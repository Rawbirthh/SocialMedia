import { Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Input } from '../../components/ui/input'; // Import shadcn Input

export default function DashboardLayout() {
  const { user } = useAuth();

  return (
    // Ensure the root container is fully dark
    <div className="flex min-h-screen bg-zinc-950">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Top bar - Made sticky with glass blur effect */}
        <header className="sticky top-0 z-40 w-full bg-zinc-950/80 border-b border-zinc-800 backdrop-blur-md px-8 py-3 flex items-center justify-between">
          <div className="flex-1 max-w-md">
            {/* Replaced raw input with shadcn Input */}
            <Input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-zinc-700 text-zinc-300 placeholder:text-zinc-500 focus-visible:ring-blue-500/20 focus-visible:border-blue-500"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <span className="text-sm font-medium text-zinc-300">{user?.name}</span>
          </div>
        </header>

        {/* Page content - FIXED: Changed bg-gray-100 to bg-zinc-950 */}
        <main className="flex-1 bg-zinc-950 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}