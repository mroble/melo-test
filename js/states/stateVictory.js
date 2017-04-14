var StateVictory = {

    preload: function () {


    }
    , create: function () {

        var overText = game.add.text(game.width / 2, game.height / 2 - 100, "You Did It!");
        overText.fill = "#ffffff";
        overText.anchor.set(0.5, 0.5);
        console.log(this);

        this.btnPlayAgain = gameButtons.addButton("playAgain", -1, -1, this.playAgain, this);
        console.log("over2");
    }
    , playAgain: function () {
        game.state.start("StateMain");
    }
    , update: function () {

    }

}