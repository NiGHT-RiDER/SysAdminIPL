import React, { Component } from 'react'
import { ref } from '../../config/constants'

export default class Pdf extends Component {
    componentDidMount() {
        ref.child("/active").once('value', snapshot => {
            this.setState({ value: snapshot.val() });
        });
    }

    render() {
        return (
            <div>
                Pdf. Aight Sisi t'est arrive ici parce que t'est un boss.
            </div>
        )
    }
}