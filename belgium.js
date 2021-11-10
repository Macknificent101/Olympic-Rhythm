class belgium extends Phaser.Scene {
  constructor() {
    super({ key: 'belgium' });
  }

  preload() {
    this.load.image('belgium char', 'assets/belgium.png');
    this.load.image('belgium left', 'assets/belgium-left.png');
    this.load.image('belgium down', 'assets/belgium-down.png');
    this.load.image('belgium right', 'assets/belgium-right.png');
    this.load.image('belgium up', 'assets/belgium-up.png');
    this.load.image('poland char', 'assets/poland.png');
    this.load.image('poland left', 'assets/poland-left.png');
    this.load.image('poland right', 'assets/poland-right.png');
    this.load.image('poland up', 'assets/poland-up.png')
    this.load.image('poland down', 'assets/poland-down.png')
    this.load.image('left', 'assets/note-left.png');
    this.load.image('down', 'assets/note-down.png');
    this.load.image('up', 'assets/note-up.png');
    this.load.image('right', 'assets/note-right.png');
    this.load.image('hold', 'assets/hold.png');
    this.load.image('judge', 'assets/judge.png');
    this.load.image('stage', 'assets/stage.png');
    this.load.audio('Free Soul', 'music/FreeSoul-FULL.mp3');
  }

  create() {
    //making the background
    gameState.stage = this.physics.add.sprite(800, 450, 'stage');

    //most of the boolean/numerical varibles used in the program
    //mostly note things
    gameState.enemyDestroyHeight = 800;
    gameState.scrollSpeed = 800;
    gameState.selection = 1;
    // used for holding the buttons down
    gameState.leftHit = false;
    gameState.downHit = false;
    gameState.upHit = false;
    gameState.rightHit = false;
    //score things
    gameState.noteCount = 0;
    gameState.points = 0;
    gameState.scoreBoard = this.add.text(700, 100, ((gameState.points * 10) / (gameState.noteCount) | 0) + '%', { fill: 'Number000000', fontSize: '20px' });
    //the music
    gameState.musicTime = 5;
    //animation
    gameState.enemyAnimationCooldown = 0;
    gameState.playerAnimationCooldown = 0;
    gameState.animationLength = 20;
		// time things (complex, halp pls)
		gameState.beginDateFrames = Math.round(Date.now() * (3/50));
    gameState.time = 0;
    gameState.timeout = 0;
    gameState.lastNote = 0;

    //cursor keys pog
    gameState.cursors = this.input.keyboard.createCursorKeys();

    //onscreen elements, like characters
    gameState.enemySprite = this.physics.add.sprite(350, 575, 'belgium char');
    gameState.playerSprite = this.physics.add.sprite(1250, 575, 'poland char');
    this.add.text(1245, 650, 'YOU');
    gameState.scoreLine = this.physics.add.sprite(1250, 800, 'judge').setScale(1, 0.01).refreshBody();//used for scoring
    gameState.pJudge = this.physics.add.sprite(1250, 800, 'judge');
    gameState.eJudge = this.physics.add.sprite(350, 800, 'judge');

    gameState.belowScreen = this.physics.add.sprite(1250, 1000, 'judge');// below the screen, used to delete missed notes

    //gtoups of types of player notes
    gameState.enemyNotes = [];
    gameState.leftNotes = this.physics.add.group();
    gameState.downNotes = this.physics.add.group();
    gameState.upNotes = this.physics.add.group();
    gameState.rightNotes = this.physics.add.group();

    //le song
    gameState.song = this.sound.add('Free Soul');

    //map of the notes, including enemy but those are not added yet.
    gameState.map = [
      { type: 'up', team: 'player', time: 1, next: true, hold: false },
      { type: 'up', team: 'enemy', time: 0, next: false, hold: false },
      { type: 'left', team: 'player', time: 40, next: false, hold: false },
      { type: 'left', team: 'player', time: 20, next: false, hold: false },
      { type: 'left', team: 'player', time: 20, next: false, hold: false },
      { type: 'left', team: 'player', time: 20, next: false, hold: false },
      { type: 'left', team: 'player', time: 20, next: false, hold: false },
      { type: 'left', team: 'player', time: 10, next: false, hold: false },
      { type: 'right', team: 'player', time: 0, next: false, hold: false },
      { type: 'right', team: 'enemy', time: 10, next: false, hold: false },
      { type: 'right', team: 'enemy', time: 20, next: false, hold: false },
      { type: 'right', team: 'enemy', time: 20, next: false, hold: false },
      { type: 'right', team: 'enemy', time: 20, next: false, hold: false },
      { type: 'right', team: 'enemy', time: 20, next: false, hold: false },
      { type: 'right', team: 'enemy', time: 10, next: false, hold: false },
      { type: 'down', team: 'player', time: 10, next: false, hold: false },
      { type: 'down', team: 'player', time: 20, next: false, hold: false },
      { type: 'down', team: 'player', time: 20, next: false, hold: false },
      { type: 'down', team: 'player', time: 20, next: false, hold: false },
      { type: 'down', team: 'player', time: 20, next: false, hold: false },
      { type: 'down', team: 'player', time: 10, next: false, hold: false },
      { type: 'up', team: 'player', time: 0, next: false, hold: false },
      { type: 'left', team: 'enemy', time: 10, next: false, hold: false },
      { type: 'left', team: 'enemy', time: 20, next: false, hold: false },
      { type: 'left', team: 'enemy', time: 20, next: false, hold: false },
      { type: 'left', team: 'enemy', time: 20, next: false, hold: false },
      { type: 'left', team: 'enemy', time: 20, next: false, hold: false },
      { type: 'left', team: 'enemy', time: 10, next: false, hold: false },
      { type: 'up', team: 'player', time: 10, next: false, hold: false },
      { type: 'up', team: 'player', time: 20, next: false, hold: false },
      { type: 'up', team: 'player', time: 20, next: false, hold: false },
      { type: 'up', team: 'player', time: 20, next: false, hold: false },
      { type: 'up', team: 'player', time: 20, next: false, hold: false },
      { type: 'up', team: 'player', time: 10, next: false, hold: false },
      { type: 'down', team: 'player', time: 0, next: false, hold: false },
      { type: 'down', team: 'enemy', time: 10, next: false, hold: false },
      { type: 'down', team: 'enemy', time: 20, next: false, hold: false },
      { type: 'down', team: 'enemy', time: 20, next: false, hold: false },
      { type: 'down', team: 'enemy', time: 20, next: false, hold: false },
      { type: 'down', team: 'enemy', time: 20, next: false, hold: false },
      { type: 'down', team: 'enemy', time: 10, next: false, hold: false },
      { type: 'right', team: 'player', time: 10, next: false, hold: false },
      { type: 'right', team: 'player', time: 20, next: false, hold: false },
      { type: 'right', team: 'player', time: 20, next: false, hold: false },
      { type: 'right', team: 'player', time: 20, next: false, hold: false },
      { type: 'right', team: 'player', time: 20, next: false, hold: false },
      { type: 'right', team: 'player', time: 10, next: false, hold: false },
      { type: 'left', team: 'player', time: 0, next: false, hold: false },
      { type: 'left', team: 'enemy', time: 10, next: false, hold: false },
      { type: 'left', team: 'enemy', time: 20, next: false, hold: false },
      { type: 'left', team: 'enemy', time: 20, next: false, hold: false },
      { type: 'left', team: 'enemy', time: 20, next: false, hold: false },
      { type: 'left', team: 'enemy', time: 20, next: false, hold: false },
      { type: 'left', team: 'enemy', time: 10, next: false, hold: false },
      { type: 'up', team: 'enemy', time: 10, next: false, hold: false },
      { type: 'left', team: 'player', time: 10, next: false, hold: false },
      { type: 'down', team: 'player', time: 0, next: false, hold: false },
      { type: 'down', team: 'player', time: 1, next: false, hold: true },
      { type: 'down', team: 'player', time: 1, next: false, hold: true },
      { type: 'down', team: 'player', time: 1, next: false, hold: true },
      { type: 'down', team: 'player', time: 1, next: false, hold: true },
      { type: 'down', team: 'player', time: 1, next: false, hold: true },
      { type: 'down', team: 'player', time: 1, next: false, hold: true },
      { type: 'down', team: 'player', time: 1, next: false, hold: true },
      { type: 'down', team: 'player', time: 1, next: false, hold: true },
      { type: 'down', team: 'player', time: 1, next: false, hold: true },
      { type: 'down', team: 'player', time: 1, next: false, hold: true },
      { type: 'up', team: 'enemy', time: 10, next: false, hold: false },
      { type: 'right', team: 'enemy', time: 0, next: false, hold: false },
      { type: 'right', team: 'enemy', time: 1, next: false, hold: true },
      { type: 'right', team: 'enemy', time: 1, next: false, hold: true },
      { type: 'right', team: 'enemy', time: 1, next: false, hold: true },
      { type: 'right', team: 'enemy', time: 1, next: false, hold: true },
      { type: 'left', team: 'player', time: 10, next: false, hold: false },
      { type: 'right', team: 'player', time: 10, next: false, hold: false },
      { type: 'left', team: 'player', time: 10, next: false, hold: false },
      { type: 'up', team: 'player', time: 10, next: false, hold: false },
      { type: 'down', team: 'player', time: 10, next: false, hold: false },
      { type: 'up', team: 'player', time: 10, next: false, hold: false },
      { type: 'left', team: 'player', time: 10, next: false, hold: false },
      { type: 'down', team: 'player', time: 10, next: false, hold: false },
      { type: 'left', team: 'player', time: 10, next: false, hold: false },
      { type: 'right', team: 'player', time: 10, next: false, hold: false },
      { type: 'up', team: 'player', time: 10, next: false, hold: false },
      { type: 'right', team: 'player', time: 10, next: false, hold: false },
      { type: 'left', team: 'enemy', time: 30, next: false, hold: false },
      { type: 'down', team: 'enemy', time: 0, next: false, hold: false },
      { type: 'left', team: 'enemy', time: 1, next: false, hold: true },
      { type: 'left', team: 'enemy', time: 1, next: false, hold: true },
      { type: 'left', team: 'enemy', time: 1, next: false, hold: true },
      { type: 'left', team: 'enemy', time: 1, next: false, hold: true },
      { type: 'left', team: 'enemy', time: 1, next: false, hold: true },
      { type: 'left', team: 'enemy', time: 1, next: false, hold: true },
      { type: 'right', team: 'player', time: 23, next: false, hold: false },
      { type: 'left', team: 'player', time: 0, next: false, hold: false },
      { type: 'down', team: 'enemy', time: 70, next: false, hold: false },
      { type: 'up', team: 'enemy', time: 0, next: false, hold: false },
      { type: 'down', team: 'enemy', time: 1, next: false, hold: true },
      { type: 'down', team: 'enemy', time: 1, next: false, hold: true },
      { type: 'down', team: 'enemy', time: 1, next: false, hold: true },
      { type: 'down', team: 'enemy', time: 1, next: false, hold: true },
      { type: 'down', team: 'enemy', time: 1, next: false, hold: true },
      { type: 'down', team: 'enemy', time: 1, next: false, hold: true },
      { type: 'left', team: 'player', time: 45, next: false, hold: false },
      { type: 'down', team: 'player', time: 0, next: false, hold: false },
      { type: 'left', team: 'enemy', time: 45, next: false, hold: false },
      { type: 'right', team: 'enemy', time: 0, next: false, hold: false },
      { type: 'up', team: 'player', time: 30, next: false, hold: false },
      { type: 'up', team: 'enemy', time: 0, next: false, hold: false },
      { type: 'right', team: 'player', time: 5, next: false, hold: false },
      { type: 'right', team: 'enemy', time: 0, next: false, hold: false },
      { type: 'down', team: 'player', time: 10, next: false, hold: false },
      { type: 'down', team: 'enemy', time: 0, next: false, hold: false },
      { type: 'up', team: 'player', time: 10, next: false, hold: false },
      { type: 'up', team: 'enemy', time: 0, next: false, hold: false },
      { type: 'up', team: 'player', time: 10, next: false, hold: false },
      { type: 'up', team: 'enemy', time: 0, next: false, hold: false },
      { type: 'left', team: 'enemy', time: 80, next: false, hold: false },
      { type: 'left', team: 'player', time: 0, next: false, hold: false },
      { type: 'down', team: 'enemy', time: 10, next: false, hold: false },
      { type: 'down', team: 'player', time: 0, next: false, hold: false },
      { type: 'up', team: 'enemy', time: 5, next: false, hold: false },
      { type: 'up', team: 'player', time: 0, next: false, hold: false },
      { type: 'left', team: 'enemy', time: 5, next: false, hold: false },
      { type: 'left', team: 'player', time: 0, next: false, hold: false },
      { type: 'up', team: 'player', time: 80, next: false, hold: false },
      { type: 'down', team: 'player', time: 10, next: false, hold: false },
      { type: 'right', team: 'player', time: 5, next: false, hold: false },
      { type: 'right', team: 'player', time: 5, next: false, hold: false },
      { type: 'left', team: 'player', time: 40, next: false, hold: false },
      { type: 'right', team: 'player', time: 10, next: false, hold: false },
      { type: 'left', team: 'player', time: 10, next: false, hold: false },
      { type: 'left', team: 'player', time: 10, next: false, hold: false },
      { type: 'right', team: 'player', time: 10, next: false, hold: false },
      { type: 'left', team: 'player', time: 10, next: false, hold: false },
      { type: 'up', team: 'player', time: 10, next: false, hold: false },
      { type: 'down', team: 'player', time: 10, next: false, hold: false },
      { type: 'up', team: 'player', time: 10, next: false, hold: false },
      { type: 'up', team: 'player', time: 10, next: false, hold: false },
      { type: 'down', team: 'player', time: 10, next: false, hold: false },
      { type: 'up', team: 'player', time: 10, next: false, hold: false },
      { type: 'down', team: 'player', time: 20, next: false, hold: false },
      { type: 'down', team: 'player', time: 1, next: false, hold: true },
      { type: 'down', team: 'player', time: 1, next: false, hold: true },
      { type: 'down', team: 'player', time: 1, next: false, hold: true },
      { type: 'down', team: 'player', time: 1, next: false, hold: true },
      { type: 'down', team: 'player', time: 1, next: false, hold: true },
      { type: 'down', team: 'player', time: 1, next: false, hold: true },
      { type: 'down', team: 'player', time: 1, next: false, hold: true },
      { type: 'down', team: 'player', time: 1, next: false, hold: true },
      { type: 'down', team: 'player', time: 1, next: false, hold: true },
      { type: 'up', team: 'player', time: 10, next: false, hold: false },
      { type: 'right', team: 'player', time: 10, next: false, hold: false },
      { type: 'down', team: 'player', time: 10, next: false, hold: false },
      { type: 'left', team: 'player', time: 10, next: false, hold: false },
      { type: 'left', team: 'player', time: 30, next: false, hold: false },
      { type: 'left', team: 'player', time: 1, next: false, hold: true },
      { type: 'left', team: 'player', time: 1, next: false, hold: true },
      { type: 'left', team: 'player', time: 1, next: false, hold: true },
      { type: 'left', team: 'player', time: 1, next: false, hold: true },
      { type: 'left', team: 'player', time: 1, next: false, hold: true },
      { type: 'left', team: 'player', time: 1, next: false, hold: true },
      { type: 'left', team: 'player', time: 1, next: false, hold: true },
      { type: 'left', team: 'player', time: 1, next: false, hold: true },
      { type: 'left', team: 'player', time: 1, next: false, hold: true },
      { type: 'left', team: 'player', time: 1, next: false, hold: true },
      { type: 'left', team: 'player', time: 1, next: false, hold: true },
      { type: 'left', team: 'player', time: 1, next: false, hold: true },
      { type: 'left', team: 'player', time: 1, next: false, hold: true },
      { type: 'left', team: 'player', time: 1, next: false, hold: true },
      { type: 'right', team: 'player', time: 10, next: false, hold: false },
      { type: 'right', team: 'player', time: 1, next: false, hold: true },
      { type: 'right', team: 'player', time: 1, next: false, hold: true },
      { type: 'right', team: 'player', time: 1, next: false, hold: true },
      { type: 'right', team: 'player', time: 1, next: false, hold: true },
      { type: 'right', team: 'player', time: 1, next: false, hold: true },
      { type: 'right', team: 'player', time: 1, next: false, hold: true },
      { type: 'right', team: 'player', time: 1, next: false, hold: true },
      { type: 'right', team: 'player', time: 1, next: false, hold: true },
      { type: 'up', team: 'player', time: 10, next: false, hold: false },
      { type: 'up', team: 'player', time: 1, next: false, hold: true },
      { type: 'up', team: 'player', time: 1, next: false, hold: true },
      { type: 'up', team: 'player', time: 1, next: false, hold: true },
      { type: 'up', team: 'player', time: 1, next: false, hold: true },
      { type: 'up', team: 'player', time: 1, next: false, hold: true },
    ];

    //this is for scoring notes
    this.physics.add.overlap(gameState.scoreLine, gameState.leftNotes, (line, note) => {
      if (gameState.cursors.left.isDown) { //if the left button is down
        if (!gameState.leftHit && note.texture.key != 'hold') { //then we check if its a hold note, and aslong as it isnt we make sure the button isnt being held
          gameState.points = gameState.points + 10;
          gameState.noteCount = gameState.noteCount + 1;
          note.destroy();
        } else if (note.texture.key == 'hold') { //if it is a hold note dont check if it is held
          gameState.points = gameState.points + 10;
          gameState.noteCount = gameState.noteCount + 1;
          note.destroy();
        }
        gameState.leftHit = true;
      }
    });
    this.physics.add.overlap(gameState.scoreLine, gameState.downNotes, (line, note) => {
      if (gameState.cursors.down.isDown) {
        if (!gameState.downHit && note.texture.key != 'hold') {
          gameState.points = gameState.points + 10;
          gameState.noteCount = gameState.noteCount + 1;
          note.destroy();
        } else if (note.texture.key == 'hold') {
          gameState.points = gameState.points + 10;
          gameState.noteCount = gameState.noteCount + 1;
          note.destroy();
        }
        gameState.downHit = true;
      }
    });
    this.physics.add.overlap(gameState.scoreLine, gameState.upNotes, (line, note) => {
      if (gameState.cursors.up.isDown) {
        if (!gameState.upHit && note.texture.key != 'hold') {
          gameState.points = gameState.points + 10;
          gameState.noteCount = gameState.noteCount + 1;
          note.destroy();
        } else if (note.texture.key == 'hold') {
          gameState.points = gameState.points + 10;
          gameState.noteCount = gameState.noteCount + 1;
          note.destroy();
        }
        gameState.upHit = true;
      }
    });
    this.physics.add.overlap(gameState.scoreLine, gameState.rightNotes, (line, note) => {
      if (gameState.cursors.right.isDown) {
        if (!gameState.rightHit && note.texture.key != 'hold') {
          gameState.points = gameState.points + 10;
          gameState.noteCount = gameState.noteCount + 1;
          note.destroy();
        } else if (note.texture.key == 'hold') {
          gameState.points = gameState.points + 10;
          gameState.noteCount = gameState.noteCount + 1;
          note.destroy();
        }
        gameState.rightHit = true;
      }
    });

    // this is how we delete notes
    this.physics.add.overlap(gameState.belowScreen, gameState.leftNotes, (line, note) => {
      if (note.texture.key == 'hold') {
        gameState.points = gameState.points + 5;
      }
      gameState.noteCount = gameState.noteCount + 1;
      note.destroy();
    });
    this.physics.add.overlap(gameState.belowScreen, gameState.downNotes, (line, note) => {
      if (note.texture.key == 'hold') {
        gameState.points = gameState.points + 5;
      }
      gameState.noteCount = gameState.noteCount + 1;
      note.destroy();
    });
    this.physics.add.overlap(gameState.belowScreen, gameState.upNotes, (line, note) => {
      if (note.texture.key == 'hold') {
        gameState.points = gameState.points + 5;
      }
      gameState.noteCount == gameState.noteCount + 1;
      note.destroy();
    });
    this.physics.add.overlap(gameState.belowScreen, gameState.rightNotes, (line, note) => {
      if (note.texture.key == 'hold') {
        gameState.points = gameState.points + 5;
      }
      gameState.noteCount == gameState.noteCount + 1;
      note.destroy();
    });
  }

  update() {
    //score
    gameState.scoreBoard.text = (gameState.points * 10) / (gameState.noteCount) | 0 + '%';

    //determining if level done
    if (gameState.time == 3240) {
			gameState.song.stop();
			this.scene.stop('belgium');
			this.scene.start('mainMenu');
		}

		//starting the music at the right time
		if (gameState.time == gameState.musicTime) {
			gameState.song.play();
		}

    //enemy notes and enemy sprite animation
    for (var i = 0; i < gameState.enemyNotes.length; i++) {
      if (!gameState.enemyNotes[i][1]) {
        if (gameState.enemyNotes[i][0].y >= gameState.enemyDestroyHeight) {
          if (gameState.enemyNotes[i][0].texture.key == 'left') {
            gameState.enemySprite.setTexture('belgium left');
            gameState.enemyAnimationCooldown = 0;
            gameState.enemySprite.y = 575;
            gameState.enemyNotes[i][1] = true;
          } else if (gameState.enemyNotes[i][0].texture.key == 'up') {
            gameState.enemySprite.setTexture('belgium up');
            gameState.enemyAnimationCooldown = 0;
            gameState.enemySprite.y = 525;
            gameState.enemyNotes[i][1] = true;
          } else if (gameState.enemyNotes[i][0].texture.key == 'down') {
            gameState.enemySprite.setTexture('belgium down');
            gameState.enemyAnimationCooldown = 0;
            gameState.enemySprite.y = 575;
            gameState.enemyNotes[i][1] = true;
          } else if (gameState.enemyNotes[i][0].texture.key == 'right') {
            gameState.enemySprite.setTexture('belgium right');
            gameState.enemyAnimationCooldown = 0;
            gameState.enemySprite.y = 575;
            gameState.enemyNotes[i][1] = true;
          }
          gameState.enemyNotes[i][0].destroy();
        }
      }
    }

    // making new notes
    for (var i = 0; i < gameState.map.length; i++) {
      if ((gameState.map[i].time == gameState.lastNote) && gameState.map[i].next) {
        if (gameState.map[i].team == 'player') {
          if (gameState.map[i].type == 'left') {
            if (gameState.map[i].hold) {
              gameState.leftNotes.add(this.physics.add.sprite(1060, -50, 'hold'));
            } else {
              gameState.leftNotes.add(this.physics.add.sprite(1060, -50, 'left'));
            }
            gameState.leftNotes.setVelocityY(gameState.scrollSpeed);
          } else if (gameState.map[i].type == 'down') {
            if (gameState.map[i].hold) {
              gameState.downNotes.add(this.physics.add.sprite(1186, -50, 'hold'));
            } else {
              gameState.downNotes.add(this.physics.add.sprite(1186, -50, 'down'));
            }
            gameState.downNotes.setVelocityY(gameState.scrollSpeed);
          } else if (gameState.map[i].type == 'up') {
            if (gameState.map[i].hold) {
              gameState.upNotes.add(this.physics.add.sprite(1304, -50, 'hold'));
            } else {
              gameState.upNotes.add(this.physics.add.sprite(1304, -50, 'up'));
            }
            gameState.upNotes.setVelocityY(gameState.scrollSpeed);
          } else if (gameState.map[i].type == 'right') {
            if (gameState.map[i].hold) {
              gameState.rightNotes.add(this.physics.add.sprite(1439, -50, 'hold'));
            } else {
              gameState.rightNotes.add(this.physics.add.sprite(1439, -50, 'right'));
            }
            gameState.rightNotes.setVelocityY(gameState.scrollSpeed);
          }
        } else if (gameState.map[i].team == 'enemy') {
          if (gameState.map[i].type == 'left') {
            if (gameState.map[i].hold) {
              gameState.enemyNotes.push([this.physics.add.sprite(160, -50, 'hold'), false]);
            } else {
              gameState.enemyNotes.push([this.physics.add.sprite(160, -50, 'left'), false]);
            }
            gameState.enemyNotes[gameState.enemyNotes.length - 1][0].setVelocityY(gameState.scrollSpeed);
          } else if (gameState.map[i].type == 'down') {
            if (gameState.map[i].hold) {
              gameState.enemyNotes.push([this.physics.add.sprite(286, -50, 'hold'), false]);
            } else {
              gameState.enemyNotes.push([this.physics.add.sprite(286, -50, 'down'), false]);
            }
            gameState.enemyNotes[gameState.enemyNotes.length - 1][0].setVelocityY(gameState.scrollSpeed);
          } else if (gameState.map[i].type == 'up') {
            if (gameState.map[i].hold) {
              gameState.enemyNotes.push([this.physics.add.sprite(404, -50, 'hold'), false]);
            } else {
              gameState.enemyNotes.push([this.physics.add.sprite(404, -50, 'up'), false]);
            }
            gameState.enemyNotes[gameState.enemyNotes.length - 1][0].setVelocityY(gameState.scrollSpeed);
          } else if (gameState.map[i].type == 'right') {
            if (gameState.map[i].hold) {
              gameState.enemyNotes.push([this.physics.add.sprite(539, -50, 'hold'), false]);
            } else {
              gameState.enemyNotes.push([this.physics.add.sprite(539, -50, 'right'), false]);
            }
            gameState.enemyNotes[gameState.enemyNotes.length - 1][0].setVelocityY(gameState.scrollSpeed);
          }
        }
        gameState.lastNote = 0;
        try {
          gameState.map[i + 1].next = true;
        } catch {
          //nothing for now
        }
        gameState.map[i].next = false;
      }
    }

    //odd time things, because certain computers are broken (somehow, im a programmer not a computer maker)
		if (gameState.time != ((Math.round(Date.now() * (3/50))) - gameState.beginDateFrames)){
			let x = ((Math.round(Date.now() * (3/50))) - gameState.beginDateFrames) - gameState.time;
			gameState.time += x;
			gameState.lastNote += x;
		}
		if (10 <  gameState.time && gameState.time < 100){
			console.log((Math.round(Date.now() * (3/50))) - gameState.beginDateFrames);
			console.log(gameState.time);
		}
		gameState.time++;
    gameState.lastNote++;

    //resetting the 'hit' values (used to prevent holding from giving 100%)
    if (!gameState.cursors.left.isDown) {
      gameState.leftHit = false;
    }
    if (!gameState.cursors.down.isDown) {
      gameState.downHit = false;
    }
    if (!gameState.cursors.up.isDown) {
      gameState.upHit = false;
    }
    if (!gameState.cursors.right.isDown) {
      gameState.rightHit = false;
    }

    //character sprite animation
    if (gameState.cursors.left.isDown) {
      gameState.playerSprite.setTexture('poland left');
      gameState.playerAnimationCooldown = 0;
      gameState.playerSprite.y = 575;
    } else if (gameState.cursors.up.isDown) {
      gameState.playerSprite.setTexture('poland up');
      gameState.playerAnimationCooldown = 0;
      gameState.playerSprite.y = 525;
    } else if (gameState.cursors.down.isDown) {
      gameState.playerSprite.setTexture('poland down');
      gameState.playerAnimationCooldown = 0;
      gameState.playerSprite.y = 575;
    } else if (gameState.cursors.right.isDown) {
      gameState.playerSprite.setTexture('poland right');
      gameState.playerAnimationCooldown = 0;
      gameState.playerSprite.y = 575;
    }


    //this is for the animation of both caharacter sprites
    if (gameState.enemyAnimationCooldown >= gameState.animationLength) {
      gameState.enemySprite.setTexture('belgium char');
      gameState.enemySprite.y = 575;
    }
    if (gameState.playerAnimationCooldown >= gameState.animationLength) {
      gameState.playerSprite.setTexture('poland char');
      gameState.playerSprite.y = 575;
    }
    gameState.playerAnimationCooldown++;
    gameState.enemyAnimationCooldown++;
  }
}