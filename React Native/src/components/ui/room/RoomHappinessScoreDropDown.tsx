import React from "react";
import {View} from "react-native";
import RoomHappinessScoreOption from "./RoomHappinessScoreOption";

type Props = {
    roomName: string;
    updateHappinessScore: (roomName: string, toAddOrSubtract: number) => void;
};

const RoomHappinessScoreDropdown: React.FunctionComponent<Props> = (props): JSX.Element => {
    return (
        <View>
            <View>
                <RoomHappinessScoreOption
                    roomName={props.roomName}
                    toAddOrSubtract={2}
                    icon={'smile-o'}
                    text={'Happy'}
                    updateHappinessScore={props.updateHappinessScore}
                />
                <RoomHappinessScoreOption
                    roomName={props.roomName}
                    toAddOrSubtract={1}
                    icon={'smile-o'}
                    text={'Somewhat happy'}
                    updateHappinessScore={props.updateHappinessScore}
                />
                <RoomHappinessScoreOption
                    roomName={props.roomName}
                    toAddOrSubtract={-1}
                    icon={'meh-o'}
                    text={'Somewhat unhappy'}
                    updateHappinessScore={props.updateHappinessScore}
                />
                <RoomHappinessScoreOption
                    roomName={props.roomName}
                    toAddOrSubtract={-2}
                    icon={'frown-o'}
                    text={'Unhappy'}
                    updateHappinessScore={props.updateHappinessScore}
                />
            </View>
        </View>
    )
};

export default RoomHappinessScoreDropdown;
