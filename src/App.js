import { Typography } from '@mui/material';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Login/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Login />} path='/' />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
