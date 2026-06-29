import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
export default function Home() {
  return (
    // Deep dark background (zinc-950) with white text
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      
      {/* Glowing background orbs - more visible on dark mode */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[500px] rounded-full bg-purple-600/20 blur-[150px]" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-24">
        
        {/* Hero Section */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Connect with friends, <br className="hidden sm:block" /> 
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Share your world.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400 sm:text-xl">
            Join Job Portal today. Discover what's happening around the world, connect with people, and share your favorite moments.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* Primary button: White background, dark text */}
            <Button asChild size="lg" className="w-full bg-white text-zinc-900 hover:bg-zinc-200 sm:w-auto">
              <Link to="/login">Login</Link>
            </Button>
            {/* Outline button: Transparent with light border */}
            <Button asChild size="lg" variant="outline" className="w-full border-zinc-700 bg-transparent text-zinc-100 hover:bg-zinc-800 hover:text-white sm:w-auto">
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </div>

        {/* Stats Section - Dark Glass Cards */}
        <div className="mt-20 grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
          <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-md">
            <div className="flex flex-col items-center justify-center p-6">
              <p className="text-3xl font-bold tracking-tight text-white">10K+</p>
              <p className="mt-1 text-sm text-zinc-500">Active Users</p>
            </div>
          </Card>
          
          <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-md">
            <div className="flex flex-col items-center justify-center p-6">
              <p className="text-3xl font-bold tracking-tight text-white">50K+</p>
              <p className="mt-1 text-sm text-zinc-500">Daily Posts</p>
            </div>
          </Card>
          
          <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-md">
            <div className="flex flex-col items-center justify-center p-6">
              <p className="text-3xl font-bold tracking-tight text-white">100K+</p>
              <p className="mt-1 text-sm text-zinc-500">Connections</p>
            </div>
          </Card>
        </div>

      </div>
    </main>
  );
}