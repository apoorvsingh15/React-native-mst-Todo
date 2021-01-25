/* eslint-disable react-native/no-inline-styles */
import {observer, inject} from 'mobx-react';
import React, {useState, useRef} from 'react';
import {
  Button,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Animated,
  StyleSheet,
} from 'react-native';

const Home = props => {
  const [todoItem, setState] = useState('');

  const onChangeText = todoItem => {
    console.log(todoItem, '<==item');
    setState(todoItem);
  };

  const addTodo = () => {
    if (todoItem) {
      props.store.addTodo(todoItem);
      setState('');
    }
    fadeIn();
  };

  const toggleTodo = todo => {
    todo.toggleCompleted();
    fadeOut();
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 5000,
    }).start();
  };

  console.log('todo', props.store.todos[0]);

  return (
    <ScrollView>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 40,
          color: 'green',
          margin: 20,
        }}>
        Animated Notes
      </Text>
      <TextInput
        style={{
          padding: 10,
          borderRadius: 25,
          elevation: 1,
          marginHorizontal: 20,
          marginBottom: 15,
        }}
        value={todoItem ? todoItem : ''}
        onChangeText={text => onChangeText(text)}
      />
      <View style={{margin: 20}}>
        <Button onPress={addTodo} title={'Add'} />
      </View>
      <Text
        style={{
          textAlign: 'center',
          textDecorationLine: 'underline',
          fontSize: 16,
        }}>
        Notes
      </Text>
      <View>
        {props.store.incompleteTodos.map((todo, index) => (
          <Animated.View
            key={index}
            style={[
              styles.fadingContainer,
              {
                opacity: fadeAnim, // Bind opacity to animated value
              },
            ]}>
            <TouchableOpacity
              onPress={() => toggleTodo(todo)}
              style={{
                justifyContent: 'space-around',
                flexDirection: 'row',
                padding: 20,
              }}>
              <Text style={{fontSize: 16}}>{todo.title}</Text>
              {/* <Text>{todo.completed ? 'Done' : 'Incomplete'}</Text> */}
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      {/* <Text
        style={{
          textAlign: 'center',
          textDecorationLine: 'underline',
          fontSize: 16,
        }}>
        Completed Items
      </Text> */}
      {/* <View
        style={{
          margin: 20,
        }}>
        {props.store.completedTodos.map((todo, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => toggleTodo(todo)}
            style={{
              justifyContent: 'space-around',
              flexDirection: 'row',
              padding: 20,
            }}>
            <Text style={{textDecorationLine: 'line-through', fontSize: 16}}>
              {todo.title}
            </Text>
            <Text>{todo.completed ? 'Done' : 'Incomplete'}</Text>
          </TouchableOpacity>
        ))}
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fadingContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'powderblue',
  },
});

export default inject('store')(observer(Home));
