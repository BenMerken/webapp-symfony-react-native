import React from "react";
import {Text} from 'react-native';
import {connect} from 'react-redux';

type Props = {};

const AssetDetail: React.FunctionComponent<Props> = (props): JSX.Element => {
    return (
        <Text>Under construction</Text>
    );
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

const AssetDetailPage = connect(mapStateToProps, mapDispatchToProps)(AssetDetail);

export default AssetDetailPage;
