import { LOGIN_SUCCESS, LOGIN_FAIL } from '../actions/users';

const initialState = {

  loginStatus: null

}

export default (state = initialState, action) => {

  switch (action.type) {

    case LOGIN_SUCCESS:

      return {...state, loginStatus: 'SUCCESS'};

    case LOGIN_FAIL:

      return {...state, loginStatus: 'FAIL'}

    default:
      return state;

  }

}
