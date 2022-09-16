import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

export default function Layout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <aside>
        <Sidebar />
      </aside>

      <header>
        <Navbar />
      </header>

      <main className="flex flex-col flex-1 overflow-auto bg-white dark:bg-slate-800">
        <div className="p-4 sm:px-6 lg:px-8 pt-16 transition delay-150 duration-300 ease-in-out">
          {children}
        </div>
      </main>
    </div>
  );
}
