import { useState } from 'react';
import type { User } from './users.api';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';


interface UserFormProps {
  onSubmit: (data: { name: string; email: string; password: string }) => Promise<User>;
}

export default function UserForm({ onSubmit }: UserFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});
    try {
      await onSubmit({ name, email, password });
      setName('');
      setEmail('');
      setPassword('');
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { error?: Record<string, string[]> } } };
      if (axiosErr.response?.data?.error) {
        setErrors(axiosErr.response.data.error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 mb-6">
      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-zinc-300">
          Name
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          // Removed required
          className="bg-transparent border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-blue-500/20 focus-visible:border-blue-500"
        />
        {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name[0]}</p>}
      </div>

      {/* Email Field */}
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
          // Removed required
          className="bg-transparent border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-blue-500/20 focus-visible:border-blue-500"
        />
        {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email[0]}</p>}
      </div>

      {/* Password Field */}
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
          // Removed required
          className="bg-transparent border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-blue-500/20 focus-visible:border-blue-500"
        />
        {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password[0]}</p>}
      </div>

      {/* Submit Button */}
      <Button 
        type="submit" 
        disabled={submitting} 
        className="w-full bg-white text-zinc-900 hover:bg-zinc-200"
      >
        {submitting ? 'Creating...' : 'Create Account'}
      </Button>
    </form>
  );
}