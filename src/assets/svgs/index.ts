/* While naming the svg,
 Avoid adding Icon at the end while providing filename and
 add Icon at the end while renaming it as a ReactIcon
 This will let the fellow programer easily identify Icons while using them in some components

 Whereas naming file as shown in example below
 eg: export { ReactComponent as DashboardIcon } from './dashboardIcon.svg'; 
 where filename also has a trailing Icon at the end of its name
 is not considered a good approach due to its redundancy and less readability
*/
export { ReactComponent as DashboardIcon } from './dashboard.svg';
export { ReactComponent as LogoutIcon } from './logout.svg';
export { ReactComponent as RightArrowIcon } from './rightArrow.svg';
export { ReactComponent as LoginIcon } from './sikaaiLogin.svg';
export { ReactComponent as NotificationIcon } from './notification.svg';
