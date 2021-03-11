import type { Effect, Reducer } from 'umi';

export type StateType = {};

export type ModelType = {
  namespace: string;
  state: StateType;
  effects: {};
  reducers: {};
};

const Model: ModelType = {
  namespace: 'userLogin',
  state: {},
  effects: {},
  reducers: {},
};

export default Model;
