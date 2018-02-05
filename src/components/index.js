import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import Login from './Login'
import Register from './Register'

import Problem from './protected/Problem'
import Upload from './protected/Upload'
import Dashboard from './protected/Dashboard'
import { logout } from '../helpers/auth'
import { firebaseAuth } from '../config/constants'

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
    />
  )
}

export default class App extends Component {
  state = {
    authed: false,
    loading: true,
    isAdmin: false
  }
  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
          isAdmin : user.email.match('/.*@student.vinci.be$/')
        })
      } else {
        this.setState({
          authed: false,
          loading: false,
          isAdmin : false
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }
  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <BrowserRouter>
        <div>
          <nav className="navbar navbar-default navbar-static-top">
            <div className="container">
              <div className="navbar-header">
                <Link to="/" className="navbar-brand">Aubergine 2.0</Link>
              </div>
              <ul className="nav navbar-nav pull-right">
                <li>
                  <Link to="/" className="navbar-brand">Home</Link>
                </li>

                <li>
                  {this.state.authed
                    ? <button
                        style={{border: 'none', background: 'transparent'}}
                        onClick={() => {
                          logout()
                        }}
                        className="navbar-brand">Se deconnecter</button>
                    : <span>
                        <Link to="/login" className="navbar-brand">Se connecter</Link>
                        <Link to="/register" className="navbar-brand">Creer compte</Link>
                      </span>}
                </li>
                <li>
                  {this.state.isAdmin
                    ? <Link to="/upload" className="navbar-brand">Se connecter</Link>
                    : <span>
                       
                      </span>}
                </li>
              </ul>
            </div>
          </nav>
          <div className="container">
            <div className="row">
              <Switch>
                {/*<Route path='/' exact component={Home} />*/}
                <PublicRoute authed={this.state.authed} path='/login' component={Login} />
                <PublicRoute authed={this.state.authed} path='/register' component={Register} />
                <PrivateRoute authed={this.state.authed} path='/dashboard' component={Dashboard} />
                <PrivateRoute authed={this.state.isAdmin} path='/upload' component={Upload} />
                <PrivateRoute authed={this.state.authed} path="/problem/:id" component={Problem} />
                <Route render={() => <h3>Page non valide. </h3>} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
