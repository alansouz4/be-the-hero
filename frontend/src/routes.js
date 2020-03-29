import React from 'react';
// BrowserRouter que precisa ficar em volta de tudo para que o roteamento funcione
// Router cada uma das rotas
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// paginas
import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        {/* path - qual o caminho  
            exact - diz que o caminho é exato, para não te
            conflito com os outros caminhos */}
        <Route path="/" exact component={Logon} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
        <Route path="/incident/new" component={NewIncident} />
      </Switch>
    </BrowserRouter>
  );
}