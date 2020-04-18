import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import ProductsPage from './app/ProductsPage';
import ProductFormPage from './app/ProductFormPage';
import './App.css';

const ActiveLink = ({ label, to, activeOnlyWhenExact }) => (
  <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
    <Link className={match ? 'active item' : 'item'} to={to}>{label}</Link>
  )} />
);

class App extends Component {
  render() {
    return (
      <div className="ui container">
        
        <div className="ui three item menu">
          <ActiveLink activeOnlyWhenExact to="/" label="Home" />
          <ActiveLink activeOnlyWhenExact to="/products" label="Products" />
          <ActiveLink activeOnlyWhenExact to="/products/new" label="Add New Product" />
        </div>

        <Route exact path="/products" component={ProductsPage} />
        <Route path="/products/new" component={ProductFormPage} />
        <Route path="/product/:_id" component={ProductFormPage} />
      </div>
    );
  }
}

export default App;
