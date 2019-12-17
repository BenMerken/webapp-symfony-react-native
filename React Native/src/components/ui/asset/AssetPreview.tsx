import React from "react";
import {Room} from "../../../data";
import {View, Text, TouchableOpacity} from "react-native";
import {styles} from "./AssetPreview.styles";
import AssetPreviewBody from "./AssetPreviewBody";

type Props = {
    id: number;
    roomId: number;
    name: string;
    navigateTicket: (assetName: string) => void;
};

const AssetPreview: React.FunctionComponent<Props> = (asset): JSX.Element => {
    return (
        <TouchableOpacity onPress={() => asset.navigateTicket(asset.name)}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <AssetPreviewBody {...asset}/>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default AssetPreview;
