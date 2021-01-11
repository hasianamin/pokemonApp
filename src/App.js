import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Detail from './pages/Detail';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import Loading from './pages/Loading';
import './App.css'
import { connect } from 'react-redux';
import {RetrieveFunc} from './redux/actions'

function App(props) {

  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    setLoading(false)
    let checkStore = JSON.parse(localStorage.getItem('my_pokemon_list'))
    if(checkStore){
      props.RetrieveFunc(checkStore)
    }
    console.log(JSON.parse(localStorage.getItem('my_pokemon_list')))
  },[])

  if(loading){
    return <Loading/>
  }

  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/detail/:name' component={Detail}/>
        <Route exact path='/inventory' component={Inventory}/>
      </Switch>
    </div>
  );
}

const ReduxProps=(state)=>{
  return {
      Inventory : state.Inventory
  }
}

export default connect(ReduxProps,{RetrieveFunc})(App);
