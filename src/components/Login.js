import React, { Component } from 'react'
import { login, resetPassword } from '../helpers/auth'

function setErrorMsg(error) {
  return {
    loginMessage: error
  }
}

export default class Login extends Component {
  state = { 
    loginMessage: null 
  }

  handleSubmit = (e) => {
    e.preventDefault()
    login(this.email.value, this.pw.value)
      .catch( (error) => { this.setState( setErrorMsg('Email ou mot de passe invalide.') ) } ) 
  }

  resetPassword = () => {
    resetPassword(this.email.value)
      .then(() => this.setState(setErrorMsg(`Email de reinitialisation de mot de passe envoyé à ${this.email.value}.`)))
      .catch((error) => this.setState(setErrorMsg(`Adresse mail non trouvé.`)))
  }

  render () {
    return (
      <div className="col-sm-6 col-sm-offset-3">
        
        <h1> Login </h1>

        <form onSubmit={this.handleSubmit}>
          
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" ref={(email) => this.email = email} placeholder="Email"/>
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <input type="password" className="form-control" placeholder="Mot de passe" ref={(pw) => this.pw = pw} />
          </div>
          {
            this.state.loginMessage &&
            <div className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span className="sr-only">Erreur:</span>
              &nbsp;{this.state.loginMessage} <a href="#" onClick={this.resetPassword} className="alert-link">Mot de passe oublié?</a>
            </div>
          }

          <button type="submit" className="btn btn-primary">Login</button>
        
        </form>
      </div>
    )
  }
}
