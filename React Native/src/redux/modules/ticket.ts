import {Ticket} from "../../data";
import axios from "axios";
import {Reducer} from "react";

// --- API ---

const BASE_URL = 'http://localhost:8000/tickets/';

// --- Action Types ---

const LOAD_TICKET_LIST = 'PXLAssetManagementTool/room/LOAD_TICKET_LIST';
const LOAD_TICKET_LIST_SUCCESS = 'PXLAssetManagementTool/room/LOAD_TICKET_LIST_SUCCESS';
const LOAD_TICKET_LIST_FAIL = 'PXLAssetManagementTool/room/LOAD_TICKET_LIST_FAIL';

const LOAD_TICKET_DETAIL = 'PXLAssetManagementTool/room/LOAD_TICKET_DETAIL';
const LOAD_TICKET_DETAIL_SUCCESS = 'PXLAssetManagementTool/room/LOAD_TICKET_SUCCESS';
const LOAD_TICKET_DETAIL_FAIL = 'PXLAssetManagementTool/room/LOAD_TICKET_FAIL';

const UPVOTE_TICKET = 'PXLAssetManagementTool/room/UPVOTE_TICKET';
const UPVOTE_TICKET_SUCCESS = 'PXLAssetManagementTool/room/UPVOTE_TICKET_SUCCESS';
const UPVOTE_TICKET_FAIL = 'PXLAssetManagementTool/room/UPVOTE_TICKET_FAIL';

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

type GetTicketDetailAction = {
    type: typeof LOAD_TICKET_DETAIL;
    payload: { id: number };
};

type GetTicketDetailActionSuccess = {
    type: typeof LOAD_TICKET_DETAIL_SUCCESS;
    payload: Ticket;
};

type GetTicketDetailActionFail = {
    type: typeof LOAD_TICKET_DETAIL_FAIL;
    payload: {};
};

type UpvoteTicketAction = {
    type: typeof UPVOTE_TICKET;
    payload: {};
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
    | GetTicketDetailAction
    | GetTicketDetailActionSuccess
    | GetTicketDetailActionFail
    | UpvoteTicketAction
    | UpvoteTicketActionSuccess
    | UpvoteTicketActionFail;

// --- State Type ---

type  TicketState = {
    list: Ticket[];
    isLoadingList: boolean;
    detail: Ticket;
    isLoadingDetail: boolean;
    isUpvotingTicket: boolean;
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

export const getTicket = (id: number) => {
    return async dispatch => {
        dispatch(setIsLoadingDetail());
        try {
            const response = await axios.get(`${BASE_URL}${id}`);
            dispatch(getTicketSuccess(response.data));
        } catch (error) {
            dispatch(getTicketFail());
        }
    };
};

const setIsLoadingDetail = () => ({
    type: LOAD_TICKET_DETAIL,
    payload: {}
});

const getTicketSuccess = (ticket: Ticket) => ({
    type: LOAD_TICKET_DETAIL_SUCCESS,
    payload: ticket
});

const getTicketFail = () => ({
    type: LOAD_TICKET_DETAIL_FAIL,
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
        detail: null,
        isLoadingDetail: true,
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
        case LOAD_TICKET_DETAIL:
            return {...state, isLoadingDetail: true};
        case LOAD_TICKET_DETAIL_SUCCESS:
            return {...state, detail: action.payload, isLoadingDetail: false};
        case LOAD_TICKET_DETAIL_FAIL:
            return {...state, isLoadingDetail: false};
        case UPVOTE_TICKET:
            return {...state, isUpvotingTicket: true};
        case UPVOTE_TICKET_SUCCESS:
            return {
                ...state,
                list: state.list.map(ticket => ticket.id === action.payload.data ? {
                    ...ticket,
                    numberOfVotes: ticket.numberOfVotes + 1
                } : {...ticket}),
                detail: {...state.detail, numberOfVotes: state.detail.numberOfVotes + 1},
                isUpvotingTicket: false
            };
        case UPVOTE_TICKET_FAIL:
            return {...state, isUpvotingTicket: false};
        default:
            return state;
    }
};

export default reducer;
