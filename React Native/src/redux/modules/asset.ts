import {Asset} from "../../data";
import {Reducer} from "react";
import axios from "axios";

// --- API ---

const BASE_URL = 'http://localhost:8000/assets/';

// --- Action Types ---

export const LOAD_ASSET_LIST = 'PXLAssetManagementTool/room/LOAD_ASSET_LIST';
export const LOAD_ASSET_LIST_SUCCESS = 'PXLAssetManagementTool/room/LOAD_ASSET_LIST_SUCCESS';
export const LOAD_ASSET_LIST_FAIL = 'PXLAssetManagementTool/room/LOAD_ASSET_LIST_FAIL';

type GetAssetListAction = {
    type: typeof LOAD_ASSET_LIST;
    payload: any;
};

type GetAssetListActionSuccess = {
    type: typeof LOAD_ASSET_LIST_SUCCESS;
    payload: Asset[];
};

type GetAssetListActionFail = {
    type: typeof LOAD_ASSET_LIST_FAIL;
    payload: [];
};

type ActionTypes =
    | GetAssetListAction
    | GetAssetListActionSuccess
    | GetAssetListActionFail

// --- State Type ---

type AssetState = {
    list: Asset[];
    isLoadingList: boolean;
};

// --- Action Creators ---

export const getAssetList = (roomId: number) => {
    return async dispatch => {
        dispatch(setIsLoadingList());
        try {
            const response = await axios.get(`${BASE_URL}?roomId=${roomId}`);
            dispatch(getAssetListSuccess(response.data));
        } catch (error) {
            dispatch(getAssetListFail());
        }
    }
};

const setIsLoadingList = () => ({
    type: LOAD_ASSET_LIST,
    payload: {}
});

const getAssetListSuccess = (assets: Asset[]) => ({
    type: LOAD_ASSET_LIST_SUCCESS,
    payload: assets
});

const getAssetListFail = () => ({
    type: LOAD_ASSET_LIST_FAIL,
    payload: {}
});

// --- Reducer ---

const reducer: Reducer<AssetState, ActionTypes> = (
    state = {
        list: [],
        isLoadingList: true
    },
    action
) => {
    switch (action.type) {
        case LOAD_ASSET_LIST:
            return {...state, isLoadingList: true};
        case LOAD_ASSET_LIST_SUCCESS:
            return {...state, list: action.payload, isLoadingList: false};
        case LOAD_ASSET_LIST_FAIL:
            return {...state, isLoadingList: false};
        default:
            return state;
    }
};

export default reducer;
