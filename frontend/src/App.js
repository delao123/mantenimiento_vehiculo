import {Route, BrowserRouter} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Vehiculo from './pages/Vehiculos';
import Refaccion from './pages/Refacciones'
import Trabajador from './pages/Trabajadores'

function App() {
  return (
    <BrowserRouter>
    <div className="grid-container">
      <main className="main">
        <div className="content">
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/vehiculos" component={Vehiculo} />
          <Route path="/refacciones" component={Refaccion} />
          <Route path="/trabajadores" component={Trabajador} />
        </div>
      </main>
    </div>
    </BrowserRouter>
  );
}

export default App;
