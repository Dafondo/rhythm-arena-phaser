var RhythmArena = RhythmArena || {};

RhythmArena.MainGame = function(){};
var tween;

RhythmArena.MainGame.prototype = {
    // map: [
    //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    //     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    // ],
    map: [
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
    ],
    grassGroup: null,
    depthGroup: null,
    arrowGroup: null,
    spriteSize: 32,
    spriteScale: 2,
    players: {
        p1: {
            sprite: null,
            dirSprite: null,
            direction: 1,
            xPos: 0,
            yPos: 0,
            controls: {
                left: null,
                right: null
            },
            canMove: true,
            isMoving: false,
            tween: null,
            dirTween: null
        },
        p2: {
            sprite: null,
            dirSprite: null,
            direction: 3,
            xPos: 9,
            yPos: 9,
            controls: {
                left: null,
                right: null
            },
            canMove: true,
            isMoving: false,
            tween: null,
            dirTween: null
        }
    },
    music: {
        track: null,
        bpm: 0,
        beat: 0,
        halfBeat: 0,
        lastBeat: 0
    },
    cursors: null,
    wasd: null,
    turnArrow: function(player) {
        // if(!player.isMoving) {
            switch(player.direction) {
                case 0:
                    // player.dirSprite.x = player.sprite.x;
                    // player.dirSprite.y = player.sprite.y - this.spriteSize * this.spriteScale;
                    player.dirSprite.angle = 270;
                    break;
                case 1:
                    // player.dirSprite.x = player.sprite.x + this.spriteSize * this.spriteScale;
                    // player.dirSprite.y = player.sprite.y;
                    player.dirSprite.angle = 0;
                    break;
                case 2:
                    // player.dirSprite.x = player.sprite.x;
                    // player.dirSprite.y = player.sprite.y + this.spriteSize * this.spriteScale;
                    player.dirSprite.angle = 90;
                    break;
                case 3:
                    // player.dirSprite.x = player.sprite.x - this.spriteSize * this.spriteScale;
                    // player.dirSprite.y = player.sprite.y;
                    player.dirSprite.angle = 180;
                    break;
            }
        // }
    },
    turn: function(player, dir) {
        // if(!player.isMoving) {
            if(dir === 0) {
                player.direction = this.posMod(player.direction - 1, 4);
            }
            else {
                player.direction = this.posMod(player.direction + 1, 4);
            }
            this.turnArrow(player);
            if(player.direction == 1) player.sprite.scale.x = this.spriteScale;
            else if(player.direction == 3) player.sprite.scale.x = -1 * this.spriteScale;
        // }
        // this.turnArrow(player);
    },
    create: function() {
        this.stage.backgroundColor = '#ffffff';
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'starry');
        this.background.smoothed = false;
        this.background.autoScroll(-20, 0);
        this.input.touch.preventDefault = false;

        this.music.track = this.add.audio('80', 1, true);
        this.music.bpm = 80;
        this.music.beat = 60000.0/this.music.bpm;
        this.music.halfBeat = this.music.beat/2;
        this.music.lastBeat = 0;

        this.music.track.play();

        // this.camera.setSize(1, 1);

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

        /*this.players.p1.sprite = this.add.sprite(0, 0, 'player');*/
        var sx = this.world.width/2 - this.map[0].length/2*this.spriteSize*this.spriteScale;
        var sy = this.world.height/2 - this.map.length/2*this.spriteSize*this.spriteScale;
        this.players.p1.sprite = this.depthGroup.create(sx, sy, 'player'); //this.add.sprite(sx, sy, 'player');
        this.players.p1.xPos = 0;
        this.players.p1.yPos = 0;
        this.players.p1.sprite.scale.setTo(this.spriteScale);
        this.players.p1.sprite.anchor.setTo(0.5, 0.5);
        this.players.p1.sprite.smoothed = false;

        this.players.p1.dirSprite = this.arrowGroup.create(sx, sy, 'arrow'); //this.add.sprite(sx, sy, 'arrow');
        this.players.p1.dirSprite.tint = Math.random() * 0xffffff;
        this.players.p1.dirSprite.scale.setTo(this.spriteScale);
        this.players.p1.dirSprite.anchor.setTo(-0.5, 0.5);
        this.players.p1.dirSprite.smoothed = false;
        this.turnArrow(this.players.p1);

        /*this.players.p2.sprite = this.add.sprite(this.spriteSize*9*this.spriteScale, this.spriteSize*9*this.spriteScale, 'player');*/
        sx = this.world.width/2 + (9 - this.map[9].length/2)*this.spriteSize*this.spriteScale;
        sy = this.world.height/2 + (9 - this.map.length/2)*this.spriteSize*this.spriteScale;
        this.players.p2.sprite = this.depthGroup.create(sx, sy, 'player'); //this.add.sprite(sx, sy, 'player');
        this.players.p2.sprite.scale.setTo(this.spriteScale);
        this.players.p2.sprite.scale.x *= -1;
        this.players.p2.sprite.anchor.setTo(0.5, 0.5);
        this.players.p2.sprite.smoothed = false;

        this.players.p2.dirSprite = this.arrowGroup.create(sx, sy, 'arrow'); //this.add.sprite(sx, sy, 'arrow');
        this.players.p2.dirSprite.tint = Math.random() * 0xffffff;
        this.players.p2.dirSprite.scale.setTo(this.spriteScale);
        this.players.p2.dirSprite.anchor.setTo(-0.5, 0.5);
        this.players.p2.dirSprite.smoothed = false;
        this.turnArrow(this.players.p2);

        /*this.world.setBounds(0, 0, this.spriteSize*10*this.spriteScale, this.spriteSize*10*this.spriteScale);*/
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.enable(this.players.p1.sprite);
        this.physics.enable(this.players.p2.sprite);

        /*this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = {
            w: this.input.keyboard.addKey(Phaser.Keyboard.W),
            a: this.input.keyboard.addKey(Phaser.Keyboard.A),
            s: this.input.keyboard.addKey(Phaser.Keyboard.S),
            d: this.input.keyboard.addKey(Phaser.Keyboard.D)
        }*/
        this.players.p1.controls = {
            left: this.input.keyboard.addKey(Phaser.Keyboard.A).onDown.add(function(){this.turn(this.players.p1, 0)}, this),
            right: this.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(function(){this.turn(this.players.p1, 1)}, this)
        }
        this.players.p2.controls = {
            left: this.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(function(){this.turn(this.players.p2, 0)}, this),
            right: this.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(function(){this.turn(this.players.p2, 1)}, this)
        }

        this.camera.setSize(this.spriteSize*10, this.spriteSize*10);
        this.camera.setPosition(0, 0);

        //this.camera.focusOnXY(0, 0);
        //this.camera.follow(this.players.p1.sprite);
        this.camera.setBoundsToWorld();

        this.world.bringToTop(this.depthGroup);
        // this.world.bringToTop(this.arrowGroup);
        this.depthGroup.sort();
    },
    posMod: function(a, n) {
        return ((a%n)+n)%n;
    },
    // turn: function(player) {
    //     if(player.canMove) {
    //         if(player.controls.left.isDown) {
    //             /*console.log("left");*/
    //             player.direction = this.posMod(player.direction - 1, 4);
    //             player.canMove = false;
    //         }
    //         else if(player.controls.right.isDown) {
    //             /*console.log("right");*/
    //             player.direction = this.posMod(player.direction + 1, 4);
    //             player.canMove = false;
    //         }
    //     }
    // },
    finishMoving: function(player) {
        player.isMoving = false;
        this.depthGroup.sort('y', Phaser.Group.SORT_ASCENDING);
    },
    move: function(player) {
        var destx = player.sprite.x;
        var desty = player.sprite.y;
        var dirx = player.dirSprite.x;
        var diry = player.dirSprite.y;
        if(player.direction == 0) {
            /*player.sprite.y -= this.spriteSize*this.spriteScale;*/

            /*var dest = Phaser.Math.snapTo(this.spriteSize*this.spriteScale, this.spriteSize*this.spriteScale);
            player.sprite.body.moveTo(this.music.halfBeat, dest, 270);*/

            desty -= this.spriteSize * this.spriteScale;
            diry -= this.spriteSize * this.spriteScale
            player.yPos--;
        }
        else if(player.direction == 1) {
            /*player.sprite.x += this.spriteSize*this.spriteScale;*/

            /*var dest = Phaser.Math.snapTo(this.spriteSize*this.spriteScale, this.spriteSize*this.spriteScale);
            player.sprite.body.moveTo(this.music.halfBeat, dest, 0);*/

            destx += this.spriteSize * this.spriteScale;
            dirx += this.spriteSize * this.spriteScale;
            player.xPos++;
        }
        else if(player.direction == 2) {
            /*player.sprite.y += this.spriteSize*this.spriteScale;*/

            /*var dest = Phaser.Math.snapTo(this.spriteSize*this.spriteScale, this.spriteSize*this.spriteScale);
            player.sprite.body.moveTo(this.music.halfBeat, dest, 90);*/

            desty += this.spriteSize * this.spriteScale;
            diry += this.spriteSize * this.spriteScale;
            player.yPos++;
        }
        else if(player.direction == 3) {
            /*player.sprite.x -= this.spriteSize*this.spriteScale;*/

            /*var dest = Phaser.Math.snapTo(this.spriteSize*this.spriteScale, this.spriteSize*this.spriteScale);
            player.sprite.body.moveTo(this.music.halfBeat, dest, 180);*/

            destx -= this.spriteSize * this.spriteScale;
            dirx -= this.spriteSize * this.spriteScale;
            player.xPos--;
        }
        player.tween = this.add.tween(player.sprite).to({ x: destx, y: desty }, this.music.halfBeat/2 < 100 ? this.music.halfBeat/2 : 100);
        player.dirTween = this.add.tween(player.dirSprite).to({ x: dirx, y: diry }, this.music.halfBeat/2 < 100 ? this.music.halfBeat/2 : 100);
        player.tween.onComplete.add(function() {this.finishMoving(player)}, this);
        player.isMoving = true;
        player.tween.start();
        player.dirTween.start();
    },
    validMove: function(player) {
        if(player.direction == 0 && player.yPos > 0 && this.map[player.yPos - 1][player.xPos] == 1) return true;
        else if(player.direction == 1 && player.xPos < 9 && this.map[player.yPos][player.xPos + 1] == 1) return true;
        else if(player.direction == 2 && player.yPos < 9 && this.map[player.yPos + 1][player.xPos] == 1) return true;
        else if(player.direction == 3 && player.xPos > 0 && this.map[player.yPos][player.xPos - 1] == 1) return true;
        // console.log("failed: x = ", player.xPos, ", y = ", player.yPos, ", block = ", this.map[player.xPos][player.yPos - 1]);
        return false;
    },
    update: function() {
        /*this.turn(this.players.p1);
        this.turn(this.players.p2);*/
        /*console.log(this.players.p2.direction);*/

        /*if (this.wasd.w.isDown) this.players.p1.direction = 0;
        else if (this.wasd.d.isDown) this.players.p1.direction = 1;
        else if (this.wasd.s.isDown) this.players.p1.direction = 2;
        else if (this.wasd.a.isDown) this.players.p1.direction = 3;

        if (this.cursors.up.isDown) this.players.p2.direction = 0;
        else if (this.cursors.right.isDown) this.players.p2.direction = 1;
        else if (this.cursors.down.isDown) this.players.p2.direction = 2;
        else if (this.cursors.left.isDown) this.players.p2.direction = 3;*/

        if(this.music.track.currentTime > this.music.lastBeat + this.music.beat) {
            if(this.validMove(this.players.p1)) this.move(this.players.p1);
            if(this.validMove(this.players.p2)) this.move(this.players.p2);
            this.music.lastBeat += this.music.beat;
            /*this.players.p1.canMove = true;
            this.players.p2.canMove = true;*/
            // this.players.p1.sprite.x = Phaser.Math.snapTo(this.players.p1.sprite.x, this.spriteSize*this.spriteScale);
            // this.players.p1.sprite.y = Phaser.Math.snapTo(this.players.p1.sprite.y, this.spriteSize*this.spriteScale);
        }

        for (player in this.players) {
            if(player.isMoving) this.depthGroup.sort('y', Phaser.Group.SORT_ASCENDING);
        }
    }
}
