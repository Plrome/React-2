import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import HomesPage from './Pages/Homes/HomesPage';
import PostsPage from './Pages/Posts/PostsPage';
import LoginPage from './Pages/Login/LoginPage';
import ViewDetailsPage from './Pages/ViewDetails/ViewDetailsPage';
import ProfilePage from './Pages/Profiles/ProfilePage';
import { Navbar, Container , Button } from 'react-bootstrap';



const App = () => {
  const [buttonLog, setButtonLog] = useState('Login');
  const [isLogin, setIsLogin] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setButtonLog('Login');
    setIsLogin(false);
  }
  return (
    <div>
      
      <BrowserRouter>
        <div>
          <Navbar bg="dark" expand="lg">
            <Container>
              <Navbar.Brand >
                <Link to="/" className='link_Navbar' >Home</Link>
                <Link to="/posts" className='link_Navbar'>Posts</Link>
                <Link to="/profile" className='link_Navbar'>Profiles</Link>
                <Link to="/login" className='link_Navbar'>
                  {buttonLog === 'Logout' ? <Button variant='outline-light'  onClick={handleLogout}>{buttonLog}</Button> : buttonLog}
                </Link>
              </Navbar.Brand>
            </Container>
          </Navbar>

        </div>
        <Routes>
          <Route path="/" element={<HomesPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/:id" element={<ViewDetailsPage />} />
          <Route path="/login" element={<LoginPage setButtonLog={setButtonLog} isLogin={isLogin} setIsLogin={setIsLogin} />} />
          <Route path="/profile" element={<ProfilePage setButtonLog={setButtonLog} isLogin={isLogin} setIsLogin={setIsLogin} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
