//初始化
var btn=document.getElementsByTagName("button")[0]; //button
var time=document.getElementById("time"); //找到時間
var combo=document.getElementById("combo"); //找到分數
var animal=document.getElementsByClassName("cell");
var flag=0; //判別遊戲狀況 停止 0 遊戲中 1
var sec=0,count=0;
var beYellow=new Array(); //到時候會存放所有 red 事件的轉黃定時器，陣列有 100 個位置
btn.addEventListener("click",gamestart); //規劃點選動作

function gamestart(){ //遊戲開始
  sec=60,count=0,flag=1;
  time.textContent=`Time Left：${sec}`;
  combo.textContent=`Score：${count}`;
  btn.removeEventListener("click",gamestart); //關閉 btn，不要再讓人去按他觸發多餘的 gamestart()

  let start=setInterval(()=>{ //控制倒數以及遊戲區間的隔離（按鈕）
    if(sec==0){
      clearInterval(start);
      flag=0;
      btn.addEventListener("click",gamestart);//開啟 btn
    }
    else{
      sec--;
      time.textContent=`Time Left：${sec}`;
    }
  },1000);
  
  for(let i=0;i<100;i++){//產生 100 組紅色事件 
    let ontime=Math.floor(Math.random()*57000); //隨機 0~56999 ms
    let which=Math.floor(Math.random()*9);  //隨機 0~8 處
    let delay=Math.floor(Math.random()*3)+2; //隨機 2~4 秒

    setTimeout(function(){
      showit(which,delay,i);
    },ontime);
  }
}


function showit(siWhich,siDelay,siId){ //在指定的 siWhitch 位置變成 red 事件
  if(animal[siWhich].title!="yellow"){ //你不是等待 (yellow) 狀態，就不要塞紅色
    // let next=(siWhich==8)?0:siWhich+1; //寫法 1
    // let next=(siWhich+1)%9; //寫法 2
    let next=Math.floor(Math.random()*9);  //隨機 0~8 處

    setTimeout(function(){
      showit(next,siDelay,siId);
    },100);
  }
  else{ //確定該位置是黃色，可以進行紅色事件
    animal[siWhich].src="red.jpg";
    animal[siWhich].style.background="red";
    animal[siWhich].title="red";
    animal[siWhich].alt=siId;
f
    beYellow[siId]=setTimeout(() => { //red 多久之後自己變回 yellow
      animal[siWhich].src="yellow.jpg";
      animal[siWhich].style.background=null;
      animal[siWhich].title="yellow";
      animal[siWhich].alt=null;
    }, siDelay*1000);
  }
}

document.onkeydown=keyboard;//每次的鍵盤動作都會送到 keyboard 函式
function keyboard(){
  if(flag){
    switch (event.keyCode) {
      case 103: getcount(0);break;
      case 104: getcount(1);break;
      case 105: getcount(2);break;
      case 100: getcount(3);break;
      case 101: getcount(4);break;
      case 102: getcount(5);break;
      case 97: getcount(6);break;
      case 98: getcount(7);break;
      case 99: getcount(8);break;
    }
  }
}

function getcount(who) { // 計分且將紅色變綠色  who=0~8
  if(animal[who].title=="red"){ //確定是遊戲中的紅色事件
    animal[who].src="green.jpg";
    animal[who].style.background="green";
    animal[who].title="green";

    /*加分*/
    count++;
    combo.textContent=`Score：${count}`;

    id=animal[who].alt; //id 1~100
    clearTimeout(beYellow[id]); //清除原先路線的轉黃定時器
    animal[who].alt=null;

    setTimeout(() => { //green 1 秒之後自己變回 yellow
      animal[who].src="yellow.jpg";
      animal[who].style.background=null;
      animal[who].title="yellow";
    }, 1000);
  }
}


function keyboard() {//鍵盤動作轉為 who 對象編號
  switch (event.keyCode) {
    case 97:
      getcombo(6);break;
    case 98:
      getcombo(7);break;
    case 99:
      getcombo(8);break;
    case 100:
      getcombo(3);break;
    case 101:
      getcombo(4);break;
    case 102:
      getcombo(5);break;
    case 103:
      getcombo(0);break;
    case 104:
      getcombo(1);break;
    case 105:
      getcombo(2);break;
  }
}

function getcount(who) { // 計分且將紅色變綠色  who=0~8
  if(animal[who].title=="red"&&flag==1){ //確定是遊戲中的紅色事件
    animal[who].src="green.jpg";
    animal[who].style.background="green";
    animal[who].title="green";

    /*加分*/
    count++;
    combo.textContent=`Score：${count}`;

    id=animal[who].alt;
    clearTimeout(beYellow[id]); //清除原先路線的轉黃定時器
    animal[who].alt=null;

    setTimeout(() => { //green 1 秒之後自己變回 yellow
      animal[who].src="yellow.jpg";
      animal[who].style.background=null;
      animal[who].title="yellow";
    }, 1000);
  }
}


