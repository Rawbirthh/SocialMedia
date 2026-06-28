import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card } from '../../components/ui/card';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { error?: Record<string, string[]> } } };
      const errors = axiosErr.response?.data?.error;
      if (errors) {
        const first = Object.values(errors)[0];
        setError(first?.[0] ?? 'Login failed');
      } else {
        setError('Login failed');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 flex items-center justify-center px-4 py-12">
      {/* Glowing background orbs to match the Home page */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 h-[300px] w-[400px] rounded-full bg-purple-600/20 blur-[150px]" />
      </div>

      {/* Dark Glassmorphism Card */}
      <Card className="relative z-10 w-full max-w-md border-zinc-800 bg-zinc-900/50 backdrop-blur-md p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-zinc-400">Enter your credentials to access your account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-zinc-300">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-blue-500/20 focus-visible:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-zinc-300">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-blue-500/20 focus-visible:border-blue-500"
            />
          </div>

          {/* Inverted white button to match the rest of the app */}
          <Button 
            type="submit" 
            disabled={submitting} 
            className="w-full bg-white text-zinc-900 hover:bg-zinc-200"
          >
            {submitting ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
}