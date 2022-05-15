/** @format */

const MAPS_API_KEY = process.env.NEXT_PUBLIC_MAPS_API_KEY

export default {
	SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
	MAPS_SRC: `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&libraries=places`,
}
