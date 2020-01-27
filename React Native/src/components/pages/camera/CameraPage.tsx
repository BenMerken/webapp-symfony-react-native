import React, {useEffect, useState} from "react";
import {View} from "react-native";
import {Camera} from "expo-camera";
import * as Permissions from 'expo-permissions';
import {Colors} from "../../../styles/_colors";
import {styles} from "./CameraPage.styles";

type Props = {
    assetId: number
};

const CameraPage: React.FunctionComponent<Props> & { navigationOptions: any } = (props): JSX.Element => {
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [hasPermissions, setHasPermissions] = useState(null);
    let camera = null;

    useEffect(() => {
        (async () => {
            const {status} = await Permissions.askAsync(Permissions.CAMERA);
            setHasPermissions(status === 'granted');
        })();
    }, []);

    const snap = async () => {
        if (camera) {
            const photo = await camera.takePictureAsync();
        }
    };

    return (
        <View>
            <Camera
                style={styles.cameraContainer}
                type={cameraType}
                ref={ref => {
                    camera = ref;
                }}
            />
        </View>
    );
};

CameraPage.navigationOptions = () => ({
    title: 'Asset photo',
    headerStyle: {
        backgroundColor: Colors.primaryDark
    },
    headerTitleStyle: {
        color: Colors.fontLight
    },
    headerBackTitleStyle: {
        color: Colors.fontLight
    },
});

export default CameraPage;
