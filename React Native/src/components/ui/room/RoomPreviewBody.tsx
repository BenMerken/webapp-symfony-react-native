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
                size={36}
                text={room.happinessScore.toString()}
            />
            <Text>{room.name}</Text>
        </View>
    );
};

export default RoomPreviewBody;
