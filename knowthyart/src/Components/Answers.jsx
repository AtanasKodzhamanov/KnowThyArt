import styles from './Answers.module.css';


const Answers = ({nextArtist, selectAnswer, answerProvided, possibleAnswers}) => {

    return (
        <>
        { answerProvided ? 
        <>
                <button className={styles.nextButton} onClick={()=>nextArtist()}><h1>Next</h1></button>
        </>
        
        :
            <>
            {possibleAnswers.map((answer, index) => (
                <button 
                    key={index} 
                    className={styles.answer} 
                    onClick={()=>selectAnswer(answer)}>
                    <h2>{answer}</h2>
                </button>
            ))}
            </>
        }

        </>
    )
}

export default Answers;