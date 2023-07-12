import styles from './BioModal.module.css';

const BioModal = ({ story, name, closeModal, bioModal }) => {
    return (
        <div className={`${styles.bioModal} ${bioModal ? styles.active : ""}`}>
            <h1>{name}</h1>
            <h2>{story}</h2>
            <button className={styles.closeButton} onClick={()=> closeModal()}>X</button>

        </div>
    )
}

export default BioModal