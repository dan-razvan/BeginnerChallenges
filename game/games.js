


let map = 
`
▧▧▧▧▧▧▧▧▧▧
▧◻◻◻◻◻◻◻◻▧
▧◻◻◻◻◻◻◻◻▧
▧◻◻◻◻◻◻◻◻▧
▧◻◻◻◻◉◻◻◻▧
▧◻◻◻◻◻◻◻◻▧
▧◻◻◻◻◻◻◻◻▧
▧◻◻◻◻◻◻▣◻▧
▧◻◻◻◻◻◻◻◻▧
▧▧▧▧▧▧▧▧▧▧
`


function renderMap(map) {
    gameMapContainer.innerHTML = map
}

renderMap(map)


function moveRight(map, hero){
    let idx = map.indexOf(hero)
    let newMap = map.substring(0, idx) + "◻"+ hero + map.substring(idx+2)
    return newMap
}

function moveLeft(map, hero){ 
    let idx = map.indexOf(hero)
    let newMap = map.substring(0, idx - 1) + hero  + "◻"+ map.substring(idx+1) 
    return newMap
}

function moveDown(map, hero){
    let idx = map.indexOf(hero)
    let newMap = map.substring(0, idx) + "◻" + map.substring(idx+1, idx+11) + hero + map.substring(idx+12)
    return newMap
}

function moveUp(map, hero){
    let idx = map.indexOf(hero)
    let newMap = map.substring(0,idx-11) + hero + map.substring(idx-10, idx) + "◻" + map.substring(idx+1)
    return newMap
}   

// this function will return the char at a specified index. I am looking to find out what is the next character in the direction that 
// our hero or enemy moves towards. I will be calling this function in direction() and actionEnemy()


let checkChar = (hero, idxDifference) => {return map.charAt(map.indexOf(hero) + idxDifference) } 


//I am using this function to save a lot of coding in action and enemy action functions

function direction(hero, idxDifference, chooseDirection){
    if(checkChar(hero, idxDifference) !== "▧"){
        map = chooseDirection
        renderMap(map)
    }else if(checkChar(hero, idxDifference) === "▣"){
        chooseDirection
    }
}

function action( e ){
    switch(e.code){
        case "ArrowUp":
            direction("◉",-11,moveUp(map, "◉"));
            break;
        case "ArrowDown":
            direction("◉", +11,moveDown(map, "◉"))
            break;
        case "ArrowLeft":
            direction("◉", -1,moveLeft(map, "◉"))
            break;
        case "ArrowRight":
            direction("◉", +1, moveRight(map, "◉"))
            break;
        }   
    }


function actionEnemy( dir ){

    switch(dir){
        case "Up":    
            if(checkChar("▣", -11) !== "◉"){         //condition to not kill our hero :D. If I delete thi condition it will work normally
                direction("▣",-11,moveUp(map, "▣"));
            }
            break;
    
            //enemy bounces back down when catches hero (I thought it would be cool, but got bored of it)
            // }else if(checkChar(-11) === "◉"){ 
            //     map = moveDown(map, "▣")
            //     renderMap(map)
            // }
        
        case "Down":
            if(checkChar("▣", 11) !== "◉"){
                direction("▣", +11,moveDown(map, "▣"))
            }
            break;
            
        case "Left":
            if(checkChar("▣", -1) !== "◉"){
                direction("▣", -1,moveLeft(map, "▣"))
            }
            break;

        case "Right":
            if(checkChar("▣", 1) !== "◉"){
                direction("▣", +1, moveRight(map, "▣"))
            }
            break;
  
    }
}

setInterval( () => { 
    let idxP = map.indexOf("◉")
    let idxE = map.indexOf("▣")
    let idxDiff  = idxE - idxP
    let rows = Math.round(idxDiff / 11)
    let cols = idxDiff - rows * 11
    console.log(idxDiff, rows, cols)

    if(rows > 0) {
        actionEnemy("Up")
    }else if(rows < 0){
        actionEnemy("Down")
    }else if(cols > 0){
        actionEnemy("Left")
    }else if(cols < 0){
        actionEnemy("Right")
    }
    
}, 500)

renderMap(map)


// Questions: 
// 1. How to shorten the move function?
// 2. How to make enemy stop at the index where he killed the hero?


