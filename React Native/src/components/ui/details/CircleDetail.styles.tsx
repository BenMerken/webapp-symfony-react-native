import {StyleSheet} from 'react-native';
import {Colors} from "../../../styles/_colors";


export const styles = StyleSheet.create({
    detailStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 72,
        height: 72,
        borderRadius: 72 / 2,
        backgroundColor: Colors.primary
    }
});
