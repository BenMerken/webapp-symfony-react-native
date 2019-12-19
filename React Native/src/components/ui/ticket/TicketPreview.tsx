import React from "react";
import {TouchableOpacity, View} from "react-native";
import {styles} from "./TicketPreview.styles";
import TicketPreviewBody from "./TicketPreviewBody";

type Props = {
    id: number;
    assetId: number;
    numberOfVotes: number;
    description: string;
    upvoteTicket: any
};

const TicketPreview: React.FunctionComponent<Props> = (ticket): JSX.Element => {

    const upvoteTicket = (): void => ticket.upvoteTicket(ticket.id);

    return (
        <TouchableOpacity onPress={() => upvoteTicket()}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TicketPreviewBody {...ticket} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default TicketPreview;
