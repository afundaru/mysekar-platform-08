
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useAuth } from '@/contexts/AuthContext';

const MainNavigation = () => {
  const { user, isAdmin } = useAuth();

  return (
    <nav className="bg-white py-4 px-6 flex justify-between items-center shadow-sm">
      <div className="flex items-center">
        <Link to="/" className="text-xl font-bold text-teal mr-8">MySEKAR</Link>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-gray-600 hover:text-teal hover:underline hover:underline-offset-4">Beranda</Link>
          <Link to="/forum-diskusi" className="text-gray-600 hover:text-teal hover:underline hover:underline-offset-4">Forum</Link>
          <Link to="/pengaduan" className="text-gray-600 hover:text-teal hover:underline hover:underline-offset-4">Pengaduan</Link>
          <Link to="/konsultasi-hukum" className="text-gray-600 hover:text-teal hover:underline hover:underline-offset-4">Konsultasi</Link>
          {user && isAdmin && <Link to="/admin" className="text-gray-600 hover:text-teal hover:underline hover:underline-offset-4">Admin</Link>}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <Link to="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
        ) : (
          <>
            <Link to="/login">
              <Button variant="outline">Masuk</Button>
            </Link>
            <Link to="/register" className="hidden md:block">
              <Button>Daftar</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default MainNavigation;
