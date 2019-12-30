import React from "react";
import {View} from "react-native";
import RoomHappinessScoreOption from "./RoomHappinessScoreOption";

type Props = {
    roomName: string;
    updateHappinessScore: (roomName: string, happyOrNot: string) => void;
};

const RoomHappinessScoreDropdown: React.FunctionComponent<Props> = (props): JSX.Element => {
    return (
        <View>
            <View>
                <RoomHappinessScoreOption
                    roomName={props.roomName}
                    happyOrNot={'happy'}
                    icon={'smile-o'}
                    text={'Happy'}
                    updateHappinessScore={props.updateHappinessScore}
                />
                <RoomHappinessScoreOption
                    roomName={props.roomName}
                    happyOrNot={'somewhatHappy'}
                    icon={'smile-o'}
                    text={'Somewhat happy'}
                    updateHappinessScore={props.updateHappinessScore}
                />
                <RoomHappinessScoreOption
                    roomName={props.roomName}
                    happyOrNot={'somewhatUnhappy'}
                    icon={'meh-o'}
                    text={'Somewhat unhappy'}
                    updateHappinessScore={props.updateHappinessScore}
                />
                <RoomHappinessScoreOption
                    roomName={props.roomName}
                    happyOrNot={'unhappy'}
                    icon={'frown-o'}
                    text={'Unhappy'}
                    updateHappinessScore={props.updateHappinessScore}
                />
            </View>
        </View>
    )
};

export default RoomHappinessScoreDropdown;
