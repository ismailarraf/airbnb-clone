import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

export default function PlacePage() {
  // Get the 'id' parameter from the URL using useParams hook
  const { id } = useParams();
  
  // State variables for place data, loading state, and error handling
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch place data from the server when the component mounts or 'id' changes
  useEffect(() => {
    // If 'id' is not available, return early
    if (!id) return;

    // Fetch place data from the server
    axios
      .get(`/places/${id}`)
      .then(response => {
        // Update 'place' state with the fetched data
        setPlace(response.data);
        // Set loading state to false
        setLoading(false);
      })
      .catch(error => {
        // Set error state if the request fails
        setError("Failed to fetch place data.");
        // Set loading state to false
        setLoading(false);
      });
  }, [id]);

  // Render loading indicator while data is being fetched
  if (loading) return <div>Loading...</div>;
  // Render error message if there is an error
  if (error) return <div>Error: {error}</div>;
  // Render nothing if place data is not available yet
  if (!place) return null;

  // Render the PlacePage component with fetched place data
  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      {/* Render place title */}
      <h1 className="text-3xl">{place.title}</h1>
      {/* Render address link */}
      <AddressLink>{place.address}</AddressLink>
      {/* Render place image gallery */}
      <PlaceGallery place={place} />
      {/* Render place details and booking widget */}
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            {/* Render place description */}
            <h2 className="font-semibold text-2xl">Description</h2>
            <p>{place.description}</p>
          </div>
          {/* Render check-in, check-out, and max guests information */}
          <p>Check-in: {place.checkIn}</p>
          <p>Check-out: {place.checkOut}</p>
          <p>Max number of guests: {place.maxGuests}</p>
        </div>
        {/* Render booking widget */}
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      {/* Render extra information about the place */}
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Extra info</h2>
        </div>
        {/* Render extra information text */}
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
}
