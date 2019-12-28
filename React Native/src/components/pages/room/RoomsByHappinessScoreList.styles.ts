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
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    roomsListContainer: {
        flex: 8,
        marginHorizontal: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.accentLight
    },
    happinessScoreForm: {
        flex: 1,
        marginHorizontal: 16,
        marginVertical: 32
    },
    noRoomsTextContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    noRoomsText: {
        fontSize: 22,
    },
    navigationItem: {
        fontSize: 20,
        margin: 14
    }
});
