import React from "react";
import {View, Text} from "react-native";
import CircleDetail from "../details/CircleDetail";
import {styles} from "./TicketPreviewBody.styles";

type Props = {
    id: number;
    assetId: number;
    numberOfVotes: number;
    description: string;
};

const TicketPreviewBody: React.FunctionComponent<Props> = (ticket): JSX.Element => {
    return (
        <View style={styles.row}>
            <View style={styles.detail}>
                <CircleDetail
                    text={ticket.numberOfVotes.toString()}
                />
            </View>
            <Text style={styles.ticketDescription}>{ticket.description}</Text>
        </View>
    );
};

export default TicketPreviewBody;
