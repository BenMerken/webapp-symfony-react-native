import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

type Props = {
    roomName: string;
    happyOrNot: string;
    icon: string;
    text: string;
    updateHappinessScore: (roomName: string, happyOrNot: string) => void;
};

const RoomHappinessScoreOption: React.FunctionComponent<Props> = (props): JSX.Element => {
    return (
        <TouchableOpacity onPress={() => props.updateHappinessScore(props.roomName, props.happyOrNot)}>
            <View>
                <Icon name={props.icon}/>
                <Text>{props.text}</Text>
            </View>
        </TouchableOpacity>
    )
};

export default RoomHappinessScoreOption;
