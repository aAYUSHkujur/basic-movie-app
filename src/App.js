import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import Movies from './Pages/Movies/Movies';
import Search from './Pages/Search/Search';
import Trending from './Pages/Trending/Trending';
import TVSeries from './Pages/TVSeries/TVSeries';
import { Container } from '@mui/system';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Header />
       <Container>
       <Routes>
          <Route path="/trending" element={<Trending />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tvseries" element={<TVSeries />} />
          <Route path="/search" element={<Search />} />
       </Routes>
       </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
