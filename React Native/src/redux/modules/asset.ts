import {Asset, AssetImage} from "../../data";
import {Reducer} from "react";
import axios from "axios";
import {ToastAndroid} from "react-native";

// --- API ---

const BASE_URL = 'http://localhost:8000/assets/';

// --- Action Types ---

const LOAD_ASSET_LIST = 'PXLAssetManagementTool/room/LOAD_ASSET_LIST';
const LOAD_ASSET_LIST_SUCCESS = 'PXLAssetManagementTool/room/LOAD_ASSET_LIST_SUCCESS';
const LOAD_ASSET_LIST_FAIL = 'PXLAssetManagementTool/room/LOAD_ASSET_LIST_FAIL';

const FILTER_ASSET_LIST = 'PXLAssetManagementTool/room/FILTER_ASSET_LIST';
const FILTER_ASSET_LIST_SUCCESS = 'PXLAssetManagementTool/room/FILTER_ASSET_LIST_SUCCESS';
const FILTER_ASSET_LIST_FAIL = 'PXLAssetManagementTool/room/FILTER_ASSET_LIST_FAIL';

const ADD_ASSET_PICTURE = 'PXLAssetManagementTool/room/ADD_ASSET_PICTURE';
const ADD_ASSET_PICTURE_SUCCESS = 'PXLAssetManagementTool/room/ADD_ASSET_PICTURE_SUCCESS';
const ADD_ASSET_PICTURE_FAIL = 'PXLAssetManagementTool/room/ADD_ASSET_PICTURE_FAIL';

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

type AddAssetPictureAction = {
    type: typeof ADD_ASSET_PICTURE;
    payload: any;
};

type AddAssetPictureActionSuccess = {
    type: typeof ADD_ASSET_PICTURE_SUCCESS;
    payload: AssetImage;
};

type AddAssetPictureActionFail = {
    type: typeof ADD_ASSET_PICTURE_FAIL;
    payload: null
};

type ActionTypes =
    | GetAssetListAction
    | GetAssetListActionSuccess
    | GetAssetListActionFail
    | FilterAssetListAction
    | FilterAssetListActionSuccess
    | FilterAssetListActionFail
    | AddAssetPictureAction
    | AddAssetPictureActionSuccess
    | AddAssetPictureActionFail;

// --- State Type ---

type AssetState = {
    list: Asset[];
    isLoadingList: boolean;
    filteredList: Asset[];
    isFilteringList: boolean;
    isAddingAssetPicture: boolean;
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

export const addAssetPicture = (assetImage: AssetImage) => {
    return async dispatch => {
        dispatch(setIsAddingAssetPicture());
        try {
            await axios.patch(`${BASE_URL}${assetImage.assetId}`, assetImage.base64);
            dispatch(addAssetPictureSuccess(assetImage));
            ToastAndroid.show('Image for asset successfully saved.', ToastAndroid.SHORT);
        } catch (error) {
            dispatch(addAssetPictureFail());
            if (error.message.includes('404')) {
                ToastAndroid.show('404.', ToastAndroid.SHORT);
            } else if (error.message.includes('400')) {
                ToastAndroid.show('400.', ToastAndroid.SHORT);
            } else if (error.message.includes('500')) {
                ToastAndroid.show(`${error.message}`, ToastAndroid.SHORT);
            }
            //ToastAndroid.show('Error during saving image to database.', ToastAndroid.SHORT);
        }
    };
};

const setIsAddingAssetPicture = (): AddAssetPictureAction => ({
    type: ADD_ASSET_PICTURE,
    payload: {}
});

const addAssetPictureSuccess = (asetImage: AssetImage): AddAssetPictureActionSuccess => ({
    type: ADD_ASSET_PICTURE_SUCCESS,
    payload: asetImage
});

const addAssetPictureFail = (): AddAssetPictureActionFail => ({
    type: ADD_ASSET_PICTURE_FAIL,
    payload: null
});

// --- Reducer ---

const reducer: Reducer<AssetState, ActionTypes> = (
    state = {
        list: [],
        isLoadingList: true,
        filteredList: [],
        isFilteringList: false,
        isAddingAssetPicture: false
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
        case ADD_ASSET_PICTURE:
            return {...state, isAddingAssetPicture: true};
        case ADD_ASSET_PICTURE_SUCCESS:
            return {
                ...state,
                filteredList: state.list.map(asset => asset.id.toString() === action.payload.assetId
                    ? {...asset, image: action.payload.base64}
                    : {...asset}),
                isAddingAssetPicture: false
            };
        case ADD_ASSET_PICTURE_FAIL:
            return {...state, isAddingAssetPicture: false};
        default:
            return state;
    }
};

export default reducer;
