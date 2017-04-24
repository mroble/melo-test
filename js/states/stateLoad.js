var StateLoad = {

    preload: function () {

        var empty = game.add.image(0, 0, "loadingEmpty");
        var full = game.add.image(0, 0, "loadingFull");


        empty.anchor.set(0, 0.5);
        full.anchor.set(0, 0.5);

        empty.x = game.width / 2 - empty.width / 2;
        empty.y = game.height / 2 - empty.height / 2;

        full.x = game.width / 2 - full.width / 2;
        full.y = empty.y;

        game.load.setPreloadSprite(full);

        //PRELOAD EVERYTHING HERE
        game.load.spritesheet("buttons", "images/ui/buttons-red.png", 265, 75);
        game.load.spritesheet("soundButtons", "images/ui/soundButtons-blue.png", 44, 44, 4);
        game.load.audio("backgroundMusic", "audio/background/bubbling.wav");
        game.load.audio("victoryMusic", "audio/sfx/applause.wav");

        game.load.audio("boom", "audio/sfx/boom.mp3");
        game.load.audio("collect", "audio/sfx/collect.mp3");
        //game.load.audio("tick", "audio/sfx/tick.mp3");

        game.load.image("background","images/main/background.png");
        game.load.image("title", "images/title.png");
        game.load.image("water", "images/particlestorm/water_texture.jpg");



        //sprite width, height, #of cells
        game.load.spritesheet("robot", "images/main/robot.png", 220, 145, 4);
        game.load.image("tiles", "images/tiles.png");

        game.load.spritesheet("arrow", "images/arrowButtons.png", 60, 60, 4);
        game.load.spritesheet("monster", "images/main/monsters.png", 50, 50, 1);

        game.load.image("bar1", "images/timer/bar1.png");
        game.load.image("bar2", "images/timer/bar2.png");

    },

    create: function () {
        game.state.start("StateTitle");
    },

    update: function () {

    }

}