import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Header from "./components/Header";
import Recipe from "./components/Recipe";
import RecipeDetail from "./components/RecipeDetail";
import RecipeFind from "./components/RecipeFind";
import RecipeNews from "./components/RecipeNews";
import Chef from "./components/Chef";
import ChefDetail from "./components/ChefDetail";

/*
  index.js
  ReactDom.render(<App/>, document.getElementById('root'))
  <App/> => html 을 읽어서 => <div id="root"></div>
*/
function App() {
  return (
    <Router>
        <Header/>
        <div className={"container-fluid"}>
          <div className={"jumbotron"}>
            <Switch>
              <Route exact path={"/"} component={Recipe}/>
              <Route path={"/recipe_detail/:no"} component={RecipeDetail}/>
              <Route path={"/chef"} component={Chef}/>
              <Route path={"/chef_detail"} component={ChefDetail}/>
              <Route path={"/news"} component={RecipeNews}/>
              <Route path={"/find"} component={RecipeFind}/>
            </Switch>
          </div>
        </div>

    </Router>
  );
}

export default App;
