var RhythmArena = RhythmArena || {};

RhythmArena.Game = function(){};

var scale = 2;
var map = [
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
];

var s;
var player;
var direction = 1;

var music;
var bpm;
var beat;
var halfBeat;
var lastBeat;

var cursors;

RhythmArena.Game.prototype = {
    create: function() {
        this.stage.backgroundColor = '#182d3b';
        this.input.touch.preventDefault = false;

        music = this.add.audio('80', 1, true);
        bpm = 80;
        beat = 60000.0/bpm;
        halfBeat = beat/2;
        lastBeat = 0;

        music.play();

        for(var i = 0; i < map.length; i++) {
            for(var j = 0; j < map[i].length; j++) {
                s = this.add.sprite(j*32*scale, i*32*scale, 'grass');
                s.scale.setTo(scale);
                s.anchor.setTo(0, 0);
                s.smoothed = false;
            }
        }

        player = this.add.sprite(0, 0, 'player');
        player.scale.setTo(scale);
        player.anchor.setTo(0, 0);
        player.smoothed = false;

        this.world.setBounds(0, 0, 320*scale, 320*scale);
        // this.physics.startSystem(Phaser.Physics.ARCADE);
        // this.physics.enable(player);

        cursors = this.input.keyboard.createCursorKeys();

        this.camera.setSize(320, 320);
        this.camera.setPosition(0, 0);
        //this.camera.focusOnXY(0, 0);
        //this.camera.follow(player);
        this.camera.setBoundsToWorld();
    },
    update: function() {
        if (cursors.up.isDown) direction = 0;
        else if (cursors.right.isDown) direction = 1;
        else if (cursors.down.isDown) direction = 2;
        else if (cursors.left.isDown) direction = 3;

        if(music.currentTime > lastBeat + beat) {
            if(direction == 0) player.y -= 32*scale;
            else if(direction == 1) player.x += 32*scale;
            else if(direction == 2) player.y += 32*scale;
            else if(direction == 3) player.x -= 32*scale;
            lastBeat += beat;
        }
    },
    render: function() {
        // this.debug.soundInfo(music, 20, 32);
    }
};
