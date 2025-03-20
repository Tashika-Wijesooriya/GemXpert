import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'; 
import Cart from "./addToCart/components/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cart/*" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
