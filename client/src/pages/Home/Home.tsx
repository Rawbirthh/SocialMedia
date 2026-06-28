import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex flex-col items-center justify-center text-white px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold mb-6">SocialMedia</h1>
        <p className="text-xl text-blue-100 mb-10">
          Connect with friends, share your moments, and discover what's happening around the world.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            to="/login"
            className="px-8 py-3 rounded-lg bg-white text-blue-600 font-semibold hover:bg-blue-50 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-8 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition"
          >
            Register
          </Link>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-3 gap-6 max-w-lg text-center text-sm text-blue-200">
        <div>
          <p className="text-3xl font-bold text-white">10K+</p>
          <p>Users</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-white">50K+</p>
          <p>Posts</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-white">100K+</p>
          <p>Connections</p>
        </div>
      </div>
    </div>
  );
}
