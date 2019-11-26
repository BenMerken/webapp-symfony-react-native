import React from "react";
import {View} from "react-native";
import {styles} from "./RoomPreview.styles";

type Props = {
    name: string;

};

const RoomPreview: React.FunctionComponent<Props> = (room): JSX.Element => (
    <View style={styles.container}>
        <View style={styles.header}>

        </View>
    </View>
);

export default RoomPreview;
