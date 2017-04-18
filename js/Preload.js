var RhythmArena = RhythmArena || {};

RhythmArena.Preload = function(){};

var mapList = [
    [
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
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 1, 1, 0, 1, 1, 1, 1],
        [1, 1, 0, 1, 1, 0, 1, 1, 1, 1],
        [1, 1, 0, 1, 1, 0, 0, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
]

var musicList = [
    '80',
    'SummerDay',
    'LastKissGoodnight',
    'MaccaryBay',
    'TooCool',
    'SaltyDitty',
    'Wepa',
    'MiamiViceroy'
]

RhythmArena.Preload.prototype = {
    init: function() {
    },
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
        this.load.image('starry', 'assets/sprites/starry.png');
        this.load.image('note', 'assets/sprites/note.png');
        this.load.audio('80', 'assets/audio/80.mp3');
        this.load.audio('Wepa', 'assets/audio/Wepa.mp3');
        this.load.audio('MiamiViceroy', 'assets/audio/miamiviceroy.mp3');
        this.load.audio('LastKissGoodnight', 'assets/audio/LastKissGoodnight.mp3');
        this.load.audio('MaccaryBay', 'assets/audio/MaccaryBay.mp3');
        this.load.audio('SaltyDitty', 'assets/audio/SaltyDitty.mp3');
        this.load.audio('SummerDay', 'assets/audio/SummerDay.mp3');
        this.load.audio('TooCool', 'assets/audio/TooCool.mp3');
        this.load.audio('baa', 'assets/audio/baa.mp3');
    },
    create: function() {
        menuMusic = this.add.audio('SummerDay', 1, true);
        this.state.start('MainMenu');
        menuMusic.play();
    }
};
