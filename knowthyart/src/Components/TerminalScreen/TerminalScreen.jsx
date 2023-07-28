import styles from './TerminalScreen.module.css';

const TerminalScreen = () => {
    const refreshPage = () => {
        window.location.reload();
    }

    return( 
            <>  
                <div className={styles.BlackOut}>
                    <h1>You have reached the end of our Artist list!</h1>
                    <button onClick={refreshPage}>
                        <h2>Restart</h2>
                    </button>
                </div>
            </>
    )

}

export default TerminalScreen;