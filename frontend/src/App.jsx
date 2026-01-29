import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import Edit from './pages/Edit.jsx';
import Details from './pages/Details.jsx';
import Header from './components/Header.jsx';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/view/:id' element={<Details />} />
      </Routes>
    </>
  );
}

export default App;