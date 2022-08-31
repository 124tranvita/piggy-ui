import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

export default function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
