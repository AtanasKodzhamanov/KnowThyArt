import React, { useEffect } from 'react';
import styles from './Gallery.module.css';

const Gallery = ({artist, answerProvided}) => {

    return (
        <>        
        { artist ? 
            <div className={styles.galleryContainer}>
                <div className={styles.painting} >
                    <img src={artist.img_1}/>
                </div>
                <div className={styles.painting}>
                    <img src={artist.img_2}  />
                </div>
                <div className={styles.painting}>
                    <img src={artist.img_3} />
                </div>
            </div>
        : null
        }

        </>
    )
}

export default Gallery;