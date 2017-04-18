var RhythmArena = RhythmArena || {};

RhythmArena.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO);

RhythmArena.game.global = {
    menuMusic: null
}

RhythmArena.game.state.add('Boot', RhythmArena.Boot);
RhythmArena.game.state.add('Preload', RhythmArena.Preload);
RhythmArena.game.state.add('MainMenu', RhythmArena.MainMenu);
RhythmArena.game.state.add('GameSettings', RhythmArena.GameSettings);
RhythmArena.game.state.add('ChooseMap', RhythmArena.ChooseMap);
RhythmArena.game.state.add('ChooseChars', RhythmArena.ChooseChars);
RhythmArena.game.state.add('ChooseSong', RhythmArena.ChooseSong);
RhythmArena.game.state.add('ChooseRate', RhythmArena.ChooseRate);
RhythmArena.game.state.add('MapPreview', RhythmArena.MapPreview);
RhythmArena.game.state.add('MainGame', RhythmArena.MainGame);
RhythmArena.game.state.add('SnakeGame', RhythmArena.SnakeGame);
RhythmArena.game.state.add('SnakeEnd', RhythmArena.SnakeEnd);

RhythmArena.game.state.start('Boot');
