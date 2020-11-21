import { socialApp } from '../inrerfaces.ts'

export function autentification(type: socialApp, firebase: any): void {
    if(type === socialApp.google) {
        return new firebase.auth.GoogleAuthProvider()
    }

    if(type === socialApp.facebook) {
        return new firebase.auth.FacebookAuthProvider();
    }

    if(type === socialApp.twitter) {
        return new firebase.auth.TwitterAuthProvider();
    }

}