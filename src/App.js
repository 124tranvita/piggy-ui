import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Catalogue from './pages/Catalogue';
import Income from './pages/Income';
import Spending from './pages/Spending';
import Report from './pages/Report';

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="catalogues" element={<Catalogue />} />
          <Route path="incomes" element={<Income />} />
          <Route path="spendings" element={<Spending />} />
          <Route path="reports" element={<Report />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
