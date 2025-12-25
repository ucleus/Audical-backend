import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicLayout from '../components/PublicLayout';
import api, { BACKEND_URL } from '../lib/api';
import InquiryModal from '../components/InquiryModal';

const PublicHome = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Quick inquiry modal state (optional, if clicking "Inquire" button directly)
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

  const openInquiry = (e, item) => {
    e.stopPropagation(); // Prevent card click
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeFilter === 'all' || item.type.toLowerCase().includes(activeFilter);
    return matchesSearch && matchesCategory;
  });

  return (
    <PublicLayout>
      {/* HERO */}
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
          </div>
          <div className="search">
            <input 
              type="text" 
              placeholder="Search products…" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid products" id="productGrid">
          {loading && <p className="muted">Loading inventory...</p>}
          
          {filteredItems.map(item => (
            <div 
                className="p-card" 
                key={item.id} 
                onClick={() => navigate(`/product/${item.id}`)}
                style={{cursor: 'pointer'}}
            >
              <div className="p-media">
                 {item.images?.[0] ? (
                    <img 
                      src={`${BACKEND_URL}/storage/${item.images[0].file_path}`} 
                      alt={item.title}
                      style={{width:'100%', height:'100%', objectFit:'cover'}} 
                    />
                 ) : (
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{color:'var(--muted)'}}><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                 )}
              </div>
              <div className="p-body">
                <div style={{display:'flex', justifyContent:'space-between'}}>
                   <h3 className="p-title">{item.title}</h3>
                   <span className="badge" style={{fontSize:'10px', height:'20px', padding:'2px 6px'}}>{item.condition}</span>
                </div>
                <p className="p-desc">{item.manufacturer} - {item.model_number}</p>
                <div className="p-meta">
                  <div>
                    <div className="price">${parseFloat(item.price).toLocaleString()}</div>
                    <div className="lease">{item.status}</div>
                  </div>
                  <div style={{display:'flex', gap:'8px'}}>
                    <button className="btn primary" style={{fontSize:'12px', padding:'6px 12px'}} onClick={(e) => openInquiry(e, item)}>Inquire</button>
                    <button className="btn ghost" style={{fontSize:'12px', padding:'6px 12px'}}>Details</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TUTORIALS */}
      <section id="tutorials" className="container">
        <h2 className="section-title">Tutorials & Training</h2>
        <p className="muted">Product walkthroughs, calibration guidance, and quick-start videos.</p>
        <div className="tutorials-embed">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/dULlte-boXA?si=ZqhJU7tVxj-sKLYp" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe> 
        </div>
      </section>

      {/* FOOTER etc... */}
      <footer style={{marginTop:'60px', paddingTop:'40px', borderTop:'1px solid var(--line)'}}>
        <div className="container">
          <p className="muted">© {new Date().getFullYear()} Audical Services.</p>
        </div>
      </footer>

      <InquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        equipment={selectedItem} 
      />
    </PublicLayout>
  );
};

export default PublicHome;
