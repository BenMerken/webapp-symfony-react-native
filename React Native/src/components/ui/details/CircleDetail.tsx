import React from "react";
import {View, Text} from "react-native";
import {Colors} from "../../../styles/_colors";
import {StyleSheet} from 'react-native';

type Props = {
    text?: string;
    size?: number;
    backgroundColor?: string;
    textColor?: string;
};

const CircleDetail: React.FunctionComponent<Props> = (detail) => {

    const styles = StyleSheet.create({
        detailStyle: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: detail.size ? detail.size : 72,
            height: detail.size ? detail.size : 72,
            borderRadius: (detail.size ? detail.size : 72) / 2,
            backgroundColor: detail.backgroundColor ? detail.backgroundColor : Colors.primary
        }
    });

    return (<View style={styles.detailStyle}>
        <Text style={{color: detail.textColor ? detail.textColor: Colors.fontDark}}>{detail.text}</Text>
    </View>)
};


export default CircleDetail;
