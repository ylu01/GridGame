/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//each level will be a string of 100 characters, in an array. 
var level = "WWWWWWWWWWWKPWPPPPCWWWPWEPWWWWCWKWPPWCWPPSPKPPWPWCPWWWPPPPWPPCPWWWWWWPPKPPPKPPPPCWWPWWWWWWWOPPPPPPKW";
//the list of system messages to display
//test level
//WWWWWWWWWWWPPPPPPPPWWSPPPPPPPWWPPPPPPPPWWWWKKPPPPWWPPPPPPPPWWPPPPPPPPWWCCPPPPPPWWPPPEPPPPWWWWWWWWWWW
//OOWWWWWWWWWPPPPPPPCWWWPPEPPPWWOPKPPCPPWWPSPKPPPCCCPPPPPPWWWPPCPWWWWWPPPKPPPKPPPPPWWPWPPWWPWWWWWWWWW
var messages = ["Opened a chest, got some treasure. ", 
                "The chest is locked.", 
                "You found a key. ", 
                "The chest is empty. ",
                "You have not found all treasure yet.",
                "You haven't collected all the treasure yet."];


//attributes/flags here. 
var board; //the board.
var panel; // the panel;
var newsBox; //the newsbox;
var inventory; // your inventory
var begX, begY;//coordinates for start location
var numKeys;//how many keys are there in total. 
var curKeys;// how many keys you currently have. 
var chestsOpen; // chests open should equal num keys, right now, given there should be an equal number of chests vs keys. 
var invCount; // iterator variable for the inventory. 
var inventoryList = [];
var remaining; // how many keys/chests remain. 



//making it 10x10.
level = level.split("");
var newArr = [];
while(level.length){
  newArr.push(level.splice(0,10));
}

//finding the number of keys in a level. 
for(var count = 0; count < level.length; count++){
  if(level[count] === "K"){
    numKeys++;
  }
}
remaining = numKeys; //current keys should = total Keys at the beginning. //"get rid" of the border
//make the board
function setBoard(sch){
        curKeys = 0;
        panel = document.createElement("div");
	board = document.createElement("div");
	newsBox = document.createElement("div");
        inventory = document.createElement("div");
        board.setAttribute("class", "board");
	panel.setAttribute("class","panel");
	newsBox.setAttribute("class", "news");
	newsBox.setAttribute("id", "newsfeed");
        inventory.setAttribute("class", "inventoryDiv");
	document.body.appendChild(panel);
        panel.appendChild(board); 
	panel.appendChild(newsBox);
        panel.appendChild(inventory);
	document.getElementById("newsfeed").innerHTML = "<br>" + "NEWS FEED" + "<br>" + "-------------------------------";
  
  //adding/making the grid in the board. 
  //there should be 100 grids in the board once this is done. 
  for(var count = 1; count < 11; count++){
    for(var count1 = 1; count1 < 11; count1++){
      gridId = count + "-" + count1;
      addToGrid(count-1,count1-1,gridId);//lllll
     
   
  }
  }
  var inventoryText;
  inventoryText = document.createElement("div");
  inventoryText.setAttribute("id", "inventoryText");
  inventoryText.setAttribute("class", "inventoryText");
  inventory.appendChild(inventoryText);
  document.getElementById("inventoryText").innerHTML = "I N V E N T O R Y";
  
  //make the inventory grid
  
  setInventory();
  
  
}
//takes the current x-y array attributes from the array, and a string gridid. 
//each x-y coordinate should refer to one char, as to make the grid based on what char is it. 
//hold on, is id even needed?
//;;;
function addToGrid(x,y,id){
  var curId  = x + "-" + y;
  if(newArr[x][y] === "W"){
    var newGrid= document.createElement("div");
    newGrid.setAttribute("class", "grid");
    newGrid.setAttribute("id", curId);
    
    var newImg = document.createElement("img");
    newImg.src =  'img/wall.jpg';
    newGrid.appendChild(newImg);
    board.appendChild(newGrid); 
  }
  
  else if(newArr[x][y]==="P"){
    var newGrid= document.createElement("div");
    newGrid.setAttribute("class", "grid");
    newGrid.setAttribute("id", curId);
    newGrid.style.backgroundColor = "gray";
    board.appendChild(newGrid);
  }
  else if(newArr[x][y] === "S"){
    var newGrid= document.createElement("div");
    begX = x;
    begY = y;
    newGrid.setAttribute("class", "grid");
    newGrid.setAttribute("id", curId);
    var newImg = document.createElement("img");
    newImg.src =  'img/char1.jpg';
    newGrid.appendChild(newImg);
    board.appendChild(newGrid);
  }
  else if(newArr[x][y] === "C"){
    
    var newGrid= document.createElement("div");
    newGrid.setAttribute("class", "grid");
    newGrid.setAttribute("id", curId);
    var newImg = document.createElement("img");
    newImg.src =  'img/chest.jpg';
    newGrid.appendChild(newImg);
    board.appendChild(newGrid);
    
  }
  else if(newArr[x][y] === "E"){
    
    var newGrid= document.createElement("div");
    newGrid.setAttribute("class", "grid");
    newGrid.setAttribute("id", curId);
    var newImg = document.createElement("img");
    newImg.src =  'img/door.jpg';
    newGrid.appendChild(newImg);
    board.appendChild(newGrid);
  }
  else if(newArr[x][y] === "O"){
    var newGrid= document.createElement("div");
    newGrid.setAttribute("class", "grid");
    newGrid.setAttribute("id", curId);
    var newImg = document.createElement("img");
    newImg.src =  'img/openChest.jpg';
    newGrid.appendChild(newImg);
    board.appendChild(newGrid);
  }
  else if(newArr[x][y] === "K"){
    var newGrid= document.createElement("div");
    newGrid.setAttribute("class", "grid");
    newGrid.setAttribute("id", curId);
    var newImg = document.createElement("img");
    newImg.src =  'img/key.jpg';
    newGrid.appendChild(newImg);
    board.appendChild(newGrid);
  }
  //document.getElementById(curId).innerHTML = curId;
  
}
//alert(level);
checkLevel(newArr);
setBoard(newArr);//lert(inventoryList.length); 

var characterPic = 'img/char1.jpg';
//document.onkeydown = checkKey;
 //console.log("STARTUP: X:" + begX + " Y:" + begY);



//here handles the key pressed stuff. 
document.onkeydown = checkKey;

//function to validate the level string. 
function checkLevel(levelStr){
var nKeys =0;
var nChests =0;
var nExit = 0;
var nStart = 0;
for(var countK = 0; countK < levelStr.length; countK++){
    for(var countK1 = 0; countK1 < levelStr[countK].length; countK1++){
        if(levelStr[countK][countK1] === "K"){
            nKeys++;
        }
    }
} 
for(var countC = 0; countC < levelStr.length; countC++){
    for(var countC1 = 0; countC1 < levelStr[countC].length; countC1++){
        if(levelStr[countC][countC1] === "C"){
            nChests++;
        }
        if(levelStr[countC][countC1] === "S"){
            nStart++;
        }
        if(levelStr[countC][countC1] === "E"){
            nExit++;
        }
    }
}
    


    //alert("Number of keys in level: " + nKeys + " Number of chests: " + nChests);
    if(nKeys !== nChests){
        //alert("Unequal number of keys and chests");
    }
    if(nStart !== 1){
        //alert("incorrect number of starting points.");
    }
    if(nExit !== 1){
        alert("Incorrect number of Exits");
    }
}

function checkKey(e) {

    e = e || window.event;
    if (e.keyCode === 38) {
        // up arrow
      //x-1
      
          //alert(newArr[begX-1][begY]);
      //document.getElementById("test").innerHTML = "up";
      var temp;
      var tempText = begX + "-" + begY;
       //console.log("The Problem:" +(begX-2) + " " + begY + ", "+ newArr[begX-2][begY-1] + tempText);
     if(begX-1 >= 0){
         
          if(newArr[begX-1][begY] === "O"){
            update(messages[3]);
          }
       if(newArr[begX-1][begY] === "P" || newArr[begX-1][begY] === "K"){
          var removeText = "#" + tempText + " > img";
          $(removeText).remove(); 
          var newLocation = (begX-1) + "-" + begY;
          var newImg = document.createElement("img");
          newImg.src = characterPic;
         if(newArr[begX-1][begY] === "K"){
          var removeKeyText = "#" + newLocation + " > img";
          $(removeKeyText).remove(); 
          update(messages[2]);
          newArr[begX-1][begY] ="P";
          document.getElementById(newLocation).appendChild(newImg);
          addKey();
          curKeys++;//updateInventory
          }
          else{
             document.getElementById(newLocation).appendChild(newImg);
          }
          begX--;
       }
       else if(newArr[begX-1][begY] === "C"){
           
           
           if(curKeys > 0){
               var newLocation1 = (begX-1) + "-" + (begY);
               var replaceChestPic = "#" + newLocation1 + " > img";
               $(replaceChestPic).remove(); 
               var newImg = document.createElement("img");
               newImg.src ="img/openChest.jpg";
               remaining--;
                    document.getElementById(newLocation1).appendChild(newImg);
               update(messages[0]);
               curKeys--;
               takeKey();
               //chest is now empty. 
               newArr[begX-1][begY] = "O";
               
           }
           else if(curKeys === 0){
               update(messages[1]);
           }
         
       }
     }
       //console.log("X: " + begX + " y: " + begY);
    }
  
  
  
  ////////////////////////////DOWN
  
  
    else if (e.keyCode === 40) {
        // down arrow
      
      //ocument.getElementById("test").innerHTML = "Down";
      var temp;
      var tempText = begX + "-" + begY;
       //console.log("The Problem:" +(begX-2) + " " + begY + ", "+ newArr[begX-2][begY-1] + tempText);
     if(begX < 11){
       if(newArr[begX+1][begY] === "P" || newArr[begX+1][begY] === "K"){
         
          var removeText = "#" + tempText + " > img";
          $(removeText).remove(); 
          var newLocation = (begX+1) + "-" + begY;
          var newImg = document.createElement("img");
          newImg.src = characterPic;
          
          if(newArr[begX+1][begY] === "K"){
          var removeKeyText = "#" + newLocation + " > img";
          $(removeKeyText).remove(); 
          update(messages[2]);
          newArr[begX+1][begY] ="P";
          document.getElementById(newLocation).appendChild(newImg);
          curKeys++;//updateInventory
          addKey();
          }
          else{
             document.getElementById(newLocation).appendChild(newImg);
          }
         begX++;
     
       }
       
       
       else if(newArr[begX+1][begY] === "C"){
         if(curKeys > 0){
               var newLocation1 = (begX+1) + "-" + (begY);
               var replaceChestPic = "#" + newLocation1 + " > img";
               $(replaceChestPic).remove(); 
               var newImg = document.createElement("img");
               newImg.src ="img/openChest.jpg";
               remaining--;
                    document.getElementById(newLocation1).appendChild(newImg);
               update(messages[0]);
               curKeys--;
               takeKey();
               //chest is now empty. 
               newArr[begX+1][begY] = "O";
               
           }
           else if(curKeys === 0){
               update(messages[1]);
           }
       }
       
       
    }
       
    }
  
  
  ///////////////////////////////////// LEFT KEY
  
  
    else if (e.keyCode === 37) {
       // left arrow
      //y-1
     //alert("x: " + begX + " Y: " + begY + " char: " + newArr[begX-1][begY-2]);
     //document.getElementById("test").innerHTML = "left";
      var tempText = begX + "-" + begY;
      //var test = (begX) + "-" + (begY-2)+ "  " + newArr[begX][begY-1];
      
     if(begY > 0){
       if(newArr[begX][begY-1] === "P" || newArr[begX][begY-1] === "K"){
         
          console.log(tempText);
          //alert(tempText);
          var removeText = "#" + tempText + " > img";
          $(removeText).remove(); 
          var newLocation = (begX) + "-" + (begY-1);
          var newImg = document.createElement("img");
          newImg.src = characterPic;
          
          if(newArr[begX][begY-1] === "K"){
         //document.getElementById("test").innerHTML = "Key";
             var removeKeyText = "#" + newLocation + " > img";
             $(removeKeyText).remove();                                                          
             document.getElementById(newLocation).appendChild(newImg);
         update(messages[2]);//you found a key. 
         curKeys++;
         addKey();
         newArr[begX][begY-1] = "P";
       }
       else{
         document.getElementById(newLocation).appendChild(newImg);
       }
    
      begY--;
       }
       else if(newArr[begX][begY-1] === "C"){
           if(curKeys > 0){
               var newLocation1 = (begX) + "-" + (begY-1);
               var replaceChestPic = "#" + newLocation1 + " > img";
               $(replaceChestPic).remove(); 
               var newImg = document.createElement("img");
               newImg.src ="img/openChest.jpg";
               remaining--;
                    document.getElementById(newLocation1).appendChild(newImg);
               update(messages[0]);
               curKeys--;
               takeKey();
               //chest is now empty. 
               newArr[begX][begY-1] = "O";
               
           }
           else if(curKeys === 0){
               update(messages[1]);
           }
           
       }
          //console.log("X: " + begX + " y: " + begY);
       
       
     }
    
      
    }
     
     
     ///////////////////////////////////////RIGHT KEY

    else if (e.keyCode === 39) {
       // right arrow
      //"X: " + begX + " y: " + begY;
      //begxy is 5-1
     
      //document.getElementById("test").innerHTML = "right";
      var tempText = begX + "-" + begY;
     if(begY+1 < 11){
       if(newArr[begX][begY+1] === "P" || newArr[begX][begY+1] === "K"){
          var removeText = "#" + tempText + " > img";
          $(removeText).remove(); 
          var newLocation = begX + "-" + (begY+1);
          var newImg = document.createElement("img");
          newImg.src = characterPic;
          
          if(newArr[begX][begY+1] === "K"){
            //document.getElementById("test").innerHTML = "Key";
            var removeKeyText = "#" + newLocation + " > img";
            $(removeKeyText).remove(); 
            document.getElementById(newLocation).appendChild(newImg);
            update(messages[2]);
            //it is now a path, the key is gone.  
            newArr[begX][begY+1] = "P";
            curKeys++;
            addKey();
          }
       else{
         document.getElementById(newLocation).appendChild(newImg);
       }
    
      begY++;
       }
       
       else if(newArr[begX][begY+1] === "C"){
           
         if(curKeys > 0){
               var newLocation1 = (begX) + "-" + (begY+1);
               var replaceChestPic = "#" + newLocation1 + " > img";
               $(replaceChestPic).remove(); 
               var newImg = document.createElement("img");
               newImg.src ="img/openChest.jpg";
               remaining--;
               
                    document.getElementById(newLocation1).appendChild(newImg);
               update(messages[0]);
               curKeys--;
               takeKey();
               //chest is now empty. 
               newArr[begX][begY+1] = "O";
               
           }
           else if(curKeys === 0){
               update(messages[1]);
           }
       }
          //console.log("X: " + begX + " y: " + begY);
       
       
     }
    
      
    }
}
//makes the inventory. For now you can only have at most 9 items at once. 
function setInventory(){
    
    var inventoryGrid= document.createElement("div");
    inventoryGrid.setAttribute("id", "i1");
    inventoryGrid.setAttribute("class", "iGrid");
    inventory.appendChild(inventoryGrid);
    var innerGrid = document.createElement("div");
    innerGrid.setAttribute("class", "gridPic");
        //innerGrid.setAttribute("id", "g"+count1);
    inventoryGrid.appendChild(innerGrid);
    var newImg = document.createElement("img");
    newImg.src =  'img/key.jpg';
    innerGrid.appendChild(newImg);
    var content = document.createElement("p");
    content.setAttribute("id", "g1");
    inventoryGrid.appendChild(content);
    document.getElementById("g1").innerHTML = "  x0"; //have 0 to begin with. 

}
function setInventoryObj(num){
    
}
function update(text){
  
    var node = document.createElement("p");
    var textnode = document.createTextNode(text);
    node.appendChild(textnode);
    document.getElementById("newsfeed").appendChild(node);

  
}


//////////INVENTORY FUNCTIONS/////////////////

function addKey(){
    var temp = document.getElementById("g1").innerHTML.split("  x");
    temp.shift();
    temp = parseInt(temp);
    temp++;
    document.getElementById("g1").innerHTML = "  x" + temp;
    
}
function takeKey(){
    var temp = document.getElementById("g1").innerHTML.split("  x");
    temp.shift();
    temp = parseInt(temp);
    temp--;
    document.getElementById("g1").innerHTML = "  x" + temp;
    
}
function addItem(itemChar){
  if(invCount > 9){
    //add to news inv is full
    return;
  }
  var indexCount = 0; 
  while(indexCount < 9){
    if(document.getElementById("i" + indexCount).innerHTML === "N"){
      var tempLoc = "i" + indexCount;
      if(itemChar === "K"){
        var newImg = document.createElement("img");
    newImg.src =  'img/key.jpg';
document.getElementById(tempLoc).appendChild(newImg);
        
      }
      //add image
      
    }
    break;
  }
}
  
  function setKeyImage(){
    
  }
  
  //to be implemented in future updates. 
  function setDynamiteImage(){
    
  }
  
//loc is a number on index 0-8
  function clearImage(loc){
    var newImg = document.createElement("img");
    newImg.src = characterPic;
    
  }
