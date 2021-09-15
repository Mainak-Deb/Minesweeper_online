let w=1550,h=650;
let col=[]
let blocks=16;
let mainarr;
let layerarr;
let boxlen=(w/2.5)/blocks
let sx=w/3.33,sy=80;
let flagcount=36,tflag=flagcount;
var d = new Date();
let inittime=d.getTime();
let seconds= 0;
let mousecount=0;
let visited;
let gameon=true
let ending_wait;
let gamewin=0;



function make2DArray(cols, rows,value) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
      for(let j=0;j<rows;j++){
        arr[i][j] =value;
      }
    }
    return arr;
  }

  function getgrid(x,y){
    //print(x,y)
    return [parseInt((x-sx)/boxlen),parseInt((y-sy)/boxlen)]
    
  }

function setup(){
    createCanvas(1550,750);
    col=random(255)
    print(col)
    mainarr=make2DArray(blocks,blocks,0)
    print(mainarr)
    layerarr=make2DArray(blocks,blocks,1)
    print(layerarr)
    visited=make2DArray(blocks,blocks,0)
    print(visited)
}

function draw(){
    colorMode(HSB, 255);
    background(0,0,0)
    var d = new Date();
    seconds=parseInt((d.getTime()-inittime)/1000);
    //print(seconds)

    fill(155)
    rect(sx,0,w/2.5,sy)
    textSize(40);
    fill(5)
    text('🚩 : ', sx+60,50);
    text(String(flagcount), sx+140,55);

    text('⏱ : ', sx+280,50);
    text(String(seconds), sx+370,55);

    fill(col,200,200)
    rect(sx,sy,w/2.5,w/2.5)

    for (let i = 0; i < blocks; i++) {
        for(let j=0;j<blocks;j++){
            if((layerarr[i][j]) && (gameon)){
                if((i+j)%2==0){fill(col,200,255)}
                else{fill(col,200,125)}
                rect(sx+(i*boxlen),sy+(j*boxlen),boxlen,boxlen)
                if(layerarr[i][j]==2){
                  textSize(25);
                  text('🚩', sx+(i*boxlen)+5,sy+(j*boxlen)+boxlen-8);
                }
            }else{
                if((i+j)%2==0){fill(col,0,200)}
                else{fill(col,0,125)}
                rect(sx+(i*boxlen),sy+(j*boxlen),boxlen,boxlen)
                if(mainarr[i][j]==100){
                  textSize(25);
                  text('💣', sx+(i*boxlen)+5,sy+(j*boxlen)+boxlen-8);
                }else if(mainarr[i][j]>0) {
                  fill(((9-mainarr[i][j])*(255/8)),255,125)
                  textSize(40);
                  text(String(mainarr[i][j]), sx+(i*boxlen)+7,sy+(j*boxlen)+boxlen-5);
                }

            }

        }
      }
      if(((mouseX>=sx) && (mouseX<=sx+(boxlen*16))) && ((mouseY>=sy) && (mouseY<=sy+(boxlen*16)))){
        if(gameon){
          let point=getgrid(mouseX,mouseY)
          if(layerarr[point[0]][point[1]]!=0){
            fill(col,100,255)
            rect(sx+(point[0]*boxlen),sy+(point[1]*boxlen),boxlen,boxlen)
            if(layerarr[point[0]][point[1]]==2){
              textSize(25);
              text('🚩', sx+(point[0]*boxlen)+5,sy+(point[1]*boxlen)+boxlen-8);
            }
          }
        }
      }
      print(mousecount)
      if(!gameon){
        
          swal("Sorry!" , "You lost\nbetter luck next time" , 
          "error").then((value) => {
            if(value){
              location.reload();
            }else if(value==null){
              location.reload();
            }
          });
          noLoop();
        
      }
      if(flagcount==0){
        for (let i = 0; i < blocks; i++) {
          for(let j=0;j<blocks;j++){
              if((mainarr[i][j]==100) && (layerarr[i][j]==2)){
                gamewin++;
              }
          }
        }
        if(gamewin==tflag){
          swal("Sorry!" , "You won\ncongratulations" , 
          "success").then((value) => {
            if(value){
              location.reload();
            }else if(value==null){
              location.reload();
            }
          });
          noLoop();
        }
      }

}


function mousePressed() {
  if(((mouseX>=sx) && (mouseX<=sx+(boxlen*16))) && ((mouseY>=sy) && (mouseY<=sy+(boxlen*16)))){
    let point=getgrid(mouseX,mouseY)
    print(point)
    print(mouseButton)
    print(layerarr)
  
  if (mouseButton === LEFT) {
    //print(layerarr[point[0]][point[1]])
    if(layerarr[point[0]][point[1]]!=2){
      if(mainarr[point[0]][point[1]]==100){
          gameon=false
          ending_wait=seconds
        

        return;
      }else{
      if(mousecount==0){
        mousecount++;
        startgame(point)
      }else  if(mainarr[point[0]][point[1]]==0){
        breaklayer(point[0],point[1])
      }
      mousecount++;
      layerarr[point[0]][point[1]]=0;  
      }
    }

  }
  if (mouseButton === RIGHT) {
    //print(layerarr[point[0]][point[1]])
    if(layerarr[point[0]][point[1]]==1){
      layerarr[point[0]][point[1]]=2;flagcount--;
    }else if(layerarr[point[0]][point[1]]==2){
      layerarr[point[0]][point[1]]=1;flagcount++;
    }
    
  }
 
  }
}

function validboundary(i,j){
  //console.log(i,j)
  let valid=true
  //print(i,j)
  if(i>mainarr.length-1){return false}
  if(j>mainarr[0].length-1){return false}
  if(i<0){return false}
  if(j<0){return false}
  // print(valid)
  return true;
}


function startgame(p){
  let gw=blocks;gh=blocks;

  for (let i = p[0]-2; i < p[0]+2; i++) {
    for(let j=p[1]-2;j<p[1]+2;j++){
      if(validboundary(i,j)){mainarr[i][j]=100}
    }
  }


    for(let i=0;i<flagcount+1;i++){
      let bombpos=[parseInt(random(blocks)),parseInt(random(blocks))]
      if(mainarr[bombpos[0]][bombpos[1]]!=100){
        mainarr[bombpos[0]][bombpos[1]]=100
      }else{
        while(mainarr[bombpos[0]][bombpos[1]]==100){
          bombpos=[parseInt(random(blocks)),parseInt(random(blocks))]
        }
        mainarr[bombpos[0]][bombpos[1]]=100
      }
    }

    for (let i = p[0]-2; i < p[0]+2; i++) {
      for(let j=p[1]-2;j<p[1]+2;j++){
        if(validboundary(i,j)){mainarr[i][j]=0}
      }
    }
    //mainarr[p[0]][p[1]]=0
    for (let i = 0; i < blocks; i++) {
      for(let j=0;j<blocks;j++){
        if(mainarr[i][j]!=100){
          let lifecount=0;
          if(validboundary(i+1,j)){if(mainarr[(i+1)][j]==100){lifecount++}}
          if(validboundary(i,j+1)){if(mainarr[(i)][(j+1)]==100){lifecount++}}
          if(validboundary(i+1,j+1)){if(mainarr[(i+1)][(j+1)]==100){lifecount++}}
          if(validboundary(i+1,j-1)){if(mainarr[(i+1)][(j-1)]==100){lifecount++}}
        
          if(validboundary(i-1,j)){if(mainarr[(i-1)][(j)]==100){lifecount++}}
          if(validboundary(i,j-1)){if(mainarr[(i)][(j-1)]==100){lifecount++}}
          if(validboundary(i-1,j-1)){if(mainarr[(i-1)][(j-1)]==100){lifecount++}}
          if(validboundary(i-1,j+1)){if(mainarr[(i-1)][(j+1)]==100){lifecount++}}
          
          mainarr[i][j]=lifecount
        }
      }
    }
    print(mainarr)
    breaklayer(p[0],p[1])
}


function breaklayer(x,y){
    if((validboundary(x,y)) && (visited[x][y]!=1)){
      if(mainarr[x][y]==0){
        layerarr[x][y]=0;
        visited[x][y]=1;
        console.log(x,y)
        if(validboundary(x+1,y)){if(mainarr[(x+1)][y]!=100){layerarr[(x+1)][y]=0;}}
        if(validboundary(x,y+1)){if(mainarr[(x)][(y+1)]!=100){layerarr[(x)][(y+1)]=0;}}          
        if(validboundary(x-1,y)){if(mainarr[(x-1)][(y)]!=100){layerarr[(x-1)][(y)]=0;}}
        if(validboundary(x,y-1)){if(mainarr[(x)][(y-1)]!=100){layerarr[(x)][(y-1)]=0;}}
        breaklayer(x+1,y);
        breaklayer(x,y+1);
        breaklayer(x-1,y);
        breaklayer(x,y-1);
      }else{
        return;
      }
      
    }else{
      return;
    }
}
