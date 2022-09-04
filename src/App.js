import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Layout from './layout';
import { publicPages, privatePages } from './pages';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <Routes>
        {publicPages.map((page, index) => (
          <Route
            key={index}
            path={page.path}
            element={!user ? <>{page.page}</> : <Navigate to="/" />}
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
    </div>
  );
}

export default App;
