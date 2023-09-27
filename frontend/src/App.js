import { Typography } from '@mui/material';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Login/Login';
import SignUp from './Login/SignUp';
import Chat from './components/Chat';
import Allchats from './Allchats/Allchats';
import Home from './components/Home';

function App() {
  return (
    <div className="App" style={{backgroundColor:'#eae6df'}}>
      <Router>
        <Routes>
          <Route element={<Allchats />} path='/chats' />
          <Route element={<Login />} path='/' />
          <Route element={<SignUp/>} path='/signup' />
          <Route element={<Chat />} path='/chat' />
          <Route element={<Home />} path='/home' />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
