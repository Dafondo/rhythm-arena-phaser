var RhythmArena = RhythmArena || {};

RhythmArena.GameSettings = function(){};
RhythmArena.GameSettings.prototype = {
    menuOptions: [
        {
            name: 'Choose Map',
            callback: function() {
                this.game.state.start('ChooseMap', true, false, this.choices, null);
            }
        },
        {
            name: 'Choose Characters',
            callback: function() {
                this.game.state.start('ChooseChars');
            }
        },
        {
            name: 'Choose Song',
            callback: function() {
                this.game.state.start('ChooseSong', true, false, this.choices);
            }
        },
        {
            name: 'Choose Rate',
            callback: function() {
                this.game.state.start('ChooseRate', true, false, this.choices);
            }
        },
        {
            name: 'Start',
            callback: function() {
                menuMusic.stop();
                // this.game.state.start('MainGame', true, false, this.choices);
                if(music.isDecoded) this.game.state.start('MainGame', true, false, this.choices);
            }
        }
    ],
    menuGroup: null,
    choices: {
        mapChoice: 0,
        p1Char: 0,
        p2Char: 0,
        songChoice: 0,
        bpmRate: 1
    },
    cursors: null,
    selection: 0,
    posMod: function(a, n) {
        return ((a%n)+n)%n;
    },
    confirm: function() {
        this.menuOptions[this.selection].callback.call(this);
    },
    selectNext: function() {
        this.menuGroup.getAt(this.selection).fill = 'white';
        this.selection = this.posMod(this.selection + 1, this.menuOptions.length);
        this.menuGroup.getAt(this.selection).fill = 'red';
        // console.log(this.selection);
        // console.log(this.menuOptions[this.selection].name);
    },
    init: function(choices) {
        if(choices != null) this.choices = choices;
    },
    preload: function() {

    },
    create: function() {
        // this.stage.backgroundColor = '#ffffff';
        this.stage.backgroundColor = '#ffffff';
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'starry');
        this.background.smoothed = false;
        this.background.autoScroll(-20, 0);

        this.menuGroup = this.add.group();

        for(var i = 0; i < this.menuOptions.length; i++) {
            var text = this.menuOptions[i].name;
            var style = { font: "30px Arial", fill: "#fff", align: "center"};
            var t = this.add.text(this.game.width/2, this.game.height/(this.menuOptions.length + 1) * (i + 1), text, style);
            t.anchor.set(0.5);
            t.stroke = "#000000";
            t.strokeThickness = 6;
            t.inputEnabled = true;
            t.events.onInputDown.add(this.menuOptions[i].callback, this);
            this.menuGroup.add(t);
        }

        this.menuGroup.getAt(this.selection).fill = 'red';

        this.cursors = {
            left: this.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(this.confirm, this),
            right: this.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(this.selectNext, this)
        }
    }
}
