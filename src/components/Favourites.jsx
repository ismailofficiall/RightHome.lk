import { useDrop } from "react-dnd";

function Favourites({ favourites, removeFromFavourites, addToFavourites, clearFavourites }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "PROPERTY",
    drop: (item) => addToFavourites(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  
  return (
    <div
      ref={drop}
      className={`favourites-box ${isOver ? "drag-over" : ""}`}
    >
      <div className="fav-header">
        <h2>⭐ Favourites</h2>
        {favourites.length > 0 && (
          <button onClick={clearFavourites} className="clear-btn">
            Clear All
          </button>
        )}
      </div>

      {favourites.length === 0 ? (
        <p className="empty-msg">Drag properties here to save them.</p>
      ) : (
        <div className="fav-list">
          {favourites.map((property) => (
            <div key={property.id} className="fav-item">
              <img 
                src={process.env.PUBLIC_URL + "/" + (property.images?.[0] || property.picture)} 
                alt="thumb" 
              />
              <div>
                <h4>{property.type}</h4>
                <p>Rs. {property.price.toLocaleString()}</p>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeFromFavourites(property.id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favourites;