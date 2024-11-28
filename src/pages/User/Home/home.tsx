import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  HStack,
  Icon,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { NAVIGATION_ROUTES } from '@dumps/routes/routes.constant';
import { dumps_colors } from '@dumps/theme/color';
import { IconType } from 'react-icons';
import { FaCircleArrowRight } from 'react-icons/fa6';
import { FiAward, FiPackage, FiBook, FiShield, FiClock, FiUsers } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Home() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const sectionBg = useColorModeValue('white', 'gray.800');

  const Feature = ({ icon, title, text }: { icon: IconType; title: string; text: string }) => {
    return (
      <VStack
        p={8}
        bg={useColorModeValue('white', 'gray.800')}
        borderRadius="lg"
        boxShadow="base"
        align="center"
        spacing={4}
      >
        <Icon as={icon} w={10} h={10} color="blue.500" />
        <Heading size="md">{title}</Heading>
        <Text color={useColorModeValue('gray.600', 'gray.400')} textAlign="center">
          {text}
        </Text>
      </VStack>
    );
  };

  const TrustIndicator = ({
    icon,
    title,
    text,
  }: {
    icon: IconType;
    title: string;
    text: string;
  }) => {
    return (
      <VStack spacing={4} align="center">
        <Icon as={icon} w={12} h={12} color="green.500" />
        <Heading size="md">{title}</Heading>
        <Text color={useColorModeValue('gray.600', 'gray.400')} textAlign="center">
          {text}
        </Text>
      </VStack>
    );
  };

  return (
    <Box minH="100vh" bg={bgColor}>
      {/* Hero Section */}
      <Box bg={sectionBg} py={20}>
        <Container maxW="6xl">
          <VStack spacing={6} textAlign="center">
            <Heading
              as="h1"
              size="2xl"
              fontWeight="bold"
              color={useColorModeValue('gray.900', 'white')}
            >
              Ace Your Certification Exams with Confidence
            </Heading>
            <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.400')} maxW="2xl">
              Comprehensive study materials and exam preparations bundled for your success. Choose
              from our curated collection of certification exam PDFs.
            </Text>
            <HStack spacing={4}>
              <Link to={NAVIGATION_ROUTES.PRODUCTS}>
                <Button size="lg" rightIcon={<FaCircleArrowRight />}>
                  Browse Certifications
                </Button>
              </Link>
              <Link to={NAVIGATION_ROUTES.BUNDLES}>
                <Button
                  size="lg"
                  bg={dumps_colors.secondary.default}
                  _hover={{ bg: dumps_colors.secondary[400] }}
                  rightIcon={<FaCircleArrowRight />}
                >
                  Browse Bundles
                </Button>
              </Link>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Features Grid */}
      <Box py={16}>
        <Container maxW="6xl">
          <VStack spacing={12}>
            <Heading textAlign="center" size="xl" color={useColorModeValue('gray.900', 'white')}>
              Why Choose Our Materials
            </Heading>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={8} width="full">
              <Feature
                icon={FiAward}
                title="Verified Content"
                text="All materials are thoroughly vetted and updated to match the latest exam patterns"
              />
              <Feature
                icon={FiPackage}
                title="Smart Bundles"
                text="Save with our carefully curated exam bundles designed for comprehensive preparation"
              />
              <Feature
                icon={FiBook}
                title="Practice Ready"
                text="Includes practice questions and detailed explanations for better understanding"
              />
            </Grid>
          </VStack>
        </Container>
      </Box>

      {/* Trust Indicators */}
      <Box bg={sectionBg} py={16}>
        <Container maxW="6xl">
          <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={8}>
            <TrustIndicator
              icon={FiShield}
              title="100% Secure"
              text="Instant secure delivery of your PDFs"
            />
            <TrustIndicator
              icon={FiClock}
              title="Latest Content"
              text="Regular updates to match current exams"
            />
            <TrustIndicator
              icon={FiUsers}
              title="Community Trusted"
              text="Join thousands of successful candidates"
            />
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box bg="blue.600" color="white" py={16}>
        <Container maxW="4xl">
          <VStack spacing={8} textAlign="center">
            <Heading size="xl">Ready to Start Your Certification Journey?</Heading>
            <Text fontSize="xl">
              Explore our comprehensive collection of exam materials and take the first step toward
              your next certification.
            </Text>
            <Button
              size="lg"
              colorScheme="whiteAlpha"
              bg="white"
              color="blue.600"
              _hover={{ bg: 'gray.100' }}
            >
              View All Certifications
            </Button>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}
