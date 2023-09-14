export default class View{


    constructor(){
        this.$ = {
            menuItems: document.querySelector('[data-id="menu-items"]'),
            menuBtn: document.querySelector('[data-id="menu-btn"]'),
            menu: document.querySelector('[data-id="menu"]'),
            resetBtn: document.querySelector('[data-id="reset-btn"]'),
            newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
            modal: document.querySelector('[data-id="modal"]'),
            modalText: document.querySelector('[data-id="modal-text"]'),
            modalBtn: document.querySelector('[data-id="modal-btn"]'),
            turn: document.querySelector('[data-id="turn"]'),
        }
        //UI-only evet listeners
        this.$.menuBtn.addEventListener('click',e=>{
            this.$.menuItems.classList.toggle('hidden')
        })
    }

    bindGameResetEvent(handler){
        this.$.resetBtn.addEventListener('click',handler)
    }
    bindNewRoundEvent(handler){
        this.$.newRoundBtn.addEventListener('click',handler)
    }
    bindPlayerMoveEvent(handler){
        this.$.squares.forEach(square=>{
            square.addEventListener('click',handler)
        });
    }
}

