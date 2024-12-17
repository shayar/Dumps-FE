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
import DUMPS_COLORS from '@dumps/theme/color';

interface ActionButtonsProps {
  row: any; // eslint-disable-line
  onEdit: (row: any) => void; // eslint-disable-line
  onDelete: (row: any) => void; // eslint-disable-line
}

export default function ActionButtons({ row, onEdit, onDelete }: ActionButtonsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = () => {
    onDelete(row);
    onClose();
  };

  return (
    <ButtonGroup justifyContent="center">
      <IconButton
        variant="ghost"
        color={DUMPS_COLORS.primary['500']}
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
            variant="ghost"
            color={DUMPS_COLORS.danger}
            aria-label="delete"
            onClick={onOpen}
          >
            <FaTrash />
          </IconButton>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader fontWeight="bold" fontSize={16} color={DUMPS_COLORS.danger}>
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
              <Button background={DUMPS_COLORS.danger} onClick={handleDelete}>
                Delete
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </ButtonGroup>
  );
}
