export interface questionProps {
    readonly name: string,
    readonly id: string,
    readonly text: string
}

export enum socialApp {
    google = 'google',
    facebook = 'facebook',
    twitter = 'twitter'
}

export enum LSenum {
    local = 'localQuestions',
    all = 'questions'
}

export enum ToastsEnum {
    delete = '<span>Question has beeen deleted!</span>',
    errName = '<span>Enter Name no more 4 characters!</span>',
    errText = '<span>Enter please text!</span>',
    succLogIN = '<span style="color: #9bca68;">Success!</span>',
    errLogIn = '<span style="color: #ee6e73;" >Something went wrong!</span>',
    sucSendQuestion = '<span>You are success sended question!</span>'
}

export const inicialisationFirebase: any = {
    apiKey: "AIzaSyBBhSm338ZNk7rZYZekrqvt88EVEKZ7RLU",
    authDomain: "podcastquestions-d85ca.firebaseapp.com",
    databaseURL: "https://podcastquestions-d85ca.firebaseio.com",
    projectId: "podcastquestions-d85ca",
    storageBucket: "podcastquestions-d85ca.appspot.com",
    messagingSenderId: "742556848154",
    appId: "1:742556848154:web:8dd98f4f247b553456c1a3"
}


