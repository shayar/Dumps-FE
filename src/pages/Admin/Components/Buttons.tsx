import { Button, Flex } from '@chakra-ui/react';

function ButtonGroup() {
  // Add this as a children in the sidebar of component
  return (
    <Flex direction="column" gap={4}>
      <Button>Primary</Button>
      <Button isDisabled>Primary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="outline" isDisabled>
        Outline
      </Button>
    </Flex>
  );
}

export default ButtonGroup;
