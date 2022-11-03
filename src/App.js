import './App.css';
import { Routes, Route } from "react-router-dom";
import ProductList from './Components/ProductList';
import Cart from './Components/Cart';

function App() {
  return (
    <Routes>
      <Route path='/' element={<ProductList />} />
      <Route path='/cart' element={<Cart />} />
    </Routes>
  );
}

export default App;
