var StateTitle = {

    preload: function () {


    }
    , create: function () {

        var fragmentSrc = [

        "precision mediump float;",

        "uniform float     time;",
        "uniform vec2      resolution;",
        "uniform vec2      mouse;",

        "#define MAX_ITER 4",

        "void main( void )",
        "{",
            "vec2 v_texCoord = gl_FragCoord.xy / resolution;",

            "vec2 p =  v_texCoord * 8.0 - vec2(20.0);",
            "vec2 i = p;",
            "float c = 1.0;",
            "float inten = .05;",

            "for (int n = 0; n < MAX_ITER; n++)",
            "{",
                "float t = time * (1.0 - (3.0 / float(n+1)));",

                "i = p + vec2(cos(t - i.x) + sin(t + i.y),",
                "sin(t - i.y) + cos(t + i.x));",

                "c += 1.0/length(vec2(p.x / (sin(i.x+t)/inten),",
                "p.y / (cos(i.y+t)/inten)));",
            "}",

            "c /= float(MAX_ITER);",
            "c = 1.5 - sqrt(c);",

            "vec4 texColor = vec4(0.0, 0.01, 0.015, 1.0);",

            "texColor.rgb *= (1.0 / (1.0 - (c + 0.05)));",

            "gl_FragColor = texColor;",
        "}"
    ];

    filter = new Phaser.Filter(game, null, fragmentSrc);
    filter.setResolution(3200, 1280);

    sprite = game.add.sprite();
    sprite.width = 3200;
    sprite.height = 1280;

    sprite.filters = [ filter ];

     //var titleText = game.add.text(game.width / 2, game.height / 2 - 100, "Melo The Umang Boy");
       // titleText.fill = "#ffffff";
        //titleText.anchor.set(0.5, 0.5);

    this.title=game.add.sprite(game.world.centerX-200,game.world.centerY-175, "title");

    this.btnStart = gameButtons.addButton("start", -1, -1, this.startGame, this);



    }
    , startGame: function () {
        game.state.start("StateMain");
    }
    , update: function () {
        filter.update(game.input.activePointer);

    }

}