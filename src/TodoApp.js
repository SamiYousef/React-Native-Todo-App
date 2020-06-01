import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, FlatList, Modal } from 'react-native'
import Colors from '../Colors'
import Icon from 'react-native-ionicons'
import TodoList from './Components/TodoList'
import AddListModal from './Components/AddListModal'
import { connect } from 'react-redux'

class App extends Component {
    state = {
        addTodoVisable: false,
    }

    toggleAddtoDoModal = () => {
        this.setState({ addTodoVisable: !this.state.addTodoVisable })
    }

    render() {
        const { lists, addList, updateList } = this.props
        return (
            <View style={styles.container}>
                <Modal
                    animationType='slide'
                    visible={this.state.addTodoVisable}
                    onRequestClose={this.toggleAddtoDoModal}>
                    <AddListModal addList={addList} closeModal={this.toggleAddtoDoModal} />
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
                        data={lists}
                        keyExtractor={(item, index) => item.name}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => <TodoList updateList={updateList} list={item} />}
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

const mapStateToProps = state => {
    return { lists: state.lists }
}

const mapDispatchToProps = dispatch => ({
    updateList: list => dispatch({ type: 'UPDATE_LIST', list }),
    addList: list => dispatch({ type: 'ADD_LIST', list })
})

export default connect(mapStateToProps, mapDispatchToProps)(App);