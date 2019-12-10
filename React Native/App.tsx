import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from "react-navigation-stack";
import RoomsList from './src/components/pages/room/RoomsList';
import {Provider} from 'react-redux';
import configureStore from "./src/redux/configureStore";

const App: React.FunctionComponent = () => {
    const Stack = createStackNavigator({
        Rooms: {
            screen: RoomsList
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
