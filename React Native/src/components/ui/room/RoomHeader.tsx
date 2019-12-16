import React, {useEffect} from "react";
import {View, Text} from "react-native";
import {Room} from "../../../data";

type Props = {
    id: number;
    name: string;
    happinessScore: number;
};

const RoomHeader: React.FunctionComponent<Props> = (props): JSX.Element => {
    return (
        <View>
            <Text>Under construction!</Text>
        </View>
    );
};

export default RoomHeader;
