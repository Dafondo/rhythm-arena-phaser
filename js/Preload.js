var RhythmArena = RhythmArena || {};

RhythmArena.Preload = function(){};

RhythmArena.Preload.prototype = {
    /*init: function() {
    },*/
    preload: function() {
        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        this.splash.anchor.setTo(0.5);

        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.preloadBar);

        this.load.image('grass', 'assets/sprites/grass.png');
        this.load.image('block', 'assets/sprites/block.png');
        this.load.image('player', 'assets/sprites/ghost.png');
        this.load.image('arrow', 'assets/sprites/arrow.png');
        this.load.image('gobutton', 'assets/sprites/gobutton.png');
        this.load.image('canoe-bear', 'assets/sprites/canoe-bear.png');
        this.load.audio('80', 'assets/audio/80.mp3');
    },
    create: function() {
        this.state.start('MainMenu');
    }
};
