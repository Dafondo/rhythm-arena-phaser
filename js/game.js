var RhythmArena = RhythmArena || {};

RhythmArena.Game = function(){};

RhythmArena.Game.prototype = {
    spriteScale: 2,
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
    players: {
        p1: {
            sprite: null,
            direction: 1
        },
        p2: {
            sprite: null,
            direction: 3
        }
    },
    music: {
        track: null,
        bpm: 0,
        beat: 0,
        halfBeat: 0,
        lastBeat: 0
    }
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

        this.players.p1.sprite = this.add.sprite(0, 0, 'player');
        this.players.p1.sprite.scale.setTo(this.spriteScale);
        this.players.p1.sprite.anchor.setTo(0, 0);
        this.players.p1.sprite.smoothed = false;

        this.players.p2.sprite = this.add.sprite(32*9*spriteScale, 32*9*spriteScale, 'player');
        this.players.p2.sprite.scale.setTo(this.spriteScale);
        this.players.p2.sprite.anchor.setTo(0, 0);
        this.players.p2.sprite.smoothed = false;

        this.world.setBounds(0, 0, 320*this.spriteScale, 320*this.spriteScale);
        // this.physics.startSystem(Phaser.Physics.ARCADE);
        // this.physics.enable(this.players.p1.sprite);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.camera.setSize(320, 320);
        this.camera.setPosition(0, 0);
        //this.camera.focusOnXY(0, 0);
        //this.camera.follow(this.players.p1.sprite);
        this.camera.setBoundsToWorld();
    },
    move: function(player) {
        if(player.direction == 0) player.sprite.y -= 32*this.spriteScale;
        else if(player.direction == 1) player.sprite.x += 32*this.spriteScale;
        else if(player.direction == 2) player.sprite.y += 32*this.spriteScale;
        else if(player.direction == 3) player.sprite.x -= 32*this.spriteScale;
    }
    update: function() {
        if (this.cursors.W.isDown) this.players.p1.direction = 0;
        else if (this.cursors.D.isDown) this.players.p1.direction = 1;
        else if (this.cursors.S.isDown) this.players.p1.direction = 2;
        else if (this.cursors.A.isDown) this.players.p1.direction = 3;

        if (this.cursors.up.isDown) this.players.p2.direction = 0;
        else if (this.cursors.right.isDown) this.players.p2.direction = 1;
        else if (this.cursors.down.isDown) this.players.p2.direction = 2;
        else if (this.cursors.left.isDown) this.players.p2.direction = 3;

        if(this.music.track.currentTime > this.music.lastBeat + this.music.beat) {
            this.move(this.players.p1);
            this.move(this.players.p2);
            this.music.lastBeat += this.music.beat;
        }
    },
    render: function() {
        // this.debug.soundInfo(this.music.track, 20, 32);
    }
};
