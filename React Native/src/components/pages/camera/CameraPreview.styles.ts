import {Dimensions, StyleSheet} from "react-native";

const {
    width: winWidth,
    height: winHeight
} = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    preview: {
        height: winHeight,
        width: winWidth,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
    toolBar: {
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        width: winWidth,
        height: winWidth / 6,
        bottom: 0,
        left: 42
    }
});
