package com.splendid;

import static com.splendid.R.layout.activity_camera_acivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;



public class CameraAcivity extends AppCompatActivity{
    public final static int QRcodeWidth = 350 ;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        IntentIntegrator integrator = new IntentIntegrator(CameraAcivity.this);
        integrator.setDesiredBarcodeFormats(IntentIntegrator.ALL_CODE_TYPES);
        integrator.setCameraId(0);
        integrator.setBeepEnabled(true);
        integrator.setBarcodeImageEnabled(false);
        integrator.setOrientationLocked(false);
        integrator.setPrompt("Scan");
        integrator.initiateScan();
    }





    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent val) {
        IntentResult result = IntentIntegrator.parseActivityResult(requestCode, resultCode, val);
        if(result != null) {
            if(result.getContents() == null) {
                Log.e("Scan*******", "Cancelled scan");
                Intent data = new Intent();
                data.putExtra("cancelled", "user cancelled scan");
                setResult(RESULT_OK, data);
                onBackPressed();

            } else {
                Log.e("Scan", "Scanned");
                Intent data = new Intent();
                data.putExtra("data", result.getContents());
                data.putExtra("myData2", "Data 2 value");
                setResult(RESULT_OK, data);

                Toast.makeText(this, "Scanned: " + result.getContents(), Toast.LENGTH_LONG).show();
                onBackPressed();

            }
        } else {
            // This is important, otherwise the result will not be passed to the fragment
            super.onActivityResult(requestCode, resultCode, val);
        }
    }
}
