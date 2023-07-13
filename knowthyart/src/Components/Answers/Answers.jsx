import styles from './Answers.module.css';


const Answers = ({ selectAnswer, answerProvided, possibleAnswers}) => {

    return (
        <>
        { answerProvided ? 
        <>
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