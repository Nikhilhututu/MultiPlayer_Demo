let gameRatio = window.innerWidth/window.innerHeight;
let game,mRenderTex,isDektop=true;
let mGameFont;
let mTex_Logo,mTex_Btn,mTex_BG,mTex_Player;
let Snd_Theme,Snd_Clock,Snd_Tap,Snd_Over;
let mSocket,mPId;
let mUserCnt=0;
let mRoom;
class GameScene extends Phaser.Scene {

    preload ()
    {

		document.addEventListener("visibilitychange", function(e) {
			// console.log('VISIBILITY CHANGE', document.visibilityState);
		  });
		document.addEventListener('keydown', function (event) {
			const key = event.code;
			// if(!isKeyDown)
				KeyHandle(key);
		});
		document.addEventListener('keyup', function (event) {
			const key = event.code;
			isKeyDown = false;

		});
		// var orientation = this.scale.orientation;
		// console.log("preload=================       "+orientation)
		
		var loadingText = this.add.text(XPos(0),YPos(-.2)," ", { fontFamily: 'Carton_Six',align:'center',fontSize: '32px', color: '#fff' });
		loadingText.setOrigin(.5,.5);
		LoadImage(this.load,"logo.png");
		LoadImage(this.load,"bg.png");
		LoadImage(this.load,"choli.png");
		LoadImage(this.load,"icon.png");

		 
		 
		//  this.load.spritesheet('font', 'assets/font.png', {frameWidth: 62,frameHeight:52});

		//  this.load.audio('theme'	,'./sound/gamemusic.ogg');
		//  this.load.audio('over'		,'./sound/gameover.ogg');
		//  this.load.audio('tap'		,'./sound/tap.ogg');
		//  this.load.audio('clock'	,'./sound/clock.ogg');
		

		this.load.on('progress',function(value){
            let val = value * 100;
            loadingText.setText(""+val.toFixed(2) + "%");

        });
        this.load.on('fileprogress', function (file) {
        });
        this.load.on('complete', function () {
			console.log('complete');
			loadingText.setText("");
		});
		
		
    }
    create ()
    {
		
		mSocket = io().connect('https://multiplayerdemohtt.herokuapp.com/');
		this.scale.lockOrientation('portrait');
        checkOriention(this.scale.orientation);
        this.scale.on('orientationchange', checkOriention, this);

		document.getElementById("loader").style.display="none";
		mTex_Logo  	    =  GetImage(this.add,"logo.png");
		mTex_BG		    =  GetImage(this.add,"bg.png");
		mTex_Player     =  GetImage(this.add,"choli.png");
		mTex_Btn		=  GetImage(this.add,"icon.png");
		mRenderTex      = this.add.renderTexture(0, 0, maxX, maxY);
		// Snd_Theme   	= this.sound.add('theme');
		// Snd_Over        = this.sound.add('over');
		// Snd_Tap         = this.sound.add('tap');
		// Snd_Clock       = this.sound.add('clock');
		
		
		this.input.on('pointerdown', function (pointer) {
			HandleEvent(0,pointer);

		}, this);
		this.input.on('pointermove', function (pointer) {
			HandleEvent(1,pointer);

		}, this);
		this.input.on('pointerup', function (pointer) {
			HandleEvent(2,pointer);
		}, this);
		GameScreen = GAMEMENU;
		Counter=0;
		InitObj();
		document.getElementById("turn").style.display="none";
		this.cameras.main.setBackgroundColor(0xffffff);

		mSocket.on("connected",function (id){
			mPId =id;
			console.log("Pid=========== "+mPId)
		});
		
		mSocket.on("disconnect",function (id){
			console.log("disconnect ===== "+id)
			for(let i=0;i<mPlayer.length;i++)
			{
				if(mPlayer[i].id === id)
				{
					console.log("========= disconnected=== "+id+"    "+mPlayer[i].mRoomId);
					mPlayer.splice(i, 1);
				}
			}
			for(let i=0;i<mPlayer.length;i++)
			{
				if(mPlayer[i].id=== mSocket.id)
					myId=i;
			}
		
		});
		
	}
	update()  {
		mRenderTex.clear();
		Draw();
	}

}

function checkOriention (orientation)
{
	console.log(" checkOriention$$$$$$$$$$$ "+orientation)
    if (orientation === Phaser.Scale.PORTRAIT)
    {
		
		document.getElementById("turn").style.display="none";
    }
    else if (orientation === Phaser.Scale.LANDSCAPE)
    {
		document.getElementById("turn").style.display="block";
		
    }
}




function LoadImage(load,path)
{
	 path = 'assets/'+path;
	 var f_index = path.indexOf("/");
	 var l_index = path.indexOf(".");
	 var name = path.substring(f_index+1,l_index);
	//  console.log("Index========= "+f_index+"     "+l_index+"     "+name+"     "+path+"      "+load);
	 load.image(name,path);
}
function LoadSVGImage(load,path,w,h)
{
	 path = 'assets/'+path;
	 var f_index = path.indexOf("/");
	 var l_index = path.indexOf(".");
	 var name = path.substring(f_index+1,l_index);
	//  load.svg(name,path);
	 load.svg(name,path, { width: w, height: h });
}
function GetImage(add,path)
{
	path = 'assets/'+path;
	var f_index = path.indexOf("/");
	var l_index = path.indexOf(".");
	var name 	= path.substring(f_index+1,l_index);
	var img 	= add.image(XPos(outX),YPos(outX),name);
	img.setVisible(false);
	return img;
	// console.log("Index========= "+f_index+"     "+l_index+"     "+name+"     "+path);
}

function cacheFullAd(id) {
	if(!isFullAd && id === interstialID)
		VMAX.cacheAd(id);
	else if(!isExitAd && id === mExitId)
		VMAX.cacheAd(id);
}

function showFullAd(id) {
	if(id === interstialID && isFullAd)
		VMAX.showAd(id);
	else if(id === mExitId && isExitAd)
		VMAX.showAd(id);

}


function cacheRewardedVideo(){
	if(!isVideoReady)
    	VMAX.cacheAd(mRewardID);
}

function showRewardedVideo() {
    if (isVideoReady) {
        VMAX.showAd(mRewardID);
    }
}





