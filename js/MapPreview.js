
var RhythmArena = RhythmArena || {};

RhythmArena.MapPreview = function(){};

RhythmArena.MapPreview.prototype = {
    map: null,
    mapChoice: 0,
    returnToPrev: function() {
        this.game.state.start('ChooseMap', true, false, null, this.mapChoice);
    },
    init: function(i, map) {
        this.map = map;
        this.mapChoice = i;
    },
    preload: function() {

    },
    grassGroup: null,
    depthGroup: null,
    arrowGroup: null,
    spriteSize: 32,
    spriteScale: 1,
    cursors: null,
    create: function() {
        this.stage.backgroundColor = '#ffffff';
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'starry');
        this.background.smoothed = false;
        this.background.autoScroll(-20, 0);

        this.grassGroup = this.add.group();
        this.depthGroup = this.add.group();
        this.arrowGroup = this.add.group();

        for(var i = -1; i <= this.map.length; i++) {
            for(var j = -1; j <= this.map[0].length; j++) {
                x = this.world.width/2 + (j - this.map[0].length/2)*this.spriteSize*this.spriteScale;
                y = this.world.height/2 + (i - this.map.length/2)*this.spriteSize*this.spriteScale;
                var s;
                if(i < 0 || i >= this.map.length || j < 0 || j >= this.map.length) {
                    s = this.depthGroup.create(x, y, 'block'); //this.add.sprite(x, y, 'block');
                    s.anchor.setTo(0.5, 38/52);
                }
                else {
                    if(this.map[i][j] === 0) {
                        s = this.depthGroup.create(x, y, 'block'); //this.add.sprite(x, y, 'block');
                        s.anchor.setTo(0.5, 38/52);
                    }
                    else if (this.map[i][j] === 1) {
                        s = this.grassGroup.create(x, y, 'grass'); //this.add.sprite(x, y, 'grass');
                        s.anchor.setTo(0.5, 0.5);
                    }
                }
                /*s = this.add.sprite(j*this.spriteSize*this.spriteScale, i*this.spriteSize*this.spriteScale, 'grass');*/
                s.scale.setTo(this.spriteScale);
                s.smoothed = false;
            }
        }

        this.camera.setSize(this.spriteSize*10, this.spriteSize*10);
        this.camera.setPosition(0, 0);

        var text = "Back";
        var style = { font: "30px Arial", fill: "#fff", align: "center"};
        var t = this.game.add.text(80, 40, text, style);
        t.anchor.set(0.5);
        t.fill = 'red';
        t.stroke = "#000000";
        t.strokeThickness = 6;
        t.inputEnabled = true;
        t.events.onInputDown.add(this.returnToPrev, this);

        this.cursors = {
            left: this.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(this.returnToPrev, this),
            right: this.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(this.returnToPrev, this)
        }
    }
}
