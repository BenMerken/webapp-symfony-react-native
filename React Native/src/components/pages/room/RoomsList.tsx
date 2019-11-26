import React from "react";
import {View, Text, FlatList} from "react-native";
import RoomPreview from '../../ui/room/RoomPreview';
import {styles} from "./RoomsList.styles";
import {Room} from "../../../data/room/room";

type Props = {
    rooms: Room[];
    isLoading: boolean;
};

const RoomsList: React.FunctionComponent<Props> = ({rooms, isLoading}): JSX.Element => {

    const renderItem = ({item}: { item: Room }): JSX.Element => (
        <View style={styles.articleContainer}>
            <RoomPreview {...item}/>
        </View>
    );

    const RenderSeparator = () => <View style={styles.separator}/>;

    return (
        <View style={styles.articleContainer}>
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

export default RoomsList;
