export default class View{
   
    $ = {}
    $$ = {}
    
    constructor(){
        this.$ = {
            menuItems: this.#qs('[data-id="menu-items"]'),
            menuBtn: this.#qs('[data-id="menu-btn"]'),
            menu: this.#qs('[data-id="menu"]'),
            resetBtn: this.#qs('[data-id="reset-btn"]'),
            newRoundBtn: this.#qs('[data-id="new-round-btn"]'),
            modal: this.#qs('[data-id="modal"]'),
            modalText: this.#qs('[data-id="modal-text"]'),
            modalBtn: this.#qs('[data-id="modal-btn"]'),
            turn: this.#qs('[data-id="turn"]'),
        }
        this.$$ = {
            squares: this.#qsAll('[data-id="square"]'),
        }
        //UI-only evet listeners
        this.$.menuBtn.addEventListener('click',e=>{
            this.#toggleMenu();
        })
    }
    
    //Register all the event listeners


    bindGameResetEvent(handler){
        this.$.resetBtn.addEventListener('click',handler)
    }
    bindNewRoundEvent(handler){
        this.$.newRoundBtn.addEventListener('click',handler)
    }
    bindPlayerMoveEvent(handler){
        this.$$.squares.forEach(square=>{
            square.addEventListener('click',handler)
        });
    }

    // DOM helper methods
    // # for private use only in view we can use that method
    #toggleMenu(){
        this.$.menuItems.classList.toggle('hidden')
        this.$.menuBtn.classList.toggle('border')
        
        const icon = this.$.menuBtn.querySelector('i')

        icon.classList.toggle('fa-chevron-down')
        icon.classList.toggle('fa-chevron-up')
    }
    
    handlePlayerMove(squareEl,player){
        const icon = document.createElement('i')
        icon.classList.add('fa-solid',player===1 ? 'fa-x':'fa-o',player===1 ? 'yellow':'turquoise')
        squareEl.replaceChildren(icon)
    }

    // player 1 | 2
    setTurnIndicator(player){
        const icon = document.createElement('i')
        const label = document.createElement('p')

        this.$.turn.classList.add(player===1 ? 'yellow':'turquoise')
        this.$.turn.classList.remove(player===1 ? 'turquoise':'yellow')

        icon.classList.add('fa-solid',player===1 ? 'fa-x':'fa-o')
        label.innerText=(player===1 ? 'Player 1, youre up!  ':'Player 2 youre up')
       
        this.$.turn.replaceChildren(icon,label)
    }

    #qs(selector,parent){
        const el = parent 
                 ? parent.querySelector(selector)
                 : document.querySelector(selector)

        if(!el) throw new Error('Could not find element')

        return el
    }
    #qsAll(selector){
        const elList = document.querySelectorAll(selector)

        if(!elList) throw new Error('Could not find element')

        return elList
    }
}

