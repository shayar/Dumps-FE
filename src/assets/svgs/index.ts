/* While naming the svg,
 Avoid adding Icon at the end while providing filename and
 add Icon at the end while renaming it as a ReactIcon
 This will let the fellow programer easily identify Icons while using them in some components

 Whereas naming file as shown in example below
 eg: export { ReactComponent as DashboardIcon } from './dashboardIcon.svg'; 
 where filename also has a trailing Icon at the end of its name
 is not considered a good approach due to its redundancy and less readability
*/
import DashboardIcon from './dashboard.svg?react';
import LogoutIcon from './logout.svg?react';
import RightArrowIcon from './rightArrow.svg?react';
import LoginIcon from './sikaaiLogin.svg?react';
import NotificationIcon from './notification.svg?react';
import DumpIcon from './dump.svg?react';
import BundleIcon from './bundle.svg?react';
export {
  DashboardIcon,
  LoginIcon,
  LogoutIcon,
  RightArrowIcon,
  NotificationIcon,
  DumpIcon,
  BundleIcon,
};
