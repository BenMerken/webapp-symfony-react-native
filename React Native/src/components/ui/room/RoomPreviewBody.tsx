import React from "react";
import {View, Text} from "react-native";
import {styles} from "./RoomPreviewBody.styles";
import CircleDetail from "../details/CircleDetail";

type Props = {
    name: string;
    happinessScore: number;
};

const RoomPreviewBody: React.FunctionComponent<Props> = (room) => {
    return (
        <View style={styles.row}>
            <CircleDetail
                text={room.happinessScore.toString()}
            />
            <Text style={styles.roomName}>Room {room.name}</Text>
        </View>
    );
};

export default RoomPreviewBody;
