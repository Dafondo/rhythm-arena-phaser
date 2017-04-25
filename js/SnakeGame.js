var RhythmArena = RhythmArena || {};

var scale = 2;

var s;
var player;
var direction = 1;
var xPos;
var yPos;

var music;
var bpm;
var beat;
var halfBeat;
var lastBeat;

var cursors;

var that;

RhythmArena.SnakeGame = function(game){};

RhythmArena.SnakeGame.prototype = {
    map: [
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
    chain: [],
    food: 0,
    dead: false,
    // scoreboard: null,
    create: function() {
        that = this;
        this.stage.backgroundColor = '#182d3b';
        this.input.touch.preventDefault = false;

        music = this.game.add.audio('80', 1, true);
        bpm = 480;
        beat = 60000.0/bpm;
        halfBeat = beat/2;
        lastBeat = 0;

        music.play();

        for(var i = 0; i < this.map.length; i++) {
            for(var j = 0; j < this.map[i].length; j++) {
                s = this.add.sprite(j*32*scale, i*32*scale, 'grass');
                s.scale.setTo(scale);
                s.anchor.setTo(0, 0);
                s.smoothed = false;
            }
        }

        this.food = this.game.add.sprite(320, 0, 'logo');
        this.food.scale.setTo(scale);
        this.food.anchor.setTo(0, 0);
        this.food.smoothed = false;

        player = this.game.add.sprite(0, 0, 'player');
        xPos = 0;
        yPos = 0;
        player.scale.setTo(scale);
        player.anchor.setTo(0, 0);
        player.smoothed = false;
        player.leader = player;
        this.chain.push(player);
        // console.log(player);
        // console.log(this.chain[0]);

        var text = "0";
        var style = { font: "30px Arial", fill: "#fff", align: "center"};
        this.scoreboard = this.game.add.text(768, 64, text, style);
        this.scoreboard.anchor.set(0.5);
        this.scoreboard.stroke = "#000000";
        this.scoreboard.strokeThickness = 6;

        // this.game.world.setBounds(0, 0, 320*scale, 320*scale);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.enable(player);
        this.game.physics.enable(this.food);
        // player.body.onCollide = new Phaser.Signal();
        // player.body.onCollide.add(this.everythingFood);

        cursors = this.input.keyboard.createCursorKeys();

        this.camera.setSize(320, 320);
        this.camera.setPosition(0, 0);
        //this.camera.focusOnXY(0, 0);
        //this.camera.follow(player);
        this.camera.setBoundsToWorld();
    },
    move: function() {
        for(var i = this.chain.length-1; i > 0; i--) {
            // this.map[this.chain[i].y][this.chain[i].x] = 1;
            this.chain[i].x = this.chain[i].leader.x;
            this.chain[i].y = this.chain[i].leader.y;
            // this.map[this.chain[i].y][this.chain[i].x] = 0;
            // console.log(this.map);
            // console.log(this.chain[i] + ' moved to ' + this.chain[i].x + ', ' + this.chain[i].y);
        }
        if(direction === 0) {
            player.y -= 32*scale; //player.body.moveTo(halfBeat, 32*scale, 270);
            yPos--;
        }
        else if(direction === 1) {
            player.x += 32*scale; //player.body.moveTo(halfBeat, 32*scale, 0);
            xPos++;
        }
        else if(direction === 2) {
            player.y += 32*scale; //player.body.moveTo(halfBeat, 32*scale, 90);
            yPos++;
        }
        else if(direction === 3) {
            player.x -= 32*scale; //player.body.moveTo(halfBeat, 32*scale, 180);
            xPos--;
        }
        // for(var i = this.chain.length-1; i > 1; i--) {
        //     this.chain[i].x = this.chain[i].leader.x;
        //     this.chain[i].y = this.chain[i].leader.y;
        // }
    },
    validMove: function(direction) {
        if(direction === 0 && yPos > 0 && this.map[yPos - 1][xPos] === 1) return true;
        else if(direction === 1 && xPos < 9 && this.map[yPos][xPos + 1] === 1) return true;
        else if(direction === 2 && yPos < 9 && this.map[yPos + 1][xPos] === 1) return true;
        else if(direction === 3 && xPos > 0 && this.map[yPos][xPos - 1] === 1) return true;
        return false;
    },
    crash: function(direction) {
        switch(direction) {
            case 0:
                if(yPos - 1 < 0 || this.map[yPos - 1][xPos] != 1) return true;
                return false;
            case 1:
                if(xPos + 1 > 9 || this.map[yPos][xPos + 1] != 1) return true;
                return false;
            case 2:
                if(yPos + 1 > 9 || this.map[yPos + 1][xPos] != 1) return true;
                return false;
            case 3:
                if(xPos - 1 < 0 || this.map[yPos][xPos - 1] != 1) return true;
                return false;
        }
    },
    gameOver: function() {
        console.log('loser');
        this.dead = true;
        that.chain.length = 0;
        direction = 1;
        xPos = 0;
        yPos = 0;
        music.stop();
        that.state.restart();
        that.state.start('SnakeEnd', true, false, Number(that.scoreboard.text).toString());
        // that.state.start('MainMenu');
    },
    // eats: function(direction) {
    //     switch(direction) {
    //         case 0:
    //             if(yPos - 1 === this.food.y/32) return true;
    //             return false;
    //         case 1:
    //             if(xPos + 1 === this.food.x/32) return true;
    //             return false;
    //         case 2:
    //             if(yPos + 1 === this.food.y/32) return true;
    //             return false;
    //         case 3:
    //             if(xPos - 1 === this.food.x/32) return true;
    //             return false;
    //     }
    // },
    addOne: function() {
        var newNode = this.add.sprite(-64, -64, 'player');
        newNode.scale.setTo(scale);
        newNode.anchor.setTo(0, 0);
        newNode.smoothed = false
        newNode.leader = this.chain[this.chain.length - 1];
        this.game.physics.enable(newNode);
        this.chain.push(newNode);
        // chain()
    },
    makeFood: function() {
        this.food.x = -128;
        this.food.y = -128;
        var found = false
        while(!found) {
            found = true;
            min = Math.ceil(0);
            max = Math.floor(9);
            x = Math.floor(Math.random() * (max - min + 1)) + min;
            y = Math.floor(Math.random() * (max - min + 1)) + min;
            x = 32*scale*x;
            y = 32*scale*y;
            for(var i = 0; i < this.chain.length-1; i++) {
                if(x == this.chain[i].x && y == this.chain[i].y) {
                    found = false;
                }
            }
        }
        // this.food = this.add.sprite(32*scale*x, 32*scale*y, 'logo');
        // this.food.scale.setTo(scale);
        // this.food.anchor.setTo(0, 0);
        // this.food.smoothed = false;
        // this.game.physics.enable(this.food);
        this.food.x = x;
        this.food.y = y;

    },
    everythingFood: function() {
        that.addOne();
        that.scoreboard.text = (Number(that.scoreboard.text) + 1).toString();
        // that.food.destroy();
        that.makeFood();
    },
    update: function() {
        if (cursors.up.isDown) direction = direction == 2 ? 2 : 0;
        else if (cursors.right.isDown) direction = direction == 3 ? 3 : 1;
        else if (cursors.down.isDown) direction = direction == 0 ? 0 : 2;
        else if (cursors.left.isDown) direction = direction == 1 ? 1 : 3;
        // Check for collision with tail
        for(var i = 1; i < this.chain.length-1; i++) {
            this.physics.arcade.collide(player, this.chain[i], this.gameOver);
        }
        // Check for collision with food
        this.physics.arcade.collide(player, this.food, this.everythingFood);
        if(music.currentTime > lastBeat + beat) {
            if(this.crash(direction)) {
                this.gameOver();
            }
            if(!this.dead && this.validMove(direction)) {
                // this.addOne();
                this.move();
            }
            lastBeat += beat;
            this.dead = false;
        }
    }
}
