import { Link } from 'react-router-dom';
import UserForm from '../../features/users/UserForm';
import { useUsers } from '../../features/users/useUsers';

export default function Register() {
  const { addUser } = useUsers();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Account</h1>

        <UserForm onSubmit={addUser} />

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
