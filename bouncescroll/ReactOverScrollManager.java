package com.laso.lasogene.bouncescroll;

import androidx.annotation.Nullable;

import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Map;

public class ReactOverScrollManager extends ViewGroupManager<ReactOverScroll> {
    private static final String REACT_CLASS = "OverScroll";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected ReactOverScroll createViewInstance(ThemedReactContext reactContext) {
        return new ReactOverScroll(reactContext);
    }

    @ReactProp(name="bounce")
    public void setBounce (ReactOverScroll overScroll, boolean bounce) {
        if (overScroll != null) {
            overScroll.setBounce(bounce);
        }
    }

    @Nullable
    @Override
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.of(
            "onScroll", MapBuilder.of("registrationName", "onScroll")
        );
    }
}
