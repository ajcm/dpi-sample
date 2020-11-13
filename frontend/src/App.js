import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import React, { useState } from 'react';
import { CommonLoading } from 'react-loading';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppContext } from '../src/context/AppContext';

import theme from './theme';
import Template from './components/Template'

import Home from './pages/Home';
import Samples from './pages/Samples';
import About from './pages/About'
import DPI from './pages/dpi'



const App = (props) => {

  const [session, setSession] = useState();
  const [user, setUser] = useState();
  const [menuOpen, setMenuOpen] = useState(true);


  if (props.isLoading) {
    return <CommonLoading />;
} else {
  return (
    <AppContext.Provider value={{session,setSession,user,setUser,menuOpen,setMenuOpen}}>
    <ThemeProvider theme={theme}>
    <CssBaseline />        
    <BrowserRouter>            
      <Routes />         
    </BrowserRouter>
    </ThemeProvider>
     </AppContext.Provider>
  );
}
}


const Routes = () => {
  return (
  <Switch>

     <Route path="/" exact >
        <Template><Home/></Template>
      </Route>

      <Route path="/samples" exact >
        <Template><Samples/></Template>
      </Route>

      <Route path="/dpi" exact >
        <Template><DPI/></Template>
      </Route>

      <Route path="/about" exact >
        <Template><About/></Template>
      </Route>
      
     
     

    </Switch>
  )}
  





export default App