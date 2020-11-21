export function tabsInitialisation(auth: boolean, tabs: any) {
    const massLi: HTMLLIElement[] = tabs.$el[0].querySelectorAll('li')

    for(let i = 0; i < massLi.length; i++) {
        massLi[i].classList.remove('disabled')
        massLi[i].classList.remove('active')
    }

    if(auth) {
        tabs.select('exit')
        massLi[0].classList.add('disabled')
        massLi[1].classList.add('active')
    } else {
        tabs.select('in')
        massLi[0].classList.add('active')
        massLi[1].classList.add('disabled')
    }
}