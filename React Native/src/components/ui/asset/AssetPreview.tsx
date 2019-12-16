import React from "react";
import {Room} from "../../../data";
import {View, Text} from "react-native";
import {styles} from "./AssetPreview.styles";

type Props = {
    id: number;
    room: Room;
    name: string;
};

const AssetPreview: React.FunctionComponent<Props> = (asset): JSX.Element => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text>{asset.name}</Text>
            </View>
        </View>
    );
};

export default AssetPreview;
