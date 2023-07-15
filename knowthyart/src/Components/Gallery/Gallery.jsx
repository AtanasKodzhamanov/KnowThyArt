import React, { useEffect, useState } from 'react';
import styles from './Gallery.module.css';

const Gallery = ({ artist, answerProvided }) => {
    const [resetAnimation, setResetAnimation] = useState(false);

    useEffect(() => {
        setResetAnimation(true);
        const timeout = setTimeout(() => {
            setResetAnimation(false);
        }, 0);

        return () => clearTimeout(timeout);
    }, [artist]);

    return (
        <>
            {artist ? (
                <div key={artist.name} className={`${styles.galleryContainer} ${resetAnimation ? styles.resetAnimation : ''}`}>
                    <div className={styles.painting}>
                        <img src={artist.img_1} alt="Painting 1" />
                    </div>
                    <div className={styles.painting}>
                        <img src={artist.img_2} alt="Painting 2" />
                    </div>
                    <div className={styles.painting}>
                        <img src={artist.img_3} alt="Painting 3" />
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Gallery;
