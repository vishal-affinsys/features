package com.splendid;

import android.Manifest;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class BTPrinter extends ReactContextBaseJavaModule {
    public ReactApplicationContext context;
    BroadcastReceiver receiver;
    IntentFilter intent = new IntentFilter(BluetoothDevice.ACTION_FOUND);

    BTPrinter(ReactApplicationContext context) {

        super(context);
        this.context = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "BTPrinter";
    }

    public void send(ReactApplicationContext context, String eventName, WritableMap params) {
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }

    @ReactMethod
    public void turnOnBluetooth(Promise promise){
        try{
            Intent turnOn = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
            context.startActivityForResult(turnOn, 0, new Bundle());
            promise.resolve("Bluetooth enabled");
        }catch (Exception e){
            promise.reject("Error", "Not able to turn on bluetooth");
        }
    }
    @ReactMethod
    public void connect(Promise promise, String deviceAddress){

    }

    @ReactMethod
    public void getConnectedDevices(Callback callback) throws JSONException {
        BluetoothAdapter bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
        if (ActivityCompat.checkSelfPermission(context, Manifest.permission.BLUETOOTH_CONNECT) != PackageManager.PERMISSION_GRANTED) {
            return;
        }
        Set<BluetoothDevice> pairedDevices = bluetoothAdapter.getBondedDevices();
        WritableArray connectedDevices = Arguments.createArray();


        if (pairedDevices.size() > 0) {
            // There are paired devices. Get the name and address of each paired device.

            for (BluetoothDevice device : pairedDevices) {
                String deviceName = device.getName();
                String deviceHardwareAddress = device.getAddress();
                WritableMap value = Arguments.createMap();
                value.putString("Name",deviceName);
                value.putString("Address", deviceHardwareAddress);
                connectedDevices.pushMap(value);

            }
            callback.invoke(connectedDevices);
        }else{

            callback.invoke("No devices found");
        }
    }


    @ReactMethod
    public void addListener(String eventName) {


        receiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context mContext, Intent intent) {
                if (ActivityCompat.checkSelfPermission(context, Manifest.permission.BLUETOOTH_CONNECT) != PackageManager.PERMISSION_GRANTED) {
                    return;
                }
                String action = intent.getAction();
                if (BluetoothDevice.ACTION_FOUND.equals(action)) {
                    // Discovery has found a device. Get the BluetoothDevice
                    // object and its info from the Intent.
                    BluetoothDevice device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
                    String deviceName = device.getName();
                    String deviceHardwareAddress = device.getAddress(); // MAC address
                    WritableMap value = Arguments.createMap();
                    value.putString("Name",deviceName);
                    value.putString("Address", deviceHardwareAddress);
                    send(context, eventName, value);
                }




            }
        };
        context.registerReceiver(receiver,intent);
    }

    @ReactMethod
    public void removeListeners(int id){

        context.unregisterReceiver(receiver);
    }


}
