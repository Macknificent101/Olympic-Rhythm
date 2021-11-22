class france extends Phaser.Scene {
  constructor() {
    super({ key: 'france' });
  }

  preload() {
    this.load.image('france char', 'assets/france.png');
    this.load.image('france left', 'assets/france-left.png');
    this.load.image('france down', 'assets/france-down.png');
    this.load.image('france right', 'assets/france-right.png');
    this.load.image('france up', 'assets/france-up.png');
    this.load.audio('france song', 'music/france-song.mp3');
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
		this.load.image('finish', 'assets/finish-screen.png');
    this.load.image('accuracy bar', 'assets/accuracy-bar.png');
		this.load.image('pass', 'assets/pass.png');
		this.load.image('fail', 'assets/fail.png');
  }

  create() {
    //making the background
    gameState.stage = this.physics.add.sprite(800, 450, 'stage');

    //most of the boolean/numerical varibles used in the program
		gameState.x = 0;
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
    gameState.accuracyBar = this.physics.add.sprite(800, 100, 'accuracy bar');
    gameState.scoreBoard = this.add.text(750, 100, (Math.floor((gameState.points * 10) / (gameState.noteCount)) + '%'), { fill: 'Number000000', fontSize: '20px' });
    //the music
    gameState.musicTime = 8;
		gameState.musicEndTime = 3000;
		//pass or fail stuffs
		gameState.complete = false;
		gameState.idkWhatToCallThisOne = 0;
		gameState.passAccuracy = 85
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
    gameState.enemySprite = this.physics.add.sprite(350, 575, 'france char');
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
    gameState.song = this.sound.add('france song');

    //map of the notes, including enemy but those are not added yet.
    gameState.map = [
      { type: 'up', team: 'player', time: 1, next: true, hold: false },
      { type: 'up', team: 'player', time: 1, next: false, hold: true },
      { type: 'up', team: 'player', time: 1, next: false, hold: true },
      { type: 'up', team: 'player', time: 1, next: false, hold: true },
      { type: 'up', team: 'player', time: 1, next: false, hold: true },
      { type: 'up', team: 'player', time: 1, next: false, hold: true },
      { type: 'up', team: 'player', time: 1, next: false, hold: true },
      { type: 'up', team: 'player', time: 1, next: false, hold: true },
      { type: 'up', team: 'player', time: 1, next: false, hold: true },
      { type: 'up', team: 'player', time: 1, next: false, hold: true },
      { type: 'up', team: 'player', time: 1, next: false, hold: true },
      { type: 'up', team: 'player', time: 1, next: false, hold: true },
      { type: 'up', team: 'player', time: 1, next: false, hold: true },
      { type: 'up', team: 'player', time: 1, next: false, hold: true },
      { type: 'up', team: 'player', time: 1, next: false, hold: true },
      { type: 'up', team: 'player', time: 1, next: false, hold: true },
      { type: 'up', team: 'player', time: 1, next: false, hold: true },
      { type: 'up', team: 'player', time: 1, next: false, hold: true },
      { type: 'up', team: 'player', time: 1, next: false, hold: true },
      { type: 'up', team: 'player', time: 1, next: false, hold: true },
      { type: 'up', team: 'player', time: 1, next: false, hold: true },
      { type: 'up', team: 'player', time: 1, next: false, hold: true },
      { type: 'up', team: 'player', time: 1, next: false, hold: true },
      { type: 'up', team: 'player', time: 1, next: false, hold: true },
      { type: 'up', team: 'player', time: 1, next: false, hold: true },
      { type: 'up', team: 'player', time: 1, next: false, hold: true },
      { type: 'up', team: 'player', time: 1, next: false, hold: true },
      { type: 'up', team: 'player', time: 1, next: false, hold: true },
      { type: 'up', team: 'player', time: 1, next: false, hold: true },
      { type: 'up', team: 'player', time: 1, next: false, hold: true },
      { type: 'up', team: 'player', time: 1, next: false, hold: true },
      { type: 'up', team: 'player', time: 1, next: false, hold: true },
      { type: 'left', team: 'player', time: 1, next: false, hold: false },
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
      { type: 'left', team: 'player', time: 1, next: false, hold: true }
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
		if (!gameState.complete) {
			//score
			gameState.scoreBoard.text = Math.floor((gameState.points * 10) / (gameState.noteCount)) + '%';

			//determining if level done
			if (gameState.time == gameState.musicEndTime) {
				gameState.song.stop();
				gameState.complete = true;
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
							gameState.enemySprite.setTexture('france left');
							gameState.enemyAnimationCooldown = 0;
							gameState.enemySprite.y = 575;
							gameState.enemyNotes[i][1] = true;
						} else if (gameState.enemyNotes[i][0].texture.key == 'up') {
							gameState.enemySprite.setTexture('france up');
							gameState.enemyAnimationCooldown = 0;
							gameState.enemySprite.y = 525;
							gameState.enemyNotes[i][1] = true;
						} else if (gameState.enemyNotes[i][0].texture.key == 'down') {
							gameState.enemySprite.setTexture('france down');
							gameState.enemyAnimationCooldown = 0;
							gameState.enemySprite.y = 575;
							gameState.enemyNotes[i][1] = true;
						} else if (gameState.enemyNotes[i][0].texture.key == 'right') {
							gameState.enemySprite.setTexture('france right');
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
				if ((gameState.map[i].time <= gameState.lastNote) && gameState.map[i].next) {

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
					gameState.lastNote = gameState.lastNote - gameState.map[i].time;
					try {
						gameState.map[i + 1].next = true;
					} catch {
						//nothing for now
					}
					gameState.map[i].next = false;
				}
			}

			//odd time things, because certain computers are broken (somehow, im a programmer not a computer maker)
			if (gameState.time != ((Math.floor(Date.now() * (3/50))) - gameState.beginDateFrames)){
				gameState.x = ((Math.floor(Date.now() * (3/50))) - gameState.beginDateFrames) - gameState.time;
				gameState.time += gameState.x;
				gameState.lastNote += gameState.x;
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
				gameState.enemySprite.setTexture('france char');
				gameState.enemySprite.y = 575;
			}
			if (gameState.playerAnimationCooldown >= gameState.animationLength) {
				gameState.playerSprite.setTexture('poland char');
				gameState.playerSprite.y = 575;
			}
			gameState.playerAnimationCooldown++;
			gameState.enemyAnimationCooldown++;
		} else {
			while (gameState.idkWhatToCallThisOne == 0) {
				gameState.finishBackground = this.physics.add.sprite(800, 450, 'finish');
				if (gameState.passAccuracy <= Math.floor((gameState.points * 10) / (gameState.noteCount))) {
					gameState.passOrFail = this.physics.add.sprite(350, 350, 'pass');
				} else {
					gameState.passOrFail = this.physics.add.sprite(350, 350, 'fail');
				}
				gameState.finishEnemy = this.physics.add.sprite(1150, 525, 'france char').setScale(2);
				gameState.finalScore = this.add.text(700, 100, (Math.floor((gameState.points * 10) / (gameState.noteCount)) + '%'), { fill: 'NumberFFFFFF', fontSize: '100px' });
				gameState.idkWhatToCallThisOne++;
			}
			if (gameState.cursors.right.isDown){
				this.scene.stop('france');
				this.scene.start('mainMenu');
			} 
		}
  }
}