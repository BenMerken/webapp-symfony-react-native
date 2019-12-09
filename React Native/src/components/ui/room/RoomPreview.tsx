import React from "react";
import {TouchableOpacity, View} from "react-native";
import {styles} from "./RoomPreview.styles";
import RoomPreviewBody from "./RoomPreviewBody";

type Props = {
    name: string;
    happinessScore: number;
};

const RoomPreview: React.FunctionComponent<Props> = (room): JSX.Element => (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity>
                <RoomPreviewBody {...room}/>
            </TouchableOpacity>
        </View>
    </View>
);

export default RoomPreview;
