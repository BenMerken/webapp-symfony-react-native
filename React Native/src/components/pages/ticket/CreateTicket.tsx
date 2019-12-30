import React from "react";
import {bindActionCreators} from "redux";
import {Button, TextInput, TouchableWithoutFeedback, View} from "react-native";
import {connect} from 'react-redux';
import {TicketForCreate} from "../../../data";
import {createTicket} from "../../../redux/modules/ticket";
import {styles} from "./CreateTicket.styles";
import {Colors} from "../../../styles/_colors";
import {useNavigation} from "../../../hooks";
import Icon from "react-native-vector-icons/FontAwesome";
import {H2} from "../../ui";

type Props = {
    postTicket: (assetName: string, ticket: TicketForCreate) => (dispatch: any) => Promise<void>
    isCreating: boolean
};

const CreateTicket: React.FunctionComponent<Props> & { navigationOptions?: any } = (props): JSX.Element => {
    const [description, setDescription] = React.useState('');
    const navigation = useNavigation();
    const assetName = navigation.state.params;

    const createTicket = () => {
        const ticket: TicketForCreate = {
            description: description
        };
        props.postTicket(assetName.toString(), ticket);
    };

    return (
        <View style={styles.formContainer}>
            <H2>Fill in this form to register a ticket for your problem:</H2>
            <TextInput
                key="description"
                style={styles.input}
                multiline
                numberOfLines={1}
                placeholder="Please enter a description of the problem..."
                value={description}
                onChangeText={text => setDescription(text)}
                editable={!props.isCreating}
            />
            <Button
                title={props.isCreating ? 'Creating ticket...' : 'Create Ticket'}
                color={Colors.primary}
                onPress={() => createTicket()}
                disabled={props.isCreating}
            />
        </View>
    );
};

CreateTicket.navigationOptions = ({navigation}) => ({
    title: 'Create Ticket',
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
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Home')}>
            <Icon name="home" style={styles.navigationItem} color={Colors.fontLight}/>
        </TouchableWithoutFeedback>
    )
});

const mapStateToProps = state => ({
    isCreating: state.ticket.isCreating
});

const mapDispatchToProps = dispatch => ({
    postTicket: bindActionCreators(createTicket, dispatch)
});

const CreateTicketPage = connect(mapStateToProps, mapDispatchToProps)(CreateTicket);

export default CreateTicketPage;
