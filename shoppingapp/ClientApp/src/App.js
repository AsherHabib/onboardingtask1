

import React from 'react';

import './App.css';

import { Home } from './components/Home';
import { Customer } from './components/Customer';
import { Store } from './components/Store';
import { Product } from './components/Product';
import { Sales } from './components/Sales';
import { Navigation } from './components/Navigation';




import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
        <Navigation/>

              <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/customer" component={Customer} />
          <Route path="/store" component = {Store}/>
          <Route path="/sales" component={Sales}/>
          <Route path='/product' component={Product}/>
        </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
