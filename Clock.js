const divContainer = document.getElementById("divContainer");
const divContainer2 = document.getElementById("divContainer2");
var hID = [];
var mID = [];
var removeNum = []
var zeroNums = [1,2,3,11,13,21,23,31,33,41,43,51,52,53];
var oneNums = [1,2,12,22,32,42,51,52,53];
var twoNums = [1,2,3,13,23,22,21,31,41,51,52,53];
var threeNums = [1,2,3,13,23,22,21,33,43,53,52,51];
var fourNums = [3,12,21,23,13,33,43,53,31,32,34];
var fiveNums = [1,2,3,11,21,31,32,33,43,53,52,51];
var sixNums = [1,2,3,11,21,31,32,33,41,43,53,52,51];
var sevenNums = [1,2,3,13,23,33,43,53];
var eightNums = [1,2,3,11,13,21,23,31,32,33,41,43,51,52,53,22];
var nineNums = [1,2,3,11,13,21,22,23,33,43,53];
var numDic = [zeroNums,oneNums,twoNums,threeNums,fourNums,
fiveNums,sixNums,sevenNums,eightNums,nineNums]
var getTime = new Date();
let hour = getTime.getHours();
let min = getTime.getMinutes();
let sec = getTime.getSeconds();

function genRemove(){
    for(var i=0; i<60; i++){
        removeNum.push(i)
    }
}

function makeNum(IDprefix, container){
    for(var i=0; i<60; i++){
        var newDiv = document.createElement("div");
        newDiv.id = IDprefix+i;
        newDiv.innerHTML = i
        if (i < 10){
            newDiv.innerHTML = "0"+i
            console.log("add")
            container.appendChild(newDiv)
        }
        else{
            newDiv.innerHTML = i
            container.appendChild(newDiv)
            console.log("add")
        }
    }
}

function genDictionarys(IDprefix, IDdic){
    for(var i=0; i<60; i++){
        var newID = IDprefix+i;
        IDdic.push(newID);
    }
}

function updateTime(){

        if (sec <59){
            sec ++;
        }
        else if (sec > 58 && min <59){
            min++
            sec = 00
        }
        else if (min > 58 && hour <24){
            min = 0;
            sec = 0;
            sec++;
            hour++
        }
        else if(hour === 24 && min === 59 && sec === 59){
            hour = 0;
            min = 0;
            sec = 0;
            sec++;
            hour++
        }
}

function opacitySet(ID){
        for(var i=0; i<60; i++){
            document.getElementById(ID[i])
            .classList.add("opacity");
        }
}

function changeColor(position){
    document.getElementById(position)
    .classList.add("colorChange1");
    document.getElementById(position)
    .classList.add("bold");
}

function remove(position){
    document.getElementById(position)
    .classList.remove("colorChange1");
    document.getElementById(position)
    .classList.remove("bold")
}

function reset(ID){
    var length = removeNum.length

    for (var i=0; i<length; i++){
        remove(ID[removeNum[i]])
    }
}

function draw(position,numArray,ID){
    var length = numArray.length
    if (position === 0 ){
        for (var i=0; i<length; i++){
            changeColor(ID[numArray[i]])
        }
    }
    else{
        for (var i=0; i<length; i++){
            changeColor(ID[numArray[i]+5])
        }
    }
}

function displayTime(ID,time){

        reset(ID)
        if(time<10){
            draw(0,zeroNums,ID)
            draw(1,numDic[time],ID)
        }
        else{
            var digits = (""+time).split("");
            draw(0,numDic[digits[0]],ID)
            draw(1,numDic[digits[1]],ID)
        }
}

function opacityBackNums(ID,time){

       for(var i=0; i<time+1; i++){
        document.getElementById(ID[i])
        .classList.remove("opacity");
       }
}

 function genVars(){
    genRemove()
    makeNum("h",divContainer)
    makeNum("m",divContainer2)
    genDictionarys("h", hID)
    genDictionarys("m", mID)
 }

 function intervalFunctions(){
    setInterval (function(){
        updateTime()
        opacitySet(hID)
        opacitySet(mID)
        displayTime(hID,hour)
        displayTime(mID,min)
        opacityBackNums(hID,min)
        opacityBackNums(mID,sec)
    },1000)
 }
 
genVars()
intervalFunctions()