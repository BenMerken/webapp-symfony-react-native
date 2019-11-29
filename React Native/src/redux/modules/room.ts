import {Room} from "../../data";
import {Reducer} from "react";
import axios from "axios";

// --- API ---

const BASE_URL = 'http://192.168.33.22/rooms/';

// --- Action Types ---

export const LOAD_ROOM_LIST = 'LOAD_ROOM_LIST';
export const LOAD_ROOM_LIST_SUCCESS = 'LOAD_ROOM_LIST_SUCCESS';
export const LOAD_ROOM_LIST_FAIL = 'LOAD_ROOM_LIST_FAIL';

type GetRoomListAction = {
    type: typeof LOAD_ROOM_LIST;
    payload: any;
};

type GetRoomListActionSuccess = {
    type: typeof LOAD_ROOM_LIST_SUCCESS;
    payload: { data: Room[] };
};

type GetRoomListActionFail = {
    type: typeof LOAD_ROOM_LIST_FAIL;
    payload: [];
};

type ActionTypes =
    | GetRoomListAction
    | GetRoomListActionSuccess
    | GetRoomListActionFail

// --- State Type ---

type RoomState = {
    list: Room[];
    isLoadingList: boolean;
};

// --- Action Creators

export const getRoomList = () => {
    return async dispatch => {
        dispatch(setIsLoadingList());
        try {
            const {rooms}: {rooms: Room[]} = await axios.get(BASE_URL);
            dispatch(getRoomListSuccess(rooms));
        } catch (error) {
            dispatch(getRoomListFail());
        }
    }
};

const setIsLoadingList = () => ({
    type: LOAD_ROOM_LIST,
    payload: {}
});

const getRoomListSuccess = (rooms: Room[]) => ({
    type: LOAD_ROOM_LIST_SUCCESS,
    payload: {data: rooms}
});

const getRoomListFail = () => ({
    type: LOAD_ROOM_LIST_FAIL,
    payload: {}
});

// --- Reducer ---

const roomReducer: Reducer<RoomState, ActionTypes> = (
    state = {
        list: [],

        isLoadingList: true,
    },
    action
) => {
    switch (action.type) {
        case LOAD_ROOM_LIST:
            return {...state, isLoadingList: true};
        case LOAD_ROOM_LIST_SUCCESS:
            return {...state, list: action.payload.data, isLoadingList: false};
        case LOAD_ROOM_LIST_FAIL:
            return {...state, isLoadingList: false};
        default:
            return state;
    }
};

export default roomReducer;
