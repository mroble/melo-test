var StateTitle = {

    preload: function () {


    }
    , create: function () {

        this.title=game.add.sprite(game.world.centerX-200,game.world.centerY-175, "title");

        this.btnPlayAgain = gameButtons.addButton("playAgain", -1, -1, this.playAgain, this);

    }
    , playAgain: function () {
        game.state.start("StateMain");
    }
    , update: function () {

    }

}



