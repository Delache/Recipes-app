import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter, BrowserRouter} from "react-router-dom"
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import SetData, { familydb } from './databases'
import theme from './theme'
import { replication } from './replication'
import * as Routes from './routes'
import './index.css'
import Layout from './components/layout';

const Main = withRouter(()=> {
  return(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout/>
        <Switch>   
                   
          <PrivateRoute path="/home"                  component={Routes.Home} />

          <PrivateRoute path="/recipeForm"            component={Routes.RecipeForm}/>
          <PrivateRoute path="/recipe/:id"            component={Routes.RecipeDetails}/>
          <PrivateRoute path="/recipesResult"         component={Routes.RecipesResult}/>

          <PrivateRoute path="/categoryForm"          component={Routes.CategoryForm}/>
          <PrivateRoute path="/category/:id"          component={Routes.CategoryDetails}/>

          <PrivateRoute path="/profileForm"           component={Routes.ProfileForm}/>

          <PrivateRoute path="/relationshipForm"      component={Routes.RelationshipForm}/>
          <PrivateRoute path="/relationshipList"      component={Routes.RelationshipList}/>

          <Route path="/login"                        component={Routes.Login} />
          <Route path="/signin"                       component={Routes.Signin} />
          <Route path="/forget"                       component={Routes.Forget} />

          <Route path="/"> <Redirect to='/login' />  </Route>

        </Switch>
      </Router >
    </ThemeProvider>
  )
})

const PrivateRoute = ({ component: Component, ...rest }: any) => {

  if (familydb === undefined){
    if (localStorage.getItem('db') !== null && localStorage.getItem('db') !== ''){
      SetData(localStorage.getItem('db'))
      replication()
      return <Route {...rest} render={(props) => <Component {...props} />} />
     } else {
        return <Route {...rest} render={() => <Redirect to='/login' />} />
     }
  } else {
     return <Route {...rest} render={(props) => <Component {...props} />} />
  }
}

const App = () => (
  <BrowserRouter>
     <Main/>
  </BrowserRouter>
)


export default App
