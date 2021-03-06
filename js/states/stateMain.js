var score = 0;

var StateMain = {

    preload: function () {

        var mapPath = "maps/map" + level + ".json";
        game.load.tilemap("map", mapPath, null, Phaser.Tilemap.TILED_JSON);



    },

    create: function () {
        score = 0;

        this.numberOfMaps = 1;
        //check this line
        this.bombCount = [4];
        this.need = this.bombCount[level - 1];



        //add sound buttons
        this.btnMusic = gameButtons.addAudioButton("music", 20, 20, gameButtons.toggleMusic, this);
        this.btnSound = gameButtons.addAudioButton("sound", 20, 70, gameButtons.toggleSound, this);

        //if using a scrolling game uncomment these lines
        this.audioGroup = game.add.group();
        this.audioGroup.add(this.btnMusic);
        this.audioGroup.add(this.btnSound);
        this.audioGroup.fixedToCamera = true;
        this.audioGroup.cameraOffset.setTo(0, 0);


        //define sounds here

        //this.tickSound = game.add.audio("tick");
        this.collectSound = game.add.audio("collect");
        //change sound for the game over below this
        this.boomSound = game.add.audio("boom");
        this.victoryMusic=game.add.audio("victoryMusic");

        //define background music
        this.backgroundMusic = game.add.audio("backgroundMusic");
        //pass the background music to the gameMedia object
        gameMedia.setBackgroundMusic(this.backgroundMusic);

        //init the music
        gameMedia.updateMusic();
        //init the sound buttons
        gameButtons.updateButtons();

        //text
        this.scoreText=game.add.text(game.world.centerX+125, 100, "0");
        this.scoreText.fill="#ffff00";
        this.scoreText.fontSize = 55;
        this.scoreText.anchor.set(0.5, 0.5);
        //this.scoreText.fixedToCamera = true;

        this.scoreLabel=game.add.text(game.world.centerX, 100, "Score: ");
        this.scoreLabel.fill="#ffff00";
        this.scoreLabel.fontSize = 55;
        this.scoreLabel.anchor.set(0.5, 0.5);
        //this.scoreLabel.fixedToCamera = true;

        this.scoreGroup = game.add.group();
        this.scoreGroup.add(this.scoreLabel);
        this.scoreGroup.add(this.scoreText);
        this.scoreGroup.fixedToCamera = true;




        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.robotSize = .5;

        //load background
        this.background=game.add.sprite(0,0,"background");
        this.background.sendToBack();

        //load map
        this.map = game.add.tilemap("map");
        this.map.addTilesetImage("tiles");

        this.layer = this.map.createLayer("Tile Layer 1");
        this.layer.resizeWorld();
        this.map.setCollisionBetween(0, 11);

        this.upArrow = game.add.sprite(0, 0, "arrow");
        this.downArrow = game.add.sprite(0, 50, "arrow");
        this.leftArrow = game.add.sprite(-50, 25, "arrow");
        this.rightArrow = game.add.sprite(50, 25, "arrow");

        this.upArrow.inputEnabled = true;
        this.downArrow.inputEnabled = true;
        this.leftArrow.inputEnabled = true;
        this.rightArrow.inputEnabled = true;

        this.upArrow.events.onInputDown.add(this.doJump, this);
        this.downArrow.events.onInputDown.add(this.doStop, this);
        this.leftArrow.events.onInputDown.add(this.goLeft, this);
        this.rightArrow.events.onInputDown.add(this.goRight, this);


        this.upArrow.frame = 0;
        this.downArrow.frame = 1;
        this.leftArrow.frame = 2;
        this.rightArrow.frame = 3;

        this.upArrow.anchor.set(0.5, 0.5);
        this.downArrow.anchor.set(0.5, 0.5);
        this.leftArrow.anchor.set(0.5, 0.5);
        this.rightArrow.anchor.set(0.5, 0.5);


        this.buttonGroup = game.add.group();
        this.buttonGroup.add(this.upArrow);
        this.buttonGroup.add(this.downArrow);
        this.buttonGroup.add(this.leftArrow);
        this.buttonGroup.add(this.rightArrow);

        this.buttonGroup.fixedToCamera = true;
        this.buttonGroup.cameraOffset.setTo(game.width - this.buttonGroup.width / 2, game.height - this.buttonGroup.height);


        this.bar2 = game.add.image(0, 0, "bar2");
        this.bar1 = game.add.image(0, 0, "bar1");
        this.timerGroup = game.add.group();
        this.timerGroup.add(this.bar2);
        this.timerGroup.add(this.bar1);
        this.timerGroup.fixedToCamera = true;
        this.timerGroup.cameraOffset.setTo(game.width / 2 - this.timerGroup.width / 2, 15);


        this.robot = game.add.sprite(150, 150, "robot");
        this.robot.animations.add("idle", [0], 12, true);
        this.robot.animations.add("walk", [1,2], 12, true);
        this.robot.animations.add("jump", [3], 12, false);

        this.robot.scale.x = this.robotSize;
        this.robot.scale.y = this.robotSize;

        this.robot.animations.play("idle");
        this.robot.anchor.set(0.5, 0.5);
        //the position below will start melo at the first green platform
        //change later if you want.
        //this.robot.x= 200;
        //this.robot.y = 610;


        this.monsterGroup = game.add.group();
        this.monsterGroup.createMultiple(10, "monster");


        game.physics.arcade.enable([this.robot, this.monsterGroup]);
        this.robot.body.gravity.y = 100;
        this.robot.body.bounce.set(0.25);
        this.robot.body.collideWorldBounds = true;



        game.camera.follow(this.robot);
        cursors = game.input.keyboard.createCursorKeys();

        this.map.setTileIndexCallback(12, this.gotBomb, this);
        this.map.setTileIndexCallback(13, this.gotBomb, this);
        this.map.setTileIndexCallback(14, this.gotBomb, this);
        this.map.setTileIndexCallback(15, this.gotBomb, this);


        //this.makeMonsters();


        game.world.bringToTop(this.buttonGroup);

        game.world.bringToTop(this.timerGroup);

        game.time.events.loop(Phaser.Timer.SECOND / 2, this.tick, this);
        if (screen.width > 1500) {
            this.buttonGroup.visible = false;
        }

    }
    , tick: function () {
        if (this.bar1.width > 1) {
            this.bar1.width--;
            if (Math.floor(this.bar1.width) == 50) {
                gameMedia.playSound(this.tickSound);
            }
        } else {
            //game over!
            this.doGameOver();
        }
    }
    ,
    doGameOver:function()
    {
        gameMedia.playSound(this.boomSound);
        game.state.start("StateOver");
    }


    //, makeMonsters: function () {
      //  for (var i = 0; i < 10; i++) {
          //  var monster = this.monsterGroup.getFirstDead();
        //    var xx = game.rnd.integerInRange(0, game.world.width);
         //   monster.reset(xx, 50);
          //  monster.enabled = true;
          //  monster.body.velocity.x = -100;
          //  monster.body.gravity.y = 100;
         //   monster.body.collideWorldBounds = true;
         //   monster.name = "monster";

         //   monster.animations.add("move", [0], 12, true);
         //   monster.animations.play("move");
       // }
    //}
    , gotBomb: function (sprite, tile) {
        if (sprite.name == "monster") {
            return;
        }
        this.map.removeTile(tile.x, tile.y, this.layer);
        score++;
        this.scoreText.text = score;
        gameMedia.playSound(this.collectSound);



        if (score == 4) {
            gameMedia.playSound(this.victoryMusic);
            game.state.start("StateVictory");

        }
    },
  //  , reverseMonster: function (monster, layer) {
   //     if (monster.body.blocked.left == true) {
   //         monster.body.velocity.x = 100;
    //    }
     //   if (monster.body.blocked.right == true) {
      //      monster.body.velocity.x = -100;
     //   }
   // }
   // , hitMonster: function (player, monster) {
    //    if (player.y < monster.y) {
     //       monster.kill();
     //   } else {
            //console.log("game over");
     //       this.doGameOver();
      //  }
    //},

    update: function () {
        game.physics.arcade.collide(this.robot, this.layer);
        game.physics.arcade.collide(this.monsterGroup, this.layer);
        game.physics.arcade.collide(this.monsterGroup, this.layer, null, this.reverseMonster);
        game.physics.arcade.collide(this.robot, this.monsterGroup, null, this.hitMonster, this)


        if (this.robot.body.onFloor()) {
            if (Math.abs(this.robot.body.velocity.x) > 100) {
                this.robot.animations.play("walk");
            } else {
                this.robot.animations.play("idle");
            }
        }
        if (this.robot.body.velocity.x > 0) {
            this.robot.scale.x = this.robotSize;
        } else {
            this.robot.scale.x = -this.robotSize;
        }
        if (cursors.left.isDown) {
            this.goLeft();
        }

        if (cursors.right.isDown) {
            this.goRight();
        }

        //JUMP
        if (cursors.up.isDown) {
            this.doJump();
        }
        //STOPPING
        if (cursors.down.isDown) {
            this.doStop();
        }

    }
    , render: function () {
        //game.debug.bodyInfo(this.robot, 20, 20);
    }
    , goLeft: function () {
        this.robot.body.velocity.x = -250;
    }
    , goRight: function () {
        this.robot.body.velocity.x = 250;
    }
    , doStop: function () {
        this.robot.body.velocity.x = 0;
        this.robot.body.velocity.y = 0;
    }
    , doJump: function () {
        if (this.robot.body.onFloor()) {
            this.robot.body.velocity.y = -Math.abs(this.robot.body.velocity.x) - 150;
            this.robot.animations.play("jump");
            //play sound by passing it to game media
            gameMedia.playSound(this.jumpSound);

        }
    }









}