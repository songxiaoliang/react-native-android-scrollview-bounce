package com.laso.lasogene.bouncescroll;

import android.content.Context;
import android.util.AttributeSet;
import android.util.Log;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.HorizontalScrollView;
import android.widget.ScrollView;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;

public class ReactOverScroll extends FrameLayout {
    private boolean mBounce = false;

    public ReactOverScroll(Context context) {
        super(context);
    }

    public ReactOverScroll(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public ReactOverScroll(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    @Override
    public void addView(View child, int index) {
        if (getChildCount() > 0) {
            throw new IllegalStateException("ReactOverScroll can host only one direct child");
        }
        super.addView(child, index);

        if (mBounce) {
            setUpOverScroll(child);
        }
    }

    private void setUpOverScroll (View child) {
        IOverScrollDecor decor = null;
        if (child != null) {
            if (child instanceof ScrollView) {
                decor = OverScrollDecoratorHelper.setUpOverScroll((ScrollView)child);
            } else if (child instanceof HorizontalScrollView) {
                decor =  OverScrollDecoratorHelper.setUpOverScroll((HorizontalScrollView)child);
            }
            if (decor != null) {
                decor.setOverScrollUpdateListener(new IOverScrollUpdateListener() {
                    @Override
                    public void onOverScrollUpdate(IOverScrollDecor decor, int state, float offset) {
                        WritableMap event = Arguments.createMap();
                        event.putString("contentOffset", offset+"");
                        ((ReactContext) getContext())
                            .getJSModule(RCTEventEmitter.class)
                            .receiveEvent(getId(), "onScroll", event);
                    }
                });
            }
        }
    }

    public void setBounce (boolean bounce) {
        mBounce = bounce;
        if (bounce) {
            setUpOverScroll(getChildAt(0));
        }
    }


}
