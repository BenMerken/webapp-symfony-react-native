import React from "react";
import {Image, StyleSheet, View} from "react-native";
import {Colors} from "../../../styles/_colors";
import CircleDetail from "./CircleDetail";

type Props = {
    text?: string,
    uri?: string;
    size?: number
    backgroundColor?: string;
    textColor?: string;
};

const CircleImageDetail: React.FunctionComponent<Props> = (detail): JSX.Element => {
    const styles = StyleSheet.create({
        detailStyle: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: detail.size ? detail.size : 72,
            height: detail.size ? detail.size : 72,
            borderRadius: (detail.size ? detail.size : 72) / 2,
        }
    });

    return (
        detail.uri
            ?
            <Image style={
                {
                    width: styles.detailStyle.width,
                    height: styles.detailStyle.height,
                    borderRadius: styles.detailStyle.borderRadius,
                }
            }
                   source={{uri: detail.uri}}
            />
            : <CircleDetail
                size={detail.size}
                backgroundColor={detail.backgroundColor}
                textColor={detail.textColor}
                text={detail.text}
            />

    );
};

export default CircleImageDetail;
