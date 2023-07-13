
import React, { useState } from 'react';
import styles from './BioModal.module.css';

const BioModal = ({ artist, closeModal, bioModal, nextArtist, answerProvided }) => {

    const [index, setIndex] = useState(0)
    let storySections = artist.story.split("<SECTION>");
    console.log(storySections)
    console.log(index)

    return (
        <div className={`${styles.bioModal} ${bioModal ? styles.active : ""}`}>
            <h1>{artist.name}</h1>
            <h2>{storySections[index]}</h2>;
            <div className="modalControls">
                {index < storySections.length - 1 && 
                    <button 
                        className={styles.nextButton} 
                        onClick={() => setIndex(prev => prev+1)}>
                            <h3>Read More</h3>
                    </button>
                }
               <button className={styles.nextButton} onClick={()=>nextArtist()}><h3>Next Artist</h3></button>
            </div>
            { index ==0 ?
                <>
                <div>
                    
                    {answerProvided == true ?
                        <h3>You have a keen eye!</h3>
                    :
                        <h3>Wrong, this is the style of {artist.name}!</h3>}
                </div>
                <div>
                    <h3>
                    Global Success Rate: 
                        { 
                            Math.round(
                            (artist.correct_answer / (artist.correct_answer + artist.incorrect_answer)) * 100
                            ) 
                        }%
                    </h3>
                </div>
                </>
            :null }

            <button className={styles.closeButton} onClick={()=> closeModal()}>X</button>
        </div>

    )
}

export default BioModal