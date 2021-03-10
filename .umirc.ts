import { defineConfig } from 'umi';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  title: '卫宁简医',
  layout: false,
  routes: [
    {
      path: '/login',
      component: '@/pages/login/login',
      title: '登录',
    },
    {
      path: '/404',
      component: '@/pages/404/404',
      title: '404',
    },
    {
      path: '/',
      component: '@/layouts/index',
      // redirect: '/home',
      routes: [
        {
          path: '/home',
          component: '@/pages/index',
        },
        {
          name: '自定义列表',
          path: '/list',
          component: '@/pages/list/index',
        },
      ],
    },
  ],
  fastRefresh: {},
  dynamicImport: {
    loading: '@/components/Loading',
  },
  antd: {},
  dva: {
    immer: true,
  },
  headScripts: [
    // { src: './public/config/index.js' },
    {
      src: 'https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js',
    },
    {
      content: `if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
      }, false);
    }
    if(!window.Promise) {
      document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"'+'>'+'<'+'/'+'script>');
    }`,
    },
  ],
  metas: [
    {
      name: 'viewport',
      content:
        'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no',
    },
  ],
});
