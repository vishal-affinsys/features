package com.splendid; // replace your-app-name with your app’s name
import android.app.Activity;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.splendid.SMSReader;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class MyPackage implements ReactPackage {



    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();

        modules.add(new SMSReader(reactContext));
        modules.add(new QRDecoder(reactContext));
        modules.add(new BTPrinter(reactContext));
        modules.add(new GooglePay(reactContext));
        // modules.add(new Scanner(reactContext));
        return modules;
    }

}