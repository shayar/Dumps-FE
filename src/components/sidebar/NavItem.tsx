/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { useLocation } from 'react-router-dom';
import Item from './Item';

function NavItem({ name, to, icon, child, visible, isCollapsed }: INavItem) {
  const location = useLocation();
  const [active, setActive] = useState(false);

  const activeParent = child?.some((item) => item.to === window.location.pathname);
  const [showDropdown, setShowDropdown] = useState(activeParent);

  // For the case you are deep nested into child element and you need to make the parent element in the sidebar to be active
  const match = location.pathname.match(/services/g) || location.pathname.match(/forum/g);

  useEffect(() => {
    setActive(
      (!child && `/admin${to ? `/${to}` : to}` === location.pathname) ||
        `/admin${to ? `/${to}` : to}` === `/${match?.[0]}`
    );
  }, [window.location.pathname]);

  return (
    <>
      {visible &&
        (child ? (
          <Item
            active={active}
            name={name}
            to={to}
            ComponentIcon={icon}
            isCollapsed={isCollapsed}
            // TODO: try to reduce this props
            // by passing child as prop
            activeParent={activeParent}
            setShowDropdown={setShowDropdown}
            showDropdown={showDropdown}
          >
            {showDropdown && (
              <>
                {child.map((c: INavItemChild) => {
                  return (
                    <React.Fragment key={c.name}>
                      {/* TODO: lets check if we can refactor this optional chaining logic */}
                      {c.visible && (
                        <Item
                          active={active}
                          name={c.name}
                          to={c.to}
                          ComponentIcon={c?.icon}
                          isCollapsed={isCollapsed}
                          isChild
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </>
            )}
          </Item>
        ) : (
          <Item
            active={active}
            name={name}
            to={to}
            ComponentIcon={icon}
            isCollapsed={isCollapsed}
          />
        ))}
    </>
  );
}
interface INavItem extends INavItemChild {
  child?: INavItemChild[];
  isCollapsed?: boolean;
}
interface INavItemChild {
  visible: boolean;
  name: string;
  //   TODO: instead of making this string assign this to be amongst the navigation path
  to: string;
  //   TODO: intelligence for svg index suggestion
  icon: IconType;
}
export default NavItem;
