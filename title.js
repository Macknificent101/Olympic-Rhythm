class title extends Phaser.Scene {
  constructor() {
    super({ key: 'title' })
  }

  preload() {
    this.load.image('title', 'assets/title.png');
    this.load.image('controls', 'assets/controls.png');
  }

  create() {
    gameState.cursors = this.input.keyboard.createCursorKeys();
		
		gameState.titleSprite = this.physics.add.sprite(800,450,'title');
    gameState.controls = this.physics.add.sprite(1450,435, 'controls').setScale(0.75);
  }

  update() {
		if (gameState.cursors.right.isDown) {
			this.scene.stop('title');
			this.scene.start('mainMenu');
		}
  }
}