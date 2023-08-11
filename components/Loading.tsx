import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const LoadingSpinner = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="orange" />
            <Text>Loading...</Text>
        </View>
    );
};

export default LoadingSpinner;
