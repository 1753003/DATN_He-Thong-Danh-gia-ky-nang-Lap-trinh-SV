// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from 'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';
import LoadingComponent from '@/components/PageLoading/index';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BlankLayout' */'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/layouts/BlankLayout'), loading: LoadingComponent}),
    "routes": [
      {
        "path": "/user",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__CheckLoginLayout' */'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/layouts/CheckLoginLayout'), loading: LoadingComponent}),
        "routes": [
          {
            "path": "/user",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__UserLayout' */'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/layouts/UserLayout'), loading: LoadingComponent}),
            "routes": [
              {
                "path": "/user",
                "redirect": "/user/login",
                "exact": true
              },
              {
                "name": "login",
                "path": "/user/login",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__login' */'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/user/login'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "name": "register-result",
                "icon": "smile",
                "path": "/user/register-result",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__register-result' */'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/user/register-result'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "name": "register",
                "icon": "smile",
                "path": "/user/register",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__register__registerHome' */'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/user/register/registerHome'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "name": "Register Creator",
                "path": "/user/register/creator",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__register__registerCreator' */'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/user/register/registerCreator'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "name": "Register Developer",
                "path": "/user/register/developer",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__register__registerDeveloper' */'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/user/register/registerDeveloper'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "name": "Forgot password",
                "path": "/user/forgotPassword",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__forgotPassword__index' */'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/user/forgotPassword/index'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/404'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          }
        ]
      },
      {
        "path": "/creator",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__SecurityLayout' */'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/layouts/SecurityLayout'), loading: LoadingComponent}),
        "authority": [
          "dev"
        ],
        "routes": [
          {
            "path": "/creator",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BasicLayout' */'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/layouts/BasicLayout'), loading: LoadingComponent}),
            "authority": [
              "dev"
            ],
            "routes": [
              {
                "path": "/creator",
                "redirect": "/creator/home",
                "exact": true
              },
              {
                "path": "/creator/home",
                "name": "Home",
                "icon": "home",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Creator__Home' */'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/Creator/Home'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/creator/tests",
                "name": "Tests",
                "icon": "UnorderedListOutlined",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Creator__Tests' */'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/Creator/Tests'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/creator/collectionDetail",
                "name": "Home",
                "icon": "home",
                "hideInMenu": true,
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Creator__CollectionDetail' */'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/Creator/CollectionDetail'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/creator/testDetail",
                "name": "Home",
                "icon": "home",
                "hideInMenu": true,
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Creator__TestDetail' */'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/Creator/TestDetail'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/creator/createTest",
                "name": "Home",
                "icon": "home",
                "hideInMenu": true,
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Creator__CreateTest' */'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/Creator/CreateTest'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/creator/report",
                "name": "Report",
                "icon": "PicLeftOutlined",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Creator__Report' */'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/Creator/Report'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/creator/reportDetail",
                "name": "Report Detail",
                "hideInMenu": true,
                "icon": "PicLeftOutlined",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Creator__ReportDetail' */'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/Creator/ReportDetail'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "path": "/creator/class",
                "name": "Class",
                "icon": "FundOutlined",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Creator__Class' */'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/Creator/Class'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/404'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          }
        ]
      },
      {
        "path": "/developer",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__SecurityLayout' */'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/layouts/SecurityLayout'), loading: LoadingComponent}),
        "routes": [
          {
            "path": "/developer",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BlankLayout' */'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/layouts/BlankLayout'), loading: LoadingComponent}),
            "authority": [
              "developer"
            ],
            "routes": [
              {
                "path": "/developer",
                "redirect": "/developer/welcome",
                "exact": true
              },
              {
                "path": "/developer/welcome",
                "name": "welcome",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__developer__welcome' */'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/developer/welcome'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "name": "Practice",
                "path": "/developer/practice",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BasicLayout' */'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/layouts/BasicLayout'), loading: LoadingComponent}),
                "routes": [
                  {
                    "path": "/developer/practice",
                    "redirect": "/developer/practice/home",
                    "exact": true
                  },
                  {
                    "path": "/developer/practice",
                    "routes": [
                      {
                        "path": "/developer/",
                        "redirect": "/developer/practice/home",
                        "exact": true
                      },
                      {
                        "path": "/developer/practice/home",
                        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__developer__practice__home' */'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/developer/practice/home'), loading: LoadingComponent}),
                        "exact": true
                      },
                      {
                        "path": "/developer/practice/list",
                        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__developer__practice__list' */'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/developer/practice/list'), loading: LoadingComponent}),
                        "exact": true
                      },
                      {
                        "path": "/developer/practice/questions",
                        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__developer__practice__questions' */'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/developer/practice/questions'), loading: LoadingComponent}),
                        "exact": true
                      }
                    ]
                  }
                ]
              },
              {
                "path": "/developer/test",
                "name": "Test",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__developer__test__test' */'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/developer/test/test.jsx'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/404'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/404'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      },
      {
        "path": "/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__GuestLayout' */'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/layouts/GuestLayout'), loading: LoadingComponent}),
        "routes": [
          {
            "path": "/",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__guest__index' */'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/guest/index'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      }
    ]
  },
  {
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'D:/University/DATN/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV/frontend/src/pages/404'), loading: LoadingComponent}),
    "exact": true
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
