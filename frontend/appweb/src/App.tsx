import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Importa tus componentes (verifica que existan)
import UserForm from './module/user/UserForm';
import ProductTable from './module/product/ProductTable';
import OrderTable from './module/order /OrderTable'; // ✅ sin espacio

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/users">Usuarios</Link></li>
          <li><Link to="/products">Productos</Link></li>
          <li><Link to="/orders">Órdenes</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/users" element={<UserForm />} />
        <Route path="/products" element={<ProductTable />} />
        <Route path="/orders" element={<OrderTable />} />
      </Routes>
    </Router>
  );
};

export default App;
