var RhythmArena = RhythmArena || {};

RhythmArena.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO);

RhythmArena.game.state.add('Boot', RhythmArena.Boot);
RhythmArena.game.state.add('Preload', RhythmArena.Preload);
RhythmArena.game.state.add('MainMenu', RhythmArena.MainMenu);
RhythmArena.game.state.add('MainGame', RhythmArena.MainGame);
RhythmArena.game.state.add('SnakeGame', RhythmArena.SnakeGame);
RhythmArena.game.state.add('SnakeEnd', RhythmArena.SnakeEnd);

RhythmArena.game.state.start('Boot');
