package com.willowcreekapp;

import android.app.Application;

import com.srfaytkn.reactnative.YouTubeSdkPackage;
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import com.facebook.react.ReactApplication;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.horcrux.svg.SvgPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.swmansion.rnscreens.RNScreensPackage;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.tanguyantoine.react.MusicControl;
import com.BV.LinearGradient.LinearGradientPackage;
import com.imagepicker.ImagePickerPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new YouTubeSdkPackage(),
          new MainReactPackage(),
              new RNFusedLocationPackage(),
            new AsyncStoragePackage(),
            new RNGestureHandlerPackage(),
            new MapsPackage(),
            new RNFetchBlobPackage(),
            new RNCWebViewPackage(),
            new ReactVideoPackage(),
            new SvgPackage(),
            new SplashScreenReactPackage(),
            new RNScreensPackage(),
            new ReactNativeOneSignalPackage(),
            new MusicControl(),
            new LinearGradientPackage(),
            new ImagePickerPackage(),
            new RNDeviceInfo(),
            new ReactNativeConfigPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
