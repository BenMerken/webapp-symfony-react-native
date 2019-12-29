import {StyleSheet} from "react-native";
import {Colors} from "../../../styles/_colors";

export const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        padding: 8
    },
    input: {
        flex: 1,
        borderBottomColor: Colors.accentLight,
        borderBottomWidth: 1,
        textAlignVertical: 'top'
    },
    lastInput: {
        flex: 1,
        textAlignVertical: 'top'
    },
    navigationItem: {
        flex: 1,
        fontSize: 20,
        margin: 14
    }
});
