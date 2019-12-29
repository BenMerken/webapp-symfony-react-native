import {Ticket, TicketForCreate} from "../../data";
import axios from "axios";
import {Reducer} from "react";
import {ToastAndroid} from 'react-native';

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

const FILTER_TICKET_LIST = 'PXLAssetManagementTool/room/FILTER_TICKET_LIST';
const FILTER_TICKET_LIST_SUCCESS = 'PXLAssetManagementTool/room/FILTER_TICKET_LIST_SUCCESS';
const FILTER_TICKET_LIST_FAIL = 'PXLAssetManagementTool/room/FILTER_TICKET_LIST_LIST';

const CREATE_TICKET = 'PXLAssetManagementTool/room/CREATE_TICKET';
const CREATE_TICKET_SUCCESS = 'PXLAssetManagementTool/room/CREATE_TICKET_SUCCESS';
const CREATE_TICKET_FAIL = 'PXLAssetManagementTool/room/CREATE_TICKET_FAIL';

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
    payload: {};
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
    payload: number;
};

type UpvoteTicketActionFail = {
    type: typeof UPVOTE_TICKET_FAIL;
    payload: {};
};

type FilterTicketListAction = {
    type: typeof FILTER_TICKET_LIST;
    payload: any;
};

type FilterTicketListActionSuccess = {
    type: typeof FILTER_TICKET_LIST_SUCCESS;
    payload: number;
};

type FilterTicketListActionFail = {
    type: typeof FILTER_TICKET_LIST_FAIL;
    payload: [];
};

type CreateTicketAction = {
    type: typeof CREATE_TICKET;
    payload: any;
};

type CreateTicketActionSuccess = {
    type: typeof CREATE_TICKET_SUCCESS;
    payload: any
};

type CreateTicketActionFail = {
    type: typeof CREATE_TICKET_FAIL;
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
    | UpvoteTicketActionFail
    | FilterTicketListAction
    | FilterTicketListActionSuccess
    | FilterTicketListActionFail
    | CreateTicketAction
    | CreateTicketActionSuccess
    | CreateTicketActionFail;

// --- State Type ---

type  TicketState = {
    list: Ticket[];
    isLoadingList: boolean;
    detail: Ticket;
    isLoadingDetail: boolean;
    isUpvotingTicket: boolean;
    filteredList: Ticket[];
    isFilteringList: boolean;
    isCreating: boolean;
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

const setIsLoadingList = (): GetTicketListAction => ({
    type: LOAD_TICKET_LIST,
    payload: {}
});

const getTicketListSuccess = (tickets: Ticket[]): GetTicketListActionSuccess => ({
    type: LOAD_TICKET_LIST_SUCCESS,
    payload: tickets
});

const getTicketListFail = (): GetTicketListActionFail => ({
    type: LOAD_TICKET_LIST_FAIL,
    payload: []
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

const setIsLoadingDetail = (): GetTicketDetailAction => ({
    type: LOAD_TICKET_DETAIL,
    payload: {}
});

const getTicketSuccess = (ticket: Ticket): GetTicketDetailActionSuccess => ({
    type: LOAD_TICKET_DETAIL_SUCCESS,
    payload: ticket
});

const getTicketFail = (): GetTicketDetailActionFail => ({
    type: LOAD_TICKET_DETAIL_FAIL,
    payload: {}
});

export const upvoteTicket = (id: number) => {
    return async dispatch => {
        dispatch(setIsUpvotingTicket());
        try {
            await axios.patch(`${BASE_URL}${id}`);
            dispatch(upvoteTicketSuccess(id));
            ToastAndroid.show('Ticket upvoted successfully.', ToastAndroid.SHORT)
        } catch (error) {
            dispatch(upvoteTicketFail());
            ToastAndroid.show('This ticket could not be upvoted.', ToastAndroid.SHORT)
        }
    };
};

const setIsUpvotingTicket = (): UpvoteTicketAction => ({
    type: UPVOTE_TICKET,
    payload: {}
});

const upvoteTicketSuccess = (id: number): UpvoteTicketActionSuccess => ({
    type: UPVOTE_TICKET_SUCCESS,
    payload: id
});

const upvoteTicketFail = (): UpvoteTicketActionFail => ({
    type: UPVOTE_TICKET_FAIL,
    payload: {}
});

export const filterTicketList = (numberOfVotes: number) => {
    return async dispatch => {
        dispatch(setIsFilteringList());
        try {
            dispatch(filterTicketListSuccess(numberOfVotes));
        } catch (error) {
            dispatch(filterTicketListFail());
        }
    };
};

const setIsFilteringList = (): FilterTicketListAction => ({
    type: FILTER_TICKET_LIST,
    payload: {}
});

const filterTicketListSuccess = (numberOfVotes: number): FilterTicketListActionSuccess => ({
    type: FILTER_TICKET_LIST_SUCCESS,
    payload: numberOfVotes
});

const filterTicketListFail = (): FilterTicketListActionFail => ({
    type: FILTER_TICKET_LIST_FAIL,
    payload: []
});

export const createTicket = (assetName: string, ticket: TicketForCreate) => {
    return async dispatch => {
        dispatch(setIsCreatingTicket());
        try {
            await axios.post(`${BASE_URL}?assetName=${assetName}`, ticket);
            dispatch(createTicketSuccess());
            ToastAndroid.show('Ticket successfully created.', ToastAndroid.SHORT);
            dispatch(getTicketList(assetName));
        } catch (error) {
            dispatch(createTicketFail());
            if (error.message.includes('400')) {
                ToastAndroid.show('Your ticket data contained invalid data.', ToastAndroid.SHORT)
            } else if (error.message.includes('500')) {
                ToastAndroid.show('The server experienced an error. Please, try again later.', ToastAndroid.LONG)
            } else {
                ToastAndroid.show('An error occurred.', ToastAndroid.SHORT)
            }
        }
    };
};

const setIsCreatingTicket = (): CreateTicketAction => ({
    type: CREATE_TICKET,
    payload: {}
});

const createTicketSuccess = () => ({
    type: CREATE_TICKET_SUCCESS,
    payload: {}
});

const createTicketFail = () => ({
    type: CREATE_TICKET_FAIL,
    payload: {}
});

// -- Reducer ---

const reducer: Reducer<TicketState, ActionTypes> = (
    state = {
        list: [],
        isLoadingList: true,
        detail: null,
        isLoadingDetail: true,
        isUpvotingTicket: false,
        filteredList: [],
        isFilteringList: false,
        isCreating: false
    },
    action
) => {
    switch (action.type) {
        case LOAD_TICKET_LIST:
            return {...state, isLoadingList: true};
        case LOAD_TICKET_LIST_SUCCESS:
            return {...state, list: action.payload, filteredList: action.payload, isLoadingList: false};
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
                list: state.list.map(ticket => ticket.id === action.payload
                    ? {
                        ...ticket, numberOfVotes: ticket.numberOfVotes + 1
                    } : {...ticket}),
                filteredList: state.filteredList.map(ticket => ticket.id === action.payload
                    ? {
                        ...ticket, numberOfVotes: ticket.numberOfVotes + 1
                    } : {...ticket}),
                detail: {...state.detail, numberOfVotes: state.detail.numberOfVotes + 1},
                isUpvotingTicket: false
            };
        case UPVOTE_TICKET_FAIL:
            return {...state, isUpvotingTicket: false};
        case FILTER_TICKET_LIST:
            return {...state, isFilteringList: true};
        case FILTER_TICKET_LIST_SUCCESS:
            return {
                ...state,
                filteredList: state.list.filter(ticket => ticket.numberOfVotes >= action.payload),
                isFilteringList: false
            };
        case FILTER_TICKET_LIST_FAIL:
            return {...state, isFilteringList: false};
        case CREATE_TICKET:
            return {...state, isCreating: true};
        case CREATE_TICKET_SUCCESS:
            return {...state, isCreating: false};
        case CREATE_TICKET_FAIL:
            return {...state, isCreating: false};
        default:
            return state;
    }
};

export default reducer;
