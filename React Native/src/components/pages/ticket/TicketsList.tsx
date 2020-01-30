import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Ticket} from "../../../data";
import {
    ActivityIndicator,
    View,
    Text,
    FlatList,
    TouchableWithoutFeedback,
    RefreshControl,
    Button,
} from "react-native";
import {SearchBar} from "react-native-elements";
import {bindActionCreators} from "redux";
import {filterTicketList, getTicketList} from "../../../redux/modules/ticket";
import {useNavigation} from "../../../hooks";
import TicketPreview from "../../ui/ticket/TicketPreview";
import {styles} from "./TicketsList.styles";
import {Colors} from "../../../styles/_colors";
import Icon from 'react-native-vector-icons/FontAwesome';
import {Camera} from "expo-camera";

type Props = {
    tickets: Ticket[];
    isLoading: boolean;
    getTicketList: (assetName: string) => (dispatch: any) => Promise<void>;
    filteredTickets: Ticket[];
    isFilteringList: boolean;
    filterList: (numberOfVotes: number) => (dispatch: any) => Promise<any>;
};

const TicketsList: React.FunctionComponent<Props> & { navigationOptions?: any } = (props): JSX.Element => {
    const [filter, setFilter] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();
    const navigateTicket = (id: number) => navigation.navigate('Ticket', {id});
    const assetName = navigation.state.params.assetName;
    const assetId = navigation.state.params.assetId;

    useEffect(() => {
        props.getTicketList(assetName);
        navigation.setParams({...navigation.state.params});
    }, [assetName, assetId]);

    const onRefresh = () => {
        setRefreshing(false);
        props.getTicketList(assetName);
    };

    const updateFilter = filter => {
        setFilter(filter);
        props.filterList(parseInt(filter) ? parseInt(filter) : 0);
    };

    const renderItem = ({item}: { item: Ticket }): JSX.Element => (
        <View style={styles.ticketContainer}>
            <TicketPreview {...item} navigateTicket={navigateTicket}/>
        </View>
    );

    const renderSeparator = (): JSX.Element => <View style={styles.separator}/>;

    return (
        <View style={styles.bodyContainer}>
            {props.isLoading
                ? (
                    <View style={styles.errorContainer}>
                        <ActivityIndicator
                            size="large"
                            color={Colors.primaryDark}
                        />
                        <Text>Loading tickets...</Text>
                    </View>
                )
                : (
                    <View style={styles.bodyContainer}>
                        {props.tickets.length !== 0
                            ? (
                                <View>
                                    <SearchBar
                                        placeholder="Enter number of votes lower boundary..."
                                        onChangeText={updateFilter}
                                        value={filter}
                                    />
                                    <FlatList
                                        data={props.filteredTickets}
                                        renderItem={renderItem}
                                        ItemSeparatorComponent={renderSeparator}
                                        keyExtractor={ticket => ticket.description}
                                        refreshControl={
                                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                                        }
                                    />
                                </View>
                            ) : (
                                <View style={styles.errorContainer}>
                                    <Text style={{...styles.errorItem, fontSize: 22}}>No tickets found.</Text>
                                    <View style={styles.errorItem}>
                                        <Button
                                            title="Try again"
                                            onPress={() => props.getTicketList(assetName)}
                                            color={Colors.primary}
                                        />
                                    </View>
                                </View>
                            )}
                    </View>
                )}
        </View>
    );
};

TicketsList.navigationOptions = ({navigation}) => ({
    title: 'Tickets',
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
                onPress={() => navigation.navigate('CreateTicket', navigation.state.params.assetName)}>
                <Icon name="plus" style={styles.navigationItem} color={Colors.fontLight}/>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
                onPress={() => navigation.navigate('Camera', navigation.state.params.assetId)}>
                <Icon name="camera" style={styles.navigationItem} color={Colors.fontLight}/>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Home')}>
                <Icon name="home" style={styles.navigationItem} color={Colors.fontLight}/>
            </TouchableWithoutFeedback>
        </View>
    )
});

const mapStateToProps = state => ({
    tickets: state.ticket.list,
    isLoading: state.ticket.isLoadingList,
    filteredTickets: state.ticket.filteredList,
    isFiltering: state.ticket.isFilteringList
});

const mapDispatchToProps = dispatch => ({
    getTicketList: bindActionCreators(getTicketList, dispatch),
    filterList: bindActionCreators(filterTicketList, dispatch)
});

const TicketsListPage = connect(mapStateToProps, mapDispatchToProps)(TicketsList);

export default TicketsListPage;
