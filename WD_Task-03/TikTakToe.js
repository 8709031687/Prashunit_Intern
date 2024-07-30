const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// let's create a function to initialise the game
function initGame() 
{
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    
    // UI pr empty bhi kerna padega boxes ko
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";

    // one more thing is missing, initialise box css properties again
        box.classList = `box box${index+1}`;
    
    // After tie the game , and click on new Game remove the yellow color
        gameInfo.classList = `game-info`;
    });

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();

//--------------------------- Swap Players Turn --------------------
// function swapTurn(){
//     if(currentPlayer === "X"){
//         currentPlayer = "O";
//     }
//     else{
//         currentPlayer = "X";
//     }
    
//     // UI update
//     gameInfo.innerText = `Current Player - ${currentPlayer}`;
// }
function swapTurn() 
{
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    // UI update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

//-------------------- Chaeck Game Is Over ----------------------
function checkGameOver()
{
    // newGameBtn.classList.add("active");
     let answer = "";
     winPosition.forEach((position) => {
       
        // all 3 boxes should be non-empty and exactly same in value
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]))
        {
                // check if winner is x
                // if(gameGrid[position[0]] === "X")  answer = "X"; else  answer = "O";
                answer = gameGrid[position[0]] === "X" ? "X" : "O";

                // Winner mil gaya to diable pointer event
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                // now we know x/0 is a winner
               boxes[position[0]].classList.add("win");
               boxes[position[1]].classList.add("win");
               boxes[position[2]].classList.add("win");
               gameInfo.classList.add("win");
        }
    });

     // it means we have a winner
     if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
     }

     // let's check wheather there is Tie or No Winner
     let fillCount = 0;
     gameGrid.forEach((box) => {
        if(box !== "")
            fillCount++;
     });

     if(fillCount === 9){
        gameInfo.innerText = "Game Ties !";
        gameInfo.classList.add("tie");
        newGameBtn.classList.add("active");
     }
}

function handleClick(index) 
{
    if(gameGrid[index] === "") 
        {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

         //swap kero turn ko
        swapTurn();

         // check koi win to nahi hua 
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);

