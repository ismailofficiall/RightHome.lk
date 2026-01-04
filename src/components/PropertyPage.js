import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

function PropertyPage({ properties, addToFavourites }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.find((p) => p.id === id);

  // Fallback to picture if images array is empty or undefined
  const [mainImage, setMainImage] = useState(property?.images?.[0] || property?.picture);
  const [activeTab, setActiveTab] = useState("description");

  if (!property) return <p>Property not found</p>;

  return (
    <div className="property-page container" style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
        <button onClick={() => navigate(-1)} className="back-btn" style={{ marginBottom: "15px" }}>← Back to Search</button>
        
        <div className="prop-header" style={{ marginBottom: "20px" }}>
            <h1>{property.location}</h1>
            <h2 className="price" style={{ color: "#4FBDBA" }}>Rs. {property.price.toLocaleString()}</h2>
            <button 
              onClick={() => addToFavourites(property)} 
              className="fav-action-btn"
              style={{ padding: "10px 20px", background: "#4FBDBA", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
            >
              ❤️ Save Property
            </button>
        </div>

        <div className="gallery-section">
            <img 
              src={mainImage} 
              alt="Main" 
              className="main-image" 
              style={{ width: "100%", maxHeight: "400px", objectFit: "cover", borderRadius: "10px" }}
            />
            <div className="thumbnails" style={{ display: "flex", gap: "10px", marginTop: "10px", overflowX: "auto" }}>
                {property.images && property.images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`thumb-${index}`}
                        onClick={() => setMainImage(img)}
                        style={{ 
                          width: "80px", 
                          height: "60px", 
                          objectFit: "cover", 
                          cursor: "pointer", 
                          border: mainImage === img ? "2px solid #4FBDBA" : "1px solid #ccc",
                          borderRadius: "5px"
                        }}
                    />
                ))}
            </div>
        </div>

        <div className="tabs-container" style={{ marginTop: "30px" }}>
            <div className="tab-headers" style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
                {["description", "floorplan", "map"].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: "10px 20px",
                      background: activeTab === tab ? "#4FBDBA" : "#eee",
                      color: activeTab === tab ? "white" : "#333",
                      border: "none",
                      borderRadius: "5px",
                      textTransform: "capitalize",
                      cursor: "pointer"
                    }}
                  >
                    {tab === "map" ? "Map" : tab}
                  </button>
                ))}
            </div>

            <div className="tab-content" style={{ padding: "20px", background: "#fff", borderRadius: "10px", border: "1px solid #eee" }}>
                {activeTab === "description" && (
                    <div className="desc-content">
                        <p>{property.description}</p>
                        <ul style={{ lineHeight: "1.6" }}>
                            <li><strong>Type:</strong> {property.type}</li>
                            <li><strong>Bedrooms:</strong> {property.bedrooms}</li>
                            <li><strong>Tenure:</strong> {property.tenure}</li>
                            <li><strong>Location:</strong> {property.location}</li>
                            {property.added && (
                              <li><strong>Date Added:</strong> {property.added.day} {property.added.month} {property.added.year}</li>
                            )}
                        </ul>
                    </div>
                )}

                {activeTab === "floorplan" && (
                    <img 
                      src={property.floorplan || "https://via.placeholder.com/600x400?text=No+Floorplan+Available"} 
                      alt="Floorplan" 
                      style={{ width: "100%", maxWidth: "600px" }}
                    />
                )}

                {activeTab === "map" && (
                    <div style={{ height: "400px", width: "100%", background: "#eee", borderRadius: "10px", overflow: "hidden" }}>
                        {/* UPDATED: GOOGLE MAPS IFRAME USING JSON DATA */}
                        <iframe
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            style={{ border: 0 }}
                            src={property.map} 
                            allowFullScreen
                            title="Google Map"
                        >
                        </iframe>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}

export default PropertyPage;