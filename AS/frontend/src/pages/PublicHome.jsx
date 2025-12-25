import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Button,
  Image,
  Badge,
  Flex,
  Center,
  HStack,
  Spinner,
} from '@chakra-ui/react';
import PublicLayout from '../components/PublicLayout';
import api, { BACKEND_URL } from '../lib/api';
import InquiryModal from '../components/InquiryModal';

const ProductCard = ({ item, onInquire, navigate }) => (
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
    className="p-card" // Add class for mockup CSS if needed
  >
    <Box h="200px" bg="gray.900" pos="relative" overflow="hidden" className="p-media">
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
    <Box p={5} className="p-body">
       <Flex justify="space-between" align="center" mb={2}>
          <Badge variant="outline" colorScheme={item.condition === 'New' ? 'green' : 'blue'} fontSize="xs">
            {item.condition}
          </Badge>
          <Text fontSize="xs" color="gray.500">{item.location}</Text>
       </Flex>
       <Heading size="md" mb={2} color="white" isTruncated className="p-title">{item.title}</Heading>
       <Text color="gray.400" fontSize="sm" noOfLines={2} mb={4} className="p-desc">{item.description}</Text>
       <Flex justify="space-between" align="center" className="p-meta">
          <Text fontSize="xl" fontWeight="bold" color="white" className="price">
            ${parseFloat(item.price).toLocaleString()}
          </Text>
          <HStack spacing={2} className="p-actions">
            <Button 
                size="sm" 
                colorScheme="teal" 
                variant="solid" 
                onClick={(e) => { e.stopPropagation(); onInquire(item); }}
            >
                Inquire
            </Button>
            <Button 
                size="sm" 
                variant="ghost" 
                colorScheme="whiteAlpha"
            >
                Details
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
  
  const navigate = useNavigate();

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

  const filteredItems = items.filter(item => {
    const titleMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const mfgMatch = item.manufacturer?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSearch = titleMatch || mfgMatch;
    
    const matchesCategory = activeFilter === 'all' || item.type.toLowerCase().includes(activeFilter.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <PublicLayout>
      {/* HERO SECTION */}
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

      {/* PRODUCT CATALOG */}
      <section id="shop" className="container">
        <h2 className="section-title">Equipment Catalog</h2>

        <div className="filterbar" aria-label="Filters">
          <div className="chips" id="chipRow">
            <button className={`chip ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>All</button>
            <button className={`chip ${activeFilter === 'audiometer' ? 'active' : ''}`} onClick={() => setActiveFilter('audiometer')}>Audiometers</button>
            <button className={`chip ${activeFilter === 'tympanometer' ? 'active' : ''}`} onClick={() => setActiveFilter('tympanometer')}>Tympanometers</button>
            <button className={`chip ${activeFilter === 'booth' ? 'active' : ''}`} onClick={() => setActiveFilter('booth')}>Sound Booths</button>
            <button className={`chip ${activeFilter === 'accessories' ? 'active' : ''}`} onClick={() => setActiveFilter('accessories')}>Accessories</button>
          </div>
          <div className="search">
            <input 
              type="text" 
              id="searchInput" 
              placeholder="Search products…" 
              aria-label="Search products" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid products" id="productGrid" aria-live="polite">
          {loading && <Center py={20}><Spinner size="xl" color="brand.500" /></Center>}
          
          {!loading && filteredItems.map(item => (
             <ProductCard 
                key={item.id} 
                item={item} 
                onInquire={handleInquire} 
                navigate={navigate} 
             />
          ))}
        </div>
      </section>

      {/* TUTORIALS */}
      <section id="tutorials" className="container">
        <h2 className="section-title">Tutorials & Training</h2>
        <p className="muted">Product walkthroughs, calibration guidance, and quick-start videos.</p>
        <div className="tutorials-embed" aria-label="YouTube playlist">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/dULlte-boXA?si=ZqhJU7tVxj-sKLYp" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> 
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="container">
        <h2 className="section-title">About Audical Services</h2>
        <p className="muted">We calibrate hearing testing equipment, sell clinical systems, and support clinic relocations and sound booth installs worldwide.</p>
      </section>

      {/* CONTACT */}
      <section id="contact" className="container">
        <h2 className="section-title">Contact</h2>
        <div className="card">
          <p><strong>Website:</strong> <a href="https://audicalservices.com" target="_blank" rel="noopener noreferrer">audicalservices.com</a></p>
          <p><strong>Email:</strong> contact@audicalservices.com</p>
          <p><strong>Phone:</strong> +1 (555) 123-4567</p>
          <p className="note">Contact us for pricing, shipping quotes, and technical support.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <p>© {new Date().getFullYear()} Audical Services. Professional hearing equipment supplier.</p>
        </div>
      </footer>

      {/* INQUIRY MODAL */}
      <InquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        equipment={selectedItem} 
      />
    </PublicLayout>
  );
};

export default PublicHome;