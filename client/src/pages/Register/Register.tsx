import { Link } from 'react-router-dom';
import UserForm from '../../features/users/UserForm';
import { useUsers } from '../../features/users/useUsers';
import { Card } from '../../components/ui/card';

export default function Register() {
  const { addUser } = useUsers();

  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 flex items-center justify-center px-4 py-12">
      {/* Glowing background orbs to match the Login and Home pages */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Swapped the orb colors slightly so Register feels distinct but matches the theme */}
        <div className="absolute left-1/2 top-1/3 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-purple-600/20 blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 h-[300px] w-[400px] rounded-full bg-blue-600/20 blur-[150px]" />
      </div>

      {/* Dark Glassmorphism Card */}
      <Card className="relative z-10 w-full max-w-md border-zinc-800 bg-zinc-900/50 backdrop-blur-md p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white">Create Account</h1>
          <p className="mt-2 text-sm text-zinc-400">Join the community and start sharing.</p>
        </div>

        {/* Your existing form component */}
        <UserForm onSubmit={addUser} />

        <p className="mt-6 text-center text-sm text-zinc-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
}