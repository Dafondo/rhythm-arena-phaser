var RhythmArena = RhythmArena || {};

RhythmArena.ChooseRate = function(){};

RhythmArena.ChooseRate.prototype = {
    choices: null,
    rates: [
        {
            name: '1/4',
            value: '0.25',
                callback: function() {
                this.selectNext(0);
                this.choices.bpmRate = 0.25;
                this.selectChoice(0);
            }
        },
        {
            name: '1/2',
            value: '0.5',
                callback: function() {
                this.selectNext(1);
                this.choices.bpmRate = 0.5;
                this.selectChoice(1);
            }
        },
        {
            name: '1',
            value: '1',
            callback: function() {
                this.selectNext(2);
                this.choices.bpmRate = 1;
                this.selectChoice(2);
            }
        },
        {
            name: '2',
            value: '2',
            callback: function() {
                this.selectNext(3);
                this.choices.bpmRate = 2;
                this.selectChoice(3);
            }
        },
        {
            name: '4',
            value: '4',
            callback: function() {
                this.selectNext(4);
                this.choices.bpmRate = 4;
                this.selectChoice(4);
            }
        }
    ],
    returnToPrev: function() {
        this.game.state.start('GameSettings', true, false, this.choices);
    },
    pointer: {
        sprite: null,
        position: 2
    },
    cursors: null,
    selection: 2,
    posMod: function(a, n) {
        return ((a%n)+n)%n;
    },
    confirm: function() {
        if(this.selection < this.rates.length) {
            this.rates[this.selection].callback.call(this);
        }
        else this.returnToPrev();
    },
    selectNext: function(i) {
        this.menuGroup.getAt(this.selection).fill = 'white';
        if(i != null) this.selection = i;
        else this.selection = this.posMod(this.selection + 1, this.rates.length + 1);
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

        for(var i = 0; i < this.rates.length; i++) {
            var text = "x" + this.rates[i].name;
            var style = { font: "30px Arial", fill: "#fff", align: "center"};
            var t = this.game.add.text(this.game.width/2, this.game.height/(this.rates.length + 1) * (i + 1), text, style);
            t.anchor.set(0.5);
            t.stroke = "#000000";
            t.strokeThickness = 6;
            t.inputEnabled = true;
            t.events.onInputDown.add(this.rates[i].callback, this);
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

        this.pointer.sprite = this.add.sprite(this.game.width/2, this.game.height/(this.rates.length+1) - 50, 'arrow');
        this.pointer.sprite.anchor.set(0.5, 0.5);
        this.pointer.sprite.angle = 90;
        this.pointer.sprite.smoothed = false;
        this.pointer.sprite.scale.setTo(2);
    },
    update: function() {
        this.pointer.sprite.y = this.game.height/(this.rates.length+1)*(this.pointer.position+1) - 50;
    }
}
