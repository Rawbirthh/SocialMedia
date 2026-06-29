import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import AppRoutes from './routes/AppRoutes';

function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard') ||
                      location.pathname.startsWith('/users') ||
                      location.pathname.startsWith('/roles') ||
                      location.pathname.startsWith('/permissions');

  return (
    <>
      {!isDashboard && <Navbar />}
      <AppRoutes />
    </>
  );
}

export default App;
