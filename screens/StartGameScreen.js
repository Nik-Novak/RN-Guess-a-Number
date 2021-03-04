//@ts-check
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import Colors from '../constants/colors';
import DefaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';

const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if( isNaN(chosenNumber) || chosenNumber <=0 || chosenNumber>99 ){
      Alert.alert(
        'Invalid number!', 
        'Number has to be a number between 1 and 99', 
        [{text: 'Dismiss', style:'destructive', onPress:resetInputHandler}]
      );
      return;
    }
    Keyboard.dismiss();
    setConfirmed(true);  //@ts-ignore
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
  };

  let confirmedOutput = confirmed ? 
    <Card style={styles.selectionCard}>
      <Text>You selected</Text>
      <NumberContainer>{selectedNumber}</NumberContainer>
      {/* <Button title="START GAME" onPress={()=>{props.onStartGame(selectedNumber)}} /> */}
      <MainButton onPress={()=>{props.onStartGame(selectedNumber)}}>START GAME</MainButton>
    </Card>
    : null;


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} touchSoundDisabled>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputCard}>
        <Text>Select a Number</Text>
          <Input 
            style={styles.input} 
            blurOnSubmit
            onSubmitEditing={confirmInputHandler} 
            autoCapitalize='none' 
            autoCorrect={false} 
            keyboardType='number-pad' 
            maxLength={2} 
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}><Button title='Reset' color={Colors.accent} onPress={resetInputHandler}/></View>
            <View style={styles.button}><Button title='Confirm' color={Colors.primary} onPress={confirmInputHandler}/></View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen:{
    flex: 1,
    width: '100%',
    padding:10,
    alignItems: 'center',
  },
  title:{
    fontSize: 20,
    marginVertical: 10,
    // fontFamily: 'open-sans-bold'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    width: '100%'
  },
  button:{
    width: 100,
    maxWidth: '45%'
  },
  inputCard:{
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
    marginBottom: 10
  },
  selectionCard:{
    alignItems: 'center',
    marginBottom: 10
  },
  input:{
    width: 50,
    marginBottom: 10,
    textAlign: 'center'
  }
});

export default StartGameScreen;