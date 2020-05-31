import React, { Component } from 'react'
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    KeyboardAvoidingView,
    FlatList,
    Keyboard,
    Animated
} from 'react-native'
import Icon from 'react-native-ionicons'
import Colors from '../Colors';
import Styles from '../Styles';
import { Swipeable } from 'react-native-gesture-handler'

export default class TodoModal extends Component {

    state = {
        newTodo: ''
    }

    toggleTodoCompleted = index => {
        const list = this.props.list
        list.todos[index].completed = !list.todos[index].completed
        this.props.updateList(list)
    }

    addTodo = () => {
        const { newTodo } = this.state

        // Validate text before inserting
        if (!newTodo.replace(/\s+/, '').length) {
            return null
        }

        const list = this.props.list
        list.todos.push({
            completed: false,
            title: newTodo
        })
        this.setState({ newTodo: '' })
        this.props.updateList(list)
        Keyboard.dismiss()
    }

    rightActions = (dragx, index) => {
        const scale = dragx.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0.9],
            extrapolate: 'clamp'
        })

        const opacity = dragx.interpolate({
            inputRange: [-100, -20, 0],
            outputRange: [1, 0.9, 0],
            extrapolate: 'clamp'
        })

        return (
            <TouchableOpacity>
                <Animated.View style={[styles.deleteButton, { opacity: opacity }]}>
                    <Animated.Text style={{ color: Colors.white, fontWeight: '800', transform: [{ scale }] }}>
                        Delete
                    </Animated.Text>
                </Animated.View>
            </TouchableOpacity>
        )
    }

    renderTodo = (todo, index) => {
        const iconName = todo.completed ? 'checkbox' : 'square-outline'
        return (
            <Swipeable renderRightActions={(_, dragx) => this.rightActions(dragx, index)}>
                <View style={styles.todoContainer}>
                    <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
                        <Icon name={iconName} color={Colors.gray} style={{ width: 32 }} />
                    </TouchableOpacity>
                    <Text style={[styles.todoTitle,
                    {
                        textDecorationLine: todo.completed ? 'line-through' : 'none',
                        color: todo.completed ? Colors.gray : Colors.black
                    }]}>
                        {todo.title}
                    </Text>
                </View>
            </Swipeable>
        )
    }

    render() {
        const { color, name, todos } = this.props.list
        const completedCount = todos.filter(item => item.completed).length
        const taskCount = todos.length
        return (
            <SafeAreaView style={styles.container}>
                <TouchableOpacity style={{ position: 'absolute', top: 64, right: 32, zIndex: 10 }}
                    onPress={this.props.closeModal}>
                    <Icon name='close' color={Colors.black} />
                </TouchableOpacity>

                <View style={[styles.headr, { borderColor: color }]}>
                    <View>
                        <Text style={styles.title}> {name} </Text>
                        <Text style={styles.taskCount}> {completedCount} of {taskCount} tasks </Text>
                    </View>
                </View>

                <View style={{ flex: 3, marginVertical: 16, marginLeft: 32 }}>
                    <FlatList data={todos}
                        renderItem={({ item, index }) => this.renderTodo(item, index)}
                        keyExtractor={item => item.title}
                        showsVerticalScrollIndicator={false}
                    />
                </View>

                <KeyboardAvoidingView style={styles.footer} behavior='padding'>
                    <TextInput style={[Styles.input, { flex: 1, margin: 8 }]}
                        placeholder='Add Item'
                        value={this.state.newTodo}
                        onChangeText={text => this.setState({ newTodo: text })} />
                    <TouchableOpacity style={[styles.addButton, { backgroundColor: color }]}
                        onPress={this.addTodo}>
                        <Icon name='add' color={Colors.white} />
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headr: {
        marginLeft: 64,
        paddingTop: 16,
        justifyContent: 'flex-end',
        borderBottomWidth: 3
    },
    title: {
        fontWeight: '800',
        fontSize: 30,
        color: Colors.black
    },
    taskCount: {
        fontWeight: '600',
        color: Colors.gray,
        marginBottom: 16,
        marginTop: 4
    },
    addButton: {
        width: 50,
        height: 50,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 32
    },
    todoContainer: {
        marginVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 32,
    },
    todoTitle: {
        color: Colors.black,
        fontSize: 14,
        fontWeight: '700',
        marginRight: 64,
    },
    deleteButton: {
        flex: 1,
        width: 80,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.red
    }
})
