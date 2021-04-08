// @ts-nocheck
import { Component } from 'react';
import { ApplyPluginsType } from 'umi';
import dva from 'dva';
// @ts-ignore
import createLoading from 'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/node_modules/dva-loading/dist/index.esm.js';
import { plugin, history } from '../core/umiExports';
import ModelCollection0 from 'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/models/collection.js';
import ModelGlobal1 from 'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/models/global.js';
import ModelJudge02 from 'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/models/judge0.js';
import ModelLogin3 from 'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/models/login.js';
import ModelPractice4 from 'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/models/practice.js';
import ModelSetting5 from 'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/models/setting.js';
import ModelTest6 from 'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/models/test.js';
import ModelUser7 from 'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/models/user.js';
import ModelModel8 from 'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/account/center/model.js';
import ModelModel9 from 'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/account/settings/model.js';
import ModelModel10 from 'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/dashboard/analysis/model.js';
import ModelModel11 from 'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/dashboard/monitor/model.js';
import ModelModel12 from 'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/dashboard/workplace/model.js';
import ModelModel13 from 'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/form/advanced-form/model.js';
import ModelModel14 from 'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/form/basic-form/model.js';
import ModelModel15 from 'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/form/step-form/model.js';
import ModelModel16 from 'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/list/basic-list/model.js';
import ModelModel17 from 'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/list/card-list/model.js';
import ModelModel18 from 'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/list/search/applications/model.js';
import ModelModel19 from 'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/list/search/articles/model.js';
import ModelModel20 from 'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/list/search/projects/model.js';
import ModelModel21 from 'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/profile/advanced/model.js';
import ModelModel22 from 'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/profile/basic/model.js';
import ModelModel23 from 'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/User/forgotPassword/model.js';
import ModelModel24 from 'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/User/register/model.js';

let app:any = null;

export function _onCreate(options = {}) {
  const runtimeDva = plugin.applyPlugins({
    key: 'dva',
    type: ApplyPluginsType.modify,
    initialValue: {},
  });
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    // @ts-ignore
    ...(typeof window !== 'undefined' && window.g_useSSR ? { initialState: window.g_initialProps } : {}),
    ...(options || {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach((plugin:any) => {
    app.use(plugin);
  });
  app.model({ namespace: 'collection', ...ModelCollection0 });
app.model({ namespace: 'global', ...ModelGlobal1 });
app.model({ namespace: 'judge0', ...ModelJudge02 });
app.model({ namespace: 'login', ...ModelLogin3 });
app.model({ namespace: 'practice', ...ModelPractice4 });
app.model({ namespace: 'setting', ...ModelSetting5 });
app.model({ namespace: 'test', ...ModelTest6 });
app.model({ namespace: 'user', ...ModelUser7 });
app.model({ namespace: 'model', ...ModelModel8 });
app.model({ namespace: 'model', ...ModelModel9 });
app.model({ namespace: 'model', ...ModelModel10 });
app.model({ namespace: 'model', ...ModelModel11 });
app.model({ namespace: 'model', ...ModelModel12 });
app.model({ namespace: 'model', ...ModelModel13 });
app.model({ namespace: 'model', ...ModelModel14 });
app.model({ namespace: 'model', ...ModelModel15 });
app.model({ namespace: 'model', ...ModelModel16 });
app.model({ namespace: 'model', ...ModelModel17 });
app.model({ namespace: 'model', ...ModelModel18 });
app.model({ namespace: 'model', ...ModelModel19 });
app.model({ namespace: 'model', ...ModelModel20 });
app.model({ namespace: 'model', ...ModelModel21 });
app.model({ namespace: 'model', ...ModelModel22 });
app.model({ namespace: 'model', ...ModelModel23 });
app.model({ namespace: 'model', ...ModelModel24 });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  constructor(props: any) {
    super(props);
    // run only in client, avoid override server _onCreate()
    if (typeof window !== 'undefined') {
      _onCreate();
    }
  }

  componentWillUnmount() {
    let app = getApp();
    app._models.forEach((model:any) => {
      app.unmodel(model.namespace);
    });
    app._models = [];
    try {
      // 释放 app，for gc
      // immer 场景 app 是 read-only 的，这里 try catch 一下
      app = null;
    } catch(e) {
      console.error(e);
    }
  }

  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
