/* const menu = document.querySelector('.menu');
const menuItem = menu.querySelector('.items')

menu.addEventListener('click',e=>{
    menuItem.classList.toggle('hidden')
})
 */
// global scope problem

const App = {
    $: {
        menu: document.querySelector('[data-id="menu"]'),
        menuItems: document.querySelector('[data-id="menu-items"]'),
        resetBtn: document.querySelector('[data-id="reset-btn"]'),
        newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
        squares: document.querySelectorAll('[data-id="square"]'),
        modal: document.querySelector('[data-id="modal"]'),
        modalText: document.querySelector('[data-id="modal-text"]'),
        modalBtn: document.querySelector('[data-id="modal-btn"]'),
        turn: document.querySelector('[data-id="turn"]'),

    },

    state: {
        moves: []
    },

    getGAmeStatus(moves) {

        const p1Moves = moves.filter(move=>move.playerId === 1).map(move=>+move.squareId)
        const p2Moves = moves.filter(move=>move.playerId === 2).map(move=>+move.squareId)

        const winningPatterns = [
            [1,2,3],
            [1,5,9],
            [1,4,7],
            [2,5,8]
            [3,5,7],
            [3,6,9],
            [4,5,6],
            [7,8,9]
        ];

        let winner = null
        winningPatterns.forEach(pattern => {
            const p1Wins = pattern?.every(v=>p1Moves.includes(v))
            const p2Wins = pattern?.every(v=>p2Moves.includes(v))

            if(p1Wins) winner = 1;
            if(p2Wins) winner = 2; 

        })

        return {
            status: moves.length === 9 || winner !== null ? 'complete':'in-progress', // in-progress | complete
            winner
        }
    },

    init() {
        App.registerEventListeners();

    },

    registerEventListeners(){
        // Done
        App.$.menu.addEventListener('click',e=>{
            App.$.menuItems.classList.toggle('hidden')
        });

        // TODO
        App.$.resetBtn.addEventListener('click', e=>{
            console.log("reset the game");
        });
        // TODO
        App.$.newRoundBtn.addEventListener('click', e=>{
            console.log("new round");
        });

        App.$.modalBtn.addEventListener('click',e=>{
            App.state.moves = [];
            App.$.squares.forEach(square=>square.replaceChildren())
            App.$.modal.classList.add('hidden')
        })

        // TODO
        App.$.squares.forEach(square=>{
            square.addEventListener('click', e=>{
                console.log("id",e.target.id);
                console.log("Current player",App.state.currentPlayer);
                // check if there is already a play, if so, return early
                if(square.hasChildNodes()){
                    return
                }
                
                // determine which player icon to add to the square
                const lastMove = App.state.moves.at(-1)
                console.log("lastmove",lastMove?.playerId);
                const getOppositePlayer = playerId=>playerId === 1 ? 2 : 1; 
                const currentPlayer = App.state.moves.length === 0 ? 1 : getOppositePlayer(lastMove.playerId);
                  
                const nextPlayer = getOppositePlayer(currentPlayer)
                
                const turnIcon = document.createElement('i');
                const squareIcon = document.createElement('i');

                const turnLabel = document.createElement('p')
                turnLabel.innerText = `Player ${nextPlayer}, you are up`
       
                
                
                if(currentPlayer===1){
                    squareIcon.classList.add('fa-solid','fa-x','yellow');
                    turnIcon.classList.add('fa-solid','fa-o','turquoise');
                    turnLabel.classList = 'turquoise'
                }else{
                    squareIcon.classList.add('fa-solid','fa-o','turquoise');
                    turnIcon.classList.add('fa-solid','fa-x','yellow');
                    turnLabel.classList = 'yellow'
                }

                App.$.turn.replaceChildren(turnIcon,turnLabel)

                App.state.moves.push({
                    squareId: +square.id,
                    playerId: currentPlayer
                })

                
                console.log(App.state);

                square.replaceChildren(squareIcon);

                // check if there is a winner or tie game
                const game = App.getGAmeStatus(App.state.moves)
                console.log("status",game);

                //game.status === 'complete' ?( game.winner ? alert(`Player ${winner} wins!`): alert('Tie!')) : null 

                if(game.status==='complete'){

                    App.$.modal.classList.remove('hidden')
                    let message 
                    if(game.winner){
                      message = `Player ${game.winner} wins!`  
                    }else{
                      message = 'Tie!'
                    }

                    App.$.modalText.textContent = message
                } 
            })
        })
    }
};

window.addEventListener('load',App.init);