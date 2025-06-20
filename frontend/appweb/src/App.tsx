import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import UserFrom from './module/user/UserForm';
import ProductData from './module/product/ProductData';
import OrderData from './module/order/OrderData'; 

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/users">Usuarios</Link></li>
          <li><Link to="/products">Productos</Link></li>
          <li><Link to="/orders">Ordenes</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/users" element={<UserFrom />} />
        <Route path="/products" element={<ProductData />} />
        <Route path="/orders" element={<OrderData />} />
      </Routes>
    </Router>
  );
}

export default App;
