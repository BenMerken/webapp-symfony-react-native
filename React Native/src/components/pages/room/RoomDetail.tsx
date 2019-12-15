import React, {useEffect} from 'react';
import {Room} from '../../../data';
import {useNavigation} from '../../../hooks';
import {connect} from 'react-redux';
import {getRoom} from "../../../redux/modules/room";
import {View, Text} from "react-native";
import {styles} from "./RoomDetail.styles";
import {Colors} from "../../../styles/_colors";
import {bindActionCreators} from 'redux';

type Props = {
    room: Room;
    isLoading: boolean;
    getRoom: any;
};

const RoomDetail: React.FunctionComponent<Props> & { navigationOptions?: any } = (props): JSX.Element => {
    const navigation = useNavigation();
    const {name} = navigation.state.params;

    useEffect(() => {
        props.getRoom(name);
    }, [name]);

    return (
        <View>
            {props.isLoading
                ? (
                    <Text>Loading...</Text>
                )
                : (
                    <>
                        <Text style={styles.bodyContainer}>{props.room.name}</Text>
                    </>
                )}
        </View>
    );
};

RoomDetail.navigationOptions = () => ({
    title: 'Room',
    headerStyle: {
        backgroundColor: Colors.primaryDark
    },
    headerTitleStyle: {
        color: Colors.fontLight
    },
    headerBackTitleStyle: {
        color: Colors.fontLight
    }
});

const mapStateToProps = state => ({
    room: state.room.detail,
    isLoading: state.room.isLoadingDetail
});

const mapDispatchToProps = dispatch => ({
    getRoom: bindActionCreators(getRoom, dispatch)
});

const RoomDetailPage = connect(mapStateToProps, mapDispatchToProps)(RoomDetail);

export default RoomDetailPage;
