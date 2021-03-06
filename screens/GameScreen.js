import React , {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, Text, Button, Alert} from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const generateRandomNumber = (min, max, exclude) => {
    min= Math.ceil(min);
    max= Math.floor(max);
    const rand = Math.floor(Math.random()*(max-min))+ min;
    if(rand === exclude){
        return generateRandomNumber(min, max, exclude);
    }
    else{
        return rand;
    }
}

const GameScreen =  props => {

    const [currentGuess, setCurrentGuess] = useState(
        generateRandomNumber(1, 100, props.userChoice)
        );

    const [rounds, setRounds]  = useState(0);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const {userChoice, onEnd} = props;

    useEffect(() => {
        if(currentGuess === props.userChoice){
            props.onEnd(rounds);
        }

    },[currentGuess, userChoice, onEnd]);

    const nextGuessHandler = direction => {
        if((direction === 'lower' && currentGuess < props.userChoice)
        ||(direction === 'greater' && currentGuess > props.userChoice)){
            Alert.alert("Don't lie!", 'You know that is wrong ...', [{
                text: 'Sorry', style: 'cancel'
            }]);
            return;
        }
        if(direction === 'lower'){
            currentHigh.current = currentGuess;
        }
        else{
            currentLow.current = currentGuess;
        }
        const nextNumber = generateRandomNumber(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setRounds(curRounds => curRounds + 1);
        
    }

    return(
        <View style={styles.screen}>
            <Text>Guessed Number</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title='LOWER' onPress={nextGuessHandler.bind(this, 'lower')}/>
                <Button title='GREATER' onPress={nextGuessHandler.bind(this, 'greater')}/>
            </Card>
        </View>
        
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }
});


export default GameScreen;