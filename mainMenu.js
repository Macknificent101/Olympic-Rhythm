
class mainMenu extends Phaser.Scene {
	constructor() {
		super({ key: 'mainMenu' })
	}

	preload() {
		this.load.image('belgium', 'assets/belgium-level.png');
		this.load.image('belgium select', 'assets/belgium-level-selected.png');
		this.load.image('france select', 'assets/france-level-selected.png');
		this.load.image('france', 'assets/france-level.png');
		this.load.image('russia select', 'assets/russia-level-selected.png');
		this.load.image('russia', 'assets/russia-level.png');

	}

	create() {
		gameState.cursors = this.input.keyboard.createCursorKeys();
		gameState.timeout = 0;
		gameState.selection = 0;
	}

	update() {
		if (gameState.cursors.down.isDown && gameState.timeout > 10) {
			gameState.selection = gameState.selection + 1;
			gameState.timeout = 1;
		}
		if (gameState.cursors.up.isDown && gameState.timeout > 10) {
			gameState.selection = gameState.selection - 1;
			gameState.timeout = 1;
		}
		if (gameState.selection < 0) {
			gameState.selection = 0;
		} else if (gameState.selection > 2) {
			gameState.selection = 1;
		}
		if (gameState.timeout == 0) {
			gameState.belgium = this.physics.add.sprite(800, 300, 'belgium');
			gameState.france = this.physics.add.sprite(800, 500, 'france');
			gameState.russia = this.physics.add.sprite(800, 700, 'russia');
		}
		if (gameState.selection == 0) {
			gameState.belgium.setTexture('belgium select');
			gameState.france.setTexture('france');
			gameState.russia.setTexture('russia');
		} else if (gameState.selection == 1) {
			gameState.belgium.setTexture('belgium');
			gameState.france.setTexture('france select');
			gameState.russia.setTexture('russia');
		} else if (gameState.selection == 2) {
			gameState.belgium.setTexture('belgium');
			gameState.france.setTexture('france');
			gameState.russia.setTexture('russia select');
		}
		if (gameState.cursors.right.isDown && gameState.timeout > 10) {
			if (gameState.selection == 0) {
				this.scene.stop('main_menu');
				this.scene.start('belgium');
			} else if (gameState.selection == 1) {
				this.scene.stop('main_menu');
				this.scene.start('france');
			}
		}
		if (gameState.cursors.left.isDown && gameState.timeout > 10) {
			this.scene.stop('main_menu');
			this.scene.start('title')
			gameState.timeout = 0;
		}
		gameState.timeout++;
	}
}