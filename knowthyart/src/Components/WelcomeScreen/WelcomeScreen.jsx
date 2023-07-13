import styles from './WelcomeScreen.module.css';
import Carousel from './Carousel/Carousel';


const WelcomeScreen = ({nextArtist}) => {

    const imageUrls = [
        'https://res.cloudinary.com/dxwb5ejff/image/upload/v1689104590/knowthy.art/Dali/white_cxysy6.webp',
        'https://res.cloudinary.com/dxwb5ejff/image/upload/v1689275717/knowthy.art/Van%20Gogh/pet_xj18zh.webp',
        'https://res.cloudinary.com/dxwb5ejff/image/upload/v1689276141/knowthy.art/Picasso/eat_tdeddb.webp',
        'https://res.cloudinary.com/dxwb5ejff/image/upload/v1689104556/knowthy.art/Dali/band_f9xus5.webp',
        'https://res.cloudinary.com/dxwb5ejff/image/upload/v1689275709/knowthy.art/Van%20Gogh/look_ntfqln.webp',
        'https://res.cloudinary.com/dxwb5ejff/image/upload/v1689276114/knowthy.art/Picasso/why_akr4jv.webp',
        'https://res.cloudinary.com/dxwb5ejff/image/upload/v1689104521/knowthy.art/Dali/pencil_wztbbw.webp',
        'https://res.cloudinary.com/dxwb5ejff/image/upload/v1689275704/knowthy.art/Van%20Gogh/horse_a9blzu.webp',
        'https://res.cloudinary.com/dxwb5ejff/image/upload/v1689276095/knowthy.art/Picasso/doctor_kjmvce.webp',
      ];

    return (    
        <div className={styles.welcomeScreen}>
            <div className={styles.row1}>
                <div className={styles.text1}>
                <h1 className={styles.fontOne}>
                    Unleash your <span className={styles.accentFontFour}>inner art connoisseur</span> with our AI-powered art game! Using AI, we've distilled the distinctive styles of renowned painters to create brand new <span className={styles.accentFontSix}>masterpieces.</span> Challenge your art-savvy eye and see if you can identify the inspiration behind each unique piece.
                </h1 >
                </div>
                <div className={styles.slideshow}>
                <Carousel images={imageUrls} />

                </div>
            </div>
            <div className={styles.row2}>
                <div className={styles.button}>
                    <button className={styles.startButton} onClick={()=>nextArtist()}><h1 className={styles.accentFontFour}>PLAY</h1></button>
                </div>
                <div className={styles.text2}>
                <h1 className={styles.fontTwo}>Match wits with <span className={styles.accentFontFive}>art enthusiasts</span> from around the world, in this intriguing test of your aesthetic acumen. Can you recognize Van Gogh's <span className={styles.accentFontOne}>frenzied strokes</span>, or Da Vinci's <span className={styles.accentFontTwo}>sublime realism</span>, when given a new canvas? </h1>
                </div>
            </div>
        </div>
    )
}

export default WelcomeScreen;