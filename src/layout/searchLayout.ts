export function searchPanel(container: HTMLDivElement) {
    
    const layout: string = `<p class="p-size">Questions other peoples:</p>
    <div class="row">
    <div class="input-field col s9 m-t-b-1rem">
    <i class="material-icons prefix">textsms</i>
    <input type="text" id="search-input" class="autocomplete">
    <label for="search-input">Search panel</label>
    </div>

    <button class="btn waves-effect waves-light col s2 m-t-b-1rem refresh" type="button">
        <i class="material-icons">refresh</i>
    </button>
    </div>`

    container.insertAdjacentHTML('afterbegin', layout)
}