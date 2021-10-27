const gameState = {};

const config = {
  type: Phaser.AUTO,
  width: 1600,
  height: 900,
  backgroundColor: "efefef",
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      enableBody: true,
			fps: 60
    }
  },
  scene: [title,mainMenu,belgium,france]
};

const game = new Phaser.Game(config);