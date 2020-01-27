import React, {useEffect, useState} from "react";
import {View, Text} from "react-native";
import {Camera} from "expo-camera";
import * as Permissions from 'expo-permissions';
import {Colors} from "../../../styles/_colors";
import {styles} from "./CameraPage.styles";
import CameraToolBar from "../../ui/camera/CameraToolBar";

type Props = {
    assetId: number,
};

const CameraPage: React.FunctionComponent<Props> & { navigationOptions: any } = (props): JSX.Element => {
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [flashType, setFlashType] = useState(Camera.Constants.FlashMode.off);
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
        <View style={styles.container}>
            {hasPermissions
                ? (
                    <View style={styles.container}>
                        <View>
                            <Camera
                                style={styles.preview}
                                type={cameraType}
                                flashMode={flashType}
                                ref={ref => {
                                    camera = ref;
                                }}
                                onTouchStart={() => snap()}
                            />
                        </View>
                        <View style={styles.toolBar}>
                            <CameraToolBar
                                cameraType={cameraType}
                                flashMode={flashType}
                                setCameraType={() => setCameraType(
                                    cameraType === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                )}
                                setFlashType={() => setFlashType(
                                    flashType === Camera.Constants.FlashMode.on
                                        ? Camera.Constants.FlashMode.off
                                        : Camera.Constants.FlashMode.on
                                )}
                                snap={snap}
                            />
                        </View>
                    </View>
                ) : (
                    <Text>You do not have the necessary permissions to use the camera.</Text>
                )
            }
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
