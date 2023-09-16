const initialValue = {
    moves:[]
}

export default class Store{
   
    #state = initialValue;

    constructor(players) {
        this.players = players
    }

    get game(){
        const state = this.#getState();

        const currentPlayer = this.players[state.moves.length % 2] 

        return {
            moves:state.moves,
            currentPlayer,
        }
    }

    playerMove(squareId){
        const state = this.#getState()

        const stateClone = structuredClone(state)

        stateClone.moves.push({
            squareId,
            player: this.game.currentPlayer
        })

        this.#saveState(stateClone)
    }

    #getState() {
        return this.#state
    }

    #saveState(stateOrFn) {
        const preState = this.#getState()

        let newState;

        switch (typeof stateOrFn) {
            case 'function':
                newState = stateOrFn(preState)
               break;
            case 'object':
                newState = stateOrFn
                break;        

            default:
                throw new Error('Invalid argiment passed to saveState')
        }

        this.#state = newState;
    }
}