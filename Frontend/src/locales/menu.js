//
var Menu_En = {
    Welcome: 'Welcome',
    Practice: 'Practice',
    Test: 'Test'
}
var Menu_Vi = {
    Welcome: 'Xin Chào',
    Practice: 'Luyện tập',
    Test: 'Kiểm tra'
}

export function getMenu (locale) {
    if (locale == 'vi-VN')
        return Menu_Vi
    else if (locale == 'en-US')
        return Menu_En
}
