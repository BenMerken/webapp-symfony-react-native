import React, {useState} from "react";
import {Button, FlatList, Text, View} from "react-native";
import {styles} from "./RoomsByHappinessScoreList.styles";
import {Room} from "../../../data";
import RoomFilterHeader from "../../ui/room/RoomFilterHeader";
import {Input} from "react-native-elements";
import {bindActionCreators} from "redux";
import {getRoomListByHappinessScore} from "../../../redux/modules/room";
import {connect} from 'react-redux';
import {Colors} from "../../../styles/_colors";
import RoomPreview from "../../ui/room/RoomPreview";
import {useNavigation} from "../../../hooks";

type Props = {
    list: Room[];
    isLoadingList: boolean;
    getRoomList: (happinessScore: number) => (dispatch: any) => Promise<any>;
};

const RoomsByHappinessScoreList: React.FunctionComponent<Props> & { navigationOptions?: any } = (props): JSX.Element => {
    const [filter, setFilter] = useState('');
    const navigation = useNavigation();
    const navigateRoom = (name: string, roomId: number) => navigation.navigate('Room', {name, roomId});

    const updateFilter = filter => {
        setFilter(filter);
    };

    const renderItem = ({item}: { item: Room }): JSX.Element => (
        <View style={styles.roomsListContainer}>
            <RoomPreview {...item} navigateRoom={navigateRoom}/>
        </View>
    );

    const renderSeparator = (): JSX.Element => <View style={styles.separator}/>;

    return (
        <View style={styles.bodyContainer}>
            <View style={styles.bodyContainer}>
                <View style={styles.headerContainer}>
                    <RoomFilterHeader/>
                </View>
                <View style={styles.happinessScoreForm}>
                    <Input
                        placeholder="Please enter an upper boundary..."
                        onChangeText={updateFilter}
                    />
                    <Button
                        title="Search"
                        onPress={() => props.getRoomList(Number.parseInt(filter))}
                    />
                </View>
                <View style={styles.roomsListContainer}>
                    {props.list.length === 0
                        ? (
                            <View style={styles.noRoomsTextContainer}>
                                <Text style={styles.noRoomsText}>No rooms to display.</Text>
                            </View>
                        ) : (
                            <FlatList
                                data={props.list}
                                renderItem={renderItem}
                                ItemSeparatorComponent={renderSeparator}
                                keyExtractor={asset => asset.name}
                            />
                        )}
                </View>
            </View>
        </View>
    );
};

RoomsByHappinessScoreList.navigationOptions = () => ({
    title: 'Filter rooms by happiness score',
    headerStyle: {
        backgroundColor: Colors.primaryDark
    },
    headerTitleStyle: {
        color: Colors.fontLight
    },
    headerBackTitleStyle: {
        color: Colors.fontLight
    },
});

const mapStateToProps = state => ({
    list: state.room.listByHappinessScore,
    isLoadingList: state.room.isLoadingListByHappinessScore
});

const mapDispatchToProps = dispatch => ({
    getRoomList: bindActionCreators(getRoomListByHappinessScore, dispatch)
});

const RoomsByHappinessScorePage = connect(mapStateToProps, mapDispatchToProps)(RoomsByHappinessScoreList);

export default RoomsByHappinessScorePage;
