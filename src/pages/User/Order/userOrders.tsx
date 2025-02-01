import { Badge, Table, Tbody, Td, Text, Th, Thead, Tr, VStack } from '@chakra-ui/react';

export default function UserOrders() {
  return (
    <VStack align="stretch" spacing={6}>
      <Text fontSize="xl" fontWeight="medium">
        Recent Orders
      </Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Order ID</Th>
            <Th>Date</Th>
            <Th>Amount</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {[
            { id: '#1234', date: '2024-01-01', amount: '$99.99', status: 'Delivered' },
            { id: '#1235', date: '2024-01-15', amount: '$149.99', status: 'Processing' },
            { id: '#1236', date: '2024-01-28', amount: '$79.99', status: 'Pending' },
          ].map((order) => (
            <Tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>{order.date}</Td>
              <Td>{order.amount}</Td>
              <Td>
                <Badge
                  colorScheme={
                    // eslint-disable-next-line no-nested-ternary
                    order.status === 'Delivered'
                      ? 'green'
                      : order.status === 'Processing'
                        ? 'blue'
                        : 'yellow'
                  }
                >
                  {order.status}
                </Badge>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </VStack>
  );
}
