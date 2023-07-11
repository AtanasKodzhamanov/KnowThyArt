import React from 'react';
import styles from './Gallery.module.css';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const Gallery = () => {

    const [animation] = useAutoAnimate();


    return (
        <>
        <div className={styles.galleryContainer} ref={animation}>
            <div className={styles.painting}>
                <img src="https://picsum.photos/200/300" alt="random" />
            </div>
            <div className={styles.painting}>
                <img src="https://picsum.photos/200/300" alt="random" />
            </div>
            <div className={styles.painting}>
                <img src="https://picsum.photos/200/300" alt="random" />
            </div>
        </div>
        </>
    )
}

export default Gallery;