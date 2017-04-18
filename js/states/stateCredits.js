var StateCredits = {

    preload: function () {


    }
    , create: function () {

        var titleText = game.add.text(game.width / 2, game.height / 2 - 100, "Credits");
        //find out how to add other text
        //Sound:
        //Bubbling Music courtesy of MattJ99 <---check this spelling
        //@freesound.org
        //find out about applause sound.
        //Graphics from the 2D Unity Underwater Pack
        //
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