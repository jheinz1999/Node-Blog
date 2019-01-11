import axios from 'axios';
import config from '../../config.js';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export const login = (username, password) => dispatch => {

  axios.get(`${config.backend}/users:${config.port}`)
    .then(res => {

      const user = res.data.find(item => user.name === username);

      if (user) {

        dispatch({
          type: LOGIN_SUCCESS,
          payload: user.id
        });

      }

    });

}
