import React from "react";
import {Text, StyleSheet} from "react-native";
import {Colors} from "../../../styles/_colors";

const styles = StyleSheet.create({
    h1: {
        fontSize: 24,
        textAlign: 'center'
    },
    h2: {
        fontSize: 18,
        textAlign: 'center'
    },
    h3: {
        fontSize: 16,
        textAlign: 'right',
        color: Colors.transparentText
    }
});

export const H1 = props => <Text style={styles.h1}>{props.children}</Text>;

export const H2 = props => <Text style={styles.h1}>{props.children}</Text>;

export const H3 = props => <Text style={styles.h3}>{props.children}</Text>;
