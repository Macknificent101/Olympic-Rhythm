
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
		this.load.image('easy', 'assets/easy.png');
		this.load.image('normal', 'assets/normal.png');
		this.load.image('hard', 'assets/hard.png');
		this.load.image('easy select', 'assets/easy-select.png');
		this.load.image('normal select', 'assets/normal-select.png');
		this.load.image('hard select', 'assets/hard-select.png');
		this.load.image('judge', 'assets/judge.png');
		this.load.image('background', 'assets/stage.png');
		this.load.audio('Free Soul', 'music/FreeSoul-FULL.mp3');
	}

	create() {
		gameState.background = this.physics.add.sprite(800, 450, 'background');

		gameState.selection = 1;
		gameState.difficulty = 0;
		gameState.points = 0;
		gameState.time = 0;
		gameState.timeout = 0;
		gameState.leftNotes = [];
		gameState.leftNoteNumber = 0;
		gameState.leftHit = false;
		gameState.downNotes = [];
		gameState.downNoteNumber = 0;
		gameState.downHit = false;
		gameState.upNotes = [];
		gameState.upNoteNumber = 0;
		gameState.upHit = false;
		gameState.rightNotes = [];
		gameState.rightNoteNumber = 0;
		gameState.rightHit = false;
		gameState.enemyNotes = [];
		gameState.scoreBoard = this.add.text(700, 100, ((gameState.points * 10) / (gameState.leftNoteNumber + gameState.upNoteNumber + gameState.downNoteNumber + gameState.rightNoteNumber) | 0) + '%', { fill: 'Number000000', fontSize: '20px' });

		gameState.cursors = this.input.keyboard.createCursorKeys();

		gameState.map = [
			{type: 'left', time: 55},
			{type: 'left', time: 80}
		];

		// to optimize the notes, im rewriting the stuff from here...
		//gameState.leftNotes = this.physics.add.group();
		//gameState.downNotes = this.physics.add.group();
		//gameState.upNotes = this.physics.add.group();
		gameState.rightNotesB = this.physics.add.group();
		gameState.rightNotesB.add(this.physics.add.sprite(800,-50,'right'));
		//
		//
		//to here this is all commented until its ready to implimented

		gameState.easy = this.physics.add.sprite(800, 150, 'easy');
		gameState.normal = this.physics.add.sprite(800, 450, 'normal');
		gameState.hard = this.physics.add.sprite(800, 750, 'hard');

		gameState.song = this.sound.add('Free Soul');
		function noteCheck (direction) {

		}
	}

	update() {
		if (gameState.difficulty == 0) {
			gameState.timeout = gameState.timeout + 1;
			if (gameState.cursors.down.isDown && gameState.timeout > 10) {
				gameState.selection = gameState.selection + 1;
				gameState.timeout = 0;
			} else if (gameState.cursors.up.isDown && gameState.timeout > 10) {
				gameState.selection = gameState.selection - 1;
				gameState.timeout = 0;
			}
			if (gameState.selection < 0) {
				gameState.selection = 0;
			} else if (gameState.selection > 2) {
				gameState.selection = 2;
			}
			if (gameState.cursors.left.isDown) {
				this.scene.stop('belgium');
				this.scene.start('mainMenu');
			}
			if (gameState.selection == 0) { // on-screen selection
				gameState.easy.setTexture('easy select');
				gameState.normal.setTexture('normal');
				gameState.hard.setTexture('hard');
			} else if (gameState.selection == 1) {
				gameState.easy.setTexture('easy');
				gameState.normal.setTexture('normal select');
				gameState.hard.setTexture('hard');
			} else if (gameState.selection == 2) {
				gameState.easy.setTexture('easy');
				gameState.normal.setTexture('normal');
				gameState.hard.setTexture('hard select');
			}
			if (gameState.cursors.right.isDown && gameState.timeout > 10) {
				if (gameState.selection == 0) {
					gameState.difficulty = 0;
				} else if (gameState.selection == 1) {
					gameState.difficulty = 20;
					gameState.easy.destroy();
					gameState.normal.destroy();
					gameState.hard.destroy();
				} else if (gameState.selection == 2) {
					gameState.difficulty = 0;
				}
			}
		} else {
			if (gameState.time == 0) {
				gameState.belguimSprite = this.physics.add.sprite(350, 575, 'belgium char');
				gameState.polandSprite = this.physics.add.sprite(1250, 575, 'poland char');
				this.add.text(1245, 650, 'YOU');
				gameState.pJudge = this.physics.add.sprite(1250, 800, 'judge');
				gameState.eJudge = this.physics.add.sprite(350, 800, 'judge');
			}

			gameState.time = gameState.time + 1;

			// note spawning (mapping)
			if (true) {
				if (gameState.time == 10) {
					gameState.song.play();
				} else if (gameState.time == 55) {
					gameState.leftNotes.push(this.physics.add.sprite(1060, 10, 'left').setVelocityY(800));
				} else if (gameState.time == 80) {
					gameState.leftNotes.push(this.physics.add.sprite(1060, 10, 'left').setVelocityY(800));
				} else if (gameState.time == 105) {
					gameState.leftNotes.push(this.physics.add.sprite(1060, 10, 'left').setVelocityY(800));
				} else if (gameState.time == 130) {
					gameState.leftNotes.push(this.physics.add.sprite(1060, 10, 'left').setVelocityY(800));
				} else if (gameState.time == 155) {
					gameState.leftNotes.push(this.physics.add.sprite(1060, 10, 'left').setVelocityY(800));
				} else if (gameState.time == 170) {
					gameState.leftNotes.push(this.physics.add.sprite(1060, 10, 'left').setVelocityY(800));
				} else if (gameState.time == 190) {
					gameState.rightNotes.push(this.physics.add.sprite(1438, 10, 'right').setVelocityY(800));
				} else if (gameState.time == 215) {
					gameState.rightNotes.push(this.physics.add.sprite(1438, 10, 'right').setVelocityY(800));
				} else if (gameState.time == 240) {
					gameState.rightNotes.push(this.physics.add.sprite(1438, 10, 'right').setVelocityY(800));
				} else if (gameState.time == 265) {
					gameState.rightNotes.push(this.physics.add.sprite(1438, 10, 'right').setVelocityY(800));
				} else if (gameState.time == 290) {
					gameState.rightNotes.push(this.physics.add.sprite(1438, 10, 'right').setVelocityY(800));
				} else if (gameState.time == 305) {
					gameState.rightNotes.push(this.physics.add.sprite(1438, 10, 'right').setVelocityY(800));
				} else if (gameState.time == 317) {
					gameState.downNotes.push(this.physics.add.sprite(1186, 10, 'down').setVelocityY(800));
				} else if (gameState.time == 342) {
					gameState.downNotes.push(this.physics.add.sprite(1186, 10, 'down').setVelocityY(800));
				} else if (gameState.time == 367) {
					gameState.downNotes.push(this.physics.add.sprite(1186, 10, 'down').setVelocityY(800));
				} else if (gameState.time == 392) {
					gameState.downNotes.push(this.physics.add.sprite(1186, 10, 'down').setVelocityY(800));
				} else if (gameState.time == 417) {
					gameState.downNotes.push(this.physics.add.sprite(1186, 10, 'down').setVelocityY(800));
				} else if (gameState.time == 432) {
					gameState.downNotes.push(this.physics.add.sprite(1186, 10, 'down').setVelocityY(800));
				} else if (gameState.time == 445) {
					gameState.upNotes.push(this.physics.add.sprite(1304, 10, 'up').setVelocityY(800));
				} else if (gameState.time == 470) {
					gameState.upNotes.push(this.physics.add.sprite(1304, 10, 'up').setVelocityY(800));
				} else if (gameState.time == 495) {
					gameState.upNotes.push(this.physics.add.sprite(1304, 10, 'up').setVelocityY(800));
				} else if (gameState.time == 520) {
					gameState.upNotes.push(this.physics.add.sprite(1304, 10, 'up').setVelocityY(800));
				} else if (gameState.time == 545) {
					gameState.upNotes.push(this.physics.add.sprite(1304, 10, 'up').setVelocityY(800));
				} else if (gameState.time == 555) {
					gameState.upNotes.push(this.physics.add.sprite(1304, 10, 'up').setVelocityY(800));
				} else if (gameState.time == 1000) {
					gameState.song.stop();
					this.scene.stop('belgium');
					this.scene.start('title');
				}
			}

			//score
			gameState.scoreBoard.text = (gameState.points * 10) / (gameState.leftNoteNumber + gameState.upNoteNumber + gameState.downNoteNumber + gameState.rightNoteNumber) + '%';

			//enemy notes
			for (gameState.i = 0; gameState.i < gameState.enemyNotes.length; gameState.i++) {
				if (gameState.enemyNotes[i] != null) {
					if (gameState.enemyNotes[i].y >= 800) {
						gameState.enemyNotes[i].destroy();
					}
				}
			}

			// testing new note procedures
//		for (i = 0; i < gameState.map.length; i++) {
//			if (gameState.map[i].time == gamestate.time) {
//				if (gameState.map[i].type == 'left') {
//					leftNotes.add(this.physics.add.sprite())
//				} else if (gameState.map[i].type == 'down') {
//
//				} else if (gameState.map[i].type == 'up') {
//
//				} else if (gameState.map[i].type == 'right') {
//
//				}
//			}
//		}
//		
//		
//		for (i=0)

			// left notes
			if (gameState.cursors.left.isDown && (gameState.leftNotes[gameState.leftNoteNumber] != null)) {
				// note stuffs
				if ((750 <= gameState.leftNotes[gameState.leftNoteNumber].y) && (gameState.leftNotes[gameState.leftNoteNumber].y <= 850)) {
					if (gameState.leftNotes[gameState.leftNoteNumber].texture.key != 'hold note' && !gameState.leftHit){
						gameState.leftNotes[gameState.leftNoteNumber].destroy();
						gameState.leftNoteNumber = gameState.leftNoteNumber + 1;
						gameState.points = gameState.points + 10;
						gameState.leftHit = true;
					} else if (gameState.leftNotes[gameState.leftNoteNumber].texture.key == 'hold note') {
						gameState.leftNotes[gameState.leftNoteNumber].destroy();
						gameState.leftNoteNumber = gameState.leftNoteNumber + 1;
						gameState.points = gameState.points + 10;
					}
				}
			}
			if (gameState.leftNotes[gameState.leftNoteNumber] != null) {
				if (900 <= gameState.leftNotes[gameState.leftNoteNumber].y) {
					if (gameState.leftNotes[gameState.leftNoteNumber].texture.key == 'hold note') {
						gameState.points = gameState.points + 9;
					}
					gameState.leftNotes[gameState.leftNoteNumber].destroy();
					gameState.leftNoteNumber = gameState.leftNoteNumber + 1;
				}
			}

			// down notes
			if (gameState.cursors.down.isDown && (gameState.downNotes[gameState.downNoteNumber] != null)) {
				// note stuffs
				if ((750 <= gameState.downNotes[gameState.downNoteNumber].y) && (gameState.downNotes[gameState.downNoteNumber].y <= 850)) {
					gameState.downNotes[gameState.downNoteNumber].destroy();
					gameState.downNoteNumber = gameState.downNoteNumber + 1;
					gameState.points = gameState.points + 10;
				}
			}
			if (gameState.downNotes[gameState.downNoteNumber] != null) {
				if (900 <= gameState.downNotes[gameState.downNoteNumber].y) {
					if (gameState.downNotes[gameState.downNoteNumber].texture.key == 'hold note') {
						gameState.points = gameState.points + 9;
					}
					gameState.downNotes[gameState.downNoteNumber].destroy();
					gameState.downNoteNumber = gameState.downNoteNumber + 1;
				}
			}

			// up notes
			if (gameState.cursors.up.isDown && (gameState.upNotes[gameState.upNoteNumber] != null)) {
				// note stuffs
				if ((750 <= gameState.upNotes[gameState.upNoteNumber].y) && (gameState.upNotes[gameState.upNoteNumber].y <= 850)) {
					gameState.upNotes[gameState.upNoteNumber].destroy();
					gameState.upNoteNumber = gameState.upNoteNumber + 1;
					gameState.points = gameState.points + 10;
				}
			}
			if (gameState.upNotes[gameState.upNoteNumber] != null) {
				if (900 <= gameState.upNotes[gameState.upNoteNumber].y) {
					if (gameState.upNotes[gameState.upNoteNumber].texture.key == 'hold note') {
						gameState.points = gameState.points + 9;
					}
					gameState.upNotes[gameState.upNoteNumber].destroy();
					gameState.upNoteNumber = gameState.upNoteNumber + 1;
				}
			}

			// right notes
			if (gameState.cursors.right.isDown && (gameState.rightNotes[gameState.rightNoteNumber] != null)) {
				// note stuffs
				if ((750 <= gameState.rightNotes[gameState.rightNoteNumber].y) && (gameState.rightNotes[gameState.rightNoteNumber].y <= 850)) {
					gameState.rightNotes[gameState.rightNoteNumber].destroy();
					gameState.rightNoteNumber = gameState.rightNoteNumber + 1;
					gameState.points = gameState.points + 10;
				}
			}
			if (gameState.rightNotes[gameState.rightNoteNumber] != null) {
				if (900 <= gameState.rightNotes[gameState.rightNoteNumber].y) {
					if (gameState.rightNotes[gameState.rightNoteNumber].texture.key == 'hold note') {
						gameState.points = gameState.points + 9;
					}
					gameState.rightNotes[gameState.rightNoteNumber].destroy();
					gameState.rightNoteNumber = gameState.rightNoteNumber + 1;
				}
			}
		}

		//resetting the 'hit' values (used to prevent holding from giving 100%)
		if (!gameState.cursors.left.isDown){
			gameState.leftHit = false;
		}
    if (!gameState.cursors.down.isDown){
			gameState.downHit = false;
		}
    if (!gameState.cursors.up.isDown){
			gameState.upHit = false;
		}
    if (!gameState.cursors.right.isDown){
			gameState.rightHit = false;
		}

		//character sprite things
    if (gameState.cursors.left.isDown){
      
    }
    if (gameState.cursors.up.isDown){

    }
    if (gameState.cursors.right.isDown){

    }
    if (gameState.cursors.down.isDown){
      
    }
    
	}
}





// hmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm