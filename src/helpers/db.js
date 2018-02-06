import { ref } from '../config/constants'
import firebase from 'firebase'

export function saveProblem(description, id) {
    let user = firebase.auth().currentUser;
    return ref.child(`problems/${Date.now()}/info`)
        .set({
            email: user.email,
            uid: user.uid,
            description: description,
            machine: id
        }).then()
}

export function saveFile(pcList) {
    ref.child(`active/${pcList[2]}`).set({
        status: "active"
    });
    ref.child(`pc/${pcList[2]}`).set({
        ip: pcList[0],
        name: pcList[1],
        comment: pcList[3],
    });
    return true;
    /*return ref.child(`pc`)
        .update({
            active: false
        }).then(
        pcList.map(elt => {
            ref.child(`pc/${elt[2]}`)
                .update({
                    ip: elt[0],
                    name: elt[1],
                    comment: elt[3],
                    status: active
                }).then()
        })
        ).then();
        */
}
