import {
  Button,
  ButtonGroup,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react';
import { FaPenToSquare, FaTrash } from 'react-icons/fa6';
import { dumps_colors } from '@dumps/theme/color';

interface ActionButtonsProps {
  row: any;
  onEdit: (row: any) => void;
  onDelete: (row: any) => void;
}

export const ActionButtons = ({
  row,
  onEdit,
  onDelete,
}: ActionButtonsProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = () => {
    onDelete(row);
    onClose();
  };

  return (
    <ButtonGroup justifyContent={'center'}>
      <IconButton
        variant={'ghost'}
        color={dumps_colors.primary['500']}
        aria-label="edit"
        onClick={() => {
          onEdit(row);
        }}
      >
        <FaPenToSquare />
      </IconButton>
      <Popover isOpen={isOpen} onClose={onClose}>
        <PopoverTrigger>
          <IconButton
            variant={'ghost'}
            color={dumps_colors.danger}
            aria-label="delete"
            onClick={onOpen}
          >
            <FaTrash />
          </IconButton>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader
            fontWeight="bold"
            fontSize={16}
            color={dumps_colors.danger}
          >
            Delete!
          </PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>Are you sure you want to continue?</PopoverBody>
          <PopoverFooter display="flex" justifyContent="flex-end">
            <ButtonGroup size="sm">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button background={dumps_colors.danger} onClick={handleDelete}>
                Delete
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </ButtonGroup>
  );
};
