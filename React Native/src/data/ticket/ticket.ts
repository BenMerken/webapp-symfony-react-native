import {Asset} from "../asset/asset";

export type Ticket = {
    asset: Asset,
    numberOfVotes: number,
    description: string
};
