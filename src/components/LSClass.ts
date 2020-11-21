import { questionProps, LSenum } from '../inrerfaces.ts'

export class LS {
    static local: string = LSenum.local;
    static all: string = LSenum.all;

    static setLocal(questions: questionProps[]): void {
        window.localStorage.setItem(LS.local, JSON.stringify(questions))
    } 

    static setAll(questions: questionProps[]): void {
        window.localStorage.setItem(LS.all, JSON.stringify(questions))
    }

    static getLocal(): questionProps[] {
        return JSON.parse(window.localStorage.getItem(LS.local)) 
    }

    static getAll(): questionProps[] {
        return JSON.parse(window.localStorage.getItem(LS.all)) 
    }
    
    static delete(): void {
        window.localStorage.removeItem(LSenum.all)
    }
}



