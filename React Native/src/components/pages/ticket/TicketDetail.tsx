import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {Ticket} from '../../../data';
import {bindActionCreators} from 'redux';
import {getTicket, upvoteTicket} from '../../../redux/modules/ticket';
import {connect} from 'react-redux';
import {Colors} from "../../../styles/_colors";
import {styles} from "./TicketDetail.styles";
import TicketHeader from "../../ui/ticket/TicketHeader";
import {useNavigation} from "../../../hooks";

type Props = {
    ticket: Ticket;
    isLoadingTicket: boolean;
    getTicket: (id: number) => (dispatch: any) => Promise<void>;
    upvoteTicket: (id: number) => (dispatch: any) => Promise<any>;
};

const TicketDetail: React.FunctionComponent<Props> & { navigationOptions?: any } = (props): JSX.Element => {
    const navigation = useNavigation();
    const id = navigation.state.params.id;

    useEffect(() => {
        props.getTicket(id);
    }, [id]);

    return (
        <View style={styles.bodyContainer}>
            {props.isLoadingTicket
                ? (
                    <Text>Loading ticket...</Text>
                )
                : (
                    <View style={styles.headerContainer}>
                        <TicketHeader {...props.ticket} upvoteTicket={props.upvoteTicket}/>
                    </View>
                )}
        </View>
    );
};

TicketDetail.navigationOptions = () => ({
    title: 'Ticket details',
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
    ticket: state.ticket.detail,
    isLoadingTicket: state.ticket.isLoadingDetail
});

const mapDispatchToProps = dispatch => ({
    getTicket: bindActionCreators(getTicket, dispatch),
    upvoteTicket: bindActionCreators(upvoteTicket, dispatch)
});

const TicketDetailPage = connect(mapStateToProps, mapDispatchToProps)(TicketDetail);

export default TicketDetailPage;
