import React, { Component } from 'react'
import { saveProblem } from '../../helpers/db'

/*
function setSubmitted(submitted){
    return {
        submitted : submitted
    }
}
*/
export default class Problem extends Component {
    /*
    state = {
        submitted: false
    }

    componentWillMount(){
        this.setState(setSubmitted(false));
    }
    */
    handleSubmit = (e) => {
        e.preventDefault()
        saveProblem(this.description.value, this.props.match.params.id)
            .catch((error) => { console.log("wut") })
        //this.setState(setSubmitted(true))
    }

    render() {
        return (
            <div className="col-sm-6 col-sm-offset-3">
                <h1> Formulaire Machine {this.props.match.params.id} </h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control" rows="5" ref={(description) => this.description = description} placeholder="Description du problème rencontré sur la machine..." />
                    </div>
                    <button type="submit" className="btn btn-primary">Envoyer</button>
                </form>
            </div>
        )
    }
}