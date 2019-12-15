import {StyleSheet} from 'react-native';
import {Colors} from "../../../styles/_colors";

const size = 72;

export const styles = StyleSheet.create({
    detailStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: Colors.primary
    }
});
