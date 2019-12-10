import React from "react";
import {TouchableOpacity, View} from "react-native";
import {styles} from "./RoomPreview.styles";
import RoomPreviewBody from "./RoomPreviewBody";

type Props = {
    name: string;
    happinessScore: number;
};

const RoomPreview: React.FunctionComponent<Props> = (room): JSX.Element => (
    <TouchableOpacity>
        <View style={styles.container}>
            <View style={styles.header}>
                <RoomPreviewBody {...room}/>
            </View>
        </View>
    </TouchableOpacity>
);

export default RoomPreview;
