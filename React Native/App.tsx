import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from "react-navigation-stack";
import RoomsListPage from './src/components/pages/room/RoomsList';
import {Provider} from 'react-redux';
import configureStore from "./src/redux/configureStore";
import RoomDetailPage from "./src/components/pages/room/RoomDetail";
import TicketsListPage from "./src/components/pages/ticket/TicketsList";
import TicketDetailPage from "./src/components/pages/ticket/TicketDetail";

const App: React.FunctionComponent = () => {
    const Stack = createStackNavigator({
        Home: {
            screen: RoomsListPage
        },
        Room: {
            screen: RoomDetailPage
        },
        Tickets: {
            screen: TicketsListPage
        },
        Ticket: {
            screen: TicketDetailPage
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
