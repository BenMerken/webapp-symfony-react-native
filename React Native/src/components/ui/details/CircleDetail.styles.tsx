import {StyleSheet} from 'react-native';
import {Platform} from "react-native";

const size = 72;

export const styles = StyleSheet.create({
    detailStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: '#00BCD4'
    },
    detailText: {
        fontSize: size - 2 * size,
        lineHeight: this.fontSize
    }
});
