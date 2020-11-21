import M from 'materialize-css' // essentials imports
import firebase from 'firebase/app'
import './style.css'
import 'firebase/auth'
import 'firebase/database'

import { toggleTheme, toggleLeftSidebar } from './components/toggle.ts' // handlers frontend
import { tabsInitialisation } from './components/tabs.ts'
import { modalControled } from './components/ModalHandler.ts'
import { LS } from './components/LSClass.ts'
import { T } from './components/Toasts.ts'

import { postData } from './backend/sendQuestion.ts' // backend handlers 
import { autentification } from './backend/auth.ts'

import { questionBack } from './layout/questionsBack.ts' // function layout creating
import { searchPanel } from './layout/searchLayout.ts'
import { layoutQBack } from './layout/layoutQuestionsBack.ts'
import { questionLocal } from './layout/question.ts'

import { questionProps, socialApp, inicialisationFirebase } from './inrerfaces.ts' // all interfaces

const body: HTMLBodyElement = document.querySelector('body') // general HTML elements
const leftSidebar: HTMLDivElement = body.querySelector('.left-sidebar')
const mainContent: HTMLDivElement = body.querySelector('.main-content')

const questionContainer: HTMLDivElement = mainContent.querySelector('.container-questions') // inner HTML from general elements
const formText: HTMLFormElement = mainContent.querySelector('.input-field')
const preloader: HTMLDivElement = body.querySelector('.preloader-wrapper')
const containerAllQuestions: HTMLDivElement = body.querySelector('#all-questions')

const massSVGElements: SVGElement[] = body.querySelectorAll('.modal #container-log-in svg')
const logOutBtn: HTMLButtonElement = body.querySelector('.modal #logout')

const themeBtn: HTMLElement = document.getElementById('toggle-theme') // controled btns
const modalBtn: HTMLElement = document.getElementById('toggle-modal')

let theme: boolean = true // state
let auth: boolean = false;

firebase.initializeApp(inicialisationFirebase)

themeBtn.onclick = () => theme = toggleTheme(theme, body)  // listener for changes state theme

let tabsControledPanel; // controled components materialize for DOM
let modalControledPanel;
let inputTextControledPanel;
let inputNameControledPanel;

let searchInput;
let refreshBtn;

// initialization materialize components
document.addEventListener('DOMContentLoaded', () => {
    inputTextControledPanel = body.querySelectorAll('.autocomplete')[0]
    inputNameControledPanel = M.Autocomplete.init(body.querySelectorAll('.validate'))[0].$el[0]
    tabsControledPanel = M.Tabs.init(body.querySelectorAll('.tabs'))[0] 
    modalControledPanel = M.Modal.init(body.querySelectorAll('.modal'))[0]

    // M.Autocomplete.init(body.querySelectorAll('.autocomplete'))[0].$el[0]

    tabsInitialisation(auth, tabsControledPanel)
})

// initialization tooltipped materialize
window.onload = () => {
    M.Tooltip.init(document.querySelectorAll('.tooltipped'))
}

// load from LS questions and generate div-rules
document.addEventListener('DOMContentLoaded', () => { 
    const massQuestions: questionProps[] = LS.getLocal()
    
    if(massQuestions === null || massQuestions.length === 0) {
        const p = document.createElement('p')
        p.textContent = "you didn't ask any questions"
        p.className = 'p-size'
        questionContainer.prepend(p)
    } else {
        massQuestions.map(quest => questionLocal(quest, questionContainer))
    }

    toggleLeftSidebar(auth, leftSidebar) // div rules
})

// toggle modal functional
modalBtn.onclick = () => modalControled(modalControledPanel, theme)

// deleted question items
questionContainer.addEventListener('click', function(e: Event) {
    this.querySelectorAll('.question').forEach((elem: HTMLDivElement, i: number) => {
        if(e.target === elem.lastElementChild.firstElementChild) {
            LS.setLocal(LS.getLocal().filter((_: any, index: number) => index !== i))
            elem.remove()
            T.delete()

            if(LS.getLocal().length === 0) {
                const p = document.createElement('p')
                p.textContent = "you didn't ask any questions"
                p.className = 'p-size'
                questionContainer.prepend(p)
            }
        }
    })
})

// submiting question to LS and database
formText.addEventListener('submit', async function(e) {
    e.preventDefault()
    setPrelodader(true)

    inputTextControledPanel.setAttribute('disabled', "disabled")
    if(!(inputNameControledPanel.hasAttribute('disabled') && auth)) {
        inputNameControledPanel.setAttribute('disabled', "disabled")
    }

    if(inputTextControledPanel.value.trim() === '') {
        T.eText()
        inputTextControledPanel.value = ''
        inputTextControledPanel.focus()
    } else {
        if(inputNameControledPanel.value.trim().length < 4 ) {
            T.eName()
            inputNameControledPanel.focus()
        } else {

            const question: questionProps = {
                name: inputNameControledPanel.value,
                text: inputTextControledPanel.value,
                id: Date.now().toString()
            }

            if(LS.getLocal() === null) {
                questionContainer.innerHTML = ''
                LS.setLocal([question])
            } else {
                LS.setLocal([...LS.getLocal(), question])
            }

            if(auth && firebase.auth().currentUser.displayName === '') {
                firebase.auth().currentUser.updateProfile({displayName: inputNameControledPanel.value})
            }

            await postData('https://podcastquestions-d85ca.firebaseio.com/questions.json', question)

            questionLocal(question, questionContainer)
            T.sucSendQ()
            inputTextControledPanel.value = '';
        }
    }

    inputTextControledPanel.removeAttribute('disabled')
    if(!(inputNameControledPanel.hasAttribute('disabled') && auth)) {
        inputNameControledPanel.removeAttribute('disabled')
    }

    setPrelodader(false)
})

// initialization login btns ant their functional
window.addEventListener('DOMContentLoaded', function() {
    massSVGElements.forEach((svg: SVGElement) => {
        svg.onclick = async function(e: any) {
            setPrelodader(true)

            try {
                if(e.currentTarget === this) {
                    const type: socialApp = this.dataset.id
                    
                    const result: any = await firebase.auth().signInWithPopup(autentification(type, firebase))
                        
                    containerAllQuestions.innerHTML= ''
        
                    await firebase.database().ref('/questions').once('value').then(function(snapshot) {
                        snapshot.forEach(el => questionBack(snapshot.val()[el.key], containerAllQuestions))
                    });
        
                    modalControledPanel.close() 
        
                    if(result.user.displayName !== '') {
                        inputNameControledPanel.value = result.user.displayName;
                        inputNameControledPanel.setAttribute('disabled', 'disabled')
                    }
        
                    auth = true
                    toggleLeftSidebar(auth, leftSidebar)
                    tabsInitialisation(auth, tabsControledPanel)
                    T.sLogIn()
                }
            } catch(err) {
                T.eLogIn()
            }
    
            setPrelodader(false)
        }
    })
})

// automatic login wigth google account
window.addEventListener('DOMContentLoaded', () => {
    firebase.auth().onAuthStateChanged(async user => {
        setPrelodader(true)

        if (user) {
            // rerender some elements
            auth = true  
            toggleLeftSidebar(auth, leftSidebar)
            tabsInitialisation(auth, tabsControledPanel)

            const snapshot = await firebase.database().ref('/questions').once('value')

            if(firebase.auth().currentUser.displayName !== '') {
                inputNameControledPanel.value = firebase.auth().currentUser.displayName;
                inputNameControledPanel.setAttribute('disabled', 'disabled')
            }
    
            containerAllQuestions.innerHTML= ''
                
            // adding data about questions to LS
            const massOfQuestions: object[] = [] 
            snapshot.forEach(el => {
                questionBack(snapshot.val()[el.key], containerAllQuestions)
                massOfQuestions.push(snapshot.val()[el.key])
            }) 
            LS.setAll(massOfQuestions)

            // adding new layout and functional for her
            searchPanel(containerAllQuestions)
            searchInput = document.getElementById('search-input')
            refreshBtn = document.querySelector('.btn.refresh')
            addListenerSearchInput()
            addListenerRefreshBtn()
        }

        setPrelodader(false)
    })
})

// logout functional
logOutBtn.onclick = async () => {
    setPrelodader(true)

    await firebase.auth().signOut()
    containerAllQuestions.innerHTML = ''
    LS.delete()

    auth = false  
    toggleLeftSidebar(auth, leftSidebar)
    tabsInitialisation(auth, tabsControledPanel)
    inputNameControledPanel.removeAttribute('disabled')
    inputNameControledPanel.value = ''
    searchInput = 'clear'
    refreshBtn = 'clear'

    setPrelodader(false)
}

// additional handlers
function addListenerSearchInput() {
    searchInput.oninput = function(e: InputEvent) {
        let layout: string = ''

        LS.getAll()
            .filter((elem: questionProps) => elem.text.includes(e.target.value))
            .map((elem: questionProps) => layout = `${layoutQBack(elem)} ${layout}`)

        document.querySelectorAll('#filter-search').forEach(elem => elem.remove())
        containerAllQuestions.insertAdjacentHTML('beforeend', layout)
    }
}

// refreshing allquestions without other bit of page
function addListenerRefreshBtn() {
    refreshBtn.onclick = async () => {
        setPrelodader(true)
        const snapshot = await firebase.database().ref('/questions').once('value')
    
        containerAllQuestions.innerHTML= ''
                    
        // adding data about questions to LS
        const massOfQuestions: object[] = [] 
        snapshot.forEach(el => {
            questionBack(snapshot.val()[el.key], containerAllQuestions)
            massOfQuestions.push(snapshot.val()[el.key])
        }) 
        LS.setAll(massOfQuestions)
        setPrelodader(false)

        // adding new layout and functional for her
        searchPanel(containerAllQuestions)
        searchInput = document.getElementById('search-input')
        refreshBtn = document.querySelector('.btn.refresh')
        addListenerSearchInput()
        addListenerRefreshBtn()
    }
}
    
function setPrelodader(load: boolean): void {
    if(load) {
        preloader.classList.remove('hidden-spinner')
        preloader.classList.add('active-spinner')
    } else {
        preloader.classList.remove('active-spinner')
        preloader.classList.add('hidden-spinner')
    }
}

















