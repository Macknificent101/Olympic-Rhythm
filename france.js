class france extends Phaser.Scene {
	constructor() {
		super({ key: 'france' });
	}

	preload() {
		this.load.image('france char', 'assets/france.png');
    this.load.image('france left', 'assets/france-left.png');
    this.load.image('france left', 'assets/france-down.png');
    this.load.image('france right', 'assets/france-right.png');
    this.load.image('france up', 'assets/france-up.png');
		this.load.image('poland char', 'assets/poland.png');
    this.load.image('poland left', 'assets/poland-left.png');
    this.load.image('poland right', 'assets/poland-right.png');
    this.load.image('poland up', 'assets/poland-up.png')
    this.load.image('poland down', 'assets/poland-down.png')
		this.load.image('left', 'assets/note-left.png');
		this.load.image('down', 'assets/note-down.png');
		this.load.image('up', 'assets/note-up.png');
		this.load.image('right', 'assets/note-right.png');
		this.load.image('judge', 'assets/judge.png');
		this.load.image('background', 'assets/stage.png');
		this.load.audio('Free Soul', 'music/FreeSoul-FULL.mp3');
	}

	create() {
		//making the background
		gameState.background = this.physics.add.sprite(800, 450, 'background');

		//most of the boolean/numerical varibles used in the program
		//mostly note things
		gameState.enemyDestroyHeight = 800;
		gameState.scrollSpeed = 800;
		gameState.selection = 1;
		gameState.time = 0;
		gameState.timeout = 0;
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
		gameState.animationLength = 10;

		//cursor keys pog
		gameState.cursors = this.input.keyboard.createCursorKeys();

		//onscreen elements, like characters
		gameState.enemySprite = this.physics.add.sprite(350, 575, 'france char');
		gameState.playerSprite = this.physics.add.sprite(1250, 575, 'poland char');
		this.add.text(1245, 650, 'YOU');
		gameState.pJudge = this.physics.add.sprite(1250, 800, 'judge');
		gameState.eJudge = this.physics.add.sprite(350, 800, 'judge');

		gameState.belowScreen = this.physics.add.sprite(1250, 1000, 'judge');// below the screen, used to delete missed notes

		//gtoups of types of player notes
		gameState.enemyNotes = [];
		gameState.leftNotes = this.physics.add.group();
		gameState.downNotes = this.physics.add.group();
		gameState.upNotes = this.physics.add.group();
		gameState.rightNotes = this.physics.add.group();

		gameState.song = this.sound.add('Free Soul');

		//map of the notes, including enemy but those are not added yet.
		gameState.map = [
      {type:'up', team:'player', time:1},
			{type:'left', team:'player', time:40},
			{type:'left', team:'player', time:60},
			{type:'left', team:'player', time:80},
      {type:'left', team:'player', time:100},
      {type:'left', team:'player', time:120},
      {type:'left', team:'player', time:130},
      {type:'right', team:'player', time:145},
      {type:'right', team:'player', time:165},
      {type:'right', team:'player', time:185},
			{type:'right', team:'player', time:205},
			{type:'right', team:'player', time:225},
			{type:'right', team:'player', time:235},
      {type:'down', team:'player', time:250},
      {type:'down', team:'player', time:270},
      {type:'down', team:'player', time:290},
      {type:'down', team:'player', time:310},
      {type:'down', team:'player', time:330},
      {type:'down', team:'player', time:340}
		];

		//this is for scoring notes
		this.physics.add.overlap(gameState.pJudge, gameState.leftNotes, (line, note) => {
			if (gameState.cursors.left.isDown) { //if the left button is down
				if (!gameState.leftHit && note.texture.key != 'hold note') { //then we check if its a hold note, and aslong as it isnt we make sure the button isnt being held
					gameState.points = gameState.points + 10;
					gameState.noteCount = gameState.noteCount + 1;
					note.destroy();
				} else if (note.texture.key == 'hold note') { //if it is a hold note dont check if it is held
					gameState.points = gameState.points + 10;
					gameState.noteCount = gameState.noteCount + 1;
					note.destroy();
				}
        gameState.leftHit = true;
			}
		});
		this.physics.add.overlap(gameState.pJudge, gameState.downNotes, (line, note) => {
			if (gameState.cursors.down.isDown) {
				if (!gameState.downHit && note.texture.key != 'hold note') {
					gameState.points = gameState.points + 10;
					gameState.noteCount = gameState.noteCount + 1;
					note.destroy();
				} else if (note.texture.key == 'hold note') {
					gameState.points = gameState.points + 10;
					gameState.noteCount = gameState.noteCount + 1;
					note.destroy();
				}
        gameState.downHit = true;
			}
		});
		this.physics.add.overlap(gameState.pJudge, gameState.upNotes, (line, note) => {
			if (gameState.cursors.up.isDown) {
				if (!gameState.upHit && note.texture.key != 'hold note') {
					gameState.points = gameState.points + 10;
					gameState.noteCount = gameState.noteCount + 1;
					note.destroy();
				} else if (note.texture.key == 'hold note') {
					gameState.points = gameState.points + 10;
					gameState.noteCount = gameState.noteCount + 1;
					note.destroy();
				}
        gameState.upHit = true;
			}
		});
		this.physics.add.overlap(gameState.pJudge, gameState.rightNotes, (line, note) => {
			if (gameState.cursors.right.isDown) {
				if (!gameState.rightHit && note.texture.key != 'hold note') {
					gameState.points = gameState.points + 10;
					gameState.noteCount = gameState.noteCount + 1;
					note.destroy();
				} else if (note.texture.key == 'hold note') {
					gameState.points = gameState.points + 10;
					gameState.noteCount = gameState.noteCount + 1;
					note.destroy();
				}
        gameState.rightHit = true;
			}
		});

		// this is how we delete notes
		this.physics.add.overlap(gameState.belowScreen, gameState.leftNotes, (line,note) => {
			if (note.texture.key == 'hold note') {
				gameState.points = gameState.points + 9;
			}
			gameState.noteCount = gameState.noteCount + 1;
			note.destroy();
		});
		this.physics.add.overlap(gameState.belowScreen, gameState.downNotes, (line,note) => {
			if (note.texture.key == 'hold note') {
				gameState.points = gameState.points + 9;
			}
			gameState.noteCount = gameState.noteCount + 1;
			note.destroy();
		});
		this.physics.add.overlap(gameState.belowScreen, gameState.upNotes, (line,note) => {
			if (note.texture.key == 'hold note') {
				gameState.points = gameState.points + 9;
			}
			gameState.noteCount == gameState.noteCount + 1;
			note.destroy();
		});
		this.physics.add.overlap(gameState.belowScreen, gameState.rightNotes, (line,note) => {
			if (note.texture.key == 'hold note') {
				gameState.points = gameState.points + 9;
			}
			gameState.noteCount == gameState.noteCount + 1;
			note.destroy();
		});
	}

	update() {
		//score
		gameState.scoreBoard.text = (gameState.points * 10) / (gameState.noteCount) | 0 + '%';

		//starting the music at the right time
		if (gameState.time == gameState.musicTime) {
			gameState.song.play();
		}

		//enemy notes and enemy sprite animation
		for (var i = 0; i < gameState.enemyNotes.length; i++) {
			if (gameState.enemyNotes[i] != null) {
				if (gameState.enemyNotes[i].y >= gameState.enemyDestroyHeight) {
					if (gameState.enemyNotes[i].texture.key = 'left') {
						gameState.enemySprite.setTexture('france left');
						gameState.enemyAnimationCooldown = 0;
					} else if (gameState.enemyNotes[i].texture.key = 'up') {
						gameState.enemySprite.setTexture('france up');
						gameState.playerSprite.y = 525;
						gameState.enemyAnimationCooldown = 0;
					} else if (gameState.enemyNotes[i].texture.key = 'down') {
						gameState.enemySprite.setTexture('france down');
						gameState.playerSprite.y = 600;
						gameState.enemyAnimationCooldown = 0;
					} else if (gameState.enemyNotes[i].texture.key = 'right') {
						gameState.enemySprite.setTexture('france right');
						gameState.enemyAnimationCooldown = 0;
					}
					gameState.enemyNotes[i].destroy();
				}
			}
		}

		// new note spawning
		for (var i = 0; i < gameState.map.length; i++) {
			if ((gameState.map[i].time - 64 == gameState.time)) {
				if (gameState.map[i].team == 'player') {
					if (gameState.map[i].type == 'left') {
						gameState.leftNotes.add(this.physics.add.sprite(1060, -50, 'left'));
						gameState.leftNotes.setVelocityY(gameState.scrollSpeed);
					} else if (gameState.map[i].type == 'down') {
						gameState.downNotes.add(this.physics.add.sprite(1186, -50, 'down'));
						gameState.downNotes.setVelocityY(gameState.scrollSpeed);
					} else if (gameState.map[i].type == 'up') {
						gameState.upNotes.add(this.physics.add.sprite(1304, -50, 'up'));
						gameState.upNotes.setVelocityY(gameState.scrollSpeed);
					} else if (gameState.map[i].type == 'right') {
						gameState.rightNotes.add(this.physics.add.sprite(1304, -50, 'right'));
						gameState.rightNotes.setVelocityY(gameState.scrollSpeed);
					}
				}
			}
		}
		gameState.time = gameState.time + 1;

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
		} else if (gameState.cursors.up.isDown) {
			gameState.playerSprite.setTexture('poland up');
			gameState.playerAnimationCooldown = 0;
			gameState.playerSprite.y = 525;
		} else if (gameState.cursors.down.isDown) {
			gameState.playerSprite.setTexture('poland down');
			gameState.playerAnimationCooldown = 0;
			gameState.playerSprite.y = 600;
		} else if (gameState.cursors.right.isDown) {
			gameState.playerSprite.setTexture('poland right');
			gameState.playerAnimationCooldown = 0;
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
		gameState.playerAnimationCooldown = gameState.playerAnimationCooldown + 1;
		gameState.enemyAnimationCooldown = gameState.enemyAnimationCooldown + 1;
	}
}