package com.splendid;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.provider.Telephony;
import android.telephony.SmsMessage;
import android.util.Log;
import androidx.annotation.NonNull;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.Objects;

public class SMSReader extends ReactContextBaseJavaModule {
    BroadcastReceiver receiver;
    IntentFilter intent = new IntentFilter("android.provider.Telephony.SMS_RECEIVED");
    public ReactApplicationContext context;

    SMSReader(ReactApplicationContext context) {
        this.context = context;
    }
    @NonNull
    @Override
    public String getName() {
        return "SMSReader";
    }

    public void send(ReactApplicationContext context, String eventName, String message, String origin, long time){
        WritableMap params = Arguments.createMap();
        params.putString("message", message);
        params.putString("originatingAddress", origin);
        params.putString("time", String.valueOf(time));

        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);

    }
    @ReactMethod
    public void addListener(String eventName) {
       receiver = new BroadcastReceiver() {
           @Override
           public void onReceive(Context mcontext, Intent intent) {
               Log.d("SMS", "Body is called");
               for (SmsMessage smsMessage : Telephony.Sms.Intents.getMessagesFromIntent(intent)) {
                   String messageBody = smsMessage.getMessageBody();
                   String origin = smsMessage.getOriginatingAddress();
                   long time = smsMessage.getTimestampMillis();
                   send(context, eventName, messageBody, origin, time);
                   Log.d("SMS", messageBody);
               }
           }
       };
        context.registerReceiver(receiver, intent);

    }

    @ReactMethod
    public void removeListeners(int id) {
        context.unregisterReceiver(receiver);
    }

}
