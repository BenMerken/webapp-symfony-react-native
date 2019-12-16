import React from "react";
import {Text, View} from "react-native";
import {styles} from "./AssetPreviewBody.styles";
import CircleDetail from "../details/CircleDetail";

type Props = {
    roomId: number;
    name: string;
};

const AssetPreviewBody: React.FunctionComponent<Props> = (asset): JSX.Element => {
    return (
        <View style={styles.row}>
            <View style={styles.detail}>
                <CircleDetail
                    text="Asset"/>
            </View>
            <Text style={styles.assetName}>{asset.name}</Text>
        </View>
    );
};

export default AssetPreviewBody;
