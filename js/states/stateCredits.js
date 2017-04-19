var StateCredits = {

    preload: function () {


    }
    , create: function () {

        var titleText = game.add.text(game.width / 2, game.height / 2 - 100, "Credits");
        //Based on the SariSari Storybooks title, "Melo The Umang Boy c. 2017"
        //Buttons (when you add them) by Kenney.nl
        //find out how to add other text
        //Sound:
        //Bubbling Music courtesy of MattJ99 <---check this spelling
        //@freesound.org
        //find out about applause sound.
        //Graphics from the 2D Unity Underwater Pack
        //Shiny buttons by icojoy.com
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