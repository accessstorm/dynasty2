import { Container, Text, Title, Group, Box, ThemeIcon, Image, Flex } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconDiamond, IconFileDescription, IconGlobe, IconHistory } from '@tabler/icons-react';

const HomeWhyChooseUs = () => {
  const features = [
    {
      id: 1,
      title: 'Exquisite Craftsmanship',
      description: 'Each piece is meticulously handcrafted with precision and attention to detail, resulting in accessories of unparalleled quality and elegance.',
      icon: IconDiamond,
      color: '#fff'
    },
    {
      id: 2,
      title: 'Global-Grade Quality',
      description: 'We source only the finest materials and maintain rigorous quality standards that meet international benchmarks for luxury fashion accessories.',
      icon: IconGlobe,
      color: '#fff'
    },
    {
      id: 3,
      title: '30+ Years of Expertise',
      description: 'Built on a foundation of three decades of experience in the industry, our heritage of excellence informs every product we create.',
      icon: IconHistory,
      color: '#fff'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <Box className="bg-black py-24 border-t border-gray-800">
      <Container size="xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Title order={2} className="text-3xl font-serif mb-4 text-white">Why Choose Dynasty?</Title>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <Group grow align="stretch">
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                className="flex flex-col items-center text-center p-8"
              >
                <feature.icon size={45} stroke={1.5} color="#fff" className="mb-6" />
                <Title order={3} className="text-xl font-serif mb-3 text-white">
                  {feature.title}
                </Title>
                <Text className="text-gray-300 leading-relaxed text-sm">
                  {feature.description}
                </Text>
              </motion.div>
            ))}
          </Group>
        </motion.div>
      </Container>
    </Box>
  );
};

export default HomeWhyChooseUs; 