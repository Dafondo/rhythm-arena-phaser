var RhythmArena = RhythmArena || {};

RhythmArena.MainMenu = function(){};
var music
RhythmArena.MainMenu.prototype = {
    music: null,
    gameButton: null,
    snakeButton: null,
    cursors: null,
    startGame: function() {
        this.game.state.start('GameSettings');
        // if(music.isDecoded) this.game.state.start('GameSettings');
    },
    startSnake: function() {
        if(music.isDecoded) this.game.state.start('SnakeGame', true, false);
    },
    confirm() {
        this.game.state.start('GameSettings');
    },
    create: function() {
        this.stage.backgroundColor = '#ffffff';
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'starry');
        this.background.smoothed = false;
        this.background.autoScroll(-20, 0);

        music = this.add.audio('80');

        this.gameButton = this.add.button(this.game.width/2, this.game.height/2, 'gobutton', this.startGame);
        this.gameButton.anchor.setTo(0.5, 0.5);
        this.gameButton.scale.setTo(5);
        this.gameButton.smoothed = false;

        this.snakeButton = this.add.button(this.game.width/2, 400, 'logo', this.startSnake);

        this.cursors = {
            left: this.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(this.confirm, this),
            right: this.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(this.confirm, this)
        }
        // var text = "Click to begin";
        // var style = { font: "30px Arial", fill: "#fff", align: "center"};
        // var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
        // t.anchor.set(0.5);
        // t.stroke = "#000000";
        // t.strokeThickness = 6;
    },
    update: function() {
        // if(this.game.input.activePointer.justPressed()) {
        //     if(music.isDecoded) this.game.state.start('SnakeGame');
        // }
    }
};
