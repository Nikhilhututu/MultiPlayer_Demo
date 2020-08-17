
class CPlayer
{
    // constructor()
    // {
    //     this.x     = 0;
    //     this.y     = 0;
    //     this.vy    = 0;
    //     this.g     = 0;
    //     this.stop  = 0;
    //     this.id    = "";
        
    // }
    constructor()
    {
        this.x          = 0;
        this.y          = 0;
        this.id         = "";
        this.mRoomId    = "";
        this.mRoomCnt   = 0;
        // console.log("in Playerrrr");
        
    }
    set(_x,_y,_socketid,_roomid,_roomcnt)
    {
        this.x          =  _x;
        this.y          =  _y;
        this.id         = _socketid;
        this.mRoomId    = _roomid;
        this.mRoomCnt   = _roomcnt;
    }
    set2(obj)
    {
        this.x          =   obj.x;
        this.y          =   obj.y;
        this.id         =   obj.id;
        this.mRoomId    =   obj.mRoomId;
        this.mRoomCnt   =   obj.mRoomCnt;
        // this.Update2(obj.x,obj.y);
        
    }
    Update2(_x,_y)
    {
        // setInterval(() => {
        //     this.x = this.lerp(this.x,_x,.1);
        //     this.y = this.lerp(this.y,_y,.1);
        // }, 1000/60);
    }
    lerp (start, end, amt){
        return (1-amt)*start+amt*end
     }

    

}
