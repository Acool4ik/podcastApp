import {questionProps} from '../inrerfaces.ts'

type dateType = string | number

export function questionLocal({id, name, text} : questionProps, container: HTMLDivElement): void {

    const layout: string = `
    <div class="question p-t-1rem">
            <div class="row">
                <div class="col s6 m3 l3 p-size mr1">Name:</div>
                <div class="col s6 m3 l3 mr1">${name}</div>
                <div class="col s12 m3 l3 p-size mr1">Data:</div>
                <div class="col s12 m3 l3 mr1">${new Date().toDateString()}</div>
            </div>
            
            <div>
                <span class="p-size">text:</span>&nbsp;
                ${text}
            </div>
            <div class="divider m2"></div>

            <div class="question-delete" 
                data-id=${id} 
            >
                <i class="material-icons">close</i>
            </div>
    </div>
    `
    container.insertAdjacentHTML('afterBegin', layout)
}

