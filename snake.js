let inputDir = { x:0 , y:0};
let food = { x:5 , y:5};
let snakeArr = [{ x:11 , y:11}];
lastPaintTime = 0;
let speed = 3;
let score = 0;
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var start = document.getElementById("start");

// Main function
function main(currentTime){
    window.requestAnimationFrame(main);
    if((currentTime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = currentTime;
    gameEngine();
}

function isCollide(snake){
    for(let index = 1; index< snakeArr.length; index++){
        if(snake[index].x === snake[0].x && snake[index].y === snake[0].y){
            return true;
        }
        if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
            return true;
        }
    }
    return false;
}



// Game function
function gameEngine(){

//Game over
    if(isCollide(snakeArr)){
        inputDir = { x:0 , y:0};
        modal.style.display = "block";
        snakeArr = [{ x:11 , y:11}];
        score = 0;
        scoreBox.innerHTML = "Score: " + score;
    }
    btn.onclick = function() {
        modal.style.display = "none";
      }
      
    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }


// increment snake if food eaten
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        score += 1;
        // if(score>hiscoreval){
        //     hiscoreval= score;
        //     localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
        //     hisScoreBox.innerHTML = "HiScore: " + hiscorevale;
        // }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b=16;
        food = {x: Math.round (a +(b-a)*Math.random()), y: Math.round (a +(b-a)*Math.random())};
    }

//moving snake 
    for (let index = snakeArr.length-2; index >= 0; index-- ){
        snakeArr[index+1] = {...snakeArr[index]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

//Display snake
    board.innerHTML = "";
    snakeArr.forEach((e) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add('snake');
        board.appendChild(snakeElement);
    })

//Display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    inputDir = { x:0 , y:1};
    // start.click();
    switch(e.key){
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    }
    
})


// let hiscore = localStorage.getItem("hiscore");
// if(hiscore === null){
//     hiscoreval = 0;
//     localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
// }
// else{
//     hiscoreval = JSON.parse(hiscore);
//     hiScoreBox.innerHTML = "HiScore: " + hiscore;
// }