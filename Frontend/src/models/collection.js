// import { queryCurrent, query as queryUsers } from '@/services/user';
import {
  getCollectionList,
  getCollectionById,
  addTestToCollection,
  removeTestFromCollection,
  createNewCollection,
  deleteCollection,
  editCollection,
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
      try {
        yield call(createNewCollection, payload);
        payload?.onSuccess();
      } catch (e) {
        payload?.onFail();
      }
    },
    *editCollection({ payload }, { call }) {
      try {
        yield call(editCollection, payload);
        payload?.onSuccess();
      } catch (e) {
        payload?.onFail();
      }
    },
    *addTestToCollectionModel({ payload }, { call }) {
      try {
        yield call(addTestToCollection, payload);
        payload?.onSuccess();
      } catch (e) {
        payload?.onFail();
      }
    },
    *removeTestToCollectionModel({ payload }, { call }) {
      try {
        yield call(removeTestFromCollection, payload);
        payload?.onSuccess();
      } catch (e) {
        console.log(e);
        payload?.onFail();
      }
    },
    *deleteCollectionModel({ payload }, { call }) {
      try {
        yield call(deleteCollection, payload);
        payload?.onSuccess();
      } catch {
        payload?.onFail();
      }
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
