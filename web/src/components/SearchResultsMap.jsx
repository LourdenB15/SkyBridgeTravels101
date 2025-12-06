import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
})

function SearchResultsMap({ hotels }) {
  const defaultCenter = [10.2701, 123.9536]

  const getCenter = () => {
    if (hotels.length === 0) return defaultCenter
    const validHotels = hotels.filter(h => h.latitude && h.longitude)
    if (validHotels.length === 0) return defaultCenter
    const avgLat = validHotels.reduce((sum, h) => sum + h.latitude, 0) / validHotels.length
    const avgLng = validHotels.reduce((sum, h) => sum + h.longitude, 0) / validHotels.length
    return [avgLat, avgLng]
  }

  return (
    <MapContainer
      center={getCenter()}
      zoom={13}
      scrollWheelZoom={true}
      className="h-full w-full rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {hotels.map((hotel) => (
        hotel.latitude && hotel.longitude && (
          <Marker key={hotel.id} position={[hotel.latitude, hotel.longitude]}>
            <Popup>{hotel.name}</Popup>
          </Marker>
        )
      ))}
    </MapContainer>
  )
}

export default SearchResultsMap
