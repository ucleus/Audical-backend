import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Container,
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Image,
  Badge,
  Flex,
  Spinner,
  Center,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { FiSearch, FiShoppingCart } from 'react-icons/fi';
import PublicLayout from '../components/PublicLayout';
import api, { BACKEND_URL } from '../lib/api';
import InquiryModal from '../components/InquiryModal';
import { useCart } from '../context/CartContext';

const ProductCard = ({ item, onInquire, navigate, onAddToCart }) => (
  <Box 
    bg="bg.800" 
    borderRadius="xl" 
    overflow="hidden" 
    border="1px" 
    borderColor="gray.800"
    transition="all 0.2s"
    cursor="pointer"
    onClick={() => navigate(`/product/${item.id}`)}
    _hover={{ transform: 'translateY(-4px)', shadow: 'xl', borderColor: 'brand.500' }}
  >
    <Box h="200px" bg="gray.900" pos="relative" overflow="hidden">
       {item.images?.[0] ? (
          <Image 
            src={`${BACKEND_URL}/storage/${item.images[0].file_path}`} 
            w="100%" 
            h="100%" 
            objectFit="cover" 
          />
       ) : (
          <Center h="100%" color="gray.600">No Image</Center>
       )}
       <Badge pos="absolute" top={3} left={3} colorScheme="teal">{item.type}</Badge>
    </Box>
    <Box p={5}>
       <Flex justify="space-between" align="center" mb={2}>
          <Badge variant="outline" colorScheme={item.condition === 'New' ? 'green' : 'blue'} fontSize="xs">
            {item.condition}
          </Badge>
          <Text fontSize="xs" color="gray.500">{item.location}</Text>
       </Flex>
       <Heading size="md" mb={2} color="white" isTruncated>{item.title}</Heading>
       <Text color="gray.400" fontSize="sm" noOfLines={2} mb={4}>{item.description}</Text>
       <Flex justify="space-between" align="center" mt="auto">
          <Text fontSize="xl" fontWeight="bold" color="white">
            ${parseFloat(item.price).toLocaleString()}
          </Text>
          <HStack spacing={2}>
            <Button 
                size="sm" 
                colorScheme="teal" 
                variant="solid" 
                leftIcon={<FiShoppingCart />}
                onClick={(e) => { e.stopPropagation(); onAddToCart(item); }}
            >
                Add
            </Button>
            <Button 
                size="sm" 
                variant="ghost" 
                colorScheme="whiteAlpha"
                onClick={(e) => { e.stopPropagation(); onInquire(item); }}
            >
                Inquire
            </Button>
          </HStack>
       </Flex>
    </Box>
  </Box>
);

const PublicHome = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get('/public/equipment');
        setItems(response.data.data);
      } catch (error) {
        console.error("Failed to load public items");
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleInquire = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    toast({
      title: 'Added to Cart',
      description: `${item.title} added.`,
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top-right'
    });
  };

  const filteredItems = items.filter(item => {
    const titleMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const mfgMatch = item.manufacturer?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSearch = titleMatch || mfgMatch;
    
    const matchesCategory = activeFilter === 'all' || item.type.toLowerCase().includes(activeFilter.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <PublicLayout>
      {/* HERO ... (Skipping full render for brevity in thought, but writing full file below) */}
      <section className="hero" id="home">
        <div className="container">
          <span className="badge">Medical-grade hearing equipment • Global shipping • Professional support</span>
          <div className="grid">
            <div>
              <h2 className="title">Professional Hearing‑Aid Testing Equipment — <span style={{background:'linear-gradient(135deg,var(--primary),var(--primary-2))', WebkitBackgroundClip:'text', backgroundClip:'text', color:'transparent'}}>Available for Purchase</span></h2>
              <p className="subtitle">Audical Services provides calibrated systems, sound booths, and accessories with global shipping. Tutorials hosted on YouTube keep your team trained and compliant.</p>
              <div className="hero-cta">
                <button className="btn primary" onClick={() => document.getElementById('shop').scrollIntoView({behavior:'smooth'})}>Browse Products</button>
                <button className="btn ghost" onClick={() => document.getElementById('contact').scrollIntoView({behavior:'smooth'})}>Contact Sales</button>
              </div>
              <div className="pillbar">
                <span className="pill">Calibrated to national standards</span>
                <span className="pill">Global shipping</span>
                <span className="pill">Professional installation support</span>
                <span className="pill">YouTube tutorials</span>
              </div>
            </div>
            <div>
              <div className="card">
                <h3 style={{marginBottom:'8px'}}>Quick Facts</h3>
                <div className="statbar">
                  <div className="stat"><h3>{items.length}+</h3><p>Products</p></div>
                  <div className="stat"><h3>50+</h3><p>Countries</p></div>
                  <div className="stat"><h3>24/7</h3><p>Support</p></div>
                  <div className="stat"><h3>100%</h3><p>Calibrated</p></div>
                </div>
                <p className="callout">Complete equipment catalog - contact us for pricing and shipping quotes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Box py={16} id="shop">
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center" mb={8} direction={{base: 'column', md: 'row'}} gap={4}>
            <Heading size="xl" color="white">Equipment Catalog</Heading>
            <HStack spacing={2} overflowX="auto" pb={{base: 2, md: 0}} maxW="full">
                {['all', 'Audiometer', 'Tympanometer', 'Booth'].map(cat => (
                    <Button key={cat} size="sm" variant={activeFilter === cat ? 'solid' : 'outline'} colorScheme="teal" onClick={() => setActiveFilter(cat)}>{cat}</Button>
                ))}
            </HStack>
          </Flex>

          {loading ? (
             <Center py={20}><Spinner size="xl" color="brand.500" /></Center>
          ) : (
             <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
                {filteredItems.map(item => (
                   <ProductCard 
                        key={item.id} 
                        item={item} 
                        onInquire={handleInquire} 
                        navigate={navigate} 
                        onAddToCart={handleAddToCart}
                    />
                ))}
             </SimpleGrid>
          )}
        </Container>
      </Box>

      <section id="tutorials" className="container">
        <h2 className="section-title">Tutorials & Training</h2>
        <div className="tutorials-embed">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/dULlte-boXA?si=ZqhJU7tVxj-sKLYp" title="YouTube video player" frameBorder="0" allowFullScreen></iframe> 
        </div>
      </section>

      <section id="contact" className="container">
        <h2 className="section-title">Contact</h2>
        <div className="card">
          <p><strong>Website:</strong> <a href="https://audicalservices.com" target="_blank" rel="noopener noreferrer">audicalservices.com</a></p>
          <p><strong>Email:</strong> contact@audicalservices.com</p>
          <p><strong>Phone:</strong> +1 (555) 123-4567</p>
        </div>
      </section>

      <footer><div className="container"><p>© {new Date().getFullYear()} Audical Services.</p></div></footer>

      <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} equipment={selectedItem} />
    </PublicLayout>
  );
};

export default PublicHome;
