


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

function move(map, hero, cb) {
    let idx = map.indexOf(hero)
    let newMap = cb(idx)
    return newMap
}

function sub(st, end){
    return map.substring(st, end)
}


// I will callthe  function checkSymbol() in order to place boundries for hero and enemy. This function tells us what symbol 
// comes next in the moving direction
let checkSymbol = (hero, idxDifference) => {return map.charAt(map.indexOf(hero) + idxDifference) } 



function action(e){
    switch(e.code){
        case "ArrowUp":
            //I placed boundries for hero
            if(checkSymbol("◉",-11 ) != "▧" && checkSymbol("◉",-11 ) != "▣"){   
                map = move(map, "◉",(idx) => sub(0,idx-11) + "◉" + sub(idx-10, idx) + "◻" + sub(idx+1) )
                renderMap(map)
            }
            break
        case "ArrowDown":
            if(checkSymbol("◉",11) != "▧" && checkSymbol("◉",11 ) != "▣"){
                map = move(map, "◉", (idx) => sub(0, idx) + "◻" +sub(idx+1, idx+11) + "◉" + sub(idx+12))
                renderMap(map)
            }
            break
        case "ArrowRight":
            if(checkSymbol("◉", 1) != "▧" && checkSymbol("◉",1 ) != "▣"){
                map = move(map, "◉", (idx) => sub(0, idx) + "◻"+ "◉" + sub(idx+2))
                renderMap(map)
            }
            break

        case "ArrowLeft":
            if(checkSymbol("◉", -1) != "▧" && checkSymbol("◉", -1 ) != "▣"){
                map = move(map, "◉", (idx) => sub(0, idx - 1) + "◉"  + "◻"+ sub(idx+1))
                renderMap(map)
            }
            break
    }
}

function actionEnemy( dir){
    switch(dir){
        case "Up":
            if(checkSymbol("▣",-11 ) != "▧" ){
                map = move(map, "▣", (idx) => sub(0,idx-11) + "▣" + sub(idx-10, idx) + "◻" + sub(idx+1) )
                renderMap(map)
            }

            break
        case "Down":
            if(checkSymbol("▣",11 ) != "▧" ){
                map = move(map, "▣", (idx) => sub(0,idx) + "◻" + sub(idx+1, idx+11) + "▣" + sub(idx+12) )
                renderMap(map)
            }
            break
        case "Right":
            if(checkSymbol("▣",1 ) != "▧" ){
                map = move(map, "▣", (idx) => sub(0, idx) + "◻"+ "▣" + sub(idx+2) )
                renderMap(map)
            }
            break
        case "Left":
            if(checkSymbol("▣", -1 ) != "▧" ){
                map = move(map, "▣", (idx) => sub(0, idx - 1) + "▣"  + "◻"+ sub(idx+1))
                renderMap(map)
            }
            break
        case "Stop":
            map = move(map, "▣", (idx) => sub(0, idx) + "▣" + sub(idx+1))
            renderMap(map)
            break

    }
}

setInterval( () => { 
    let idxP = map.indexOf("◉")
    let idxE = map.indexOf("▣")
    let idxDiff  = idxE - idxP
    let rows = Math.round(idxDiff / 11)
    let cols = idxDiff - rows * 11
    if(idxP == -1){                // this condition will stop the enemy from moving up when hero is dead
        actionEnemy("Stop")  
    }else if(rows > 0){
        actionEnemy("Up")
        if(cols > 0){
            actionEnemy("Left")
        }else if(cols < 0){
            actionEnemy("Right")
        }else{
            actionEnemy("Up")
        }
    }else if(rows < 0){
        actionEnemy("Down")
        if(cols > 0){
            actionEnemy("Left")
        }else if(cols < 0){
            actionEnemy("Right")
        }else{
            actionEnemy("Down")
        }
    }else if(rows == 0){
        if(cols > 0){
            actionEnemy("Left")
        }else if(cols < 0 ){
            actionEnemy("Right")
        }
    }
    // I placed more conditions here for the enemy to move more naturally(diagonaly)
    
}, 1000)

renderMap(map)




