import { Effect, ImmerReducer } from 'umi';
import { getMyInfo, login } from '@/services/api/login';

export interface IndexModelState {
  userInfo: any; // 用户登录信息
  loginState: boolean; // 是否为登录状态
  personalInfo: any; // 个人信息
}

export interface IndexModelType {
  namespace: string;
  state: IndexModelState;
  effects: {
    query: Effect;
    login: Effect;
  };
  reducers: {
    updateUser: ImmerReducer<IndexModelState>;
    updateLoginState: ImmerReducer<IndexModelState>;
    updatePersonalInfo: ImmerReducer<IndexModelState>;
  };
}

const IndexModel: IndexModelType = {
  namespace: 'index',
  state: {
    userInfo: {}, // 用户登录信息
    loginState: true, // 是否为登录状态
    personalInfo: {}, // 个人信息
  },
  effects: {
    *query({ payload }, { call, put }) {
      const res = yield call(getMyInfo, payload);
      // console.log(res, 'yield')
      // yield put({ type: 'updatePersonalInfo', res })
      yield put({ type: 'updateLoginState', payload: false });
    },
    *login({ payload }, { call, put }) {
      const res = yield call(login, payload);
      if (res.code === 'T') {
        const { token, userInfo } = res.data || {};
        localStorage.setItem('token', token);
        yield put({
          type: 'updateUser',
          payload: userInfo,
        });
        yield put({ type: 'updateLoginState', payload: true });
      }
    },
  },
  reducers: {
    updateUser(state: any, { payload }: any) {
      return { ...state, userInfo: payload };
    },
    updateLoginState(state: any, { payload }: any) {
      return { ...state, loginState: payload };
    },
    updatePersonalInfo(state: any, { payload }: any) {
      return { ...state, personalInfo: payload };
    },
  },
};

export default IndexModel;
