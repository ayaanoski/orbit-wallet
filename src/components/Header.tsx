import { Orbit } from 'lucide-react';
import logo from '../assets/ether.png';

const Header = () => {
  return (
    <header className="text-center mb-12">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-4 w-full">
          <img
            src={logo}
            alt="Logo"
            className="w-12 h-12 rounded-full"
          />
          <Orbit size={48} className="text-green-400 animate-pulse" />
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 drop-shadow-lg">
            ORBIT
          </h1>
          <div className="ml-auto">
            <a
              href="https://github.com/ayaanoski/orbit-wallet"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              GitHub Repo
            </a>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
