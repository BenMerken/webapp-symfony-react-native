import React, {useEffect, useState} from "react";
import {ActivityIndicator, View, Text, FlatList, RefreshControl, TouchableWithoutFeedback, Button} from "react-native";
import {SearchBar} from "react-native-elements";
import RoomPreview from '../../ui/room/RoomPreview';
import {styles} from "./RoomsList.styles";
import {Room} from "../../../data";
import {filterRoomList, getRoomList} from "../../../redux/modules/room";
import {connect} from 'react-redux';
import {useNavigation} from "../../../hooks";
import {Colors} from "../../../styles/_colors";
import {bindActionCreators} from 'redux'
import Icon from "react-native-vector-icons/FontAwesome";

type Props = {
    rooms: Room[];
    isLoading: boolean;
    getRoomList: () => (dispatch: any) => Promise<any>;
    filteredRooms: Room[];
    isFiltering: boolean;
    filterList: (name: string) => (dispatch: any) => Promise<any>;
};

const RoomsList: React.FunctionComponent<Props> & { navigationOptions?: any }
    = (props): JSX.Element => {
    const [refreshing, setRefreshing] = useState(false);
    const [filter, setFilter] = useState('');
    const navigation = useNavigation();
    const navigateRoom = (name: string, roomId: number) => navigation.navigate('Room', {name, roomId});

    useEffect(() => {
        props.getRoomList();
    }, []);

    const onRefresh = () => {
        setRefreshing(false);
        props.getRoomList();
    };

    const updateFilter = filter => {
        setFilter(filter);
        props.filterList(filter);
    };

    const renderItem = ({item}: { item: Room }): JSX.Element => (
        <View style={styles.roomContainer}>
            <RoomPreview {...item} navigateRoom={navigateRoom}/>
        </View>
    );

    const RenderSeparator = (): JSX.Element => <View style={styles.separator}/>;

    return (
        <View style={styles.listContainer}>
            {props.isLoading
                ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator
                            size="large"
                            color={Colors.primary}
                        />
                        <Text>Loading rooms...</Text>
                    </View>
                )
                : (
                    <View style={styles.listContainer}>
                        {props.rooms.length !== 0
                            ? (
                                <View>
                                    <SearchBar
                                        placeholder="Enter room name..."
                                        onChangeText={updateFilter}
                                        value={filter}
                                    />
                                    <FlatList
                                        data={props.filteredRooms}
                                        renderItem={renderItem}
                                        ItemSeparatorComponent={RenderSeparator}
                                        keyExtractor={room => room.name}
                                        refreshControl={
                                            <RefreshControl
                                                refreshing={refreshing} onRefresh={onRefresh}
                                            />
                                        }
                                    />
                                </View>
                            ) : (
                                <View style={styles.errorContainer}>
                                    <Text style={{...styles.errorItem, fontSize: 22}}>No rooms found.</Text>
                                    <View style={styles.errorItem}>
                                        <Button
                                            title="Try again"
                                            onPress={() => props.getRoomList()}
                                            color={Colors.primaryDark}
                                        />
                                    </View>
                                </View>
                            )
                        }
                    </View>
                )}
        </View>
    );
};

RoomsList.navigationOptions = ({navigation}) => ({
    title: 'List of rooms',
    headerStyle: {
        backgroundColor: Colors.primary
    },
    headerTitleStyle: {
        color: Colors.fontDark
    },
    headerRight: (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('RoomsByHappinessScore')}>
            <Icon name="filter" style={styles.navigationItem} color={Colors.fontDark}/>
        </TouchableWithoutFeedback>
    )
});

const mapStateToProps = state => ({
    rooms: state.room.list,
    isLoading: state.room.isLoadingList,
    filteredRooms: state.room.filteredList,
    isFiltering: state.room.isFilteringList
});

const mapDispatchToProps = dispatch => ({
    getRoomList: bindActionCreators(getRoomList, dispatch),
    filterList: bindActionCreators(filterRoomList, dispatch)
});

const RoomsListPage = connect(mapStateToProps, mapDispatchToProps)(RoomsList);

export default RoomsListPage;
