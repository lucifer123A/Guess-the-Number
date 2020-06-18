import React, { useState } from 'react';
import {View, StyleSheet  } from 'react-native';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [roundNum, setGuessRounds] = useState(0);

  const onRestart = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
  }

  const gameEnd  = roundNum => {
    setGuessRounds(roundNum);
  }

  let content = <StartGameScreen onStart={startGameHandler}/>;

  if(userNumber && roundNum <= 0){
    content= <GameScreen userChoice={userNumber} onEnd={gameEnd}/>
  }
  else if(roundNum > 0){
    content = <GameOverScreen numOfRounds={roundNum} numUser={userNumber} restarting={onRestart}/>
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess the Number"/>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex: 1
  }
});

