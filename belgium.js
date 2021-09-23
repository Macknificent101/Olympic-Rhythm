
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
		gameState.leftHit = false;
		gameState.downHit = false;
		gameState.upHit = false;
		gameState.rightHit = false;
		gameState.noteCount = 0;
		gameState.enemyNotes = [];
		gameState.scoreBoard = this.add.text(700, 100, ((gameState.points * 10) / (gameState.noteCount) | 0) + '%', { fill: 'Number000000', fontSize: '20px' });

		gameState.cursors = this.input.keyboard.createCursorKeys();

		gameState.map = [
			{type: 'left', time: 55},
			{type: 'left', time: 80}
		];
		
		gameState.belguimSprite = this.physics.add.sprite(350, 575, 'belgium char');
		gameState.polandSprite = this.physics.add.sprite(1250, 575, 'poland char');
		this.add.text(1245, 650, 'YOU');
		gameState.pJudge = this.physics.add.sprite(1250, 800, 'judge');
		gameState.eJudge = this.physics.add.sprite(350, 800, 'judge');

		//to optimize the notes, im rewriting the stuff from here...
		gameState.leftNotes = this.physics.add.group();
		gameState.downNotes = this.physics.add.group();
		gameState.upNotes = this.physics.add.group();
		gameState.rightNotes = this.physics.add.group();

		gameState.easy = this.physics.add.sprite(800, 150, 'easy');
		gameState.normal = this.physics.add.sprite(800, 450, 'normal');
		gameState.hard = this.physics.add.sprite(800, 750, 'hard');

		gameState.song = this.sound.add('Free Soul');

		this.physics.add.overlap(gameState.pJudge, gameState.leftNotes, (line,note) => {
			if (gameState.cursors.left.isDown) {
				if (!gameState.leftHit && note.texture.key != 'hold') {
					gameState.points = gameState.points + 10;
					gameState.noteCount = gameState.noteCount + 1;
					note.destroy();
				} else if (note.texture.key != 'hold') {
					gameState.points = gameState.points + 10;
					gameState.noteCount = gameState.noteCount + 1;
					note.destroy();
				}
			}
		});
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

			gameState.time = gameState.time + 1;

			//score
			gameState.scoreBoard.text = (gameState.points * 10) / (gameState.noteCount) | 0 + '%';

			//enemy notes
			for (gameState.i = 0; gameState.i < gameState.enemyNotes.length; gameState.i++) {
				if (gameState.enemyNotes[i] != null) {
					if (gameState.enemyNotes[i].y >= 800) {
						gameState.enemyNotes[i].destroy();
					}
				}
			}

			// new note spawning
			for (gameState.i = 0; gameState.i < gameState.map.length; gameState.i++) {
				if (gameState.map[gameState.i].time == gameState.time) {
					if (gameState.map[gameState.i].type == 'left') {
						gameState.leftNotes.add(this.physics.add.sprite(1060,-50,'left').setVelocityY(800));
					} else if (gameState.map[gameState.i].type == 'down') {
		
					} else if (gameState.map[gameState.i].type == 'up') {
		
					} else if (gameState.map[gameState.i].type == 'right') {
		
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
}