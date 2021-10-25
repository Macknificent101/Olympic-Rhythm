class belgium extends Phaser.Scene {
	constructor() {
		super({ key: 'belgium' });
	}

	preload() {
		this.load.image('belgium char', 'assets/belgium.png');
		this.load.image('poland char', 'assets/poland.PNG');
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
		gameState.enemyDestroyHeight = 800;
		gameState.scrollSpeed = 800;
		gameState.selection = 1;
		gameState.points = 0;
		gameState.time = 0;
		gameState.lastNote = 0;
		gameState.leftHit = false;
		gameState.downHit = false;
		gameState.upHit = false;
		gameState.rightHit = false;
		gameState.noteCount = 0;
		gameState.enemyNotes = [];
		gameState.scoreBoard = this.add.text(700, 100, ((gameState.points * 10) / (gameState.noteCount) | 0) + '%', { fill: 'Number000000', fontSize: '20px' });
		gameState.musicTime = 5;

		//cursor keys pog
		gameState.cursors = this.input.keyboard.createCursorKeys();

		//onscreen elements, like characters
		gameState.belguimSprite = this.physics.add.sprite(350, 575, 'belgium char');
		gameState.polandSprite = this.physics.add.sprite(1250, 575, 'poland char');
		this.add.text(1245, 650, 'YOU');
		gameState.pJudge = this.physics.add.sprite(1250, 800, 'judge');
		gameState.eJudge = this.physics.add.sprite(350, 800, 'judge');

		gameState.belowScreen = this.physics.add.sprite(1250, 1000, 'judge');// below the screen, used to delete missed notes

		//gtoups of types of player notes
		gameState.leftNotes = this.physics.add.group();
		gameState.downNotes = this.physics.add.group();
		gameState.upNotes = this.physics.add.group();
		gameState.rightNotes = this.physics.add.group();

		gameState.song = this.sound.add('Free Soul');

		//map of the notes, including enemy but those are not added yet.
		gameState.map = [
      {type:'up', team:'player', time:1, next:true},
      {type:'up', team:'enemy', time:0, next:false},
			{type:'left', team:'player', time:40, next:false},
			{type:'left', team:'player', time:20, next:false},
      {type:'left', team:'player', time:20, next:false},
      {type:'left', team:'player', time:20, next:false},
      {type:'left', team:'player', time:20, next:false},
      {type:'left', team:'player', time:10, next:false},
      {type:'right', team:'player', time:10, next:false},
      {type:'right', team:'player', time:20, next:false},
      {type:'right', team:'player', time:20, next:false},
      {type:'right', team:'player', time:20, next:false},
      {type:'right', team:'player', time:20, next:false},
      {type:'right', team:'player', time:10, next:false},
      {type:'down', team:'player', time:10, next:false},
      {type:'down', team:'player', time:20, next:false},
      {type:'down', team:'player', time:20, next:false},
      {type:'down', team:'player', time:20, next:false},
      {type:'down', team:'player', time:20, next:false},
      {type:'down', team:'player', time:10, next:false},
      {type:'left', team:'player', time:10, next:false},
      {type:'left', team:'player', time:15, next:false},
      {type:'left', team:'player', time:20, next:false},
      {type:'left', team:'player', time:15, next:false},
      {type:'left', team:'player', time:30, next:false},
      {type:'left', team:'player', time:10, next:false},
      {type:'up', team:'player', time:20, next:false},
      {type:'up', team:'player', time:10, next:false},
      {type:'up', team:'player', time:20, next:false},
      {type:'up', team:'player', time:10, next:false},
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

		//enemy notes
		for (var i = 0; i < gameState.enemyNotes.length; i++) {
			if (gameState.enemyNotes[i] != null) {
				if (gameState.enemyNotes[i].y >= gameState.enemyDestroyHeight) {
					gameState.enemyNotes[i].destroy();
				}
			}
		}

		// new note spawning
		for (var i = 0; i < gameState.map.length; i++) {
			if ((gameState.map[i].time == gameState.lastNote) && gameState.map[i].next) {
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
						gameState.rightNotes.add(this.physics.add.sprite(1439, -50, 'right'));
						gameState.rightNotes.setVelocityY(gameState.scrollSpeed);
					}
				} else if (gameState.map[i].team == 'enemy') {
					if (gameState.map[i].type == 'left') {
						gameState.enemyNotes.push(this.physics.add.sprite(160, -50, 'left'));
						gameState.enemyNotes[gameState.enemyNotes.length-1].setVelocityY(gameState.scrollSpeed);
					} else if (gameState.map[i].type == 'down') {
						gameState.enemyNotes.push(this.physics.add.sprite(286, -50, 'down'));
						gameState.enemyNotes[gameState.enemyNotes.length-1].setVelocityY(gameState.scrollSpeed);
					} else if (gameState.map[i].type == 'up') {
						gameState.enemyNotes.push(this.physics.add.sprite(404, -50, 'up'));
						gameState.enemyNotes[gameState.enemyNotes.length-1].setVelocityY(gameState.scrollSpeed);
					} else if (gameState.map[i].type == 'right') {
						gameState.enemyNotes.push(this.physics.add.sprite(404, -50, 'right'));
						gameState.enemyNotes[gameState.enemyNotes.length-1].setVelocityY(gameState.scrollSpeed);
					}
				} 
				gameState.lastNote = 0;
				try {
					gameState.map[i+1].next = true;
				} catch {
					//nothing for now
				}
				gameState.map[i].next = false;
			}
		}

		gameState.time++;
		gameState.lastNote = gameState.lastNote + 1;

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

		//character sprite things (not done)
		if (gameState.cursors.left.isDown) {

		}
		if (gameState.cursors.up.isDown) {

		}
		if (gameState.cursors.right.isDown) {

		}
		if (gameState.cursors.down.isDown) {

		}
	}
}