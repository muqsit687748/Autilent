'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// Set your Mapbox access token
const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

if (!mapboxToken) {
  console.warn('Mapbox token not found. Please add NEXT_PUBLIC_MAPBOX_TOKEN to your .env.local file')
}

if (mapboxToken && !mapboxToken.startsWith('pk.')) {
  console.error('Invalid Mapbox token. Please use a public token (pk.*) not a secret token (sk.*)')
}

mapboxgl.accessToken = mapboxToken

interface MapboxMapProps {
  // Map configuration
  center?: [number, number] // [longitude, latitude]
  zoom?: number
  style?: string
  
  // Route configuration
  showRoute?: boolean
  startPoint?: [number, number]
  endPoint?: [number, number]
  waypoints?: [number, number][] // Additional waypoints for the route
  routeColor?: string
  
  // Markers configuration
  markers?: Array<{
    id: string
    coordinates: [number, number]
    color?: string
    size?: number
    label?: string
    icon?: string
  }>
  
  // Incident marker (special marker for traffic reports)
  incidentPoint?: [number, number]
  incidentLabel?: string
  
  // Styling
  className?: string
  height?: string
  
  // Events
  onMapLoad?: (map: mapboxgl.Map) => void
  onMarkerClick?: (markerId: string, coordinates: [number, number]) => void
}

export default function MapboxMap({
  center = [-74.5, 40], // Default to New York
  zoom = 9,
  style = 'mapbox://styles/mapbox/streets-v12',
  showRoute = false,
  startPoint,
  endPoint,
  waypoints = [],
  routeColor = '#447ABB',
  markers = [],
  incidentPoint,
  incidentLabel = 'Incident',
  className = '',
  height = '400px',
  onMapLoad,
  onMarkerClick
}: MapboxMapProps) {
  // Show fallback if no token
  if (!mapboxToken) {
    return (
      <div 
        className={`bg-gray-100 flex items-center justify-center ${className}`}
        style={{ height }}
      >
        <div className="text-center text-gray-500">
          <div className="text-lg font-semibold mb-2">Map Unavailable</div>
          <div className="text-sm">Please add your Mapbox public token to .env.local</div>
          <div className="text-xs mt-1">NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_token_here</div>
        </div>
      </div>
    )
  }

  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: style,
      center: center,
      zoom: zoom,
      attributionControl: false
    })

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

    // Handle map load
    map.current.on('load', () => {
      setMapLoaded(true)
      onMapLoad?.(map.current!)
    })

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [center, zoom, style, onMapLoad])

  // Add route when map is loaded and route is requested
  useEffect(() => {
    if (!mapLoaded || !map.current || !showRoute || !startPoint || !endPoint) return

    const addRoute = async () => {
      try {
        // Wait for style to be fully loaded
        if (!map.current!.isStyleLoaded()) {
          map.current!.on('style.load', () => {
            addRoute()
          })
          return
        }

        // Build waypoints array for directions API
        const allWaypoints = [startPoint, ...waypoints, endPoint]
        
        // Create coordinates string for directions API
        const coordinates = allWaypoints.map(point => point.join(',')).join(';')
        
        // Fetch route from Mapbox Directions API
        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?geometries=geojson&access_token=${mapboxToken}`
        )
        
        if (!response.ok) {
          throw new Error('Failed to fetch route')
        }
        
        const data = await response.json()
        
        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0]
          
          // Check if source already exists and remove it
          if (map.current!.getSource('route')) {
            map.current!.removeLayer('route')
            map.current!.removeSource('route')
          }
          
          // Add route source
          map.current!.addSource('route', {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: route.geometry
            }
          })

          // Add route layer
          map.current!.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': routeColor,
              'line-width': 4,
              'line-dasharray': [2, 2]
            }
          })

          // Fit map to route bounds
          const bounds = new mapboxgl.LngLatBounds()
          route.geometry.coordinates.forEach((coord: [number, number]) => {
            bounds.extend(coord)
          })
          map.current!.fitBounds(bounds, { padding: 50 })
        }
      } catch (error) {
        console.error('Error adding route:', error)
        
        // Fallback to straight line if directions API fails
        if (map.current!.isStyleLoaded()) {
          // Check if source already exists and remove it
          if (map.current!.getSource('route')) {
            map.current!.removeLayer('route')
            map.current!.removeSource('route')
          }
          
          map.current!.addSource('route', {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: [startPoint, endPoint]
              }
            }
          })

          map.current!.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': routeColor,
              'line-width': 4,
              'line-dasharray': [2, 2]
            }
          })
        }
      }
    }

    addRoute()
  }, [mapLoaded, showRoute, startPoint, endPoint, waypoints, routeColor])

  // Add markers
  useEffect(() => {
    if (!mapLoaded || !map.current) return

    const addMarkers = () => {
      // Wait for style to be fully loaded
      if (!map.current!.isStyleLoaded()) {
        map.current!.on('style.load', () => {
          addMarkers()
        })
        return
      }

      // Clear existing markers
      const existingMarkers = document.querySelectorAll('.mapboxgl-marker')
      existingMarkers.forEach(marker => marker.remove())

      // Add custom markers
      markers.forEach(marker => {
        const el = document.createElement('div')
        el.className = 'custom-marker'
        
        // Special styling for vehicle marker
        if (marker.id === 'vehicle') {
          // Create arrow marker for vehicle
          el.innerHTML = `
            <svg width="${marker.size || 20}" height="${marker.size || 20}" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="${marker.color || '#3b82f6'}" stroke="white" stroke-width="1"/>
            </svg>
          `
          el.style.cursor = 'pointer'
          el.style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
        } else {
          // Regular circular marker
          el.style.width = `${marker.size || 20}px`
          el.style.height = `${marker.size || 20}px`
          el.style.borderRadius = '50%'
          el.style.backgroundColor = marker.color || '#447ABB'
          el.style.border = '2px solid white'
          el.style.cursor = 'pointer'
          el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)'
          el.style.display = 'flex'
          el.style.alignItems = 'center'
          el.style.justifyContent = 'center'
          el.style.color = 'white'
          el.style.fontWeight = 'bold'
          el.style.fontSize = `${Math.max(8, (marker.size || 20) * 0.4)}px`
          const numberMatch = marker.label?.match(/\d+/)
          const number = numberMatch ? numberMatch[0] : ''
          el.innerHTML = number // Display number inside marker
        }
        
        if (marker.label) { el.title = marker.label }
        el.addEventListener('click', () => { onMarkerClick?.(marker.id, marker.coordinates) })
        new mapboxgl.Marker(el).setLngLat(marker.coordinates).addTo(map.current!)
      })

      // Add incident marker if provided
      if (incidentPoint) {
        const incidentEl = document.createElement('div')
        incidentEl.className = 'incident-marker'
        incidentEl.style.width = '24px'
        incidentEl.style.height = '24px'
        incidentEl.style.borderRadius = '50%'
        incidentEl.style.backgroundColor = '#f97316'
        incidentEl.style.border = '2px solid white'
        incidentEl.style.cursor = 'pointer'
        incidentEl.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)'
        incidentEl.style.display = 'flex'
        incidentEl.style.alignItems = 'center'
        incidentEl.style.justifyContent = 'center'
        incidentEl.style.color = 'white'
        incidentEl.style.fontWeight = 'bold'
        incidentEl.style.fontSize = '12px'
        incidentEl.innerHTML = '!'
        incidentEl.title = incidentLabel

        new mapboxgl.Marker(incidentEl)
          .setLngLat(incidentPoint)
          .addTo(map.current!)
      }
    }

    addMarkers()
  }, [mapLoaded, markers, incidentPoint, incidentLabel, onMarkerClick])

  return (
    <div 
      ref={mapContainer} 
      className={`mapbox-map ${className}`}
      style={{ height }}
    />
  )
} 