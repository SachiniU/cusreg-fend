import logo from './logo.svg';
import './App.css';
import {Home} from './Home';
import {Customer} from './Customer';
import {BrowserRouter, Route, Routes, NavLink} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-dark" to="/home">Home</NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-dark" to="/customer">Customer</NavLink>
          </li>
        </ul>  
      </nav>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/customer" element={<Customer />}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
