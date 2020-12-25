// import { Modal } from 'materialize-css';
import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom' 
import './App.css';
import Notes from './components/Notes'
import Modal from './components/Modal'


const names = [
  'Yoda',
  'CaptainKirk',
  'Spock',
  'OptimusPrime',
  'Gandalf',
  'InigoMontoya',
  'Magneto',
  'TonyStark',
  'BilboBaggins',
  'Legolas',
  'InspectorClouseau',
  'ObiWan',
  'SpiderMan',
  'JackSparrow',
  'CaptainAmerica',
  'BlackWidow',
  'Ultron',
  'Hulk',
  'IronMan'
];

class App extends React.Component{
  constructor () {
    super();

    this.state = {
      name: this.getRandomName()
    }
  }
  getRandomName() {
    return names[Math.floor(Math.random() * names.length)];
  } 

 render(){
    console.log(this.state.name)
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route 
          exact path="/:notes_id"
          component={Notes} />
        <Redirect from="/" to= {"/" + this.state.name}/>
        <Route exact path="/modal" component={Modal} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}
}
export default App;
