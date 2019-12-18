import {Ticket} from "../../data";
import axios from "axios";
import {Reducer} from "react";

// --- API ---

const BASE_URL = 'http://localhost:8000/tickets/';

// --- Action Types ---

export const LOAD_TICKET_LIST = 'PXLAssetManagementTool/room/LOAD_TICKET_LIST';
export const LOAD_TICKET_LIST_SUCCESS = 'PXLAssetManagementTool/room/LOAD_TICKET_LIST_SUCCESS';
export const LOAD_TICKET_LIST_FAIL = 'PXLAssetManagementTool/room/LOAD_TICKET_LIST_FAIL';

export const UPVOTE_TICKET = 'PXLAssetManagementTool/room/UPVOTE_TICKET';
export const UPVOTE_TICKET_SUCCESS = 'PXLAssetManagementTool/room/UPVOTE_TICKET_SUCCESS';
export const UPVOTE_TICKET_FAIL = 'PXLAssetManagementTool/room/UPVOTE_TICKET_FAIL';

// -- Action Creators ---

type GetTicketListAction = {
    type: typeof LOAD_TICKET_LIST;
    payload: any;
};

type GetTicketListActionSuccess = {
    type: typeof LOAD_TICKET_LIST_SUCCESS;
    payload: Ticket[]
};

type GetTicketListActionFail = {
    type: typeof LOAD_TICKET_LIST_FAIL;
    payload: [];
};

type UpvoteTicketAction = {
    type: typeof UPVOTE_TICKET;
    payload: { data: number };
};

type UpvoteTicketActionSuccess = {
    type: typeof UPVOTE_TICKET_SUCCESS;
    payload: { data: number };
};

type UpvoteTicketActionFail = {
    type: typeof UPVOTE_TICKET_FAIL;
    payload: {};
};

type ActionTypes =
    | GetTicketListAction
    | GetTicketListActionSuccess
    | GetTicketListActionFail
    | UpvoteTicketAction
    | UpvoteTicketActionSuccess
    | UpvoteTicketActionFail;

// --- State Type ---

type  TicketState = {
    list: Ticket[];
    isLoadingList: boolean;
    isUpvotingTicket: boolean
};

// --- Action Creators ---

export const getTicketList = (assetName: string) => {
    return async dispatch => {
        dispatch(setIsLoadingList());
        try {
            const response = await axios.get(`${BASE_URL}?assetName=${assetName}`);
            dispatch(getTicketListSuccess(response.data));
        } catch (error) {
            dispatch(getTicketListFail());
        }
    };
};

const setIsLoadingList = () => ({
    type: LOAD_TICKET_LIST,
    payload: {}
});

const getTicketListSuccess = (tickets: Ticket[]) => ({
    type: LOAD_TICKET_LIST_SUCCESS,
    payload: tickets
});

const getTicketListFail = () => ({
    type: LOAD_TICKET_LIST_FAIL,
    payload: {}
});

export const upvoteTicket = (id: number) => {
    return async dispatch => {
        dispatch(setIsUpvotingTicket());
        try {
            await axios.patch(`${BASE_URL}${id}`);
            dispatch(upvoteTicketSuccess(id));
        } catch (error) {
            dispatch(upvoteTicketFail());
        }
    };
};

const setIsUpvotingTicket = () => ({
    type: UPVOTE_TICKET,
    payload: {}
});

const upvoteTicketSuccess = (id: number) => ({
    type: UPVOTE_TICKET_SUCCESS,
    payload: {data: id}
});

const upvoteTicketFail = () => ({
    type: UPVOTE_TICKET_FAIL,
    payload: {}
});

// -- Reducer ---

const reducer: Reducer<TicketState, ActionTypes> = (
    state = {
        list: [],
        isLoadingList: true,
        isUpvotingTicket: false
    },
    action
) => {
    switch (action.type) {
        case LOAD_TICKET_LIST:
            return {...state, isLoadingList: true};
        case LOAD_TICKET_LIST_SUCCESS:
            return {...state, list: action.payload, isLoadingList: false};
        case LOAD_TICKET_LIST_FAIL:
            return {...state, isLoadingList: false};
        case UPVOTE_TICKET:
            return {...state, isUpvotingTicket: true};
        case UPVOTE_TICKET_SUCCESS:
            return {
                ...state,
                list: state.list.map(ticket => ticket.id === action.payload.data ? {
                    ...ticket,
                    numberOfVotes: ++ticket.numberOfVotes
                } : ticket),
                isUpvotingTicket: false
            };
        case UPVOTE_TICKET_FAIL:
            return {...state, isUpvotingTicket: false};
        default:
            return state;
    }
};

export default reducer;
