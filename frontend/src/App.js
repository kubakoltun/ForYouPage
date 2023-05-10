import './App.css';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Registration from './pages/Registration';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { AuthContext } from './helpers/AuthContext.js';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });
  
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/auth/auth', { 
      headers: {
        accessToken: localStorage.getItem('accessToken'),
      },
    })
      .then((response) => {
        if (response.data.error) {
          setAuthState({
            username: "",
            id: 0,
            status: false,
          });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
      localStorage.removeItem("accessToken");
      setAuthState({
        username: "",
        id: 0,
        status: false,
    });
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
        <BrowserRouter>
          <div className='navbar'>
            {!authState.status ? ( 
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/registration">Register</Link>
                </>
              ) : (
                <>
                  <Link to="/">Home</Link>
                  <Link to="/create-post">Create a Post</Link>
                </>
              )
            }
            
            <div className='loggedInContainer'>
              <h1>{authState.username}</h1>
              {authState.status &&
                <button onClick={logout}>Logout</button>}
            </div>
          </div>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/create-post" exact element={<CreatePost />} />
            <Route path="/post/:id" exact element={<Post />} />
            <Route path="/registration" exact element={<Registration />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/profile/:id" exact element={<Profile />} />
            <Route path="*" exact element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
