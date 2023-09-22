import { Typography } from '@mui/material';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Login/Login';
import SignUp from './Login/SignUp';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Login />} path='/' />
          <Route element={<SignUp/>} path='signup' />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
