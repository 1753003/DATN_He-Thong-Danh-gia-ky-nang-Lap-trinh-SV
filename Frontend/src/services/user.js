import Constant from '@/utils/constants';
import request from '@/utils/request';
export async function query() {
  return request(`${Constant.API}/api/users`);
}
export async function queryCurrent() {
  return request(`${Constant.API}/api/currentUser`);
}
export async function queryNotices() {
  return null;
}
