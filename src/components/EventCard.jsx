import { motion } from 'framer-motion';
import { MapPin, Calendar, ExternalLink } from 'lucide-react';

export default function EventCard({ event, index, isPast, isCurrent }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className={`event-card ${isPast ? 'past' : ''} ${isCurrent ? 'current' : ''}`}
        >
            <motion.div
                className="event-marker"
                animate={isCurrent ? {
                    scale: [1, 1.2, 1],
                    boxShadow: [
                        '0 0 0 0 rgba(236, 149, 12, 0.7)',
                        '0 0 0 20px rgba(236, 149, 12, 0)',
                        '0 0 0 0 rgba(236, 149, 12, 0)'
                    ]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="marker-dot"></div>
            </motion.div>

            <motion.div
                className="event-content"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <div className="event-date">
                    <Calendar size={20} />
                    <span>{event.date}</span>
                </div>

                <h3 className="event-title">{event.title}</h3>

                {event.time && (
                    <p className="event-time">{event.time}</p>
                )}

                <div className="event-location">
                    <MapPin size={18} />
                    <span>{event.location}</span>
                </div>

                {event.address && (
                    <p className="event-address">{event.address}</p>
                )}

                {event.mapsUrl && (
                    <motion.a
                        href={event.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="maps-link"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <MapPin size={16} />
                        Voir l'itinéraire
                        <ExternalLink size={16} />
                    </motion.a>
                )}
            </motion.div>
        </motion.div>
    );
}
