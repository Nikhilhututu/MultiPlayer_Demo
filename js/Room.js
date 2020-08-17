module.exports =class Room{

    constructor()
    {
       this.mRoomPlayer = [];
       this.mRoomId     = '';
    }
    SetRoomId(_id)
    {
        this.mRoomId = _id
    }
    SetPlayer(_player)
    {
        this.mRoomPlayer = _player
    }

    
}
