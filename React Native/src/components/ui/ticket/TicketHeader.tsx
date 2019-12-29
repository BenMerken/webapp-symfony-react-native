import React from "react";
import {styles} from "./TicketHeader.styles";
import {H1, H2} from "../headers/TextHeaders";
import {Button, View} from "react-native";
import {Colors} from "../../../styles/_colors";

type Props = {
    id: number;
    numberOfVotes: number;
    description: string;
    upvoteTicket: (id: number) => void;
    isUpvotingTicket: boolean
};

const TicketHeader: React.FunctionComponent<Props> = (ticket): JSX.Element => (
    <View style={styles.header}>
        <H1>Ticket with ID {ticket.id}</H1>
        <View style={styles.ticketRow}>
            <H2>Description: "{ticket.description}"</H2>
        </View>
        <View style={styles.ticketRow}>
            <H2>Current number of votes: {ticket.numberOfVotes}</H2>
        </View>
        <View style={styles.ticketRow}>
            <View style={styles.upvoteButton}>
                <Button
                    onPress={() => ticket.upvoteTicket(ticket.id)}
                    title={ticket.isUpvotingTicket ? 'Upvoting...' : 'Upvote ticket'}
                    color={Colors.primary}
                    disabled={ticket.isUpvotingTicket}
                />
            </View>
        </View>
    </View>
);

export default TicketHeader;
