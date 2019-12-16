import React, {useEffect} from 'react';
import {Asset, Room} from '../../../data';
import {useNavigation} from '../../../hooks';
import {connect} from 'react-redux';
import {getRoom} from "../../../redux/modules/room";
import {getAssetList} from "../../../redux/modules/asset";
import {View, Text, FlatList} from "react-native";
import {styles} from "./RoomDetail.styles";
import {Colors} from "../../../styles/_colors";
import {bindActionCreators} from 'redux';
import RoomHeader from "../../ui/room/RoomHeader";
import AssetPreview from "../../ui/asset/AssetPreview";

type Props = {
    room: Room;
    isLoadingRoom: boolean;
    getRoom: (name: string) => (dispatch: any) => Promise<void>;
    assets: Asset[];
    isLoadingAssets: boolean;
    getAssetList: (id: number) => (dispatch: any) => Promise<void>
};

const RoomDetail: React.FunctionComponent<Props> & { navigationOptions?: any } = (props): JSX.Element => {
    const navigation = useNavigation();
    const navigateAsset = (id: number) => navigation.navigate('Asset', {id});
    const name = navigation.state.params.name;
    const id = navigation.state.params.roomId;

    useEffect(() => {
        props.getRoom(name);
        props.getAssetList(id);
    }, [name, id]);

    const renderItem = ({item}: { item: Asset }): JSX.Element => (
        <View>
            <AssetPreview {...item} navigateAsset={navigateAsset}/>
        </View>
    );

    const renderSeparator = () => <View style={styles.separator}/>;

    return (
        <View style={styles.loadingContainer}>
            {props.isLoadingRoom || props.isLoadingAssets
                ? (
                    <Text>Loading...</Text>
                )
                : (
                    <View style={styles.bodyContainer}>
                        <RoomHeader {...props.room}/>
                        <FlatList
                            data={props.assets}
                            renderItem={renderItem}
                            ItemSeparatorComponent={renderSeparator}
                            keyExtractor={asset => asset.name}
                        />
                    </View>
                )}
        </View>
    );
};

RoomDetail.navigationOptions = () => ({
    title: 'Room details',
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
    isLoadingRoom: state.room.isLoadingDetail,
    assets: state.asset.list,
    isLoadingAssets: state.asset.isLoadingList
});

const mapDispatchToProps = dispatch => ({
    getRoom: bindActionCreators(getRoom, dispatch),
    getAssetList: bindActionCreators(getAssetList, dispatch)
});

const RoomDetailPage = connect(mapStateToProps, mapDispatchToProps)(RoomDetail);

export default RoomDetailPage;
