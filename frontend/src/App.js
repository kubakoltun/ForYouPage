import './App.css';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to="/create-post">Create a Post</Link>
        <Link to="/">Home</Link>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/create-post" exact element={<CreatePost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
