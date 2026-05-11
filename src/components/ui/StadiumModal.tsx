import { MapPin, Users, Globe, Clock, ExternalLink } from 'lucide-react'
import { Modal } from './Modal'

interface StadiumData {
  id: string
  name: string
  city: string
  country: string
  address: string | null
  capacity: number | null
  photo_urls: string[]
  latitude: number | null
  longitude: number | null
  timezone: string
}

interface Props {
  open: boolean
  onClose: () => void
  stadium: StadiumData | null
}

export function StadiumModal({ open, onClose, stadium }: Props) {
  if (!stadium) return null

  return (
    <Modal open={open} onClose={onClose} title={stadium.name} size="md">
      <div className="space-y-5">
        {/* Photo */}
        {stadium.photo_urls && stadium.photo_urls.length > 0 && (
          <div className="rounded-lg overflow-hidden border border-border">
            <img
              src={stadium.photo_urls[0]}
              alt={stadium.name}
              className="w-full h-40 object-cover"
            />
          </div>
        )}

        {/* Info */}
        <div className="space-y-3">
          <div className="flex items-start gap-3 text-sm">
            <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-zinc-600 font-medium">{stadium.city}</p>
              <p className="text-zinc-500">{stadium.country}</p>
            </div>
          </div>

          {stadium.address && (
            <div className="flex items-start gap-3 text-sm">
              <Globe size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <p className="text-zinc-600">{stadium.address}</p>
            </div>
          )}

          {stadium.capacity && (
            <div className="flex items-start gap-3 text-sm">
              <Users size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <p className="text-zinc-600">
                Capacidad: {stadium.capacity.toLocaleString('es')} espectadores
              </p>
            </div>
          )}

          {stadium.timezone && (
            <div className="flex items-start gap-3 text-sm">
              <Clock size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <p className="text-zinc-600">Zona horaria: {stadium.timezone}</p>
            </div>
          )}
        </div>

        {/* Map link */}
        {stadium.latitude && stadium.longitude && (
          <a
            href={`https://www.google.com/maps?q=${stadium.latitude},${stadium.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-primary hover:text-primary-hover transition-colors"
          >
            <ExternalLink size={14} />
            Ver en Google Maps
          </a>
        )}
      </div>
    </Modal>
  )
}
