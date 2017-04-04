var RhythmArena = RhythmArena || {};

RhythmArena.MainGame = function(){};

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
    spriteScale: 2,
    player1: {
        direction: 1,
        xPos: 0,
        yPos: 0,
    },
    music: {
        track: null,
        bpm: 0,
        beat: 0,
        halfBeat: 0,
        lastBeat: 0
    },
    cursors: null,
    create: function() {
        this.stage.backgroundColor = '#182d3b';
        this.input.touch.preventDefault = false;

        this.music.track = this.add.audio('80', 1, true);
        this.music.bpm = 80;
        this.music.beat = 60000.0/this.music.bpm;
        this.music.halfBeat = this.music.beat/2;
        this.music.lastBeat = 0;

        this.music.track.play();

        for(var i = 0; i < this.map.length; i++) {
            for(var j = 0; j < this.map[i].length; j++) {
                s = this.add.sprite(j*32*this.spriteScale, i*32*this.spriteScale, 'grass');
                s.scale.setTo(this.spriteScale);
                s.anchor.setTo(0, 0);
                s.smoothed = false;
            }
        }

        this.player1.sprite = this.add.sprite(0, 0, 'player');
        this.player1.xPos = 0;
        this.player1.yPo = 0;
        this.player1.sprite.scale.setTo(this.spriteScale);
        this.player1.sprite.anchor.setTo(0, 0);
        this.player1.sprite.smoothed = false;

        this.world.setBounds(0, 0, 320*this.spriteScale, 320*this.spriteScale);
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.enable(this.player1.sprite);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.camera.setSize(320, 320);
        this.camera.setPosition(0, 0);
        //this.camera.focusOnXY(0, 0);
        //this.camera.follow(this.player1.sprite);
        this.camera.setBoundsToWorld();
    },
    move: function() {
        if(this.player1.direction == 0) {
            this.player1.sprite.y -= 32*this.spriteScale; //this.player1.sprite.body.moveTo(this.music.halfBeat, 32*this.spriteScale, 270);
            this.player1.yPo--;
        }
        else if(this.player1.direction == 1) {
            this.player1.sprite.x += 32*this.spriteScale; //this.player1.sprite.body.moveTo(this.music.halfBeat, 32*this.spriteScale, 0);
            this.player1.xPos++;
        }
        else if(this.player1.direction == 2) {
            this.player1.sprite.y += 32*this.spriteScale; //this.player1.sprite.body.moveTo(this.music.halfBeat, 32*this.spriteScale, 90);
            this.player1.yPo++;
        }
        else if(this.player1.direction == 3) {
            this.player1.sprite.x -= 32*this.spriteScale; //this.player1.sprite.body.moveTo(this.music.halfBeat, 32*this.spriteScale, 180);
            this.player1.xPos--;
        }
    },
    validMove: function(direction) {
        if(this.player1.direction == 0 && this.player1.yPo > 0 && this.map[this.player1.xPos][this.player1.yPo - 1] == 1) return true;
        else if(this.player1.direction == 1 && this.player1.xPos < 9 && this.map[this.player1.xPos + 1][this.player1.yPo] == 1) return true;
        else if(this.player1.direction == 2 && this.player1.yPo < 9 && this.map[this.player1.xPos][this.player1.yPo + 1] == 1) return true;
        else if(this.player1.direction == 3 && this.player1.xPos > 0 && this.map[this.player1.xPos - 1][this.player1.yPo] == 1) return true;
        return false;
    },
    update: function() {
        if (this.cursors.up.isDown) this.player1.direction = 0;
        else if (this.cursors.right.isDown) this.player1.direction = 1;
        else if (this.cursors.down.isDown) this.player1.direction = 2;
        else if (this.cursors.left.isDown) this.player1.direction = 3;

        if(this.music.track.currentTime > this.music.lastBeat + this.music.beat) {
            if(this.validMove(this.player1.direction)) this.move();
            this.music.lastBeat += this.music.beat;
            // this.player1.sprite.x = Phaser.Math.snapTo(this.player1.sprite.x, 32*this.spriteScale);
            // this.player1.sprite.y = Phaser.Math.snapTo(this.player1.sprite.y, 32*this.spriteScale);
        }
    }
}
