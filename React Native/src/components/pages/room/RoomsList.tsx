import React, {useEffect, useState} from "react";
import {View, Text, FlatList, RefreshControl} from "react-native";
import RoomPreview from '../../ui/room/RoomPreview';
import {styles} from "./RoomsList.styles";
import {Room} from "../../../data";
import {getRoomList} from "../../../redux/modules/room";
import {connect} from 'react-redux';
import {useNavigation} from "../../../hooks";
import {Colors} from "../../../styles/_colors";
import {bindActionCreators} from 'redux'

type Props = {
    rooms: Room[];
    isLoading: boolean;
    getRoomList: () => (dispatch: any) => Promise<void>;
};

const RoomsList: React.FunctionComponent<Props> & { navigationOptions?: any }
    = (props): JSX.Element => {
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();
    const navigateRoom = (name: string, roomId: number) => navigation.navigate('Room', {name, roomId});

    useEffect(() => {
        props.getRoomList();
    }, []);

    const onRefresh = () => {
        setRefreshing(false);
        props.getRoomList();
    };

    const renderItem = ({item}: { item: Room }): JSX.Element => (
        <View style={styles.roomContainer}>
            <RoomPreview {...item} navigateRoom={navigateRoom}/>
        </View>
    );

    const RenderSeparator = (): JSX.Element => <View style={styles.separator}/>;

    return (
        <View>
            {props.isLoading
                ? (<Text>Loading rooms...</Text>)
                : (
                    <FlatList
                        data={props.rooms}
                        renderItem={renderItem}
                        ItemSeparatorComponent={RenderSeparator}
                        keyExtractor={room => room.name}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                        }
                    />
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
});

const mapStateToProps = state => ({
    rooms: state.room.list,
    isLoading: state.room.isLoadingList
});

const mapDispatchToProps = dispatch => ({
    getRoomList: bindActionCreators(getRoomList, dispatch)
});

const RoomsListPage = connect(mapStateToProps, mapDispatchToProps)(RoomsList);

export default RoomsListPage;
