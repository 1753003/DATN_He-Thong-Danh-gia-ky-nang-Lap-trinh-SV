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
    default: 'en-US',
    // antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  exportStatic:{
    
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
                  path: '/user',
                  redirect: '/user/login',
                },
                {
                  name: 'login',
                  path: '/user/login',
                  component: './User/login',
                },
                {
                  name: 'register-result',
                  icon: 'smile',
                  path: '/user/register-result',
                  component: './User/register-result',
                },
                {
                  name: 'register',
                  icon: 'smile',
                  path: '/user/register',
                  component: './User/register/registerHome',
                },
                {
                  name: 'Register Creator',
                  path: '/user/register/creator',
                  component: './User/register/registerCreator',
                },
                {
                  name: 'Register Developer',
                  path: '/user/register/developer',
                  component: './User/register/registerDeveloper',
                },
                {
                  name: 'Forgot password',
                  path: '/user/forgotPassword',
                  component: './User/forgotPassword/index',
                },
                {
                  component: '404',
                },
              ],
            },
          ],
        },
        {
          path: '/creator',
          component: '../layouts/SecurityLayout',
          authority: ['dev'],
          routes: [
            {
              path: '/creator',
              component: '../layouts/BasicLayout',
              authority: ['dev'],
              routes: [
                {
                  path: '/creator',
                  redirect: '/creator/tests',
                },
                {
                  path: '/creator/tests',
                  name: 'Tests',
                  icon: 'UnorderedListOutlined',
                  component: './Creator/Tests',
                },
                {
                  path: '/creator/collectionDetail',
                  name: 'Home',
                  icon: 'home',
                  hideInMenu: true,
                  component: './Creator/CollectionDetail',
                },
                {
                  path: '/creator/testDetail',
                  name: 'Home',
                  icon: 'home',
                  hideInMenu: true,
                  component: './Creator/TestDetail',
                },
                {
                  path: '/creator/createTest',
                  name: 'Home',
                  icon: 'home',
                  hideInMenu: true,
                  component: './Creator/CreateTest',
                },
                {
                  path: '/creator/report',
                  name: 'Report',
                  icon: 'PicLeftOutlined',
                  component: './Creator/Report',
                },
                {
                  path: '/creator/reportDetail',
                  name: 'Report Detail',
                  hideInMenu: true,
                  icon: 'PicLeftOutlined',
                  component: './Creator/ReportDetail',
                },
                {
                  component: './404',
                },
              ],
            },
          ],
        },
        {
          path: '/developer',
          component: '../layouts/SecurityLayout',
          routes: [
            {
              path: '/developer',
              component: '../layouts/BasicLayout',
              routes: [
                {
                  path: '/developer',
                  redirect: '/developer/welcome',
                },
                {
                  name: 'Welcome',
                  path: '/developer/welcome',
                  component: './developer/welcome',
                },
                {
                  name: 'Practice',
                  path: '/developer/practice',
                  routes: [
                    {
                      path: '/developer/practice',
                      redirect: '/developer/practice/home',
                    },
                    {
                      path: '/developer/practice',
                      routes: [
                        {
                          path: '/developer/',
                          redirect: '/developer/practice/home',
                        },
                        {
                          path: '/developer/practice/home',
                          component: './developer/practice/home',
                        },
                        {
                          path: '/developer/practice/list',
                          component: './developer/practice/list',
                        },
                        {
                          path: '/developer/practice/questions',
                          component: './developer/practice/questions',
                        },
                        {
                          component: './404',
                        },
                      ],
                    },
                  ],
                },
                {
                  name: 'Test',
                  path: '/developer/test',
                  routes: [
                    {
                      path: '/developer/test',
                      routes: [
                        {
                          path: '/developer/test/home',
                          component: './developer/test/home',
                        },
                        {
                          path: '/developer/test/questions',
                          component: './developer/TestDetail/test',
                        },
                        {
                          path: '/developer/test/list',
                          component: './developer/test/list',
                        },
                        {
                          path: '/developer/test',
                          redirect: '/developer/test/home',
                        },
                        {
                          component: './404',
                        },
                      ],
                    },
                  ],
                },
                {
                  path: '/developer/search',
                  component: './developer/search',
                },
                {
                  path: '/developer/profile',
                  component: './account/center',
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
          path: '/',
          component: '../layouts/GuestLayout',
          routes: [
            {
              path: '/',
              component: './guest/index',
            },
            {
              name: 'Introduction',
              path: '/introduction',
              component: './guest/introduction',
            },
          ],
        },
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
  chunks: ['vendors', 'umi'],
  chainWebpack: function (config, { webpack }) {
    config.merge({
      optimization: {
        splitChunks: {
          chunks: 'all',
          minSize: 30000,
          minChunks: 3,
          automaticNameDelimiter: '.',
          cacheGroups: {
            vendor: {
              name: 'vendors',
              test({ resource }) {
                return /[\\/]node_modules[\\/]/.test(resource);
              },
              priority: 10,
            },
          },
        },
      },
    });
  },
});
