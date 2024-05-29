import React, { useMemo, useRef } from 'react';
import {
    View,
    Text,
    Image,
    Animated,
    StyleSheet,
    ScrollView
} from '@/LasoUI';
import { usePersistFn } from '@/hoox';
import Themes, { Images } from '@/Themes';

const PanLoadScrollView = ({
    snapPoints,
    children,
    onEvent
}) => {
    const xOffset = useRef(new Animated.Value(0));

    const onScroll = useMemo(() => Animated.event([{
        nativeEvent: {
            contentOffset: {
                x: xOffset.current
            }
        }
    }]), []);

    const stickyElementTranslateX = xOffset.current.interpolate({
        inputRange: snapPoints,
        outputRange: [82, 0],
        extrapolate: 'clamp'
    });

    const scrollEndDrag = usePersistFn((e) => {
        if (e.nativeEvent.contentOffset.x > snapPoints[1] - 20) {
            onEvent?.();
        }
    });

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                onScroll={onScroll}
                scrollEventThrottle={16}
                onScrollEndDrag={scrollEndDrag}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollView}
            >
                {children}
            </ScrollView>
            <Animated.View style={styles.stick(stickyElementTranslateX)}>
                <View style={styles.loadMoreView}>
                    <Image
                        style={styles.arrow}
                        source={Images.loadMoreArrow}
                    />
                    <Text style={styles.tip}>
                        {'释\n放\n查\n看'}
                    </Text>
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        justifyContent: 'center',
    },

    scrollView: {
        paddingLeft: 15,
    },

    loadMoreView: {
        width: 82,
        height: 76,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FE',
        borderTopLeftRadius: 100,
        borderBottomLeftRadius: 100,
    },

    arrow: {
        width: 6,
        height: 10,
        marginLeft: 15,
    },

    tip: {
        marginLeft: 8,
        ...Themes.fontGroup11,
        color: Themes.grey1,
    },

    stick: (translateX) => ({
        transform: [{ translateX }],
        position: 'absolute',
        right: 0,
    })
});

export default PanLoadScrollView;
