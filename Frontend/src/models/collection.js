// import { queryCurrent, query as queryUsers } from '@/services/user';
import {
  getCollectionList,
  getCollectionById,
  addTestToCollection,
  removeTestFromCollection,
  createNewCollection,
  deleteCollection,
} from '@/services/collection';

const CollectionModal = {
  namespace: 'collection',
  state: {
    collectionList: [],
    collectionById: {},
  },
  effects: {
    *fetchCollection(_, { call, put }) {
      const response = yield call(getCollectionList);
      response.forEach((item) => {
        item.key = item.CollectionID;
      });
      yield put({
        type: 'saveCollection',
        payload: response,
      });
    },
    *getCollectionByIdModel({ payload }, { call, put }) {
      const response = yield call(getCollectionById, payload.id);
      yield put({
        type: 'saveCollectionById',
        payload: response,
      });
    },
    *createNewCollectionModel({ payload }, { call }) {
      yield call(createNewCollection, payload);
    },
    *addTestToCollectionModel({ payload }, { call }) {
      yield call(addTestToCollection, payload);
    },
    *removeTestToCollectionModel({ payload }, { call }) {
      yield call(removeTestFromCollection, payload);
    },
    *deleteCollectionModel({ payload }, { call }) {
      yield call(deleteCollection, payload);
    },
  },
  reducers: {
    saveCollection(state, { payload }) {
      return { ...state, collectionList: [...payload] };
    },
    saveCollectionById(state, { payload }) {
      return { ...state, collectionById: payload };
    },
  },
};
export default CollectionModal;
