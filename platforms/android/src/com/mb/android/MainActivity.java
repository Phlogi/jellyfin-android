/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.mb.android;

import android.os.Bundle;
import android.view.View;
import android.webkit.WebView;

import com.mb.android.api.ApiClientBridge;
import com.mb.android.iap.IapManager;
import com.mb.android.webviews.CrosswalkWebView;
import com.mb.android.webviews.IWebView;
import com.mb.android.webviews.NativeWebView;
import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.OkUrlFactory;

import org.apache.cordova.*;
import org.crosswalk.engine.XWalkCordovaView;
import org.xwalk.core.internal.XWalkSettings;

import java.net.URL;

import mediabrowser.logging.ConsoleLogger;
import mediabrowser.model.logging.ILogger;

public class MainActivity extends CordovaActivity
{
    private ILogger logger;

    private ILogger getLogger(){
        if (logger == null){
            logger = new ConsoleLogger();
        }

        return logger;
    }


    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);

        OkHttpClient okHttpClient = new OkHttpClient();
        URL.setURLStreamHandlerFactory(new OkUrlFactory(okHttpClient));

        // Set by <content src="index.html" /> in config.xml
        loadUrl(launchUrl);
    }

    @Override
    protected CordovaWebViewEngine makeWebViewEngine() {

        CordovaWebViewEngine engine =  super.makeWebViewEngine();

        View engineView = engine.getView();
        ILogger logger = getLogger();


        IWebView webView = null;

        if (engineView instanceof WebView){
            webView = new NativeWebView((WebView)engine.getView());
        }
        else{

            XWalkCordovaView xView = (XWalkCordovaView)engine.getView();
            webView = new CrosswalkWebView(xView);
        }

        webView.addJavascriptInterface(new IapManager(webView, logger), "NativeIapManager");
        webView.addJavascriptInterface(new ApiClientBridge(getApplicationContext(), logger, webView), "ApiClientBridge");

        return engine;
    }
}
