import {observer, inject} from 'mobx-react';
import React, {useState} from 'react';
import {Button, TextInput, Text, TouchableOpacity, View} from 'react-native';

const Home = (props) => {
  const [todoItem, setState] = useState('');

  const onChangeText = (todoItem) => {
    console.log(todoItem, '<==item');
    setState(todoItem);
  };

  const addTodo = () => {
    if (todoItem) {
      props.store.addTodo(todoItem);
      setState('');
    }
  };

  const toggleTodo = (todo) => {
    todo.toggleCompleted();
  };

  console.log('todo', props.store.todos[0]);

  return (
    <>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 40,
          color: 'green',
          margin: 20,
        }}>
        Add an Item
      </Text>
      <TextInput
        style={{
          padding: 10,
          borderRadius: 5,
          elevation: 1,
          marginHorizontal: 20,
          marginBottom: 15,
        }}
        value={todoItem ? todoItem : ''}
        onChangeText={(text) => onChangeText(text)}
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
        TODO Items
      </Text>
      <View
        style={{
          margin: 20,
        }}>
        {props.store.incompleteTodos.map((todo, index) => (
          <TouchableOpacity
            onPress={() => toggleTodo(todo)}
            key={index}
            style={{
              justifyContent: 'space-around',
              flexDirection: 'row',
              padding: 20,
            }}>
            <Text style={{fontSize: 16}}>{todo.title}</Text>
            <Text>{todo.completed ? 'Done' : 'Incomplete'}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text
        style={{
          textAlign: 'center',
          textDecorationLine: 'underline',
          fontSize: 16,
        }}>
        Completed Items
      </Text>
      <View
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
      </View>
    </>
  );
};

export default inject('store')(observer(Home));
