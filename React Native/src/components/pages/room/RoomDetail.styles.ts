import {StyleSheet} from 'react-native';
import {Colors} from "../../../styles/_colors";

export const styles = StyleSheet.create({
    separator: {
        marginHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: Colors.listItemSeparator
    },
    loadingContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bodyContainer: {
        marginHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#BBB'
    }
});
