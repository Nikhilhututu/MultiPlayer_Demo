var express = require('express');
const { json } = require('express');
var app = express();
var Room = require('./js/Room');
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
let mPlayer=[];
let roomid="nik";
let mRoom=[];
const port = process.env.PORT || 3000;
app.use(express.static(__dirname + ''));
app.use('/css'    ,express.static(__dirname + '/css'));
app.use('/js'     ,express.static(__dirname + '/js'));
app.use('/assets' ,express.static(__dirname + '/assets'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + 'index.html');
});
io.on('connection', function (socket){
   socket.emit('connected',socket.id);
   socket.on('PlayerCreate',function(playerData){
      console.log("PlayerCreate====="+" !!!!!!!!!  "+playerData);
      CreateRoom(playerData,socket);
  });
  socket.on('UpdatePlayer',function(playerData){
      // console.log("UpdatePlayer "+playerData)
      let obj = JSON.parse(playerData);
      for(let i=0;i<mRoom.length;i++)  
      {
         for(let j=0;j<obj.length;j++)
         {
            if(obj[j].mRoomId === mRoom[i].mRoomId)
            {
                mRoom[i].mRoomPlayer = JSON.stringify(obj);
                mRoom[i].mRoomPlayer = JSON.parse(mRoom[i].mRoomPlayer);
                // io.to(mRoom[i].mRoomId).emit('Update',playerData);
                socket.broadcast.to(mRoom[i].mRoomId).emit('Update',playerData);
                // console.log("On Updatttee "+obj[j].mRoomId+"      "+i+"      "+mRoom[i].mRoomPlayer);
            }
         }
      }
    // mPlayer = JSON.stringify(obj);
    // mPlayer = JSON.parse(mPlayer);
    // console.log(obj.length+"    "+"UpdatePlayer======"+mPlayer);
    // socket.broadcast.emit('Update',playerData);
    
  });
  socket.on('disconnect', function () {
      
      for(let i=0;i<mRoom.length;i++)
      {
        for(let j=0;j<mRoom[i].mRoomPlayer.length;j++)
        {
            if(mRoom[i].mRoomPlayer[j].id===socket.id)  
            {
                socket.leave(mRoom[i].mRoomId);
                mRoom[i].mRoomPlayer.splice(j,1);
                io.sockets.in(mRoom[i].mRoomId).emit('disconnect', socket.id);
                // socket.broadcast.to(mRoom[i].mRoomId).emit('disconnect', socket.id);
                console.log("Disconect===== "+mRoom[i].mRoomId);
            }
        }
      }
      //  console.log('user disconnected========== '+socket.id);
      // for(let i=0;i<mPlayer.length;i++)
      // {
      //   if(mPlayer[i].id === socket.id)
      //   {
      //       console.log('user disconnected========== '+mPlayer[i].id);
      //       mPlayer.splice(i,1);
      //   }
      // }
        // io.emit('disconnect', socket.id);
        

  });
});
 server.listen(port, function () {
  console.log(`Listening on ${server.address().port}`);
});
function CreateRoom(data,socket)
{
       let obj = JSON.parse(data);
       if(mRoom.length<1 || mRoom[mRoom.length-1].mRoomPlayer.length>=2)
       {
          mRoom.push(new Room());
       }
       let id = mRoom.length-1;
       mRoom[id].SetRoomId(roomid+id)
       obj.mRoomId  = mRoom[id].mRoomId;
       obj.mRoomCnt = mRoom.length;
       mRoom[id].mRoomPlayer.push(obj);
       socket.join(mRoom[id].mRoomId);
       io.to(mRoom[id].mRoomId).emit('NewPlayer',JSON.stringify(mRoom[id].mRoomPlayer));

       
}