import { search } from '@/services/search';

const Model = {
  namespace: 'search',
  state: {
    list: [],
    filterList: [],
    filter: {
      solved: false,
      unsolved: false,
      hard: false,
      medium: false,
      easy: false,
      code: false,
      multiple: false,
    },
  },
  effects: {
    *getSearchList({ payload }, { put }) {
      const data = yield search(payload);
      yield put({
        type: 'setList',
        payload: data,
      });
      yield put({
        type: 'setFilterList',
        payload: data,
      });
    },
    *updateFilter({ payload }, { put, select }) {
      var newList = [];
      var filter = yield select((state) => state.search.filter);
      if (payload == 'solved') {
        filter.solved = !filter.solved;
      } else if (payload == 'unsolved') filter.unsolved = !filter.unsolved;
      else if (payload == 'easy') filter.easy = !filter.easy;
      else if (payload == 'medium') filter.medium = !filter.medium;
      else if (payload == 'hard') filter.hard = !filter.hard;
      else if (payload == 'code') filter.code = !filter.code;
      else if (payload == 'multiple') filter.multiple = !filter.multiple;

      newList = yield select((state) =>
        state.search.list.filter((item) => {
          return item.isSolve == filter.solved || item.isSolve != filter.unsolved;
        }),
      );
      console.log(newList)
      if (filter.easy && filter.medium && filter.hard)
        newList = newList.filter((item) => {
            return (
              item.DifficultLevel == 'Easy' ||
              item.DifficultLevel == 'Medium' ||
              item.DifficultLevel == 'Hard'
            );
          },
        );
      else if (!filter.easy && !filter.medium && !filter.hard)
        newList = newList.filter((item) => {
            return (
              item.DifficultLevel == 'Easy' ||
              item.DifficultLevel == 'Medium' ||
              item.DifficultLevel == 'Hard'
            );
          },
        );
      else if (filter.easy && filter.medium && !filter.hard)
        newList = newList.filter((item) => {
            return item.DifficultLevel != 'Hard';
          },
        );
      else if (filter.easy && !filter.medium && filter.hard)
        newList = newList.filter((item) => {
            return item.DifficultLevel != 'Medium';
          },
        );
      else if (!filter.easy && filter.medium && filter.hard)
        newList = newList.filter((item) => {
            return item.DifficultLevel != 'Easy';
          },
        );
      else if (!filter.easy && !filter.medium && filter.hard)
        newList = newList.filter((item) => {
            return item.DifficultLevel == 'Hard';
          },
        );
      else if (!filter.easy && filter.medium && !filter.hard)
        newList = newList.filter((item) => {
            return item.DifficultLevel == 'Medium';
          },
        );
      else if (filter.easy && !filter.medium && !filter.hard)
        newList = newList.filter((item) => {
            return item.DifficultLevel == 'Easy';
          },
        );
      
      if ((filter.code && filter.multiple) || !(filter.code && filter.multiple))
        newList = newList.filter((item) => {
          return (item.Type == 'Code' || item.Type == 'MultipleChoice');
        },
      );
      else if (filter.code && !filter.multiple)
        newList = newList.filter((item) => {
          return (item.Type == 'Code' || item.Type != 'MultipleChoice');
        },
      );
      else if (!filter.code && filter.multiple)
        newList = newList.filter((item) => {
          return (item.Type != 'Code' || item.Type == 'MultipleChoice');
        },
      );
      yield put({
        type: 'setFilterList',
        payload: newList,
      });
    },
  },
  reducers: {
    setList(state, { payload }) {
      return { ...state, list: payload };
    },
    setFilterList(state, { payload }) {
      return { ...state, filterList: payload };
    },
  },
};

export default Model;
