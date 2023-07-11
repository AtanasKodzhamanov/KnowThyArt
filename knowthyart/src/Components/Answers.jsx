import styles from './Answers.module.css';


const Answers = ({nextQuestion, selectAnswer, answerProvided, possibleAnswers}) => {

    return (
        <>
        { answerProvided ? 
        <>
            <div>
                <button onClick={()=>nextQuestion()}>Next Question</button>
            </div>
        </>
        
        :
            <>
            {possibleAnswers.map((answer, index) => (
                <button 
                    key={index} 
                    className={styles.answer} 
                    onClick={()=>selectAnswer(answer)}>
                    {answer}
                </button>
            ))}
            </>
        }

        </>
    )
}

export default Answers;