import {StyleSheet} from 'react-native';
import {Colors} from "../../../styles/_colors";

export const styles = StyleSheet.create({
    separator: {
        marginHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: Colors.listItemSeparator
    },
    bodyContainer: {
        flex: 1
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    assetListContainer: {
        flex: 2,
        marginHorizontal: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.accentLight
    },
    navigationItem: {
        fontSize: 20,
        margin: 14
    },
    errorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 16,
        marginVertical: 32
    },
    errorItem: {
        flex: 1
    }
});
