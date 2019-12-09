import React, {useEffect} from "react";
import {View, Text, FlatList} from "react-native";
import RoomPreview from '../../ui/room/RoomPreview';
import {styles} from "./RoomsList.styles";
import {Room} from "../../../data";
import * as roomActions from "../../../redux/modules/room";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

type Props = {
    rooms: Room[];
    isLoading: boolean;
    getRoomList: () => (dispatch: any) => Promise<void>;
};

const RoomsList: React.FunctionComponent<Props> = ({rooms, isLoading, getRoomList}): JSX.Element => {

    useEffect(() => {
        getRoomList();
    }, []);

    const renderItem = ({item}: { item: Room }): JSX.Element => (
        <View style={styles.roomContainer}>
            <RoomPreview {...item}/>
        </View>
    );

    const RenderSeparator = () => <View style={styles.separator}/>;

    return (
        <View style={styles.roomContainer}>
            {isLoading
                ? (<Text>Loading...</Text>)
                : (
                    <FlatList
                        data={rooms}
                        renderItem={renderItem}
                        ItemSeparatorComponent={RenderSeparator}
                        keyExtractor={room => room.name}
                    />
                )}
        </View>
    );
};

const mapStateToProps = state => ({
    rooms: state.room.list.data,
    isLoading: state.room.isLoadingList
});

const mapDispatchToProps = dispatch => ({
    getRoomList: bindActionCreators(roomActions.getRoomList, dispatch)
});

const RoomsListPage = connect(mapStateToProps, mapDispatchToProps)(RoomsList);

export default RoomsListPage;
