import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

export default function Layout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <aside>
        <Sidebar />
      </aside>

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-slate-100">
        <Navbar />
        <main>
          <div className="p-4 sm:px-6 lg:px-8 pt-20 w-full max-w-9xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
