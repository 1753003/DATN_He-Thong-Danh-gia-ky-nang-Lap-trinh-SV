import component from './vi-VN/component';
import globalHeader from './vi-VN/globalHeader';
import menu from './vi-VN/menu';
import pwa from './vi-VN/pwa';
import settingDrawer from './vi-VN/settingDrawer';
import settings from './vi-VN/settings';
import pages from './vi-VN/pages';

export default {
  'navBar.lang': 'Ngôn ngữ',
  'layout.user.link.help': 'Giúp đỡ',
  'layout.user.link.privacy': 'Chính sách',
  'layout.user.link.terms': 'Terms',
  'app.preview.down.block': 'Tải về cho dự án cá nhân của bạn',
  'app.welcome.link.fetch-blocks': 'Get all block',
  'app.welcome.link.block-list': 'Quickly build standard, pages based on `block` development',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
  ...pages,
};
