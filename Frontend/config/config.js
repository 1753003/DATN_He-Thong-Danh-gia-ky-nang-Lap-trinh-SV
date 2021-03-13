// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  history: {
    type: 'browser',
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/CheckLoginLayout',
          routes: [
            {
              path: '/user',
              component: '../layouts/UserLayout',
              routes: [
                {
                  name: 'login',
                  path: '/user/login',
                  component: './User/login',
                },
              ],
            },
          ]
        },
        {
          path: '/developer',
          component: '../layouts/SecurityLayout',
          routes: [
            {
              path: '/developer',
              component: '../layouts/BasicLayout',
              authority: ['developer'],
              routes: [
                {
                  path: '/developer',
                  redirect: '/developer/welcome',
                },
                {
                  path: '/developer/welcome',
                  name: 'welcome',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  component: './404',
                },
              ],
            },
            {
              component: './404',
            },
          ],
        },
        {
          path: '/creator',
          component: '../layouts/SecurityLayout',
          routes: [
            {
              path: '/creator',
              component: '../layouts/BasicLayout',
              authority: ['dev'],
              routes: [
                {
                  path: '/creator',
                  redirect: '/creator/welcome',
                },
                {
                  path: '/creator/welcome',
                  name: 'welcome',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  component: './404',
                },
              ],
            },
            {
              component: './404',
            },
          ],
        },
        {
          path : '/',
          component : '../layouts/GuestLayout',
          routes: [
            {
              path: '/',
              component: './guest/index'
            }
          ]
        }
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  esbuild: {},
});
