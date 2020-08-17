// var GameScene,Preloader;
var contextID;
class BootScene extends Phaser.Scene {

    init ()
    {

        var element = document.createElement('style');
        document.head.appendChild(element);
        var sheet = element.sheet;
        var styles = '@font-face { font-family: "FiraSans"; src: url("./font/FiraSans-Regular.ttf") format("truetype"); }\n';
        sheet.insertRule(styles, 0);
        
    }
    preload ()
    {
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }
    create ()
    {
        var add = this.add;
         WebFont.load({
            custom:{
                families: [ 'FiraSans']
            },
            active: function ()
            {
                mGameFont = add.text(XPos(outX),XPos(outX), '', { fontFamily:'CabinMedium',fontSize: '20px',align:'left',color:'#ffffff'});
                mGameFont.setOrigin(0,.5);
            }
        });
        
        this.startGame();

    }
    startGame ()
    {
        console.log('Start Game!!!!!');
        this.scene.add('myScene', GameScene, true);
    }

}
var maxX  = 770;
var maxY  = 1378;

var config = {
    type: Phaser.AUTO, //WEBGL  CANVAS
    backgroundColor: '#000000',
    scene: BootScene,
    scale: {
       mode: Phaser.Scale.FIT,// Phaser.Scale.HEIGHT_CONTROLS_WIDTH,// Phaser.Scale.FIT,//Phaser.Scale.WIDTH_CONTROLS_HEIGHT, //
       orientation: Phaser.Scale.Orientation.PORTRAIT,  //PORTRAIT LANDSCAPE
       width: maxX,
       height: maxY,
       autoCenter: Phaser.Scale.CENTER_BOTH,
       
   },
    fps: {
        target: 60,
        min: 60,
        forceSetTimeOut: false
   },
//    resolution: window.devicePixelRatio,
};
