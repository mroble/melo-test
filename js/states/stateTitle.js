

var StateTitle = {

    //  Bubble extends ParticleStorm.Particle

//Bubble = function (manager) {

  //  Phaser.ParticleStorm.Particle.call(this, manager);

//},

//Bubble.prototype = Object.create(Phaser.ParticleStorm.Particle.prototype);
//Bubble.prototype.constructor = Bubble;

//Bubble.prototype.onInherit = function(parent) {

    //  Child bubbles are killed if the parent is already at the top of the screen
  //  if (parent.transform.y < 0)
   // {
     //   return false;
    //}

    //  Child bubbles are smaller than their parent
    //var ps = parent.transform.scale.x.value * (0.20 + Math.random() * 0.30);

    //this.transform.scale.x.value = ps;
    //this.transform.scale.y.value = ps;

    //  Kill children if they get too small
    //if (this.transform.scale.x.value < 0.05)
    //{
      //  return false;
    //}

    //  Child bubbles start with random (low speed) velocities
    //this.transform.velocity.x.value = (Math.random() - 0.5);
    //this.transform.velocity.y.value = -Math.random();

  //  return true;

//};

//Bubble.prototype.onUpdate = function() {

    //  Bigger bubbles rise faster
  //  this.transform.velocity.y.value += -0.15 * this.transform.scale.y.value;

    //if (this.transform.y < 0)
    //{
      //  this.kill();
    //}

//};


    preload: function () {
       // game.forceSingleUpdate = true;

        //game.load.path = 'images/particlestorm/particles/';

        //game.load.images([ 'bubble' ]);


    },

    create: function () {

          //define background music
        this.backgroundMusic = game.add.audio("backgroundMusic");
        //pass the background music to the gameMedia object
        gameMedia.setBackgroundMusic(this.backgroundMusic);

        //init the music
        gameMedia.updateMusic();


        this.water=game.add.sprite(0,0,"water");
        this.water.sendToBack();

        this.title=game.add.sprite(game.world.centerX-200,game.world.centerY-175, "title");

        this.btnPlayAgain = gameButtons.addButton("playAgain", -1, -1, this.playAgain, this);

        //manager = this.game.plugins.add(Phaser.ParticleStorm);

    //  This example illustrates:

   // var bubbles = {
     //   image: 'bubble',
       // blendMode: 'ADD',
        //lifespan: 3000,
       // vx: { value: { min: -2, max: 2 }, control: [ { x: 0, y: 1 }, { x: 1, y: 0.1 } ] },
       // vy: { value: 0, control: [ { x: 0, y: 1 }, { x: 1, y: 0.1 } ] },
       // scale: { min: 0.25, max: 0.90 },
       // emit: {
        //    name: 'bubbles',
        //    value: 0, at: [ { time: 1, value: 5 } ],
         //   inherit: { vx: true }
       // }
    //};

    //manager.addData('bubbles', bubbles);

    //emitter = manager.createEmitter();

   // emitter.particleClass = Bubble;

    //emitter.addToWorld();

    //emitter.emit('bubbles', [-100, 900], 620, { repeat: -1, frequency: 10 });


    }

    , playAgain: function () {
        game.state.start("StateMain");
    }


    , update: function () {
         //  Make a current that blows left or right slowly changing strength and direction
    //current = Math.max(Math.min(current + (Math.random() - .5) *.001, .05), -.05);

    //emitter.force.x = current;

    }

}
