package com.splendid;


import android.app.Activity;
import android.content.Intent;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


public class Scanner extends ReactContextBaseJavaModule implements ActivityEventListener {

    public ReactApplicationContext context;
    Promise promise;

    Scanner(ReactApplicationContext context) {
        this.context = context;
        this.context.addActivityEventListener(this);
    }



    @NonNull
    @Override
    public String getName() {
        return "Scanner";
    }


    @ReactMethod
    public void getScanner(Promise promise){
        this.promise = promise;
        Intent camera = new Intent(context, CameraAcivity.class);
        camera.putExtra("key", "value");

        context.startActivityForResult(camera, 1, null);
    }


    @Override
    public void onActivityResult(Activity activity, int i, int i1, Intent intent) {
        if(intent==null){
            this.promise.reject("Err: Something went wrong");
        } else if(intent.getExtras().getString("data")==null){
            if(intent.getExtras().getString("cancelled")!=null){
                this.promise.reject("User Cancelled Scan");
            }else{
                this.promise.reject("Err: Something went wrong getString method receives null");
            }
        } else{
            this.promise.resolve(intent.getExtras().getString("data"));
        }
    }

    @Override
    public void onNewIntent(Intent intent) {

    }
}
