import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NewsProvider } from './context/news-context';
import Home from './pages/Home';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <NewsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Toaster />
      </Router>
    </NewsProvider>
  );
}

export default App;