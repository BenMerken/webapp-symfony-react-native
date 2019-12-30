import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

type Props = {
    roomName: string;
    toAddOrSubtract: number;
    icon: string;
    text: string;
    updateHappinessScore: (roomName: string, toAddOrSubtract: number) => void;
};

const RoomHappinessScoreOption: React.FunctionComponent<Props> = (props): JSX.Element => {
    return (
        <TouchableOpacity onPress={() => props.updateHappinessScore(props.roomName, props.toAddOrSubtract)}>
            <View>
                <Icon name={props.icon}/>
                <Text>{props.text}</Text>
            </View>
        </TouchableOpacity>
    )
};

export default RoomHappinessScoreOption;
