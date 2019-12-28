import React from "react";
import {View} from "react-native";
import {styles} from "./RoomHeader.styles";
import {H1, H2} from "../headers/TextHeaders";

type Props = {
    name: string;
    happinessScore: number;
};

const RoomHeader: React.FunctionComponent<Props> = (room): JSX.Element => {
    return (
        <View style={styles.header}>
            <H1>Room "{room.name}"</H1>
            <View style={styles.roomRow}>
                <H2>Current happiness score: {room.happinessScore}</H2>
            </View>
        </View>
    );
};

export default RoomHeader;
