import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from "react-navigation-stack";
import RoomsListPage from './src/components/pages/room/RoomsList';
import {Provider} from 'react-redux';
import configureStore from "./src/redux/configureStore";
import RoomDetailPage from "./src/components/pages/room/RoomDetail";
import AssetDetailPage from "./src/components/pages/asset/AssetDetail";

const App: React.FunctionComponent = () => {
    const Stack = createStackNavigator({
        Home: {
            screen: RoomsListPage
        },
        Room: {
            screen: RoomDetailPage
        },
        Asset: {
            screen: AssetDetailPage
        }
    });

    const store = configureStore();
    const AppContainer = createAppContainer(Stack);

    return (
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    );
};

export default App;
