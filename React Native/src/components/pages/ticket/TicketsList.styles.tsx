import {StyleSheet} from "react-native";
import {Colors} from "../../../styles/_colors";

export const styles = StyleSheet.create({
    bodyContainer: {
        flex: 1
    },
    separator: {
        marginHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: Colors.listItemSeparator
    },
    ticketContainer: {
        margin: 8
    },
    headerRightContainer: {
        flex: 1,
        flexDirection: 'row'

    },
    navigationItem: {
        flex: 1,
        fontSize: 20,
        margin: 14
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 16,
        marginVertical: 32
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
