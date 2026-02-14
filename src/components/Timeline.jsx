import { motion } from 'framer-motion';
import EventCard from './EventCard';
import { useEffect, useState } from 'react';

const events = [
    {
        date: '30 juin 2025',
        title: 'Mairie du 9ème',
        time: '14h00',
        location: 'Mairie du 9ème arrondissement',
        address: '6 Rue Drouot, 75009 Paris',
        mapsUrl: 'https://maps.google.com/?q=6+Rue+Drouot+75009+Paris',
        timestamp: new Date('2025-06-30T14:00:00')
    },
    {
        date: '30 juin 2025',
        title: 'After Mairie',
        time: 'Après la cérémonie',
        location: 'Chez les Grosz',
        address: 'Rue de Maubeuge, 75009 Paris (Code: 123A, 8e étage)',
        mapsUrl: 'https://maps.google.com/?q=Rue+de+Maubeuge+75009+Paris',
        timestamp: new Date('2025-06-30T16:00:00')
    },
    {
        date: '3 août 2025',
        title: 'Domaine de la Revardière',
        time: '16h30 - Houppa, suivi du cocktail et de la fête',
        location: 'Domaine de la Revardière',
        address: 'La Revardière',
        mapsUrl: 'https://maps.google.com/?q=Domaine+de+la+Revardière',
        timestamp: new Date('2025-08-03T16:30:00')
    },
    {
        date: '4 août 2025',
        title: 'Brunch',
        time: 'Matinée',
        location: 'Domaine de la Revardière',
        address: 'La Revardière',
        mapsUrl: 'https://maps.google.com/?q=Domaine+de+la+Revardière',
        timestamp: new Date('2025-08-04T11:00:00')
    }
];

export default function Timeline() {
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const now = new Date();

        // Trouver l'événement actuel
        let current = 0;
        for (let i = 0; i < events.length; i++) {
            if (now < events[i].timestamp) {
                current = i;
                break;
            }
            if (i === events.length - 1) {
                current = events.length;
            }
        }

        setCurrentEventIndex(current);

        // Calculer le progrès
        if (current === 0) {
            setProgress(0);
        } else if (current >= events.length) {
            setProgress(100);
        } else {
            const progressPercent = (current / events.length) * 100;
            setProgress(progressPercent);
        }
    }, []);

    return (
        <section className="timeline-section">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="timeline-title"
            >
                Programme des Festivités
            </motion.h2>

            <div className="timeline-container">
                <motion.div
                    className="timeline-line"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <motion.div
                        className="timeline-progress"
                        initial={{ height: "0%" }}
                        animate={{ height: `${progress}%` }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                    />
                </motion.div>

                <div className="timeline-events">
                    {events.map((event, index) => (
                        <EventCard
                            key={index}
                            event={event}
                            index={index}
                            isPast={index < currentEventIndex}
                            isCurrent={index === currentEventIndex}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
