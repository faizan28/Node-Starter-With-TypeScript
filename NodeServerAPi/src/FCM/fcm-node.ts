var FCM = require('fcm-node');
export class FCMNODE{
    sendPushNotification(Token:String,Title:String,Body:String,ChannelName:String,UserId:String){
        let serverKey = process.env.SERVERKEY; //put your server key here
        var fcm = new FCM(serverKey);
        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            to: Token,
            notification: {
                title: Title+" Send a Message",
                body: Body
            },
            data: {  //you can send only notification or only data(or include both)
                ChannelName: ChannelName,
                Title: Title,
                Body: Body,
                UserId: UserId
            }
        };
        fcm.send(message, function(err:any, response:any){
            if (err) {
                console.log("Something has gone wrong!",err);
            } else {
                console.log("Successfully sent with response: ", response);
            }
        });
    }
}