/**
 * Created by ValLabY on 30/03/2017.
 */

const canvas = document.createElement('canvas');
canvas.width = 750;
canvas.height = 750;

document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

var imgMurTouch= new Image();
imgMurTouch.src = 'images/wall_touch.png';
var imgMurCantTouch= new Image();
imgMurCantTouch.src = 'images/wall_canttouch.png';

/* map */

const collisionMap = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,1,1,1,0,0,0,0,0,1],
    [1,0,1,1,0,0,0,0,0,0,0,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,1,1,1,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,0,0,0,0,0,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,1,1,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]

];

 var drawMap  = {

     update : function () {


     var y = 0;
     for (var i = 0; i <= 14; i++) {
         var x = 0;
         for (var t = 0; t <= 14; t++) {
             if (collisionMap[i][t] === 1) {
                 ctx.drawImage(imgMurTouch, x, y);
             }
             if (collisionMap[i][t] === 0) {
                 ctx.drawImage(imgMurCantTouch, x, y);
             }
             x += 50;
         }
         y += 50;
     }
 }
};

function collision(){

    /* représente le coté gauche du sprite Joueur*/

    player.onLeft = false;
    for ( var i = 1; i<= 74; i++) {
        if (collisionMap[Math.trunc((player.y + i ) / 50)][Math.trunc((player.x - 1 ) / 50)] == 1 ) {
                player.onLeft = true;
            break;
        } else {
            continue;
        }
    }

    /* représente le coté droit du sprite Joueur*/


    player.onRight = false;
    for ( var i = 1; i<= 74; i++) {
        if (collisionMap[Math.trunc((player.y + i ) / 50)][Math.trunc((player.x + player.width ) / 50)] == 1 ) {
            player.onRight = true;
            break;
        } else {
            continue;
        }
    }

    /* représente le coté bas du sprite Joueur*/

    if ( collisionMap[Math.trunc((player.y + player.height)/50)][Math.trunc((player.x + 1)/50)] == 1 || collisionMap[Math.trunc((player.y + player.height )/50)][Math.trunc((player.x + player.width-1)/50)] == 1){
       player.onFloor = true;
    } else {
        player.onFloor = false;
    }


    /* représente le coté haut du sprite Joueur*/


    if ( collisionMap[Math.trunc((player.y - 1) /50)][Math.trunc((player.x + 1)/50)] == 1 || collisionMap[Math.trunc((player.y - 1) /50)][Math.trunc((player.x+player.width -1)/50)] == 1){

       player.onRoof = true;
    } else {
        player.onRoof = false;
    }


}

/* Player */

var player = {
    x: 50,
    y: 50,
    width: 50,
    inertieX: 4,
    inertieY: 0,
    height: 75,
    xSpeed: 5,
    ySpeed: 5,
    dir : 1,
    onFloor: false,
    onRoof: false,
    onLeft: false,
    onRight: false,
    keyswitch: false,
    jumpCounter: 10,
    jumpSwitch: false,
    move: function () {

        if ( this.keyswitch == true){
            if( this.onLeft == true && this.dir == -1) {
                this.xSpeed = 0;
            } else if(this.onRight == true && this.dir == 1){
                this.xSpeed = 0;
            } else {
                this.xSpeed = 5;
            }

            this.x = this.x + (this.xSpeed - this.inertieX) * this.dir;
            this.inertieX--;
            if( this.inertieX <=0){
                this.inertieX = 0;
            }
        }
        if (this.keyswitch == false){
            this.inertieX = 4;
        }
    },
    colFloor: function(){
        this.ySpeed = 5;
        if(this.onFloor == false && this.jumpSwitch == false){
            this.y = this.y + (this.ySpeed + this.inertieY) ;
            this.inertieY++;

            if(this.inertieY >= 0){
                this.inertieY= 0;
            }
        } else if (this.onFloor == true || this.onRoof == true) {
            this.ySpeed =0;
            this.inertieY = 0;
        }
    },

    jump: function () {
        this.ySpeed = 5;
        if ( this.jumpSwitch == true){

            if( this.jumpCounter > 0){
                if(this.onRoof == false){
                this.y = this.y - this.ySpeed;
                }
                if(this.onRoof == true){
                    this.jumpCounter = 0;
                }
            }
            this.jumpCounter--;
            if (this.jumpCounter <=0){
                this.jumpCounter = 25;
                this.jumpSwitch = false;

            }
        }

    },
    update : function () {
        this.move();
        this.colFloor();
        this.jump();
        ctx.fillStyle = "white";
        ctx.fillRect(this.x,this.y,50,75);
    }
};

/* main */

function create(){

    update();

}

function update(){
    var date = new Date();
    console.log(date.toLocaleTimeString());
    setTimeout(update, 16);
    ctx.clearRect(0, 0, 750, 750);
    drawMap.update();
    collision();
    player.update();
}

create();


/* controller*/


document.onkeydown = function(key){
    if(key.keyCode === 37) {
        player.keyswitch = true;
        player.dir = -1;
    }
    if (key.keyCode === 39){
        player.keyswitch = true;
        player.dir = 1;
    }

    if( key.keyCode == 38){
        player.jumpSwitch = true;
    }

};

document.onkeyup = function(key){
    if(key.keyCode === 37) {
     if(player.dir == -1) {
         player.keyswitch = false;
     }

    }
    if (key.keyCode === 39){
        if(player.dir == 1) {
            player.keyswitch = false;
        }
    }

};


