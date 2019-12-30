import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {styles} from "./RoomHappinessScoreOption.styles";

type Props = {
    roomName: string;
    happyOrNot: string;
    icon: string;
    text: string;
    color: string;
    updateHappinessScore: (roomName: string, happyOrNot: string) => void;
};

const RoomHappinessScoreOption: React.FunctionComponent<Props> = (props): JSX.Element => {
    return (
        <TouchableOpacity
            onPress={() => props.updateHappinessScore(props.roomName, props.happyOrNot)}
            style={styles.touchableSurface}
        >
            <View style={styles.optionContainer}>
                <Icon style={{...styles.icon, color: props.color}} name={props.icon}/>
                <Text style={styles.text}>{props.text}</Text>
            </View>
        </TouchableOpacity>
    )
};

export default RoomHappinessScoreOption;
