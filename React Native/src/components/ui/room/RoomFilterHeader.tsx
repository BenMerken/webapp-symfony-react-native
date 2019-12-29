import React from "react";
import {View} from "react-native";
import {styles} from "./RoomHeader.styles";
import {H2} from "../headers/TextHeaders";

const RoomFilterHeader: React.FunctionComponent = (): JSX.Element => {
    return (
        <View style={styles.header}>
            <View style={styles.roomRow}>
                <H2>Please, enter an upper boundary for the happiness score!</H2>
            </View>
        </View>
    );
};

export default RoomFilterHeader;
