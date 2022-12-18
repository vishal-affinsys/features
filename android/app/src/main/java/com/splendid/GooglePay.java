package com.splendid;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class GooglePay extends ReactContextBaseJavaModule {
    ReactApplicationContext context;
    GooglePay(ReactApplicationContext context){
        super(context);
        this.context = context;
    }

    @NonNull
    @Override
    public String getName(){
        return "GooglePay";
    }

    @ReactMethod
    public void startIntent(String url){
         final int TEZ_REQUEST_CODE = 123;

         final String GOOGLE_TEZ_PACKAGE_NAME =
                "com.google.android.apps.nbu.paisa.user";

        Uri uri =
                new Uri.Builder()
                        .scheme("upi")
                        .authority("pay")
                        .appendQueryParameter("pa", "70843255@axl")
                        .appendQueryParameter("pn", "vishal singh")
                        .appendQueryParameter("mc", "0000")
                        .appendQueryParameter("tr", "1234")
                        .appendQueryParameter("tn", "test")
                        .appendQueryParameter("am", "2000")
                        .appendQueryParameter("cu", "INR")
                        .appendQueryParameter("url", url)
                        .build();
        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.setData(Uri.parse(url));
        intent.setPackage(GOOGLE_TEZ_PACKAGE_NAME);
        context.startActivityForResult(intent, TEZ_REQUEST_CODE, new Bundle());
    }
}
