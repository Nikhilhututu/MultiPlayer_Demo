
let GameScreen = 0, mSel = 0;
let TEST = 100, outX = -100;
let setValue = true, setMusic = true;
let Counter = 0,Counter2 = 0;
const GAMELOGO = 0, GAMEMENU = 1, GAMEPLAY = 2;
let mScore = 0, mBestScore = 0, mOverCnt = 0;
let mPlayer=[];
let isKeyDown=false;
let myId=0;
function Draw() {


	switch (GameScreen) {
		case TEST:
			break;
		case GAMELOGO:
			DrawTexture(mTex_BG, 0, 0);
			DrawTranScal(mTex_Logo, 0, 0, .5, 1);
			break;
		case GAMEMENU:
			DrawMenu();
			break;
		case GAMEPLAY:
			DrawGamePlay();
			break;
		case GAMEPAUSE:
			break;
	}
	Counter++;
	Counter %= 500;
}
function HandleEvent(event, pointer) {
	switch (GameScreen) {
		case GAMEMENU:
			HandleMenu(event, pointer);
			break;
		case GAMEPLAY:
		case GAMEPAUSE:
			HandleGame(event, pointer);
			break;
	}
}
let mAnim = 0, mAnim2 = 0;
function DrawMenu() {
	DrawTexture(mTex_BG	 ,0,0);
	DrawTranScal(mTex_Btn,0,0,1,1);
}
function HandleMenu(events, pointer) {
	mSel = 0;
	if (CircRectsOverlap(0, 0, floatWidth(mTex_Btn.width)*.5, floatHeight(mTex_Btn.height)*.5, screen2worldX(pointer.x), screen2worldY(pointer.y),.05))
		mSel = 1;
	if (events === 2) {

		switch (mSel) {
			case 1:
				CreatePlayer();
				break;
		}
		mSel = 0;
	}
	return;
}
function CreatePlayer()
{

	 let obj = new CPlayer();	
	 obj.set(RandomInt(-8,8)*.1,-.25,mPId,"","");
	 mPlayer.push(obj);
	 let data = JSON.stringify(obj);
	 console.log("CreatePlayer\n "+data+"     ")
	 mSocket.emit('PlayerCreate',data);	
	 GameScreen = GAMEPLAY;

	mSocket.on("NewPlayer",function (playerData)
	{
		let  obj = JSON.parse(playerData); 
		for(let i=0;i<obj.length;i++)
		{
			if(mPlayer[i] ===null || mPlayer[i] === undefined)
			{
				let pObj = new CPlayer();	
				mPlayer.push(pObj);
			}
		}
		for(let i=0;i<mPlayer.length;i++)
		{
			mPlayer[i].set2(obj[i]);
			if(mPlayer[i].id=== mSocket.id)
				myId=i;

			console.log("NewPlayer=== "+obj.length+"     "+JSON.stringify(mPlayer));		
		}
		mSocket.emit("UpdatePlayer",JSON.stringify(mPlayer));
	});
}


function DrawGamePlay() {
	DrawTexture(mTex_BG, 0, 0);
	for(let i=0;i<mPlayer.length;i++)
		DrawTranScal(mTex_Player, mPlayer[i].x, mPlayer[i].y,1,mPlayer[i].id=== mPId?.5:1);
}
let mStepCnt = 0;
function GameLogic() {

}

function HandleGame(events, pointer){
	mSel = 0;
	// if (CircRectsOverlap(.5, .9, floatWidth(mTex_PauseBtn.width) * .4, floatHeight(mTex_PauseBtn.height) * .4, screen2worldX(pointer.x), screen2worldY(pointer.y), .05))
	// 	mSel = 1;

	// if (events === 2) {

	// 	switch (mSel) {
	// 		case 1:
	// 			// GameScreen = GAMEPAUSE;
	// 			break;
	// 	}
	// 	mSel = 0;

	// }
	return;
}
function KeyHandle(key)
{
	if(GameScreen === GAMEPLAY)
	{

		switch(key)
		{
			case 'ArrowLeft':
				mPlayer[myId].x-=.01;
				break;
			case 'ArrowRight':
				mPlayer[myId].x+=.01;
				break;
			case 'ArrowUp':
				mPlayer[myId].y+=.01;
				break;
			case 'ArrowDown':
				mPlayer[myId].y-=.01;
				break;
		}
		// isKeyDown = true;
		console.log("##############  "+'KeyHandle========== ');
		let data = JSON.stringify(mPlayer);
		mSocket.emit("UpdatePlayer",data);
	}
}



function InitObj() {



}
function SetGame() {
	
	

}
function DrawNumber(str, x, y, Align) {
	let dx = floatWidth(mTex_Font[0].width) * .7;
	let len = str.length;
	if (Align == 1) //Center
		x -= (dx * len) * .35;
	if (Align == 2)//Right
		x -= (dx * len) * 1;
	let strs = str;

	for (let i = 0; i < len; i++) {
		let k;
		k = parseInt((strs.charAt(i)));
		if (k >= 0 && k < mTex_Font.length)
			DrawTexture(mTex_Font[k], x + i * dx, y);
	}
}
function DrawNumberScal(str, x, y, scal, Align) {
	let dx = floatWidth(mTex_Font[0].width) * (.7 * scal);
	let len = str.length;
	if (Align == 1) //Center
		x -= (dx * len) * .35;
	if (Align == 2)//Right
		x -= (dx * len) * 1;
	let strs = str;
	for (let i = 0; i < len; i++) {
		let k;
		k = parseInt((strs.charAt(i)));
		if (k >= 0 && k < mTex_Font.length)
			DrawTranScal(mTex_Font[k], x + i * dx, y, scal, 1);
	}
}
function DrawText(strs, x, y) {


	Font.setText(strs);
	var hex = (255 * 0x010000) + (255 * 0x000100) + (255 * 0x000001);
	Font.tint = hex;
	Font.alpha = 1;
	mRenderTex.draw(Font, XPos(x), YPos(y));
}
function DrawTextScale(Font, strs, x, y, s) {
	Font.setText(strs);
	var hex = (255 * 0x010000) + (255 * 0x000100) + (255 * 0x000001);
	Font.tint = hex;
	Font.alpha = 1;
	Font.setScale(s);
	mRenderTex.draw(Font, XPos(x), YPos(y));
}
function DrawTextColor(Font, strs, x, y, r, g, b, a) {
	Font.setText(strs);
	var hex = (r * 0x010000) + (g * 0x000100) + (b * 0x000001);
	Font.tint = hex;
	Font.alpha = a;
	// Font.setScale(s);
	mRenderTex.draw(Font, XPos(x), YPos(y));
}
function DrawTextColorScal(Font, strs, x, y, r, g, b, s) {
	Font.setText(strs);
	var hex = (r * 0x010000) + (g * 0x000100) + (b * 0x000001);
	Font.tint = hex;
	Font.alpha = 1;
	Font.setScale(s);
	mRenderTex.draw(Font, XPos(x), YPos(y));
}
function DrawTexture(img, x, y) {
	var hex = (255 * 0x010000) + (255 * 0x000100) + (255 * 0x000001);
	img.tint = hex;
	img.alpha = 1;
	img.angle = 0;
	img.setScale(1);
	mRenderTex.draw(img, XPos(x), YPos(y));

}
function DrawTextureSS(img, x, y, sx, sy) {
	var hex = (255 * 0x010000) + (255 * 0x000100) + (255 * 0x000001);
	img.tint = hex;
	img.alpha = 1;
	img.angle = 0;
	img.flipX = false;
	img.scaleX = sx;
	img.scaleY = sy;
	mRenderTex.draw(img, XPos(x), YPos(y));
}
function DrawTranScal(img, x, y, s, t) {
	var hex = (255 * 0x010000) + (255 * 0x000100) + (255 * 0x000001);
	img.tint = hex;
	img.alpha = t;
	img.angle = 0;
	img.setScale(s);
	mRenderTex.draw(img, XPos(x), YPos(y));
}
function DrawTexVFlip(img, x, y, isflip) {
	var hex = (255 * 0x010000) + (255 * 0x000100) + (255 * 0x000001);
	img.tint = hex;
	img.alpha = 1;
	img.setScale(1);
	img.flipY = isflip;
	mRenderTex.draw(img, XPos(x), YPos(y));

}
function DrawTranScalR(img, x, y, s, t, r) {
	var hex = (255 * 0x010000) + (255 * 0x000100) + (255 * 0x000001);
	img.tint = hex;
	img.alpha = t;
	img.setAngle(r);
	img.setScale(s);
	mRenderTex.draw(img, XPos(x), YPos(y));
}
function DrawTexColor(img, x, y, r, g, b) {
	var hex = (r * 0x010000) + (g * 0x000100) + (b * 0x000001);
	img.tint = hex;
	img.angle = 1;
	img.setScale(1);
	mRenderTex.draw(img, XPos(x), YPos(y));

}

function DrawTextureRS(img, x, y, s, r) {
	var hex = (255 * 0x010000) + (255 * 0x000100) + (255 * 0x000001);
	img.tint = hex;
	img.alpha = 1;
	img.angle = r;
	img.setScale(s);
	mRenderTex.draw(img, XPos(x), YPos(y));
}
function DrawTextureRTS(img, x, y, s, ang, r, g, b, alpha) {
	var hex = ((r * 255) * 0x010000) + ((g * 255) * 0x000100) + ((b * 255) * 0x000001);
	img.tint = hex;
	img.alpha = alpha;
	img.angle = ang;
	img.setScale(s);
	mRenderTex.draw(img, XPos(x), YPos(y));
}
function DrawTextureR(img, x, y, r) {
	var hex = (255 * 0x010000) + (255 * 0x000100) + (255 * 0x000001);
	img.tint = hex;
	img.alpha = 1;
	img.setScale(1);
	img.angle = r;
	mRenderTex.draw(img, XPos(x), YPos(y));
}
function DegreeToRadian(d) {
	var r = d * (Math.PI / 180);
	return r;
}
function RadianToDegree(r) {
	var d = r * (180 / Math.PI);
	return d;
}
function GetAngle(d, e) {

	if (d == 0)
		return e >= 0 ? Math.PI / 2 : -Math.PI / 2;
	else if (d > 0)
		return Math.atan(e / d);
	else
		return Math.atan(e / d) + Math.PI;

}
function RandomBoolean() {
	let r = Math.abs(RandomInt(0, 1));
	if (r < 1)
		return false;
	else
		return true;
}
function RandomInt(min, max) {
	// return Math.floor(Math.random() * (max - min + 1) + min);
	return Phaser.Math.Between(min, max);
}

function Randomfloat(min, max) {

	var rnd = Phaser.Math.RND;
	let value = rnd.frac();
	max = max - min;
	max = value % max;
	return (max + min);
}



function checkOverlap(spriteA, spriteB) {

	var boundsA = spriteA.getBounds();
	var boundsB = spriteB.getBounds();

	return Phaser.Rectane.varersects(boundsA, boundsB);
}
function CirCir(cx1, cy1, r1, cx2, cy2, r2) {
	var bVectMag = Math.sqrt(((cx1 - cx2) * (cx1 - cx2)) + ((cy1 - cy2) * (cy1 - cy2)));
	if (bVectMag < (r1 + r2))
		return true;
	return false;
}
function XPos(x) {
	return (((1 + x) * maxX) / 2);
}
function YPos(y) {
	return (((1 - (y)) * maxY) / 2);
}
function floatHeight(Height) {
	return (Height / maxY) * 2;
}
function floatWidth(Width) {
	return (Width / maxX) * 2;
}
function screen2worldX(a) {
	c = ((a / maxX) - 0.5) * 2;
	return c;
}
function screen2worldY(a) {
	c = ((a / maxY) - 0.5) * (-2);
	return c;
}
function Rect2Rectvarersection(ax, ay, adx, ady, bx, by, bdx, bdy) {
	ax -= adx / 2;
	ay += ady / 2;
	bx -= bdx / 2;
	by += bdy / 2;
	if (ax + adx > bx && ay - ady < by && bx + bdx > ax && by - bdy < ay) {
		return true;
	}
	return false;
}
function CircRectsOverlap(CRX, CRY, CRDX, CRDY, centerX, centerY, radius) {
	if ((Math.abs(centerX - CRX) <= (CRDX + radius)) && (Math.abs(centerY - CRY) <= (CRDY + radius)))
		return true;

	return false;
}

