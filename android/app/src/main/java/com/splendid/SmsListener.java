//package com.splendid;
//
//import android.content.BroadcastReceiver;
//import android.content.Context;
//import android.content.Intent;
//import android.provider.Telephony;
//import android.telephony.SmsMessage;
//import android.util.Log;
//
//import com.facebook.react.bridge.Arguments;
//import com.facebook.react.bridge.ReactApplicationContext;
//import com.facebook.react.bridge.WritableMap;
//import com.facebook.react.modules.core.DeviceEventManagerModule;
//
//public class SmsListener extends BroadcastReceiver{
////    Callback callback;
////    SmsListener(Callback callback){
////        this.callback = callback;
////    }
//
//    ReactApplicationContext context;
//    SmsListener(ReactApplicationContext context){
//        this.context = context;
//    }
//
//    public void send(ReactApplicationContext context, String eventName, String message){
//        WritableMap params = Arguments.createMap();
//        params.putString("message", message);
//        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
//
//    }
//
//
//    @Override
//    public void onReceive(Context context, Intent intent) {
//        Log.d("SMS", "Content of message is not set yet !!");
//        for (SmsMessage smsMessage : Telephony.Sms.Intents.getMessagesFromIntent(intent)) {
//            String messageBody = smsMessage.getMessageBody();
//            send(this.context, "SMSReceiver", messageBody);
//            Log.d("SMS", messageBody);
//        }
//    }
//
//}
