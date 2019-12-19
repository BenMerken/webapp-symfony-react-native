import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Ticket} from "../../../data";
import {View, Text, FlatList} from "react-native";
import {bindActionCreators} from "redux";
import {getTicketList, upvoteTicket} from "../../../redux/modules/ticket";
import {useNavigation} from "../../../hooks";
import TicketPreview from "../../ui/ticket/TicketPreview";
import {styles} from "./TicketsList.styles";
import {Colors} from "../../../styles/_colors";

type Props = {
    tickets: Ticket[];
    isLoading: boolean;
    getTicketList: (assetName: string) => (dispatch: any) => Promise<void>;
    upvoteTicket: (id: number) => (dispatch: any) => Promise<any>;
};

const TicketsList: React.FunctionComponent<Props> & { navigationOptions?: any } = (props): JSX.Element => {
    const navigation = useNavigation();
    const assetName = navigation.state.params.assetName;

    const upvoteTicket = (id: number) => {
        props.upvoteTicket(id);
    };

    useEffect(() => {
        props.getTicketList(assetName);
    }, [assetName]);

    const renderItem = ({item}: { item: Ticket }): JSX.Element => (
        <View style={styles.ticketContainer}>
            <TicketPreview {...item} upvoteTicket={upvoteTicket}/>
        </View>
    );

    const renderSeparator = (): JSX.Element => <View style={styles.separator}/>;

    return (
        <View>
            {props.isLoading
                ? (
                    <Text>Loading tickets...</Text>
                )
                : (
                    <FlatList
                        data={props.tickets}
                        renderItem={renderItem}
                        ItemSeparatorComponent={renderSeparator}
                        keyExtractor={ticket => ticket.description}/>
                )}
        </View>
    );
};

TicketsList.navigationOptions = {
    title: 'Tickets',
    headerStyle: {
        backgroundColor: Colors.primaryDark
    },
    headerTitleStyle: {
        color: Colors.fontLight
    },
    headerBackTitleStyle: {
        color: Colors.fontLight
    }
};

const mapStateToProps = state => ({
    tickets: state.ticket.list,
    isLoading: state.ticket.isLoadingList
});

const mapDispatchToProps = dispatch => ({
    getTicketList: bindActionCreators(getTicketList, dispatch),
    upvoteTicket: bindActionCreators(upvoteTicket, dispatch)
});

const TicketsListPage = connect(mapStateToProps, mapDispatchToProps)(TicketsList);

export default TicketsListPage;
