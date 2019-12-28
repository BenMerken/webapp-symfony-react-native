import {Asset} from "../../data";
import {Reducer} from "react";
import axios from "axios";

// --- API ---

const BASE_URL = 'http://localhost:8000/assets/';

// --- Action Types ---

const LOAD_ASSET_LIST = 'PXLAssetManagementTool/room/LOAD_ASSET_LIST';
const LOAD_ASSET_LIST_SUCCESS = 'PXLAssetManagementTool/room/LOAD_ASSET_LIST_SUCCESS';
const LOAD_ASSET_LIST_FAIL = 'PXLAssetManagementTool/room/LOAD_ASSET_LIST_FAIL';

const FILTER_ASSET_LIST = 'PXLAssetManagementTool/room/FILTER_ASSET_LIST';
const FILTER_ASSET_LIST_SUCCESS = 'PXLAssetManagementTool/room/FILTER_ASSET_LIST_SUCCESS';
const FILTER_ASSET_LIST_FAIL = 'PXLAssetManagementTool/room/FILTER_ASSET_LIST_FAIL';

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

type FilterAssetListAction = {
    type: typeof FILTER_ASSET_LIST;
    payload: any;
};

type FilterAssetListActionSuccess = {
    type: typeof FILTER_ASSET_LIST_SUCCESS;
    payload: string
};

type FilterAssetListActionFail = {
    type: typeof FILTER_ASSET_LIST_FAIL;
    payload: [];
};

type ActionTypes =
    | GetAssetListAction
    | GetAssetListActionSuccess
    | GetAssetListActionFail
    | FilterAssetListAction
    | FilterAssetListActionSuccess
    | FilterAssetListActionFail;

// --- State Type ---

type AssetState = {
    list: Asset[];
    isLoadingList: boolean;
    filteredList: Asset[];
    isFilteringList: boolean;
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

const setIsLoadingList = (): GetAssetListAction => ({
    type: LOAD_ASSET_LIST,
    payload: {}
});

const getAssetListSuccess = (assets: Asset[]): GetAssetListActionSuccess => ({
    type: LOAD_ASSET_LIST_SUCCESS,
    payload: assets
});

const getAssetListFail = (): GetAssetListActionFail => ({
    type: LOAD_ASSET_LIST_FAIL,
    payload: []
});

export const filterAssetList = (name: string) => {
    return async dispatch => {
        dispatch(setIsFilteringList());
        try {
            dispatch(filterAssetListSuccess(name));
        } catch (error) {
            dispatch(filterAssetListFail());
        }
    };
};

const setIsFilteringList = (): FilterAssetListAction => ({
    type: FILTER_ASSET_LIST,
    payload: {}
});

const filterAssetListSuccess = (name: string): FilterAssetListActionSuccess => ({
    type: FILTER_ASSET_LIST_SUCCESS,
    payload: name
});

const filterAssetListFail = (): FilterAssetListActionFail => ({
    type: FILTER_ASSET_LIST_FAIL,
    payload: []
});

// --- Reducer ---

const reducer: Reducer<AssetState, ActionTypes> = (
    state = {
        list: [],
        isLoadingList: true,
        filteredList: [],
        isFilteringList: false
    },
    action
) => {
    switch (action.type) {
        case LOAD_ASSET_LIST:
            return {...state, isLoadingList: true};
        case LOAD_ASSET_LIST_SUCCESS:
            return {...state, list: action.payload, filteredList: action.payload, isLoadingList: false};
        case LOAD_ASSET_LIST_FAIL:
            return {...state, list: action.payload, isLoadingList: false};
        case FILTER_ASSET_LIST:
            return {...state, isFilteringList: true};
        case FILTER_ASSET_LIST_SUCCESS:
            return {
                ...state,
                filteredList: state.list.filter(asset => asset.name.toLowerCase().includes(action.payload.toLowerCase())),
                isFilteringList: false
            };
        case FILTER_ASSET_LIST_FAIL:
            return {...state, isFilteringList: false};
        default:
            return state;
    }
};

export default reducer;
