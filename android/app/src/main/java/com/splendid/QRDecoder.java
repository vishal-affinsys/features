package com.splendid;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class QRDecoder extends ReactContextBaseJavaModule {
    public ReactApplicationContext context;

    QRDecoder(ReactApplicationContext context) {
        this.context = context;
    }
    @NonNull
    @Override
    public String getName() {
        return "QRDecoder";
    }


    @ReactMethod
    public void ScanImage(String filePath, Promise promise) throws Exception {
        try{
            String val = QRCode.decodeQRImage(filePath);
            promise.resolve(val);
        }catch (Exception e){
            promise.reject("Image not found");
        }

    }

}
