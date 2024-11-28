/* eslint-disable react/require-default-props */
/* eslint-disable no-param-reassign */
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ListItem, Link, Text, Icon } from '@chakra-ui/react';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { RightArrowIcon } from '@dumps/assets/svgs';

function Item({
  name,
  to,
  ComponentIcon,
  isCollapsed,
  showDropdown,
  setShowDropdown,
  activeParent,
  active,
  isChild,
  children,
}: {
  name: string;
  to: string;
  ComponentIcon: React.FC<React.SVGProps<SVGSVGElement>>;
  isCollapsed?: boolean;

  showDropdown?: boolean;
  setShowDropdown?: Dispatch<SetStateAction<boolean | undefined>>;

  activeParent?: boolean;
  active: boolean;
  isChild?: boolean;
  children?: ReactNode;
}) {
  const { t } = useTranslation();

  if (window.location.pathname === to) active = true;

  // The navItem should be active when,
  // 1. active: the path in the url matches the url of the navItem
  // 2. showDropdown: it is the child which is clicked when the parent navItem is in onOpen state
  // 3. activeParent: it is the parent of the navItem with active children
  const activeTab = active || showDropdown || activeParent;

  const getBgColor = () => {
    if (activeParent || showDropdown) {
      return 'primary.400';
    }
    if (active) {
      return 'primary.500';
    }
    return '';
  };

  return (
    <>
      <Link
        as={RouterLink}
        to={to}
        color="white"
        // there is a default textDecoration, to remove it ⬇️
        sx={{
          '&:hover': {
            textDecoration: 'none',
          },
        }}
      >
        <ListItem
          display="flex"
          alignItems="center"
          gap={isCollapsed ? 1 : 2}
          mr={4}
          ml={{
            base: isChild ? 4 : 2,
            md: isChild ? 4 : 2,
          }}
          mb={3}
          p={2}
          borderRadius="md"
          bgColor={getBgColor()}
          color={activeTab ? 'white' : 'gray.500'}
          transition="all ease-in-out"
          sx={{
            '&:hover': {
              bgColor: 'primary.300',
              color: 'white',
              'svg path': {
                stroke: name !== 'Logout' ? 'white' : '',
              },
            },
          }}
          onClick={() => !!setShowDropdown && setShowDropdown((prev) => !prev)}
          fontSize="md"
          fontWeight="semibold"
        >
          <ComponentIcon strokeWidth={0} width={30} height={30} />
          {!isCollapsed && <Text whiteSpace="nowrap">{t(name)}</Text>}

          {!!children && (
            <Icon
              as={RightArrowIcon}
              transform={showDropdown ? 'rotate(90deg)' : ''}
              sx={{
                path: {
                  stroke: activeTab ? 'white' : '',
                },
              }}
            />
          )}
        </ListItem>
      </Link>
      {children}
    </>
  );
}

export default Item;
