import {Room} from "../../data";
import {Reducer} from "react";
import axios from "axios";

// --- API ---

const BASE_URL = 'http://localhost:8000/rooms/';

// --- Action Types ---

const LOAD_ROOM_LIST = 'PXLAssetManagementTool/room/LOAD_ROOM_LIST';
const LOAD_ROOM_LIST_SUCCESS = 'PXLAssetManagementTool/room/LOAD_ROOM_LIST_SUCCESS';
const LOAD_ROOM_LIST_FAIL = 'PXLAssetManagementTool/room/LOAD_ROOM_LIST_FAIL';

const LOAD_ROOM_DETAIL = 'PXLAssetManagementTool/room/LOAD_ROOM_DETAIL';
const LOAD_ROOM_DETAIL_SUCCESS = 'PXLAssetManagementTool/room/LOAD_ROOM_DETAIL_SUCCESS';
const LOAD_ROOM_DETAIL_FAIL = 'PXLAssetManagementTool/room/LOAD_ROOM_DETAIL_FAIL';

const FILTER_ROOM_LIST = 'PXLAssetManagementTool/room/FILTER_ROOM_LIST';
const FILTER_ROOM_LIST_SUCCESS = 'PXLAssetManagementTool/room/FILTER_ROOM_LIST_SUCCESS';
const FILTER_ROOM_LIST_FAIL = 'PXLAssetManagementTool/room/FILTER_ROOM_LIST_FAIL';

type GetRoomListAction = {
    type: typeof LOAD_ROOM_LIST;
    payload: any;
};

type GetRoomListActionSuccess = {
    type: typeof LOAD_ROOM_LIST_SUCCESS;
    payload: Room[];
};

type GetRoomListActionFail = {
    type: typeof LOAD_ROOM_LIST_FAIL;
    payload: [];
};

type GetRoomDetailAction = {
    type: typeof LOAD_ROOM_DETAIL;
    payload: any
};

type GetRoomDetailActionSuccess = {
    type: typeof LOAD_ROOM_DETAIL_SUCCESS;
    payload: Room
};

type GetRoomDetailActionFail = {
    type: typeof LOAD_ROOM_DETAIL_FAIL;
    payload: {}
};

type FilterRoomListAction = {
    type: typeof FILTER_ROOM_LIST;
    payload: any;
};

type FilterRoomListActionSuccess = {
    type: typeof FILTER_ROOM_LIST_SUCCESS;
    payload: number;
};

type FilterRoomListActionFail = {
    type: typeof FILTER_ROOM_LIST_FAIL;
    payload: [];
};

type ActionTypes =
    | GetRoomListAction
    | GetRoomListActionSuccess
    | GetRoomListActionFail
    | GetRoomDetailAction
    | GetRoomDetailActionSuccess
    | GetRoomDetailActionFail
    | FilterRoomListAction
    | FilterRoomListActionSuccess
    | FilterRoomListActionFail;

// --- State Type ---

type RoomState = {
    list: Room[];
    isLoadingList: boolean;
    detail: Room;
    isLoadingDetail: boolean;
    filteredList: Room[];
    isFilteringList: boolean;
};

// --- Action Creators ---

export const getRoomList = () => {
    return async dispatch => {
        dispatch(setIsLoadingList());
        try {
            const response = await axios.get(BASE_URL);
            dispatch(getRoomListSuccess(response.data));
        } catch (error) {
            dispatch(getRoomListFail());
        }
    }
};

const setIsLoadingList = (): GetRoomListAction => ({
    type: LOAD_ROOM_LIST,
    payload: {}
});

const getRoomListSuccess = (rooms: Room[]): GetRoomListActionSuccess => ({
    type: LOAD_ROOM_LIST_SUCCESS,
    payload: rooms
});

const getRoomListFail = (): GetRoomListActionFail => ({
    type: LOAD_ROOM_LIST_FAIL,
    payload: []
});

export const getRoom = (name: string) => {
    return async dispatch => {
        dispatch(setIsLoadingDetail());
        try {
            const response = await axios.get(BASE_URL + name);
            dispatch(getRoomDetailSuccess(response.data));
        } catch (error) {
            dispatch(getRoomDetailFail())
        }
    };
};

const setIsLoadingDetail = (): GetRoomDetailAction => ({
    type: LOAD_ROOM_DETAIL,
    payload: {}
});

const getRoomDetailSuccess = (room: Room): GetRoomDetailActionSuccess => ({
    type: LOAD_ROOM_DETAIL_SUCCESS,
    payload: room
});

const getRoomDetailFail = (): GetRoomDetailActionFail => ({
    type: LOAD_ROOM_DETAIL_FAIL,
    payload: {}
});

export const filterRoomList = (score: number) => {
    return async dispatch => {
        dispatch(setIsFilteringList());
        try {
            dispatch(filterRoomListSuccess(score));
        } catch (error) {
            dispatch(filterRoomListFail())
        }
    };
};

const setIsFilteringList = (): FilterRoomListAction => ({
    type: FILTER_ROOM_LIST,
    payload: {}
});

const filterRoomListSuccess = (score: number): FilterRoomListActionSuccess => ({
    type: FILTER_ROOM_LIST_SUCCESS,
    payload: score
});

const filterRoomListFail = (): FilterRoomListActionFail => ({
    type: FILTER_ROOM_LIST_FAIL,
    payload: []
});

// --- Reducer ---

const reducer: Reducer<RoomState, ActionTypes> = (
    state = {
        list: [],
        isLoadingList: true,
        detail: null,
        isLoadingDetail: true,
        filteredList: [],
        isFilteringList: false
    },
    action
) => {
    switch (action.type) {
        case LOAD_ROOM_LIST:
            return {...state, isLoadingList: true};
        case LOAD_ROOM_LIST_SUCCESS:
            return {...state, list: action.payload, filteredList: action.payload, isLoadingList: false};
        case LOAD_ROOM_LIST_FAIL:
            return {...state, list: action.payload, isLoadingList: false};
        case LOAD_ROOM_DETAIL:
            return {...state, isLoadingDetail: true};
        case LOAD_ROOM_DETAIL_SUCCESS:
            return {...state, detail: action.payload, isLoadingDetail: false};
        case LOAD_ROOM_DETAIL_FAIL:
            return {...state, isLoadingDetail: false};
        case FILTER_ROOM_LIST:
            return {...state, isFilteringList: true};
        case FILTER_ROOM_LIST_SUCCESS:
            return {
                ...state,
                filteredList: state.list.filter(room => room.happinessScore >= action.payload),
                isFilteringList: false
            };
        case FILTER_ROOM_LIST_FAIL:
            return {...state, isFilteringList: false};
        default:
            return state;
    }
};

export default reducer;
