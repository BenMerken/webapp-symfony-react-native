import React, {useEffect, useState} from 'react';
import {Asset, Room} from '../../../data';
import {useNavigation} from '../../../hooks';
import {connect} from 'react-redux';
import {getRoom} from "../../../redux/modules/room";
import {filterAssetList, getAssetList} from "../../../redux/modules/asset";
import {View, Text, FlatList, TouchableWithoutFeedback, RefreshControl, Button} from "react-native";
import {SearchBar, Overlay} from "react-native-elements";
import {styles} from "./RoomDetail.styles";
import {Colors} from "../../../styles/_colors";
import {bindActionCreators} from 'redux';
import RoomHeader from "../../ui/room/RoomHeader";
import AssetPreview from "../../ui/asset/AssetPreview";
import Icon from 'react-native-vector-icons/FontAwesome';
import RoomHappinessScoreDropdown from "../../ui/room/RoomHappinessScoreDropDown";

type Props = {
    room: Room;
    isLoadingRoom: boolean;
    getRoom: (name: string) => (dispatch: any) => Promise<void>;
    assets: Asset[];
    isLoadingAssets: boolean;
    getAssetList: (id: number) => (dispatch: any) => Promise<void>
    filteredAssets: Asset[];
    isFilteringList: boolean;
    filterList: (name: string) => (dispatch: any) => Promise<any>;
    updateHappinessScore: (roomName: string, toAddOrSubtract: number) => (dispatch: any) => Promise<void>;
};

const RoomDetail: React.FunctionComponent<Props> & { navigationOptions?: any } = (props): JSX.Element => {
    const [filter, setFilter] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [overlayVisible, setOverlayVisible] = useState(false);

    const navigation = useNavigation();
    const navigateTicket = (assetName: string) => navigation.navigate('Tickets', {assetName});
    const name = navigation.state.params.name;
    const id = navigation.state.params.roomId;

    useEffect(() => {
        props.getRoom(name);
        props.getAssetList(id);
        navigation.setParams({setOverlayVisible});
    }, [name, id]);

    const onRefresh = () => {
        setRefreshing(false);
        props.getRoom(name);
        props.getAssetList(id);
    };

    const updateFilter = filter => {
        setFilter(filter);
        props.filterList(filter);
    };

    const renderItem = ({item}: { item: Asset }): JSX.Element => (
        <View style={styles.assetListContainer}>
            <AssetPreview {...item} navigateTicket={navigateTicket}/>
        </View>
    );

    const renderSeparator = (): JSX.Element => <View style={styles.separator}/>;

    return (
        <View style={styles.bodyContainer}>
            {props.isLoadingRoom || props.isLoadingAssets
                ? (
                    <Text>Loading room and assets...</Text>
                )
                : (
                    <View style={styles.bodyContainer}>
                        {props.assets.length !== 0
                            ? (
                                <View style={styles.bodyContainer}>
                                    <SearchBar
                                        placeholder="Enter asset name..."
                                        onChangeText={updateFilter}
                                        value={filter}
                                    />
                                    <View style={styles.headerContainer}>
                                        <RoomHeader {...props.room}/>
                                    </View>
                                    <FlatList
                                        data={props.filteredAssets}
                                        renderItem={renderItem}
                                        ItemSeparatorComponent={renderSeparator}
                                        keyExtractor={asset => asset.name}
                                        refreshControl={
                                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                                        }
                                    />
                                </View>
                            ) : (
                                <View style={styles.errorContainer}>
                                    <View style={styles.headerContainer}>
                                        <RoomHeader {...props.room}/>
                                    </View>
                                    <Text style={{...styles.errorItem, fontSize: 22}}>No assets found.</Text>
                                    <View style={styles.errorItem}>
                                        <Button
                                            title="Try again"
                                            onPress={() => props.getAssetList(id)}
                                            color={Colors.primary}
                                        />
                                    </View>
                                </View>
                            )
                        }
                    </View>
                )
            }
            {overlayVisible
                ? (
                    <Overlay
                        isVisible={overlayVisible}
                        onBackdropPress={() => setOverlayVisible(false)}
                    >
                        <RoomHappinessScoreDropdown
                            roomName={name}
                            updateHappinessScore={props.updateHappinessScore}
                        />
                    </Overlay>
                ) : null
            }
        </View>
    );
};

RoomDetail.navigationOptions = ({navigation}) => ({
    title: 'Room details & assets',
    headerStyle: {
        backgroundColor: Colors.primaryDark
    },
    headerTitleStyle: {
        color: Colors.fontLight
    },
    headerBackTitleStyle: {
        color: Colors.fontLight
    },
    headerRight: (
        <View style={styles.headerRightContainer}>
            <TouchableWithoutFeedback
                onPress={() => navigation.getParam('setOverlayVisible')(true)}
                style={styles.navigationItem}
            >
                <Icon name="smile-o" style={styles.navigationItem} color={Colors.fontLight}/>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Home')}
            >
                <Icon name="home" style={styles.navigationItem} color={Colors.fontLight}/>
            </TouchableWithoutFeedback>
        </View>
    )
});

const mapStateToProps = state => ({
    room: state.room.detail,
    isLoadingRoom: state.room.isLoadingDetail,
    assets: state.asset.list,
    isLoadingAssets: state.asset.isLoadingList,
    filteredAssets: state.asset.filteredList,
    isFilteringList: state.asset.isFilteringList,
});

const mapDispatchToProps = dispatch => ({
    getRoom: bindActionCreators(getRoom, dispatch),
    getAssetList: bindActionCreators(getAssetList, dispatch),
    filterList: bindActionCreators(filterAssetList, dispatch)
});

const RoomDetailPage = connect(mapStateToProps, mapDispatchToProps)(RoomDetail);

export default RoomDetailPage;
