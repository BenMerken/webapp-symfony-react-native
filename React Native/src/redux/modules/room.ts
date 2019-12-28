import {Room} from "../../data";
import {Reducer} from "react";
import axios from "axios";
import {ToastAndroid} from 'react-native';

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

const LOAD_ROOM_LIST_BY_HAPPINESS_SCORE = 'PXLAssetManagementTool/room/LOAD_ROOM_LIST_BY_HAPPINESS_SCORE';
const LOAD_ROOM_LIST_BY_HAPPINESS_SCORE_SUCCESS = 'PXLAssetManagementTool/room/LOAD_ROOM_LIST_BY_HAPPINESS_SCORE_SUCCESS';
const LOAD_ROOM_LIST_BY_HAPPINESS_SCORE_FAIL = 'PXLAssetManagementTool/room/LOAD_ROOM_LIST_BY_HAPPINESS_SCORE_FAIL';

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
    payload: string;
};

type FilterRoomListActionFail = {
    type: typeof FILTER_ROOM_LIST_FAIL;
    payload: [];
};

type GetRoomListByHappinessScoreAction = {
    type: typeof LOAD_ROOM_LIST_BY_HAPPINESS_SCORE;
    payload: any;
};

type GetRoomListByHappinessScoreActionSuccess = {
    type: typeof LOAD_ROOM_LIST_BY_HAPPINESS_SCORE_SUCCESS;
    payload: Room[];
};

type GetRoomListByHappinessScoreActionFail = {
    type: typeof LOAD_ROOM_LIST_BY_HAPPINESS_SCORE_FAIL;
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
    | FilterRoomListActionFail
    | GetRoomListByHappinessScoreAction
    | GetRoomListByHappinessScoreActionSuccess
    | GetRoomListByHappinessScoreActionFail;

// --- State Type ---

type RoomState = {
    list: Room[];
    isLoadingList: boolean;
    detail: Room;
    isLoadingDetail: boolean;
    filteredList: Room[];
    isFilteringList: boolean;
    listByHappinessScore: Room[];
    isLoadingListByHappinessScore: boolean;
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

export const filterRoomList = (name: string) => {
    return async dispatch => {
        dispatch(setIsFilteringList());
        try {
            dispatch(filterRoomListSuccess(name));
        } catch (error) {
            dispatch(filterRoomListFail())
        }
    };
};

const setIsFilteringList = (): FilterRoomListAction => ({
    type: FILTER_ROOM_LIST,
    payload: {}
});

const filterRoomListSuccess = (name: string): FilterRoomListActionSuccess => ({
    type: FILTER_ROOM_LIST_SUCCESS,
    payload: name
});

const filterRoomListFail = (): FilterRoomListActionFail => ({
    type: FILTER_ROOM_LIST_FAIL,
    payload: []
});

export const getRoomListByHappinessScore = (happinessScore: number) => {
    return async dispatch => {
        dispatch(setIsLoadingListByHappinessScore());
        try {
            const response = await axios.get(`${BASE_URL}?lowerThanScore=${happinessScore.toString()}`);
            dispatch(getRoomListByHappinessScoreSuccess(response.data));
            ToastAndroid.show('Search completed successfully.', ToastAndroid.SHORT)
        } catch (error) {
            dispatch(getRoomListByHappinessScoreFail());
            ToastAndroid.show('An error occurred.', ToastAndroid.SHORT);
        }
    };
};

const setIsLoadingListByHappinessScore = (): GetRoomListByHappinessScoreAction => ({
    type: LOAD_ROOM_LIST_BY_HAPPINESS_SCORE,
    payload: {}
});

const getRoomListByHappinessScoreSuccess = (rooms: Room[]): GetRoomListByHappinessScoreActionSuccess => ({
    type: LOAD_ROOM_LIST_BY_HAPPINESS_SCORE_SUCCESS,
    payload: rooms
});

const getRoomListByHappinessScoreFail = (): GetRoomListByHappinessScoreActionFail => ({
    type: LOAD_ROOM_LIST_BY_HAPPINESS_SCORE_FAIL,
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
        isFilteringList: false,
        listByHappinessScore: [],
        isLoadingListByHappinessScore: false
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
                filteredList: state.list.filter(room => room.name.toLowerCase().includes(action.payload.toLowerCase())),
                isFilteringList: false
            };
        case FILTER_ROOM_LIST_FAIL:
            return {...state, isFilteringList: false};
        case LOAD_ROOM_LIST_BY_HAPPINESS_SCORE:
            return {...state, isLoadingListByHappinessScore: true};
        case LOAD_ROOM_LIST_BY_HAPPINESS_SCORE_SUCCESS:
            return {...state, listByHappinessScore: action.payload, isLoadingListByHappinessScore: false};
        case LOAD_ROOM_LIST_BY_HAPPINESS_SCORE_FAIL:
            return {...state, listByHappinessScore: action.payload, isLoadingListByHappinessScore: false};
        default:
            return state;
    }
};

export default reducer;
