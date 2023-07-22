import styles from './InfoModal.module.css';
import React, { useState } from 'react';

const InfoModal = ({ correctAnswer, artist, closeModal, bioModal, nextArtist, answerProvided }) => {
    const [index, setIndex] = useState(0);
    let storySections = artist.story.split("<SECTION>");

   

    return (
        <>
            <div className={styles.leftImageStyle} style={{backgroundImage: `url(${artist.img_1})`, opacity: answerProvided ? 1 : 0}}></div>
            <div className={styles.rightImageStyle} style={{backgroundImage: `url(${artist.img_2})`, opacity: answerProvided ? 1 : 0}}></div>
            <div className={styles.shaderStyle}></div>
            <div className={styles.modalContainer + " " + (bioModal ? styles.active : "")}>
                <div className={styles.headlineRow}>
                    <h1>{artist.name}</h1>
                </div>
                <div className={styles.bioRow}>
                    <div className={styles.bio}>
                        <h2>{storySections[index]}</h2>;
                    </div>
                </div>
                <div className={styles.buttonsRow}>
                    {index === 0 && (
                        <div className={styles.userMessage}>
                            <div className={styles.successRate}>
                                {correctAnswer ? (
                                    <h3>You have a keen eye!</h3>
                                ) : (
                                    <h3>Wrong, this is the style of {artist.name}!</h3>
                                )}
                            </div>
                            <div>
                                <h3>
                                    Success Rate-
                                    {Math.round((artist.correct_answer / (artist.correct_answer + artist.incorrect_answer)) * 100)}%
                                </h3>
                            </div>
                        </div>
                    )}
                    <div className={styles.buttonGroup}>
                        <div>
                            {index < storySections.length - 1 && (
                                <button
                                    className={styles.nextButton}
                                    onClick={() => setIndex(prev => prev + 1)}
                                >
                                    <h3>Read More</h3>
                                </button>
                            )}
                        </div>
                        <div>
                            <button
                                className={styles.nextButton}
                                onClick={() => {
                                    nextArtist();
                                    closeModal();
                                    setIndex(0);
                                }}
                            >
                                <h3>Next Artist</h3>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InfoModal;
