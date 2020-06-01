import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Modal } from 'react-native'
import Colors from '../../Colors';
import TodoModal from './TodoModal';

export default class TodoList extends Component {
    state = {
        showListVisable: false
    }

    toggleListModel = () => {
        this.setState({ showListVisable: !this.state.showListVisable })
    }

    render() {
        const { list } = this.props
        const completedCount = list.todos.filter(todo => todo.completed).length
        const remainingCount = list.todos.length - completedCount
        return (
            <View>

                <Modal
                    animationType='slide'
                    visible={this.state.showListVisable}
                    onRequestClose={this.toggleListModel}>
                    <TodoModal updateList={this.props.updateList} list={list} closeModal={this.toggleListModel} />
                </Modal>

                <TouchableOpacity style={[styles.listContainer, { backgroundColor: list.color }]}
                    onPress={this.toggleListModel}>
                    <Text style={styles.listTitle} numberOfLines={1}>
                        {list.name}
                    </Text>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.count}>{remainingCount}</Text>
                        <Text style={styles.subTitle}>Remaining</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.count}>{completedCount}</Text>
                        <Text style={styles.subTitle}>Completed</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    listContainer: {
        width: 200,
        marginHorizontal: 12,
        paddingHorizontal: 16,
        paddingVertical: 32,
        borderRadius: 6,
        alignItems: 'center'
    },
    listTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: Colors.white,
        marginBottom: 18
    },
    count: {
        fontWeight: '200',
        fontSize: 48,
        color: Colors.white
    },
    subTitle: {
        fontWeight: '700',
        fontSize: 12,
        color: Colors.white
    }
})
