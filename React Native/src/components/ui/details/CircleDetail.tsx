import React from "react";
import {View} from "react-native";

type Props = {
    size: number;
    text?: string;
};

const CircleDetail: React.FunctionComponent<Props> = (detail) => {
    const detailStyle = {
        width: detail.size,
        height: detail.size,
        borderRadius: detail.size / 2,
        backgroundColor: '#00BCD4'
    };

    return (
        <View style={detailStyle}>{detail.text}</View>
    );
};

export default CircleDetail;
