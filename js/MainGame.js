var RhythmArena = RhythmArena || {};

RhythmArena.MainGame = function(){};
var tween;

RhythmArena.MainGame.prototype = {
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
    spawnPoints: [
        [0, 0, 1],
        [0, 9, 0],
        [9, 0, 2],
        [9, 9, 3]
    ],
    grassGroup: null,
    wallGroup: null,
    depthGroup: null,
    arrowGroup: null,
    spriteSize: 32,
    spriteScale: 2,
    players: {
        p1: {
            sprite: null,
            dirSprite: null,
            healthBar: null,
            direction: 1,
            sx: 0,
            sy: 0,
            xPos: 0,
            yPos: 0,
            controls: {
                left: null,
                right: null
            },
            attackBeats: [0, 2],
            projectiles: null,
            canMove: true,
            isMoving: false,
            tween: null,
            dirTween: null,
            lives: 3,
            respawnTimer: null,
            score: null
        },
        p2: {
            sprite: null,
            dirSprite: null,
            healthBar: null,
            direction: 3,
            sx: 0,
            sy: 0,
            xPos: 9,
            yPos: 9,
            controls: {
                left: null,
                right: null
            },
            attackBeats: [0, 2],
            projectiles: null,
            canMove: true,
            isMoving: false,
            tween: null,
            dirTween: null,
            lives: 3,
            respawnTimer: null,
            score: null
        }
    },
    baa: null,
    music: {
        choice: 0,
        track: null,
        bpm: 0,
        rate: 1,
        beat: 0,
        halfBeat: 0,
        lastBeat: 0,
        beatNum: 0,
    },
    cursors: null,
    wasd: null,
    init: function(choices) {
        this.map = mapList[choices.mapChoice];
        this.spawnPoints = spawnPointsList[choices.mapChoice];
        this.music.choice = choices.songChoice;
        this.music.rate = choices.bpmRate;
    },
    turnArrow: function(player) {
        if(player.sprite.alive) {
            switch(player.direction) {
                case 0:
                    player.dirSprite.angle = 270;
                    break;
                case 1:
                    player.dirSprite.angle = 0;
                    break;
                case 2:
                    player.dirSprite.angle = 90;
                    break;
                case 3:
                    player.dirSprite.angle = 180;
                    break;
            }
        }
    },
    turn: function(player, dir) {
        if(player.sprite.alive) {
            if(dir === 0) {
                player.direction = this.posMod(player.direction - 1, 4);
            }
            else {
                player.direction = this.posMod(player.direction + 1, 4);
            }
            this.turnArrow(player);
            if(player.direction == 1) player.sprite.scale.x = this.spriteScale;
            else if(player.direction == 3) player.sprite.scale.x = -1 * this.spriteScale;
        }
        // this.turnArrow(player);
    },
    create: function() {
        this.stage.backgroundColor = '#ffffff';
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'starry');
        this.background.smoothed = false;
        this.background.autoScroll(-20, 0);
        this.input.touch.preventDefault = false;

        this.music.track = this.add.audio(musicList[this.music.choice], 1, true);
        this.music.bpm = 80 * this.music.rate;
        this.music.beat = 60000.0/this.music.bpm;
        this.music.halfBeat = this.music.beat/2;
        this.music.lastBeat = 0;

        this.music.track.play();

        this.baa = this.add.audio('baa', 1, false);

        // this.players.p1.healthBar = this.add.group();
        // this.players.p2.healthBar = this.add.group();
        this.grassGroup = this.add.group();
        this.wallGroup = this.add.group();
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
                    c = this.wallGroup.create(x, y, 'grass');
                    c.alpha = 0;
                    c.anchor.setTo(0.5, 0.5);
                    this.physics.enable(c);
                }
                else {
                    if(this.map[i][j] === 0) {
                        s = this.depthGroup.create(x, y, 'block'); //this.add.sprite(x, y, 'block');
                        // this.wallGroup.add(s);
                        s.anchor.setTo(0.5, 38/52);
                        c = this.wallGroup.create(x, y, 'grass');
                        c.alpha = 0;
                        c.anchor.setTo(0.5, 0.5);
                        this.physics.enable(c);
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
        sx = this.world.width/2 + (this.spawnPoints[0][0] - this.map[0].length/2)*this.spriteSize*this.spriteScale;
        sy = this.world.height/2 + (this.spawnPoints[0][1] - this.map.length/2)*this.spriteSize*this.spriteScale;
        this.players.p1.sprite = this.depthGroup.create(sx, sy, 'player'); //this.add.sprite(sx, sy, 'player');
        this.players.p1.xPos = this.spawnPoints[0][0];
        this.players.p1.yPos = this.spawnPoints[0][1];
        this.players.p1.sprite.scale.setTo(this.spriteScale);
        this.players.p1.sprite.anchor.setTo(0.5, 0.5);
        this.players.p1.sprite.smoothed = false;
        this.players.p1.sprite.maxHealth = 3;
        this.players.p1.sprite.health = 3;
        this.players.p1.sprite.events.onKilled.add(function(){ this.kill(this.players.p1) }, this);

        this.players.p1.dirSprite = this.arrowGroup.create(sx, sy, 'arrow'); //this.add.sprite(sx, sy, 'arrow');
        this.players.p1.dirSprite.tint = Math.random() * 0xffffff;
        this.players.p1.dirSprite.scale.setTo(this.spriteScale);
        this.players.p1.dirSprite.anchor.setTo(-0.5, 0.5);
        this.players.p1.dirSprite.smoothed = false;
        this.turnArrow(this.players.p1);
        // this.players.p1.sprite.addChild(this.players.p1.dirSprite);

        /*this.players.p2.sprite = this.add.sprite(this.spriteSize*9*this.spriteScale, this.spriteSize*9*this.spriteScale, 'player');*/
        sx = this.world.width/2 + (this.spawnPoints[3][0] - this.map[0].length/2)*this.spriteSize*this.spriteScale;
        sy = this.world.height/2 + (this.spawnPoints[3][1] - this.map.length/2)*this.spriteSize*this.spriteScale;
        this.players.p2.sprite = this.depthGroup.create(sx, sy, 'player'); //this.add.sprite(sx, sy, 'player');
        this.players.p2.xPos = this.spawnPoints[3][0];
        this.players.p2.yPos = this.spawnPoints[3][1];
        this.players.p2.sprite.scale.setTo(this.spriteScale);
        this.players.p2.sprite.scale.x *= -1;
        this.players.p2.sprite.anchor.setTo(0.5, 0.5);
        this.players.p2.sprite.smoothed = false;
        this.players.p2.sprite.maxHealth = 3;
        this.players.p2.sprite.health = 3;
        this.players.p2.sprite.events.onKilled.add(function(){ this.kill(this.players.p2) }, this);

        this.players.p2.sprite.tint = Math.random() * 0xffffff;

        this.players.p2.dirSprite = this.arrowGroup.create(sx, sy, 'arrow'); //this.add.sprite(sx, sy, 'arrow');
        this.players.p2.dirSprite.tint = Math.random() * 0xffffff;
        this.players.p2.dirSprite.scale.setTo(this.spriteScale);
        this.players.p2.dirSprite.anchor.setTo(-0.5, 0.5);
        this.players.p2.dirSprite.smoothed = false;
        this.turnArrow(this.players.p2);
        // this.players.p2.sprite.addChild(this.players.p2.dirSprite);]

        // console.log(this.players);
        // for(var player in this.players) {
        //     for(var i = 0; i < 1; i++) {//this.players[player].sprite.health; i++) {
        //         // var h = this.players[player].healthBar.create(-2 * this.spriteSize/4, 0, 'logo');
        //         this.players[player].healthBar = this.add.sprite(-2 * this.spriteSize/4, 0, 'logo');
        //         this.players[player].healthBar.scale.setTo(0.5);
        //         this.players[player].healthBar.width *= 5;
        //         this.players[player].healthBar.smoothed = false;
        //         this.players[player].sprite.addChild(this.players[player].healthBar);
        //     }
        // }

        this.players.p1.projectiles = this.add.group();
        this.players.p2.projectiles = this.add.group();
        /*this.world.setBounds(0, 0, this.spriteSize*10*this.spriteScale, this.spriteSize*10*this.spriteScale);*/
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.enable(this.players.p1.sprite);
        this.physics.enable(this.players.p2.sprite);
        this.physics.enable(this.players.p1.projectiles);
        this.physics.enable(this.players.p2.projectiles);
        this.physics.enable(this.depthGroup);
        this.physics.enable(this.wallGroup);

        this.players.p1.controls = {
            left: this.input.keyboard.addKey(Phaser.Keyboard.A).onDown.add(function(){this.turn(this.players.p1, 0)}, this),
            right: this.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(function(){this.turn(this.players.p1, 1)}, this)
        }
        this.players.p2.controls = {
            left: this.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(function(){this.turn(this.players.p2, 0)}, this),
            right: this.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(function(){this.turn(this.players.p2, 1)}, this)
        }

        var text = "P1 HP: 3\nP1 Lives: 3";
        var style = { font: "30px Arial", fill: "#fff", align: "center"};
        this.players.p1.score = this.game.add.text(100, this.game.height/2, text, style);
        this.players.p1.score.anchor.set(0.5);
        this.players.p1.score.stroke = "#000000";
        this.players.p1.score.strokeThickness = 6;

        var text = "P2 HP: 3\nP2 Lives: 3";
        var style = { font: "30px Arial", fill: "#fff", align: "center"};
        this.players.p2.score = this.game.add.text(this.game.width - 100, this.game.height/2, text, style);
        this.players.p2.score.anchor.set(0.5);
        this.players.p2.score.stroke = "#000000";
        this.players.p2.score.strokeThickness = 6;

        this.camera.setSize(this.spriteSize*10, this.spriteSize*10);
        this.camera.setPosition(0, 0);

        //this.camera.focusOnXY(0, 0);
        //this.camera.follow(this.players.p1.sprite);
        this.camera.setBoundsToWorld();

        // this.world.bringToTop(this.wallGroup);
        this.world.bringToTop(this.depthGroup);
        this.world.bringToTop(this.arrowGroup);
        this.depthGroup.sort('y', Phaser.Group.SORT_ASCENDING);
    },
    posMod: function(a, n) {
        return ((a%n)+n)%n;
    },
    attack: function(player, dir) {
        console.log("shoot");
        var note = player.projectiles.create(player.sprite.x, player.sprite.y, 'note');
        note.anchor.set(0.5, 0.5);
        note.scale.setTo(this.spriteScale);
        note.smoothed = false;
        this.physics.enable(note);
        switch(dir) {
            case 0:
                note.body.velocity.y = -500;
                break;
            case 1:
                note.body.velocity.x = 500;
                break;
            case 2:
                note.body.velocity.y = 500;
                break;
            case 3:
                note.body.velocity.x = -500;
                break;
        }
        // player.projectiles.push(note);
        // console.log(player.projectiles);
        var baa = this.add.audio('baa', 0.01, false);
        // baa.volume = 0.1;
        baa.play();
        // this.sound.play('baa', 0, 0.5);
        // this.baa.play();
    },
    finishMoving: function(player, dir) {
        player.isMoving = false;
        if(player.attackBeats.indexOf(this.music.beatNum) != -1 && player.sprite.alive) this.attack(player, dir);
        this.depthGroup.sort('y', Phaser.Group.SORT_ASCENDING);
    },
    move: function(player) {
        var destx = player.sprite.x;
        var desty = player.sprite.y;
        var dirx = player.dirSprite.x;
        var diry = player.dirSprite.y;
        if(player.direction == 0) {
            desty -= this.spriteSize * this.spriteScale;
            diry -= this.spriteSize * this.spriteScale
            player.yPos--;
        }
        else if(player.direction == 1) {
            destx += this.spriteSize * this.spriteScale;
            dirx += this.spriteSize * this.spriteScale;
            player.xPos++;
        }
        else if(player.direction == 2) {
            desty += this.spriteSize * this.spriteScale;
            diry += this.spriteSize * this.spriteScale;
            player.yPos++;
        }
        else if(player.direction == 3) {
            destx -= this.spriteSize * this.spriteScale;
            dirx -= this.spriteSize * this.spriteScale;
            player.xPos--;
        }
        player.tween = this.add.tween(player.sprite).to({ x: destx, y: desty }, this.music.halfBeat/2 < 100 ? this.music.halfBeat/2 : 100);
        player.dirTween = this.add.tween(player.dirSprite).to({ x: dirx, y: diry }, this.music.halfBeat/2 < 100 ? this.music.halfBeat/2 : 100);
        player.tween.onComplete.add(function() {this.finishMoving(player, player.direction)}, this);
        player.isMoving = true;1
        player.tween.start();
        player.dirTween.start();
    },
    validMove: function(player) {
        if(!player.sprite.alive) return false;
        if(player.direction == 0 && player.yPos > 0 && this.map[player.yPos - 1][player.xPos] == 1) return true;
        else if(player.direction == 1 && player.xPos < 9 && this.map[player.yPos][player.xPos + 1] == 1) return true;
        else if(player.direction == 2 && player.yPos < 9 && this.map[player.yPos + 1][player.xPos] == 1) return true;
        else if(player.direction == 3 && player.xPos > 0 && this.map[player.yPos][player.xPos - 1] == 1) return true;
        return false;
    },
    endGame: function() {

    },
    respawn: function(player) {
        // console.log('res');
        // player.sprite.alpha = 1;
        player.sprite.revive(player.sprite.maxHealth);
        var spawn = this.spawnPoints[Math.floor(Math.random() * 4)];
        player.sprite.x = this.world.width/2 + (spawn[0] - this.map[9].length/2)*this.spriteSize*this.spriteScale;
        player.sprite.y = sy = this.world.height/2 + (spawn[1] - this.map.length/2)*this.spriteSize*this.spriteScale;
        player.dirSprite.x = this.world.width/2 + (spawn[0] - this.map[9].length/2)*this.spriteSize*this.spriteScale;
        player.dirSprite.y = sy = this.world.height/2 + (spawn[1] - this.map.length/2)*this.spriteSize*this.spriteScale;
        player.xPos = spawn[0];
        player.yPos = spawn[1];
        player.direction = spawn[2];
        player.dirSprite.alpha = 1;
        this.turnArrow(player);
        this.updateScore(player);
    },
    updateScore(player, resp) {
        // console.log('hp = ',player.sprite.health);
        // if(player.sprite.health == 3) {
        //     player.score.text = "P1 HP: "+player.sprite.health+"\nP1 Lives: "+player.lives;
        // }
        if(resp === 1 || player.sprite.health === 0) {
            player.score.text = "P1 HP: "+(player.sprite.health)+"\nP1 Lives: "+player.lives;
        }
        else player.score.text = "P1 HP: "+(player.sprite.health-1)+"\nP1 Lives: "+player.lives;
    },
    kill: function(player) {
        player.dirSprite.alpha = 0;
        if(--player.lives < 1) this.endGame();
        else {
            player.respawnTimer = this.time.create(false);
            player.respawnTimer.add(1000, this.respawn, this, player);
            player.respawnTimer.start();
        }
        this.updateScore(player, 1);
    },
    damage: function(player, bullet) {
        bullet.kill();
        player.damage(1);
    },
    destroyProj: function(bullet, wall) {
        if(wall != this.players.p1.sprite && wall != this.players.p2.sprite){
            bullet.kill();
        }
    },
    update: function() {

        if(this.music.track.currentTime > this.music.lastBeat + this.music.beat) {
            if(this.validMove(this.players.p1)) this.move(this.players.p1);
            // else if(this.players.p1.attackBeats.indexOf(this.music.beatNum) != -1) this.attack(this.players.p1, this.players.p1.direction);
            if(this.validMove(this.players.p2)) this.move(this.players.p2);
            // else if(this.players.p2.attackBeats.indexOf(this.music.beatNum) != -1) this.attack(this.players.p2, this.players.p2.direction);
            this.music.lastBeat += this.music.beat;
            this.music.beatNum = this.posMod(this.music.beatNum + 1, 4);
            // console.log(this.players.p1.sprite.health);
            // console.log(this.players.p1.sprite.x + ", " + this.players.p1.sprite.y);
            // console.log("~" + this.players.p1.lives);
            /*this.players.p1.canMove = true;
            this.players.p2.canMove = true;*/;
        }

        this.physics.arcade.overlap(this.players.p1.projectiles, this.players.p2.sprite, this.damage, function(){this.updateScore(this.players.p2, 0);}, this);
        this.physics.arcade.overlap(this.players.p2.projectiles, this.players.p1.sprite, this.damage, function(){this.updateScore(this.players.p1, 0);}, this);
        this.physics.arcade.overlap(this.players.p1.projectiles, this.wallGroup, this.destroyProj, null, this);
        this.physics.arcade.overlap(this.players.p2.projectiles, this.wallGroup, this.destroyProj, null, this);

        for (player in this.players) {
            if(player.isMoving) this.depthGroup.sort('y', Phaser.Group.SORT_ASCENDING);
        }

        for (player in this.players) {
            if (player.dead) this.kill(player);
        }
    }
}
