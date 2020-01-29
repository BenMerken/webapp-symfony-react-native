import React from "react";
import {TouchableOpacity, View} from "react-native";
import {Camera} from "expo-camera";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import {styles} from "./CameraToolBar.styles";
import {Colors} from "../../../styles/_colors";

type Props = {
    flashMode: typeof Camera.Constants.FlashMode;
    cameraType: typeof Camera.Constants.Type;
    setCameraType: () => void;
    setFlashType: () => void;
    snap: () => void
};

const CameraToolBar: React.FunctionComponent<Props> = (props): JSX.Element => {

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => props.setFlashType()}
                style={styles.touchableOpacity}
            >
                <MaterialIcon
                    color={Colors.fontLight}
                    style={styles.icon}
                    name={props.flashMode === Camera.Constants.FlashMode.on ? 'flash-on' : 'flash-off'}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={props.snap}
                style={styles.touchableOpacity}
            >
                <Icon
                    color={Colors.fontLight}
                    style={styles.icon}
                    name="circle-thin"
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => props.setCameraType()}
                style={styles.touchableOpacity}
            >
                <MaterialIcon
                    color={Colors.fontLight}
                    style={styles.icon}
                    name="switch-camera"
                />
            </TouchableOpacity>
        </View>
    );
};

export default CameraToolBar;
