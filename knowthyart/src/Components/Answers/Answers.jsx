import styles from './Answers.module.css';


const Answers = ({ selectAnswer, answerProvided, possibleAnswers}) => {

    return (
        <>
        { !answerProvided &&  
                    <div className="answersContainer">
                    {possibleAnswers.map((answer, index) => (
                        <button 
                            key={index} 
                            className={styles.answer} 
                            onClick={()=>selectAnswer(answer)}>
                            <h2>{answer}</h2>
                        </button>
                    ))}
                    </div>
        }
        </>
    )
}

export default Answers;