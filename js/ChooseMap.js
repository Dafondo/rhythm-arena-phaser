var RhythmArena = RhythmArena || {};

RhythmArena.ChooseMap = function(){};

RhythmArena.ChooseMap.prototype = {
    choices: null,
    showPreview: function(i) {
        // console.log(this.maps[i].map)
        this.game.state.start('MapPreview', true, false, i, this.maps[i].map);
    },
    pointer: {
        sprite: null,
        position: 0
    },
    maps: [
        {
            map: mapList[0],
            callback: function() {
                this.selectNext(0);
                this.choices.mapChoice = 0;
                this.showPreview(0);
            }
        },
        {
            map: mapList[1],
            callback: function() {
                this.selectNext(1);
                this.choices.mapChoice = 1;
                this.showPreview(1);
            }
        },
        {
            map: mapList[2],
            callback: function() {
                this.selectNext(2);
                this.choices.mapChoice = 2;
                this.showPreview(2);
            }
        },
        {
            map: mapList[3],
            callback: function() {
                this.selectNext(3);
                this.choices.mapChoice = 3;
                this.showPreview(3);
            }
        },
        {
            map: mapList[4],
            callback: function() {
                this.selectNext(4);
                this.choices.mapChoice = 4;
                this.showPreview(4);
            }
        }
    ],
    returnToPrev: function() {
        this.game.state.start('GameSettings', true, false, this.choices);
    },
    cursors: null,
    selection: 0,
    posMod: function(a, n) {
        return ((a%n)+n)%n;
    },
    confirm: function() {
        if(this.selection < this.maps.length) {
            this.maps[this.selection].callback.call(this);
        }
        else this.returnToPrev();
    },
    selectNext: function(i) {
        this.menuGroup.getAt(this.selection).fill = 'white';
        if(i != null) this.selection = i;
        else this.selection = this.posMod(this.selection + 1, this.maps.length + 1);
        this.menuGroup.getAt(this.selection).fill = 'red';
    },
    init: function(choices, map, pointerPos) {
        if(choices != null) this.choices = choices;
        if(map != null) {
            this.choices.mapChoice = map;
            this.pointer.position = map;
        }
    },
    preload: function() {

    },
    create: function() {
        this.stage.backgroundColor = '#ffffff';
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'starry');
        this.background.smoothed = false;
        this.background.autoScroll(-20, 0);

        this.menuGroup = this.add.group();

        for(var i = 0; i < this.maps.length; i++) {
            var text = "Map " + (i + 1);
            var style = { font: "30px Arial", fill: "#fff", align: "center"};
            var t = this.game.add.text(this.game.width/2, this.game.height/(this.maps.length + 1) * (i + 1), text, style);
            t.anchor.set(0.5);
            t.stroke = "#000000";
            t.strokeThickness = 6;
            t.inputEnabled = true;
            t.events.onInputDown.add(this.maps[i].callback, this);
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

        this.pointer.sprite = this.add.sprite(this.game.width/2, this.game.height/(this.maps.length+1) - 50, 'arrow');
        this.pointer.sprite.anchor.set(0.5, 0.5);
        this.pointer.sprite.angle = 90;
        this.pointer.sprite.smoothed = false;
        this.pointer.sprite.scale.setTo(2);

        this.cursors = {
            left: this.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(this.confirm, this),
            right: this.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(function(){ this.selectNext(null); }, this)
        }
    },
    update: function() {
        this.pointer.sprite.y = this.game.height/(this.maps.length+1)*(this.pointer.position+1) - 50;
    }
}
