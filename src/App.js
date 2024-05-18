import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { Card } from '@mui/material';

function App() {
  return (
    <div className="App" style={{display:"flex", alignItems:"center" , justifyContent:"center" ,marginTop:"60px"}}>

      <Card sx={{width:"50%" , height:"auto"}}>
      <Home/>
      </Card>

    </div>
  );
}

export default App;
