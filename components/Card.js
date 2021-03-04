//@ts-check
import React from 'react';
import { View, Button, Text, StyleSheet, TextInput } from 'react-native';

const Card = props => {
  return (
    <View style={{...styles.card, ...props.style}}>
        {props.children}
      </View>
  );
};

const styles = StyleSheet.create({
  card:{
    backgroundColor: 'white',
    padding: 20,
    // borderWidth: 1,
    borderRadius: 20,
    //IOS ONLY
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    //ANDROID ONLY
    elevation: 10,
  },
});

export default Card;