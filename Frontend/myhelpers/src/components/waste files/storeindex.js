import { createStore } from 'redux';

const initialState = {
    user : "",
    password : ""
}

const loginReducer = (state = initialState, action) => {
    if (action.type === 'login')
    {
        return {
            user: state.user + action.user,
            password: state.password + action.user
        };
    }
    return state;
}

const store = createStore(loginReducer);
export default store;