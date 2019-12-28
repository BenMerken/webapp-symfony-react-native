import React from "react";
import {View, Text} from "react-native";
import {styles} from "./RoomPreviewBody.styles";
import CircleDetail from "../details/CircleDetail";

type Props = {
    name: string;
    happinessScore: number;
};

const RoomPreviewBody: React.FunctionComponent<Props> = (room): JSX.Element => {
    return (
        <View style={styles.row}>
            <View style={styles.detail}>
                <CircleDetail
                    text={room.happinessScore.toString()}
                />
            </View>
            <Text style={styles.roomName}>Name: {room.name}</Text>
        </View>
    );
};

export default RoomPreviewBody;
