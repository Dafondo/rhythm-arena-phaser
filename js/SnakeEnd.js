var RhythmArena = RhythmArena || {};

RhythmArena.SnakeEnd = function(){};

RhythmArena.SnakeEnd.prototype = {
    score: "",
    init: function(s) {
        this.score = s;
    },
    preload: function() {

    },
    create: function() {
        this.stage.backgroundColor = '#000000';
        var text = "Your score: " + this.score + "\nClick to return to menu";
        var style = { font: "30px Arial", fill: "#fff", align: "center"};
        var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
        t.anchor.set(0.5);
        t.stroke = "#000000";
        t.strokeThickness = 6;
    },
    update: function() {
        if(this.game.input.activePointer.justPressed()) {
            if(music.isDecoded) this.game.state.start('MainMenu');
        }
    }
}
