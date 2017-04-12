var StateTitle = {

    preload: function () {


    }
    , create: function () {

        var titleText = game.add.text(game.width / 2, game.height / 2 - 100, "Melo The Umang Boy");
        titleText.fill = "#ffffff";
        titleText.anchor.set(0.5, 0.5);

        this.btnStart = gameButtons.addButton("start", -1, -1, this.startGame, this);
    }
    , startGame: function () {
        game.state.start("StateMain");
    }
    , update: function () {

    }

}