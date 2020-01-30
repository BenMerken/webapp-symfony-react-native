import React from "react";
import {Text, View} from "react-native";
import {styles} from "./AssetPreviewBody.styles";
import {Colors} from "../../../styles/_colors";
import CircleImageDetail from "../details/CircleImageDetail";

type Props = {
    roomId: number;
    name: string;
    image: string;
};

const AssetPreviewBody: React.FunctionComponent<Props> = (asset): JSX.Element => {
    return (
        <View style={styles.row}>
            <View style={styles.detail}>
                <CircleImageDetail
                    size={72}
                    uri={asset.image ? 'data:image/jpg;base64,' + asset.image : ''}
                    backgroundColor={Colors.primaryDark}
                    textColor={Colors.fontPrimary}
                    text="Asset"/>
            </View>
            <Text style={styles.assetName}>{asset.name}</Text>
        </View>
    );
};

export default AssetPreviewBody;
