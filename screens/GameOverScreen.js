import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import Colors from '../constants/Colors';

const GameOverScreen = props => {
    return(
        <View style={styles.screen}>
            <Text style={styles.styleText}>The Game is Over</Text>
            <Text style={styles.styleText}>Number of Rounds: {props.numOfRounds}</Text>
            <Text style={styles.styleText}>Number was: {props.numUser}</Text>
            <Button title="RESTART" onPress={props.restarting} color={Colors.accent}/>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    styleText: {
        fontSize:19,
        paddingVertical: 5,
        alignItems: 'center',
        paddingBottom:10
    }
});

export default GameOverScreen;