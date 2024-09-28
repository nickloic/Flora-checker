import './App.css';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Body from './components/body';
function App() {
  return (
    <div className='font-monospace text-lg p-3 bg-soft-white h-screen'>
      <Navbar/>
      <Body/>
      <Footer/>
    </div>
  );
}

export default App;
