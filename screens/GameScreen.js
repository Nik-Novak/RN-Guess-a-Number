//@ts-check
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  let guess = Math.floor( Math.random()*(max-min) + min );
  if (guess==exclude)
    return generateRandomBetween(min, max, exclude);
  return guess;
};

const GameScreen = ({ userNumber, onGameOver, onRestartGame }) => {
  const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, userNumber));
  const min = useRef(1);
  const max = useRef(100);
  // const [min, setMin] = useState(1);
  // const [max, setMax] = useState(100);
  const numGuesses = useRef(1);

  const onLowerHandler = () => {
    if(userNumber > currentGuess){
      Alert.alert('Why you always lyin\'?', 'Why did we even ask you if you were just going to lie?', [{text:"I will uninstall", style:"destructive"}]);
      return;
    }
    numGuesses.current =(numGuesses.current+1);
    max.current = currentGuess;
    // setMax(currentGuess);
    setCurrentGuess(generateRandomBetween(min.current, currentGuess, currentGuess));
  };
  
  const onHigherHandler = () => {
    if(userNumber < currentGuess){
      Alert.alert('Why you always lyin\'?', 'Why did we even bother asking you?', [{text:"I will uninstall", style:"destructive"}]);
      return;
    }
    numGuesses.current =(numGuesses.current+1);
    min.current = currentGuess+1;
    // setMin(currentGuess+1);
    setCurrentGuess(generateRandomBetween(currentGuess+1, max.current, currentGuess));
  };

  useEffect(()=>{
    if(currentGuess == userNumber)
      onGameOver(numGuesses.current);
  }, [currentGuess, userNumber, onGameOver]);
      
  return (
    <View style={styles.screen}>
      <Text style={{fontFamily:'open-sans'}}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        {/* <Button title='LOWER' onPress={onLowerHandler}/>
        <Button title='HIGHER' onPress={onHigherHandler}/> */}
        <MainButton onPress={onLowerHandler}>
          <Ionicons name='md-remove' size={24} color='white'/>
        </MainButton>
        <MainButton onPress={onHigherHandler}>
        <Ionicons name='md-add' size={24} color='white'/>
        </MainButton>
      </Card>
      <Button title='Restart' onPress={onRestartGame}/>
    </View>
  );
};

const styles = StyleSheet.create({
  screen:{
    flex: 1,
    padding:10,
    alignItems: 'center'
  },
  buttonContainer:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    width: 400,
    maxWidth: '90%',
  },

});

export default GameScreen;