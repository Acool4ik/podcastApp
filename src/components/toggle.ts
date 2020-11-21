export function toggleTheme(state: boolean, body: HTMLBodyElement): boolean {
    body.classList.toggle('day')
    body.classList.toggle('night')

    return !state
}

export function toggleLeftSidebar(auth: boolean, container: HTMLDivElement): void {
    
    if(container.querySelector('.information') !== null) {
        container.querySelector('.information').remove()
    }
    
    const not: string = `<div class="information">
        <h5>Rules:</h5>
        <p class="p-size">
            you are not logged in
        </p>
        <p class="p-size">
            Click on the "plus" in order sigm in/ sign up then consider all questions other peoples's
        </p>
    </div>`;

    const autentificated: string = `<div class="information">
        <h5>Rules:</h5>
        <p class="p-size">
            you are logged in with Google Account
        </p>
        <p class="p-size">
            You can consider all questions other peoples's
        </p>
    </div>`;

    container.insertAdjacentHTML('beforeend' , auth ? autentificated : not)
}




