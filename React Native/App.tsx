import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from "react-navigation-stack";
import RoomsList from './src/components/pages/room/RoomsList';
import {Provider} from 'react-redux';
import configureStore from "./src/redux/configureStore";

const App: React.FC = () => {
    const Stack = createStackNavigator({
        Home: {
            screen: RoomsList
        }
    });

    const store = configureStore;
    const AppContainer = createAppContainer(Stack);

    return (
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    );
};

export default App;
