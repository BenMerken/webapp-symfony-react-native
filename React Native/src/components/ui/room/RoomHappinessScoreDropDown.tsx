import React from "react";
import {View} from "react-native";
import RoomHappinessScoreOption from "./RoomHappinessScoreOption";
import {styles} from "./RoomHappinessScoreDropDown.styles";
import {Colors} from "../../../styles/_colors";
import {H2} from "../headers/TextHeaders";

type Props = {
    roomName: string;
    updateHappinessScore: (roomName: string, happyOrNot: string) => void;
};

const RoomHappinessScoreDropdown: React.FunctionComponent<Props> = (props): JSX.Element => {
    return (
        <View style={styles.dropdownContainer}>
            <H2>Please select a happiness score:</H2>
            <RoomHappinessScoreOption
                roomName={props.roomName}
                happyOrNot={'happy'}
                icon={'smile-o'}
                text={'Happy'}
                color={Colors.happy}
                updateHappinessScore={props.updateHappinessScore}
            />
            <View style={styles.separator}/>
            <RoomHappinessScoreOption
                roomName={props.roomName}
                happyOrNot={'somewhatHappy'}
                icon={'meh-o'}
                text={'Somewhat happy'}
                color={Colors.somewhatHappy}
                updateHappinessScore={props.updateHappinessScore}
            />
            <View style={styles.separator}/>
            <RoomHappinessScoreOption
                roomName={props.roomName}
                happyOrNot={'somewhatUnhappy'}
                icon={'meh-o'}
                text={'Somewhat unhappy'}
                color={Colors.somewhatUnhappy}
                updateHappinessScore={props.updateHappinessScore}
            />
            <View style={styles.separator}/>
            <RoomHappinessScoreOption
                roomName={props.roomName}
                happyOrNot={'unhappy'}
                icon={'frown-o'}
                text={'Unhappy'}
                color={Colors.unhappy}
                updateHappinessScore={props.updateHappinessScore}
            />
        </View>
    )
};

export default RoomHappinessScoreDropdown;
