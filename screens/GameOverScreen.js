//@ts-check
import React from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native'
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';
import Colors from '../constants/colors';

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <Card style={styles.resultCard}>
        <Text style={styles.resultText}>Opponent <Text style={styles.span}>guessed the number</Text> in</Text>
        <NumberContainer>{props.numGuesses}</NumberContainer>
        <Text style={styles.resultText}>tries</Text>
      </Card>
      <View style={styles.imageContainer}>
        <Image 
          // source={require('../assets/img/success.png')} 
          source={{uri:'https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg'}} 
          style={styles.image}
          resizeMode={'cover'}
          fadeDuration={3000}
          />  
      </View>
      
      <MainButton onPress={props.onRestartGame}>RESTART</MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen:{
    flex:1,
    alignItems:'center',
  },
  resultCard:{
    alignItems: 'center',
    width:200,
    maxWidth: '80%',
    marginVertical: 20
  },
  resultText:{
    fontSize:15,
    textAlign: 'center'
  },
  imageContainer:{
    width: 300,
    height: 300,
    marginBottom: 10,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden'
  },
  image:{
    width:'100%',
    height:'100%'
  },
  span:{
    fontWeight:'bold',
    color: Colors.primary
  }
});

export default GameOverScreen;