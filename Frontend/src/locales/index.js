import { getLocale, getAllLocales } from 'umi';
var Language;
if (getLocale() === 'vi-VN') Language = {
    'pages_profile_practiceHistory': 'Lịch sử luyện tập'
};
else Language = {
    'pages_profile_practiceHistory': 'Practice History'
};
export default Language;
