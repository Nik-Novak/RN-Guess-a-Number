//@ts-check
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading'; //used to prolong the loading screen

import Header from './components/Header';
import GameOverScreen from './screens/GameOverScreen';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'), //key can be anything we want to define, and is later used to access teh font
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [userNumber, setUserNumber] = useState();
  const [numGuesses, setNumGuesses] = useState(0);
  console.log('Font NOT Loaded')

  if(!dataLoaded)
    return (
      <AppLoading 
        startAsync={fetchFonts} 
        onFinish={()=>{setDataLoaded(true)}} 
        onError={err=>console.log('ERROR', err)}
      />
    )

  console.log('Font Loaded')

  const startGameHandler = selectedNumber =>{
    setUserNumber(selectedNumber);
    setNumGuesses(0);
  }

  const restartGameHandler = selectedNumber =>{
    setUserNumber(undefined);
    setNumGuesses(0);
  }

  const gameOverHandler = numGuesses =>{
    setNumGuesses(numGuesses);
  }

  let screen;
  if(!userNumber)
    screen = <StartGameScreen onStartGame={startGameHandler} />;
  else if(!numGuesses)
    screen = <GameScreen userNumber={userNumber} onRestartGame={restartGameHandler} onGameOver={gameOverHandler} />;
  else
    screen = <GameOverScreen numGuesses={numGuesses} onRestartGame={restartGameHandler}/>
  return (
    <View style={styles.container}>
      <Header title={'Guess a Number'} />
      {screen}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
});
