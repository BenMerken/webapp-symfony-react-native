import {StyleSheet} from 'react-native';
import {Colors} from "../../../styles/_colors";

export const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 8
    },
    detail: {
        width: 77,
        height: 72
    },
    roomName: {
        color: Colors.transparentText,
        fontSize: 22,
    },
});
