import React from "react";
import {TouchableOpacity, View} from "react-native";
import {styles} from "./TicketPreview.styles";
import TicketPreviewBody from "./TicketPreviewBody";

type Props = {
    id: number;
    assetId: number;
    numberOfVotes: number;
    description: string;
};

const TicketPreview: React.FunctionComponent<Props> = (ticket): JSX.Element => {
    return (
        <TouchableOpacity>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TicketPreviewBody {...ticket} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default TicketPreview;
