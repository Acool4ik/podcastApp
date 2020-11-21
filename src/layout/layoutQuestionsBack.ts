import { questionProps } from '../inrerfaces.ts'

export function layoutQBack({id, name, text}: questionProps): string {
    return `<div class="question" id="filter-search" >
            <div class="row">
                <div class="col s6 m3 l3 p-size mr1">Name:</div>
                <div class="col s6 m3 l3 mr1">${name}</div>
                <div class="col s12 m3 l3 p-size mr1">Data:</div>
                <div class="col s12 m3 l3 mr1">${new Date(parseInt(id)).toDateString()}</div>
            </div>
            
            <div>
                <span class="p-size">text:</span>&nbsp;
                ${text}
            </div>
            <div class="divider m2"></div>
    </div>`
}