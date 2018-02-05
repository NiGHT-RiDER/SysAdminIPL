import { ref } from '../config/constants'
import firebase from 'firebase'

export function saveProblem(description , id) {
    let user = firebase.auth().currentUser;

    return ref.child(`problems/${Date.now()}/info`)
        .set({
            email: user.email,
            uid: user.uid,
            description: description,
            machine: id
        })
        .then()
}
