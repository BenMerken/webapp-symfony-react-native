import React from "react";
import {Text, View} from "react-native";
import {styles} from "./AssetPreviewBody.styles";
import CircleDetail from "../details/CircleDetail";
import {Colors} from "../../../styles/_colors";

type Props = {
    roomId: number;
    name: string;
};

const AssetPreviewBody: React.FunctionComponent<Props> = (asset): JSX.Element => {
    return (
        <View style={styles.row}>
            <View style={styles.detail}>
                <CircleDetail
                    backgroundColor={Colors.primaryDark}
                    textColor={Colors.fontPrimary}
                    text="Asset"/>
            </View>
            <Text style={styles.assetName}>{asset.name}</Text>
        </View>
    );
};

export default AssetPreviewBody;
