import M from 'materialize-css'
import { ToastsEnum } from '../inrerfaces.ts'

export class T {

    static delete(): void {
        M.toast({html: ToastsEnum.delete});
    }

    static eName(): void {
        M.toast({html: ToastsEnum.errName});
    }

    static eText(): void {
        M.toast({html: ToastsEnum.errText});
    }

    static sLogIn(): void {
        M.toast({html: ToastsEnum.succLogIN});
    }

    static eLogIn(): void {
        M.toast({html: ToastsEnum.errLogIn});
    }

    static sucSendQ(): void {
        M.toast({html: ToastsEnum.sucSendQuestion});
    }

}