var game = new Phaser.Game(720, 720, Phaser.AUTO, "", { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('grass', 'assets/sprites/grass.png');
    game.load.image('block', 'assets/sprites/block.png');
    game.load.image('player', 'assets/sprites/ghost.png');

    game.load.audio('80', 'assets/audio/80.mp3');

}

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

function create() {
    game.stage.backgroundColor = '#182d3b';
    game.input.touch.preventDefault = false;

    music = game.add.audio('80', 1, true);
    bpm = 80;
    beat = 60000.0/bpm;
    halfBeat = beat/2;
    lastBeat = 0;

    music.play();

    for(var i = 0; i < map.length; i++) {
        for(var j = 0; j < map[i].length; j++) {
            s = game.add.sprite(j*32*scale, i*32*scale, 'grass');
            s.scale.setTo(scale);
            s.anchor.setTo(0, 0);
            s.smoothed = false;
        }
    }

    player = game.add.sprite(0, 0, 'player');
    player.scale.setTo(scale);
    player.anchor.setTo(0, 0);
    player.smoothed = false;

    game.world.setBounds(0, 0, 320*scale, 320*scale);
    // game.physics.startSystem(Phaser.Physics.ARCADE);
    // game.physics.enable(player);

    cursors = game.input.keyboard.createCursorKeys();

    game.camera.setSize(320, 320);
    game.camera.setPosition(0, 0);
    //game.camera.focusOnXY(0, 0);
    //game.camera.follow(player);
    game.camera.setBoundsToWorld();
}

function update() {
    if (cursors.up.isDown) direction = 0;
    else if (cursors.right.isDown) direction = 1;
    else if (cursors.down.isDown) direction = 2;
    else if (cursors.left.isDown) direction = 3;

    if(music.currentTime > lastBeat + beat) {
        move();
        lastBeat += beat;
    }
}

function render() {
    game.debug.soundInfo(music, 20, 32);
}

function move() {
    if(direction == 0) player.y -= 32*scale;
    else if(direction == 1) player.x += 32*scale;
    else if(direction == 2) player.y += 32*scale;
    else if(direction == 3) player.x -= 32*scale;
}
