import React from "react";
import {View, TouchableOpacity} from "react-native";
import {styles} from "./AssetPreview.styles";
import AssetPreviewBody from "./AssetPreviewBody";

type Props = {
    id: number;
    roomId: number;
    name: string;
    navigateTicket: (assetName: string, assetId: number) => void;
};

const AssetPreview: React.FunctionComponent<Props> = (asset): JSX.Element => {
    return (
        <TouchableOpacity onPress={() => asset.navigateTicket(asset.name, asset.id)}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <AssetPreviewBody {...asset}/>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default AssetPreview;
