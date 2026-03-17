import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Task Dashboard
        </Link>
        <div className="space-x-4">
          <Link 
            to="/" 
            className="text-white hover:text-blue-200 px-3 py-2 rounded transition"
          >
            Home
          </Link>
          <Link 
            to="/tasks" 
            className="text-white hover:text-blue-200 px-3 py-2 rounded transition"
          >
            Tasks
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
