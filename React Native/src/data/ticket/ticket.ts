export type Ticket = {
    id: number;
    assetId: number;
    numberOfVotes: number;
    description: string;
};

export type TicketForCreate = {
    description: string;
};
