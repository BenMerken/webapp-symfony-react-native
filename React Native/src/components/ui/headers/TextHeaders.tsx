import React from "react";
import { Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    h1: {
        fontSize: 24,
        textAlign: 'center'
    },
    h2: {
        fontSize: 18,
        textAlign: 'center'
    }
});

export const H1 = props => {
    return <Text style={styles.h1}>{props.children}</Text>;
};

export const H2 = props => {
    return <Text style={styles.h1}>{props.children}</Text>;
};
