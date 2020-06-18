import React, {useState}  from 'react';
import {View,Text,StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import Colors from '../constants/Colors';
import NumberContainer from '../components/NumberContainer';

const StartGameScreen = props => {

    const [enteredValue, setValue]= useState('');
    const [confirm,setConfirm] = useState(false);
    const [selectedNumber, setNumber] = useState('');

    const inputHandler = inputText => {
        setValue(inputText.replace(/[^0-9]/g, ''));
    }

    const resetInputHandler = () => {
        setValue('');
        setConfirm(false);
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if( isNaN(chosenNumber) || chosenNumber<=0 || chosenNumber>99){
            Alert.alert("Invalid Number!", "It needs to be a number between 1 and 99",
            [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}])
            return;
        }
        setConfirm(true);
        setValue('');
        setNumber(chosenNumber);
        Keyboard.dismiss();
    }

    let confirmOutput;

    if(confirm){
        confirmOutput = (
            <Card style={styles.cofirmContainer}>
                <Text>You selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button title="Start Game" onPress={()=> props.onStart(selectedNumber)}/>
            </Card>               
        )
    }
    

    return(
        <TouchableWithoutFeedback onPress={()=> {
            Keyboard.dismiss();
        }}>
        <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game!</Text>
            <Card style={styles.inputContainer}>
                <Text>Select a Number</Text>
                <Input style={styles.input} blurOnSubmit autoCapitalize='none' autocorrect='false'
                 keyboardType='number-pad' maxLength={2} onChangeText={inputHandler} value={enteredValue}/>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="Reset" onPress={resetInputHandler} color={Colors.accent}/>
                    </View>
                    <View style={styles.button}>
                        <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary}/>
                    </View>
                </View>
            </Card>
            {confirmOutput}
        </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title:{
        fontSize: 20,
        marginVertical: 10
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems:'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 80
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    cofirmContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100
    }
})

export default StartGameScreen;