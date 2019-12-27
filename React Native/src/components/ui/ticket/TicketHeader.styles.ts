import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    header: {
        flex:1,
        marginHorizontal: 16,
        paddingVertical: 16,
    },
    ticketRow: {
        flex: 1,
        paddingTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    upvoteButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
