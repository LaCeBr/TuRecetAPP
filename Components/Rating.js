import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from '@rneui/themed';

const Rating = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <Icon
                key={i}
                name='star'
                type='font-awesome'
                color={i <= rating ? '#FFD700' : '#DDDDDD'}
                size={20}
            />
        );
    }
    return <View style={styles.starContainer}>{stars}</View>;
};

const styles = StyleSheet.create({
    starContainer: {
        flexDirection: 'row',
        marginVertical: 5,
    },
});

export default Rating;
