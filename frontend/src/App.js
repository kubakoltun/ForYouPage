import './App.css';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='navbar'>
          <Link to="/">Home</Link>
          <Link to="/create-post">Create a Post</Link>
        </div>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/create-post" exact element={<CreatePost />} />
          <Route path="/post/:id" exact element={<Post />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
