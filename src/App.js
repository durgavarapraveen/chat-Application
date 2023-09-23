import { Typography } from '@mui/material';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Login/Login';
import Allchats from './Allchats/Allchats';

function App() {
  return (
    <div className="App" style={{backgroundColor:'#eae6df'}}>
      <Router>
        <Routes>
          <Route element={<Allchats />} path='/chats' />
          <Route element={<Login />} path='/' />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
