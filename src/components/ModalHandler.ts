export function modalControled(controlPanel: any, theme: boolean): void {
    if(controlPanel.isOpen) { 
        controlPanel.close() 
    } else { 
        controlPanel.open() 
    }

    const modal: HTMLDivElement = controlPanel.$el[0]

    if(theme) {
        if(!modal.classList.contains('night')) {
            modal.classList.add('night')
        }

        modal.classList.remove('day')
    } else {
        if(!modal.classList.contains('day')) {
            modal.classList.add('day')
        }

        modal.classList.remove('night')
    }
}