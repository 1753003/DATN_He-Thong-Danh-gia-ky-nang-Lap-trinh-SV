export default [
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
                routes: [
                  {
                    path: '/creator/tests',
                    redirect: '/creator/tests/home',
                  },
                  {
                    path: '/creator/tests/home',
                    name: 'Test Home',
                    icon: 'home',
                    hideInMenu: true,
                    component: './Creator/Tests',
                  },
                  {
                    path: '/creator/tests/testDetail',
                    name: 'Test Detail',
                    icon: 'home',
                    hideInMenu: true,
                    component: './Creator/TestDetail',
                  },
                  {
                    path: '/creator/tests/createTest',
                    name: 'Create Test',
                    icon: 'home',
                    hideInMenu: true,
                    component: './Creator/CreateTest',
                  },
                  {
                    path: '/creator/tests/editTest',
                    name: 'Edit Test',
                    icon: 'home',
                    hideInMenu: true,
                    component: './Creator/CreateTest',
                  },
                  {
                    path: '/creator/tests/collectionDetail',
                    name: 'Collection Detail',
                    icon: 'home',
                    hideInMenu: true,
                    component: './Creator/CollectionDetail',
                  },
                ],
              },
              {
                path: '/creator/report',
                name: 'Report',
                icon: 'PicLeftOutlined',
                routes: [
                  {
                    path: '/creator/report',
                    redirect: '/creator/report/home',
                  },
                  {
                    path: '/creator/report/home',
                    name: 'Report',
                    icon: 'PicLeftOutlined',
                    hideInMenu: true,
                    component: './Creator/Report',
                  },
                  {
                    path: '/creator/report/detail',
                    name: 'Report Detail',
                    hideInMenu: true,
                    icon: 'PicLeftOutlined',
                    component: './Creator/ReportDetail',
                  },
                  {
                    path: '/creator/report/user',
                    name: 'User Report',
                    hideInMenu: true,
                    icon: 'PicLeftOutlined',
                    component: './Creator/UserReport',
                  },
                  {
                    path: '/creator/report/user/compareCode',
                    name: 'Code Compare',
                    icon: 'PicLeftOutlined',
                    hideInMenu: true,
                    component: './Creator/CodeCompare',
                  },
                ],
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
                        path: '/developer/test/rank',
                        component: './developer/test/ranking/index',
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
                path: '/developer/profile/review',
                component: './account/center/testAnswer'
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
]