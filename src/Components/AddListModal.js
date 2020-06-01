import React, { Component } from 'react'
import { Text, TextInput, StyleSheet, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-ionicons'
import Colors from '../../Colors';

export default class AddListModal extends Component {
    backgroundColors = ['#DCD859', '#24A6D9', '#595BD9', '#8022D9', '#D159D8', '#D85962', '#D88559']
    state = {
        name: '',
        color: this.backgroundColors[0]
    }

    renderColors() {
        return this.backgroundColors.map(color => {
            return (
                <TouchableOpacity
                    key={color}
                    style={[styles.colorSelect, { backgroundColor: color }]}
                    onPress={() => this.setState({ color })} />
            )
        })
    }

    createTodoList = () => {
        const { name, color } = this.state
        this.props.addList({ name, color })
        this.setState({ name: '', color: this.backgroundColors[0] })
        this.props.closeModal()
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <TouchableOpacity style={{ position: 'absolute', top: 64, right: 32 }}
                    onPress={this.props.closeModal}>
                    <Icon name='close' color={Colors.black} />
                </TouchableOpacity>
                <View style={{ alignSelf: 'stretch', marginHorizontal: 32 }}>

                    <Text style={styles.title}>Create Todo List</Text>

                    <TextInput style={styles.input}
                        placeholder='List Name?'
                        onChangeText={text => this.setState({ name: text })} />

                    <View style={{ paddingTop: 16, flexDirection: 'row', justifyContent: 'space-around' }}>
                        {this.renderColors()}
                    </View>

                    <TouchableOpacity style={[styles.create, { backgroundColor: this.state.color }]}
                        onPress={this.createTodoList}>
                        <Text style={{ fontWeight: '600', color: Colors.white }}>Create!</Text>
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: Colors.black,
        alignSelf: 'center',
        marginBottom: 16
    },
    input: {
        borderColor: Colors.blue,
        borderRadius: 6,
        borderWidth: StyleSheet.hairlineWidth,
        height: 50,
        paddingHorizontal: 16,
        fontSize: 18,
        marginTop: 8
    },
    create: {
        height: 50,
        marginTop: 24,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    colorSelect: {
        width: 30,
        height: 30,
        borderRadius: 4
    }
})
