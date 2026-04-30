// src/main.js
import LoginScene    from './scenes/LoginScene.js';
import MenuScene     from './scenes/MenuScene.js';
import ProfileScene  from './scenes/ProfileScene.js';
import FoodScene     from './scenes/FoodScene.js';
import HygieneScene  from './scenes/HygieneScene.js';
import ActivityScene from './scenes/ActivityScene.js';
import TutorScene    from './scenes/TutorScene.js';

const config = {
    type: Phaser.AUTO,
    width: 1400,
    height: 860,
    backgroundColor: '#f5eeff',
    parent: 'game-container',
    scene: [LoginScene, MenuScene, ProfileScene, FoodScene, HygieneScene, ActivityScene, TutorScene],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    dom: {
        createContainer: true
    }
};

const game = new Phaser.Game(config);
export default game;
