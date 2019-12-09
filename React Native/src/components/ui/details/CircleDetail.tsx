import React from "react";
import {View, Text} from "react-native";

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
        <View style={detailStyle}>
            <Text>{detail.text}</Text>
        </View>
    );
};

export default CircleDetail;
