import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

export default function Layout({ children }) {
  return (
    <div className="flex">
      <aside>
        <Sidebar />
      </aside>

      <main className="w-full ">
        <Navbar />
        <div className="overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
