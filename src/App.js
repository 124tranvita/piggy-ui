import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Layout from './layout';
import { publicPages, privatePages } from './pages';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <HashRouter>
        <Routes>
          {publicPages.map((page, index) => (
            <Route
              key={index}
              path={page.path}
              element={!user ? <>{page.page}</> : <Navigate to="/dashboard" />}
            />
          ))}

          {privatePages.map((page, index) => (
            <Route
              key={index}
              path={page.path}
              element={
                user ? <Layout>{page.page}</Layout> : <Navigate to="/login" />
              }
            />
          ))}
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
