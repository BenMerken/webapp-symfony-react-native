import {Ticket} from "../../data";
import axios from "axios";
import {Reducer} from "react";

// --- API ---

const BASE_URL = 'http://localhost:8000/tickets/';

// --- Action Types ---

export const LOAD_TICKET_LIST = 'PXLAssetManagementTool/room/LOAD_TICKET_LIST';
export const LOAD_TICKET_LIST_SUCCESS = 'PXLAssetManagementTool/room/LOAD_TICKET_LIST_SUCCESS';
export const LOAD_TICKET_LIST_FAIL = 'PXLAssetManagementTool/room/LOAD_TICKET_LIST_FAIL';

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

type ActionTypes =
    | GetTicketListAction
    | GetTicketListActionSuccess
    | GetTicketListActionFail;

// --- State Type ---

type  TicketState = {
    list: Ticket[];
    isLoadingList: boolean;
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

// -- Reducer ---

const reducer: Reducer<TicketState, ActionTypes> = (
    state = {
        list: [],
        isLoadingList: true
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
        default:
            return state;
    }
};

export default reducer;
