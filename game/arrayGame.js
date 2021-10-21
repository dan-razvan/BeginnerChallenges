


let map = [
    [1, 1, 1, 1 , 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0 , 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0 , 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 2, 0 , 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0 , 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0 , 0, 0, 1, 1, 0, 0, 1],
    [1, 0, 0, 0 , 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0 , 0, 0, 0, 3, 0, 0, 1],
    [1, 0, 0, 0 , 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0 , 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1 , 1, 1, 1, 1, 1, 1, 1],   
]

function renderMap(map) {

    let output = ""

    map.forEach(row => {
        for(let col = 0; col < map.length; col++){
            if(row[col] == 0) {
                output += "◻";
            }else if(row[col] == 1){
                output += "▧";
            }else if(row[col] == 2) {
                output += "◉";
            }else if (row[col] == 3) {
                output += "▣";
            }
        }
        output += "\n";
    })

    gameMapContainer.innerHTML = output
}


renderMap(map)

//////////////////////////////////////////////////

let moveVerticaly = (map, hero, dir ) => {
    for(let row = 0; row < map.length; row++){
        for(let col = 0; col < map.length; col++){
            if(map[row][col] == hero){
                if(map[row+dir][col] != 1 && map[row+dir][col] != 3){
                    map[row][col] = 0
                    map[row+dir][col] = hero
                    return map
                }else{
                    return map
                }
            }
        }
    } 
}

let moveHorizontaly = (map, hero, dir ) => {
    for(let row = 0; row < map.length; row++){
        for(let col = 0; col < map.length; col++){
            if(map[row][col] == hero){
                if(map[row][col+dir] != 1 && map[row][col+dir] != 3){
                    map[row][col] = 0
                    map[row][col+dir] = hero
                    return map
                }else{
                    return map
                }
            }
        }
    } 
}

///////////////////////////////////////

function action( e ){
    switch(e.code){
        case "ArrowUp":
            map = moveVerticaly(map, 2, -1)
            renderMap(map)
            break;
        case "ArrowDown":
            map = moveVerticaly(map, 2, +1)
            renderMap(map)
            break;
        case "ArrowLeft":
            map = moveHorizontaly(map, 2, -1)
            renderMap(map)
            break;
        case "ArrowRight":
            map = moveHorizontaly(map, 2, +1)
            renderMap(map)
            break;
        }   
    }

    function actionEnemy(dir){
        switch(dir){
            case "Up":
                map = moveVerticaly(map, 3, -1)
                renderMap(map)
                break;
            case "Down":
                map = moveVerticaly(map, 3, +1)
                renderMap(map)
                break;
            case "Left":
                map = moveHorizontaly(map, 3, -1)
                renderMap(map)
                break;                
            case "Right":
                map = moveHorizontaly(map, 3, +1)
                renderMap(map)
                break;   
                
        }
    }

   ////////////////////////////////////////// 

setInterval (() => {
    let x2;
    let y2;
    let x3;
    let y3;
    for(let i = 0; i < map.length; i++){
        for(let j = 0; j< map.length; j++){
            if(map[i][j] == 2){
                x2 = i;
                y2 = j;
            }else if(map[i][j] == 3){
                x3 = i;
                y3 = j;
            }
        }
    }
    if(x2 < x3 ){
        actionEnemy("Up")
        if(y2>y3){
            actionEnemy("Right")
        }else if(y2<y3){
            actionEnemy("Left")
        }
    }else if(x2>x3){
        actionEnemy("Down")
        if(y2>y3){
            actionEnemy("Right")
        }else if(y2<y3){
            actionEnemy("Left")
        }
    }else if(y2<y3){
        actionEnemy("Left")
        if(x2>x3){
            actionEnemy("Up")
        }else if(x2<x3){
            actionEnemy("Down")
        }
    
    }else if(y2>y3){
        actionEnemy("Right")
    }
}, 1000)

    renderMap(map)
    