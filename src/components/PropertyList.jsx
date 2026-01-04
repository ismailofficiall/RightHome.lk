import { useDrag } from "react-dnd";
import { Link } from "react-router-dom";

function PropertyCard({ property, addToFavourites }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "PROPERTY",
    item: property,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "15px",
        marginBottom: "15px",
        cursor: "grab",
        backgroundColor: "#fff",
        boxShadow: "0 3px 6px rgba(0,0,0,0.05)",
        transition: "transform 0.2s",
      }}
    >
      <Link
        to={`/property/${property.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <img
          src={property.images?.[0] || property.picture}
          alt={property.type}
          style={{
            width: "100%",
            borderRadius: "10px",
            marginBottom: "10px",
          }}
        />
        <h3 style={{ margin: "5px 0" }}>
          {property.type} - Rs. {property.price.toLocaleString()}
        </h3>
        <p style={{ margin: "2px 0" }}>
          <strong>Bedrooms:</strong> {property.bedrooms}
        </p>
        <p style={{ margin: "2px 0" }}>
          <strong>Location:</strong> {property.location}
        </p>
      </Link>

      <button
        onClick={() => addToFavourites(property)}
        style={{ marginTop: "10px", width: "100%" }}
      >
        ❤️ Add to Favourites
      </button>
    </div>
  );
}

function PropertyList({ properties, addToFavourites }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
      }}
    >
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          addToFavourites={addToFavourites}
        />
      ))}
    </div>
  );
}

export default PropertyList;
