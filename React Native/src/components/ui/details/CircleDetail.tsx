import React from "react";
import {View, Text} from "react-native";
import {styles} from './CircleDetail.styles';

type Props = {
    text?: string;
};

const CircleDetail: React.FunctionComponent<Props> = (detail) => {

    return (
        <View style={styles.detailStyle}>
            <Text style={styles.detailText}>{detail.text}</Text>
        </View>
    );
};

export default CircleDetail;
