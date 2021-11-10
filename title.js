class title extends Phaser.Scene {
  constructor() {
    super({ key: 'title' })
  }

  preload() {
    this.load.image('title', 'assets/title.png');
    this.load.image('story select', 'assets/story-select.png');
    this.load.image('story', 'assets/story.png');
    this.load.image('free select', 'assets/free-select.png');
    this.load.image('free', 'assets/free.png');
  }

  create() {
    gameState.cursors = this.input.keyboard.createCursorKeys();
    gameState.title = true;
    gameState.timeout = 0;
		gameState.selection = 0;
		
		gameState.titleSprite = this.physics.add.sprite(800,450,'title');
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
    } else if (gameState.selection > 1) {
      gameState.selection = 1;
    }
    if (gameState.title == true) {
      if (gameState.cursors.right.isDown && gameState.timeout > 10) {
        this.scene.stop('title');
        this.scene.start('mainMenu')
				gameState.timeout = 0;
      }
		}
    if (gameState.mainMenu == true) {
			if (gameState.timeout == 0) {
				gameState.storySprite = this.physics.add.sprite(800,300,'story'); 
				gameState.freeSprite = this.physics.add.sprite(800,500,'free');
			}
      if (gameState.selection == 0) {
        gameState.storySprite.setTexture('story select');
        gameState.freeSprite.setTexture('free');
      } else if (gameState.selection == 1) {
        gameState.storySprite.setTexture('story');
        gameState.freeSprite.setTexture('free select');
        //something else 
      }
    	if (gameState.cursors.right.isDown && gameState.timeout > 10) { 
				if (gameState.selection == 0) {
					gameState.storySprite.destroy();
					gameState.freeSprite.destroy();
					this.scene.stop('menu');
					this.scene.start('belgium');
				} else if (gameState.selection == 1) {
					//something else 
				}
			} 
			if (gameState.cursors.left.isDown && gameState.timeout > 10) {
				gameState.title = true;
				gameState.mainMenu = false;
				gameState.storySprite.destroy();
				gameState.freeSprite.destroy();
				gameState.timeout = 0;
      }
		}
    gameState.timeout = gameState.timeout + 1;
  }
}