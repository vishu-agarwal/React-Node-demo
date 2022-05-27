import axios from 'axios'

// Set config defaults when creating the instance
export const instance = axios.create({
    baseURL: 'http://localhost:3001/myhelpers',
    headers: {
        Authorization: "Bearer " + localStorage.getItem("logToken")
    },
});

// let { token } = useSelector((state) => ({ ...state.loginStore }))

// Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = localStorage.getItem("logToken");