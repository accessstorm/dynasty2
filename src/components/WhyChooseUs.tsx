import { Container, Text, Title, Grid, Box, ThemeIcon } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconAward, IconCertificate, IconRulerMeasure } from '@tabler/icons-react';

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      title: 'Exquisite Craftsmanship',
      description: 'Each product is meticulously handcrafted by our skilled artisans, ensuring unparalleled attention to detail and finish.',
      icon: IconRulerMeasure,
      color: '#000'
    },
    {
      id: 2,
      title: 'Global-Grade Quality',
      description: 'We source only the finest materials from around the world, meeting international standards of excellence.',
      icon: IconCertificate,
      color: '#000'
    },
    {
      id: 3,
      title: '30+ Years of Expertise',
      description: 'With over three decades in the industry, our heritage of excellence has been passed down through generations.',
      icon: IconAward,
      color: '#000'
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
    <Box className="bg-gray-50 py-20">
      <Container size="lg">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Title order={2} className="text-3xl font-serif mb-4">Why Choose Us</Title>
          <Text className="text-gray-600 max-w-2xl mx-auto">
            For generations, we have maintained our commitment to excellence and quality craftsmanship
          </Text>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Grid>
            {features.map((feature) => (
              <Grid.Col key={feature.id} span={{ base: 12, md: 4 }}>
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col items-center text-center p-6"
                >
                  <ThemeIcon size={80} radius={40} className="mb-6 bg-white border border-gray-200 text-black">
                    <feature.icon size={40} stroke={1.5} />
                  </ThemeIcon>
                  <Title order={3} className="text-xl font-medium mb-4">
                    {feature.title}
                  </Title>
                  <Text className="text-gray-600">
                    {feature.description}
                  </Text>
                </motion.div>
              </Grid.Col>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default WhyChooseUs; 