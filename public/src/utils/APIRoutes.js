export const host = process.env.HOST;

export const loginRoute = `${host}/api/auth/login`;
export const registerRoute = `${host}/api/auth/register`;
export const setAvatarRoute = `${host}/api/auth/setAvatar`;
export const allUsersRoute= `${host}/api/auth/allusers`;
export const logoutRoute = `${host}/api/auth/logout`;
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const recieveMessageRoute = `${host}/api/messages/getmsg`;