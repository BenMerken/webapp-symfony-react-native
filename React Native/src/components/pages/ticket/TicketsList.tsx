import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Ticket} from "../../../data";
import {View, Text} from "react-native";
import {bindActionCreators} from "redux";
import {getTicketList} from "../../../redux/modules/ticket";
import {useNavigation} from "../../../hooks";

type Props = {
    tickets: Ticket[];
    isLoading: boolean;
    getTicketList: (assetName: string) => (dispatch: any) => Promise<void>;
};

const TicketsList: React.FunctionComponent<Props> & { navigationOptions?: any } = (props): JSX.Element => {
    const navigation = useNavigation();
    const assetName = navigation.state.params.assetName;

    useEffect(() => {
        props.getTicketList(assetName);
    }, [assetName]);

    return (
        <View>
            {props.isLoading
                ? (
                    <Text>Loading tickets...</Text>
                )
                : (
                    <Text>Under construction!</Text>
                )}
        </View>
    );
};

const mapStateToProps = state => ({
    tickets: state.ticket.list,
    isLoading: state.ticket.isLoadingList
});

const mapDispatchToProps = dispatch => ({
    getTicketList: bindActionCreators(getTicketList, dispatch)
});

const TicketsListPage = connect(mapStateToProps, mapDispatchToProps)(TicketsList);

export default TicketsListPage;
