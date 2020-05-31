import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, FlatList, Modal } from 'react-native'
import Colors from './Colors'
import Icon from 'react-native-ionicons'
import TodoList from './Components/TodoList'
import tempData from './tempData'
import AddListModal from './Components/AddListModal'

class App extends Component {
  state = {
    addTodoVisable: false,
    lists: tempData
  }

  toggleAddtoDoModal = () => {
    this.setState({ addTodoVisable: !this.state.addTodoVisable })
  }

  addList = list => {
    const { lists } = this.state
    const newList = { ...list, id: lists.length + 1, todos: [] }
    this.setState({ lists: [...lists, newList] })
  }

  updateList = list => {
    this.setState({
      list: this.state.lists.map(todo => {
        return todo.id === list.id ? list : todo
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType='slide'
          visible={this.state.addTodoVisable}
          onRequestClose={this.toggleAddtoDoModal}>
          <AddListModal addList={this.addList} closeModal={this.toggleAddtoDoModal} />
        </Modal>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.devider} />
          <Text style={styles.title}>
            Todo <Text style={{ fontWeight: '300', color: Colors.blue }}>Lists</Text>
          </Text>
          <View style={styles.devider} />
        </View>
        <View style={{ marginVertical: 48 }}>
          <TouchableOpacity style={styles.addList}
            onPress={this.toggleAddtoDoModal}>
            <Icon name='add' size={16} color={Colors.blue} />
          </TouchableOpacity>
          <Text style={styles.add}>Add List</Text>
        </View>
        <View style={{ height: 275, paddingLeft: 23 }}>
          <FlatList
            data={this.state.lists}
            keyExtractor={(item, index) => item.name}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <TodoList updateList={this.updateList} list={item} />}
            keyboardShouldPersistTaps='always'
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  devider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.lightBlue
  },
  title: {
    color: Colors.black,
    fontSize: 38,
    fontWeight: '800',
    paddingHorizontal: 64
  },
  addList: {
    borderColor: Colors.lightBlue,
    borderRadius: 4,
    borderWidth: 2,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  add: {
    marginTop: 8,
    color: Colors.blue,
    fontWeight: '600',
    fontSize: 14
  }
})
export default App;