import React from "react";
import {TouchableOpacity, View} from "react-native";
import {styles} from "./RoomPreview.styles";
import RoomPreviewBody from "./RoomPreviewBody";

type Props = {
    id: number;
    name: string;
    happinessScore: number;
    navigateRoom: (name: string, roomId: number) => void;
};

const RoomPreview: React.FunctionComponent<Props> = (room): JSX.Element => (
    <TouchableOpacity onPress={() => room.navigateRoom(room.name, room.id)}>
        <View style={styles.container}>
            <View style={styles.header}>
                <RoomPreviewBody {...room}/>
            </View>
        </View>
    </TouchableOpacity>
);

export default RoomPreview;
