import { queryNotices } from '@/services/user';
import firebase from '@/utils/firebase'


const GlobalModel = {
  namespace: 'global',
  state: {
    collapsed: false,
    notices: [],
  },
  effects: {
  
  },
  reducers: {
    changeLayoutCollapsed(
      state = {
        collapsed: true,
      },
      { payload },
    ) {
      return { ...state, collapsed: payload };
    },

  },
};
export default GlobalModel;
