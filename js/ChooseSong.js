var RhythmArena = RhythmArena || {};

RhythmArena.ChooseSong = function(){};

RhythmArena.ChooseSong.prototype = {
    choices: null,
    songs: [
        {
            name: 'Metronome: 80 bpm',
            callback: function() {
                this.selectNext(0);
                this.choices.songChoice = 0;
                this.selectChoice(0);
            }
        },
        {
            name: 'other',
            callback: function() {
                this.selectNext(1);
                this.choices.songChoice = 1;
                this.selectChoice(1);
            }
        }
    ],
    returnToPrev: function() {
        this.game.state.start('GameSettings', true, false, this.choices);
    },
    pointer: {
        sprite: null,
        position: 0
    },
    cursors: null,
    selection: 0,
    posMod: function(a, n) {
        return ((a%n)+n)%n;
    },
    confirm: function() {
        if(this.selection < this.songs.length) {
            this.songs[this.selection].callback.call(this);
        }
        else this.returnToPrev();
    },
    selectNext: function(i) {
        this.menuGroup.getAt(this.selection).fill = 'white';
        if(i != null) this.selection = i;
        else this.selection = this.posMod(this.selection + 1, this.songs.length + 1);
        this.menuGroup.getAt(this.selection).fill = 'red';
    },
    selectChoice: function(i) {
        this.pointer.position = i;
    },
    init: function(choices) {
        if(choices != null) this.choices = choices;
    },
    preload: function() {

    },
    create: function() {
        this.stage.backgroundColor = '#ffffff';
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'starry');
        this.background.smoothed = false;
        this.background.autoScroll(-20, 0);

        this.menuGroup = this.add.group();

        for(var i = 0; i < this.songs.length; i++) {
            var text = this.songs[i].name;
            var style = { font: "30px Arial", fill: "#fff", align: "center"};
            var t = this.game.add.text(this.game.width/2, this.game.height/(this.songs.length + 1) * (i + 1), text, style);
            t.anchor.set(0.5);
            t.stroke = "#000000";
            t.strokeThickness = 6;
            t.inputEnabled = true;
            t.events.onInputDown.add(this.songs[i].callback, this);
            this.menuGroup.add(t);
        }

        var text = "Confirm";
        var style = { font: "30px Arial", fill: "#fff", align: "center"};
        var t = this.game.add.text(this.game.width/2, this.game.height - 10, text, style);
        t.anchor.set(0.5);
        t.stroke = "#000000";
        t.strokeThickness = 6;
        t.inputEnabled = true;
        t.events.onInputDown.add(this.returnToPrev, this);
        this.menuGroup.add(t);

        this.menuGroup.getAt(this.selection).fill = 'red';

        this.cursors = {
            left: this.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(this.confirm, this),
            right: this.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(function(){ this.selectNext(null); }, this)
        }

        this.pointer.sprite = this.add.sprite(this.game.width/2, this.game.height/(this.songs.length+1) - 50, 'arrow');
        this.pointer.sprite.anchor.set(0.5, 0.5);
        this.pointer.sprite.angle = 90;
        this.pointer.sprite.smoothed = false;
        this.pointer.sprite.scale.setTo(2);
    },
    update: function() {
        this.pointer.sprite.y = this.game.height/(this.songs.length+1)*(this.pointer.position+1) - 50;
    }
}
