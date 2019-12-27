import React from "react";
import {TouchableOpacity, View} from "react-native";
import {styles} from "./TicketPreview.styles";
import TicketPreviewBody from "./TicketPreviewBody";

type Props = {
    id: number;
    assetId: number;
    numberOfVotes: number;
    description: string;
    navigateTicket: (id: number) => void;
};

const TicketPreview: React.FunctionComponent<Props> = (ticket): JSX.Element => (
        <TouchableOpacity onPress={() => ticket.navigateTicket(ticket.id)}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TicketPreviewBody {...ticket} />
                </View>
            </View>
        </TouchableOpacity>
);

export default TicketPreview;
