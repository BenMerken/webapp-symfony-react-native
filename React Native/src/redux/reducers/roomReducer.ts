import * as types from '../constants/actionTypes';
import {Reducer} from "react";
import {Room} from "../../data/room/room";

type GetList = {
    type: typeof types.LOAD_ROOM_LIST;
    payload: any;
};

type GetListSuccess = {
    type: typeof types.LOAD_ROOM_LIST_SUCCESS;
    payload: { data: Room[] };
};

type ActionTypes =
    | GetList

type RoomState = {
    list: Room[];
    isLoadingList: boolean;
    detail: Room;
    isLoadingDetail: boolean;
    isLoadingCreate: boolean;
};

const roomReducer: Reducer<RoomState, ActionTypes> = (
    state = {list: [], isLoadingList: true, detail: null, isLoadingDetail: true, isLoadingCreate: false},
    action) => {
    switch (action.type) {
        case types.LOAD_ROOM_LIST:
            return {...state, isLoadingList: true};
        default:
            return state;
    }
};

export default roomReducer;
