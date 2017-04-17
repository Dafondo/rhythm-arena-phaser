var RhythmArena = RhythmArena || {};

RhythmArena.MainGame = function(){};
var tween;

RhythmArena.MainGame.prototype = {
    map: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    spriteSize: 32,
    spriteScale: 2,
    players: {
        p1: {
            sprite: null,
            direction: 1,
            xPos: 0,
            yPos: 0,
            controls: {
                left: null,
                right: null
            },
            canMove: true,
            tween: null
        },
        p2: {
            sprite: null,
            direction: 3,
            xPos: 9,
            yPos: 9,
            controls: {
                left: null,
                right: null
            },
            canMove: true,
            tween: null
        }
    },
    music: {
        track: null,
        bpm: 0,
        beat: 0,
        halfBeat: 0,
        lastBeat: 0
    },
    cursors: null,
    wasd: null,
    turnLeft: function(player) {
        player.direction = this.posMod(player.direction - 1, 4);
        if(player.direction == 1) player.sprite.scale.x = this.spriteScale;
        else if(player.direction == 3) player.sprite.scale.x = -1 * this.spriteScale;
    },
    turnRight: function(player) {
        player.direction = this.posMod(player.direction + 1, 4);
        if(player.direction == 1) player.sprite.scale.x = this.spriteScale;
        else if(player.direction == 3) player.sprite.scale.x = -1 * this.spriteScale;
    },
    create: function() {
        this.stage.backgroundColor = '#182d3b';
        this.input.touch.preventDefault = false;

        this.music.track = this.add.audio('80', 1, true);
        this.music.bpm = 80;
        this.music.beat = 60000.0/this.music.bpm;
        this.music.halfBeat = this.music.beat/2;
        this.music.lastBeat = 0;

        this.music.track.play();

        this.camera.setSize(1, 1);

        for(var i = 0; i < this.map.length; i++) {
            for(var j = 0; j < this.map[i].length; j++) {
                x = this.world.width/2 + (j - this.map[i].length/2)*this.spriteSize*this.spriteScale;
                y = this.world.height/2 + (i - this.map.length/2)*this.spriteSize*this.spriteScale;
                s = this.add.sprite(x, y, 'grass');
                /*s = this.add.sprite(j*this.spriteSize*this.spriteScale, i*this.spriteSize*this.spriteScale, 'grass');*/
                s.scale.setTo(this.spriteScale);
                s.anchor.setTo(0.5, 0.5);
                s.smoothed = false;
            }
        }

        /*this.players.p1.sprite = this.add.sprite(0, 0, 'player');*/
        var sx = this.world.width/2 - this.map[0].length/2*this.spriteSize*this.spriteScale;
        var sy = this.world.height/2 - this.map.length/2*this.spriteSize*this.spriteScale;
        this.players.p1.sprite = this.add.sprite(sx, sy, 'player');
        this.players.p1.xPos = 0;
        this.players.p1.yPos = 0;
        this.players.p1.sprite.scale.setTo(this.spriteScale);
        this.players.p1.sprite.anchor.setTo(0.5, 0.5);
        this.players.p1.sprite.smoothed = false;

        /*this.players.p2.sprite = this.add.sprite(this.spriteSize*9*this.spriteScale, this.spriteSize*9*this.spriteScale, 'player');*/
        sx = this.world.width/2 + (9 - this.map[9].length/2)*this.spriteSize*this.spriteScale;
        sy = this.world.height/2 + (9 - this.map.length/2)*this.spriteSize*this.spriteScale;
        this.players.p2.sprite = this.add.sprite(sx, sy, 'player');
        this.players.p2.sprite.scale.setTo(this.spriteScale);
        this.players.p2.sprite.scale.x *= -1;
        this.players.p2.sprite.anchor.setTo(0.5, 0.5);
        this.players.p2.sprite.smoothed = false;

        /*this.world.setBounds(0, 0, this.spriteSize*10*this.spriteScale, this.spriteSize*10*this.spriteScale);*/
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.enable(this.players.p1.sprite);
        this.physics.enable(this.players.p2.sprite);

        /*this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = {
            w: this.input.keyboard.addKey(Phaser.Keyboard.W),
            a: this.input.keyboard.addKey(Phaser.Keyboard.A),
            s: this.input.keyboard.addKey(Phaser.Keyboard.S),
            d: this.input.keyboard.addKey(Phaser.Keyboard.D)
        }*/
        this.players.p1.controls = {
            left: this.input.keyboard.addKey(Phaser.Keyboard.A).onDown.add(function(){this.turnLeft(this.players.p1)}, this),
            right: this.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(function(){this.turnRight(this.players.p1)}, this)
        }
        this.players.p2.controls = {
            left: this.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(function(){this.turnLeft(this.players.p2)}, this),
            right: this.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(function(){this.turnRight(this.players.p2)}, this)
        }

        this.camera.setSize(this.spriteSize*10, this.spriteSize*10);
        this.camera.setPosition(0, 0);

        //this.camera.focusOnXY(0, 0);
        //this.camera.follow(this.players.p1.sprite);
        this.camera.setBoundsToWorld();
    },
    posMod: function(a, n) {
        /*console.log(a, " mod ", n);*/
        return ((a%n)+n)%n;
    },
    turn: function(player) {
        if(player.canMove) {
            if(player.controls.left.isDown) {
                /*console.log("left");*/
                player.direction = this.posMod(player.direction - 1, 4);
                player.canMove = false;
            }
            else if(player.controls.right.isDown) {
                /*console.log("right");*/
                player.direction = this.posMod(player.direction + 1, 4);
                player.canMove = false;
            }
        }
    },
    move: function(player) {
        var destx = player.sprite.x;
        var desty = player.sprite.y;
        if(player.direction == 0) {
            /*player.sprite.y -= this.spriteSize*this.spriteScale;*/

            /*var dest = Phaser.Math.snapTo(this.spriteSize*this.spriteScale, this.spriteSize*this.spriteScale);
            player.sprite.body.moveTo(this.music.halfBeat, dest, 270);*/

            desty -= this.spriteSize * this.spriteScale;

            player.yPos--;
        }
        else if(player.direction == 1) {
            /*player.sprite.x += this.spriteSize*this.spriteScale;*/

            /*var dest = Phaser.Math.snapTo(this.spriteSize*this.spriteScale, this.spriteSize*this.spriteScale);
            player.sprite.body.moveTo(this.music.halfBeat, dest, 0);*/

            destx += this.spriteSize * this.spriteScale;

            player.xPos++;
        }
        else if(player.direction == 2) {
            /*player.sprite.y += this.spriteSize*this.spriteScale;*/

            /*var dest = Phaser.Math.snapTo(this.spriteSize*this.spriteScale, this.spriteSize*this.spriteScale);
            player.sprite.body.moveTo(this.music.halfBeat, dest, 90);*/

            desty += this.spriteSize * this.spriteScale;

            player.yPos++;
        }
        else if(player.direction == 3) {
            /*player.sprite.x -= this.spriteSize*this.spriteScale;*/

            /*var dest = Phaser.Math.snapTo(this.spriteSize*this.spriteScale, this.spriteSize*this.spriteScale);
            player.sprite.body.moveTo(this.music.halfBeat, dest, 180);*/

            destx -= this.spriteSize * this.spriteScale;

            player.xPos--;
        }
        player.tween = this.add.tween(player.sprite).to( { x: destx, y: desty }, 100);
        player.tween.start();
    },
    validMove: function(player) {
        if(player.direction == 0 && player.yPos > 0 && this.map[player.xPos][player.yPos - 1] == 1) return true;
        else if(player.direction == 1 && player.xPos < 9 && this.map[player.xPos + 1][player.yPos] == 1) return true;
        else if(player.direction == 2 && player.yPos < 9 && this.map[player.xPos][player.yPos + 1] == 1) return true;
        else if(player.direction == 3 && player.xPos > 0 && this.map[player.xPos - 1][player.yPos] == 1) return true;
        return false;
    },
    update: function() {
        /*this.turn(this.players.p1);
        this.turn(this.players.p2);*/
        /*console.log(this.players.p2.direction);*/

        /*if (this.wasd.w.isDown) this.players.p1.direction = 0;
        else if (this.wasd.d.isDown) this.players.p1.direction = 1;
        else if (this.wasd.s.isDown) this.players.p1.direction = 2;
        else if (this.wasd.a.isDown) this.players.p1.direction = 3;

        if (this.cursors.up.isDown) this.players.p2.direction = 0;
        else if (this.cursors.right.isDown) this.players.p2.direction = 1;
        else if (this.cursors.down.isDown) this.players.p2.direction = 2;
        else if (this.cursors.left.isDown) this.players.p2.direction = 3;*/

        if(this.music.track.currentTime > this.music.lastBeat + this.music.beat) {
            if(this.validMove(this.players.p1)) this.move(this.players.p1);
            if(this.validMove(this.players.p2)) this.move(this.players.p2);
            this.music.lastBeat += this.music.beat;
            /*this.players.p1.canMove = true;
            this.players.p2.canMove = true;*/
            // this.players.p1.sprite.x = Phaser.Math.snapTo(this.players.p1.sprite.x, this.spriteSize*this.spriteScale);
            // this.players.p1.sprite.y = Phaser.Math.snapTo(this.players.p1.sprite.y, this.spriteSize*this.spriteScale);
        }
    }
}
