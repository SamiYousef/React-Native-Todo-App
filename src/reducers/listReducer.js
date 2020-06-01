
export default listReducer = (state = [], action) => {
    console.log('+++++', state)
    console.log('-----', action)
    const { list } = action
    switch (action.type) {
        case "ADD_LIST":
            return [...state, {
                ...list,
                id: state.length + 1,
                todos: []
            }]
        case "UPDATE_LIST":
            return state.map(todo => {
                return todo.id === list.id ? list : todo
            })
        default:
            return state
    }
}