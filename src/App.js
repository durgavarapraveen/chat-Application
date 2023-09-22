import { Typography } from '@mui/material';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Login/Login';
import SignUp from './Login/SignUp';
import Chat from './components/Chat';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Login />} path='/' />
          <Route element={<SignUp/>} path='/signup' />
          <Route element={<Chat />} path='/chat' />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
