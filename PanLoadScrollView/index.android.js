import React from 'react';
import Animated, {
    interpolate,
    Extrapolate,
    useSharedValue,
    useAnimatedStyle
} from 'react-native-reanimated';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet
} from '@/LasoUI';
import Themes, { Images } from '@/Themes';
import OverScrollNative from './ScrollNative';

const PanLoadScrollView = ({
    onEvent,
    children,
}) => {
    const xOffset = useSharedValue(0);

    const onScroll = (e) => {
        const contentOffset = parseFloat(e.nativeEvent.contentOffset);
        if (contentOffset < -190) {
            onEvent?.();
        }
        xOffset.value = contentOffset;
    };

    const translateXStyle = useAnimatedStyle(() => ({
        right: interpolate(xOffset.value, [-300, 0], [0, -82], Extrapolate.CLAMP)
    }));

    return (
        <View style={styles.container}>
            <OverScrollNative
                bounce
                onScroll={onScroll}
            >
                <ScrollView
                    horizontal
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollViewContainer}
                >
                    {children}
                </ScrollView>
            </OverScrollNative>
            <Animated.View style={[styles.stick, translateXStyle]}>
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
        width: 375,
        flexDirection: 'row',
        alignItems: 'center',
    },

    scrollView: {
        flexDirection: 'row'
    },

    scrollViewContainer: {
        paddingLeft: 15,
        flexDirection: 'row'
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

    stick: {
        position: 'absolute',
        right: -82,
    }
});

export default PanLoadScrollView;
