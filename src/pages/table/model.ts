import type { Effect, Reducer } from 'umi';
import { queryRule } from './service';
import type { TableListItem } from './data.d';

export type StateType = {
  list: TableListItem[];
  total: number;
};

export type ModelType = {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
  };
};

const Model: ModelType = {
  namespace: 'tableData',
  state: {
    list: [],
    total: 0,
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRule, payload);
    },
  },
  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload.list,
        total: action.payload.total,
      };
    },
  },
};

export default Model;
