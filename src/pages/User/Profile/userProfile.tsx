import { Box, Grid, Text, VStack } from '@chakra-ui/react';

export default function UserProfile() {
  return (
    <VStack align="stretch" spacing={6}>
      <Text fontSize="xl" fontWeight="medium">
        Profile Information
      </Text>
      <Grid gap={6}>
        {[
          { label: 'First Name', value: 'Jane Smith' },
          { label: 'Last Name', value: 'Jane Smith' },
          { label: 'Email', value: 'jane@example.com' },
          { label: 'Phone', value: '+1 (555) 123-4567' },
          { label: 'Address', value: '123 Main St, City, State 12345' },
          { label: 'Date Joined', value: 'January 2024' },
        ].map((field) => (
          <Box key={field.label} p={4} borderWidth="1px" borderRadius="md">
            <Text fontSize="sm" color="gray.500">
              {field.label}
            </Text>
            <Text mt={1} fontWeight="medium">
              {field.value}
            </Text>
          </Box>
        ))}
      </Grid>
    </VStack>
  );
}
