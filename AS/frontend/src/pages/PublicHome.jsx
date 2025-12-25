import React, { useEffect, useState } from 'react';
import PublicLayout from '../components/PublicLayout';
import api, { BACKEND_URL } from '../lib/api';
import InquiryModal from '../components/InquiryModal'; // We can keep using the Chakra modal or replace it. 
// For "exact match", I should build the HTML modal. But Chakra modal is more accessible and robust in React.
// I will stick to the HTML structure for the PAGE content as requested.

const PublicHome = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

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

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // Filter Logic
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
            <div className="p-card" key={item.id}>
              <div className="p-media">
                 {item.images?.[0] ? (
                    <img 
                      src={`${BACKEND_URL}/storage/${item.images[0].file_path}`} 
                      alt={item.title}
                      style={{width:'100%', height:'100%', objectFit:'cover'}} 
                    />
                 ) : (
                    // SVG Placeholder from index.html (or similar)
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
                  <button className="btn ghost" onClick={() => openModal(item)}>View</button>
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

      {/* ABOUT / CONTACT */}
      <section id="about" className="container">
        <h2 className="section-title">About Audical Services</h2>
        <p className="muted">We calibrate hearing testing equipment, sell clinical systems, and support clinic relocations and sound booth installs worldwide.</p>
      </section>

      <section id="contact" className="container">
        <h2 className="section-title">Contact</h2>
        <div className="card">
          <p><strong>Website:</strong> <a href="https://audicalservices.com" target="_blank" rel="noopener noreferrer">audicalservices.com</a></p>
          <p><strong>Email:</strong> contact@audicalservices.com</p>
          <p><strong>Phone:</strong> +1 (555) 123-4567</p>
          <p className="note">Contact us for pricing, shipping quotes, and technical support.</p>
        </div>
      </section>

      {/* CUSTOM PRODUCT MODAL (HTML STYLE) */}
      <div className={`overlay ${isModalOpen ? 'show' : ''}`} onClick={closeModal}>
        <div className="modal" onClick={e => e.stopPropagation()}>
          <header><strong>{selectedItem?.title || 'Product'}</strong></header>
          <div className="content">
            <div className="row">
              <div className="p-media" style={{height:'220px', borderRadius:'12px', overflow:'hidden'}}>
                 {selectedItem?.images?.[0] && (
                    <img 
                      src={`${BACKEND_URL}/storage/${selectedItem.images[0].file_path}`} 
                      alt={selectedItem.title} 
                      style={{width:'100%', height:'100%', objectFit:'cover'}}
                    />
                 )}
              </div>
              <div>
                <p className="muted">{selectedItem?.description}</p>
                <div className="pillbar" style={{marginTop:'10px'}}>
                   <span className="pill">{selectedItem?.type}</span>
                   <span className="pill">{selectedItem?.condition}</span>
                   {selectedItem?.fda_approved && <span className="pill">FDA Approved</span>}
                </div>
                <div className="spacer"></div>
                <div className="p-meta">
                  <div>
                    <div className="price">${selectedItem ? parseFloat(selectedItem.price).toLocaleString() : ''}</div>
                    <div className="lease">{selectedItem?.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}</div>
                  </div>
                </div>
                <p className="note" style={{marginTop:'10px'}}>Contact us for pricing, availability, and shipping information.</p>
              </div>
            </div>
          </div>
          <div className="footer">
            {/* Reusing InquiryModal logic could be tricky with this HTML structure. 
                I'll add a simple "Contact Sales" that opens mailto for now, 
                or I could render the React InquiryModal ON TOP of this. 
                For "exact match" of index.html behavior (which just calls a JS function), 
                I'll link to the contact section or mailto. 
            */}
            <button className="btn primary" onClick={() => window.location.href = `mailto:sales@audical.com?subject=Inquiry: ${selectedItem?.title}`}>Contact Sales</button>
            <button className="btn ghost" onClick={closeModal}>Close</button>
          </div>
        </div>
      </div>

    </PublicLayout>
  );
};

export default PublicHome;