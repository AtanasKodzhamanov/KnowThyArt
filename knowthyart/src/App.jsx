import { useEffect, useState } from 'react'
import Gallery from './Components/Gallery'
import './App.css'
import Answers from './Components/Answers'
import names from './assets/names.json'
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Header from './Components/Header'
import Footer from './Components/Footer'
import BioModal from './Components/BioModal'
import TerminalScreen from './Components/TerminalScreen'


function App() {
  const[artist, setArtist] = useState({})
  const[answerProvided, setAnswerProvided] = useState(false)
  const[possibleAnswers, setPossibleAnswers] = useState([])
  const[next, setNext] = useState(false)
  const [allArtistsData, setAllArtistsData] = useState(null);
  const [bioModal, setBioModal] = useState(false)
  const [terminate, setTerminate] = useState(false)

  useEffect(() => {
    fetch('http://localhost:8000/artists/')
      .then(response => response.json())
      .then(data => setAllArtistsData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const selectArtist = () => {
    if (allArtistsData.length === 0) {
      setTerminate(true)
      return;
    }
    const randomIndex = Math.floor(Math.random() * allArtistsData.length);
    setArtist(allArtistsData[randomIndex]);
    const reducedList = allArtistsData.filter((_, index) => index !== randomIndex);
    setAllArtistsData(reducedList);
    console.log(artist)
  }

  const generatePossibleAnswers = () => {
    const correctAnswer = artist.name;
    console.log(correctAnswer)
    
    let possibleAnswers = [];
  
    while (possibleAnswers.length < 5) {
      const randomIndex = Math.floor(Math.random() * names.length);
      const selectedName = names[randomIndex];
  
      if (selectedName != correctAnswer) {
        possibleAnswers.push(selectedName);
      }
    }
    
    const insertIndex = Math.floor(Math.random() * (possibleAnswers.length + 1));
    possibleAnswers.splice(insertIndex, 0, correctAnswer);
    
    setPossibleAnswers(possibleAnswers);
  }
  

  useEffect (() => {
    if (artist && artist.name){
      generatePossibleAnswers()
    }
  }, [artist])


  const selectAnswer = () => {
    setAnswerProvided(true)
    setBioModal(true)
  }

  // triggered on click of next artist button
  const nextArtist = () => {
    setAnswerProvided(false)
    selectArtist()
    setNext(!next)
  }

  const [answersAnimation] = useAutoAnimate()
  const [galleryAnimation] = useAutoAnimate()

  
  useEffect(() => {
    console.log("artist", artist)
}, [artist])

  const closeModal = () => {
    console.log("close modal")
    setBioModal(false)
  }

  const openModal = () => {
    console.log("open modal")
    setBioModal(true)
  }
  console.log(possibleAnswers)
  return (
    <>
      <Header />
      { terminate ? <TerminalScreen /> : null}
      { Object.keys(artist).length !== 0 ? 
        <>
          <BioModal story={artist.story} name={artist.name} closeModal={closeModal} bioModal={bioModal}/>
          <div ref={galleryAnimation}>
          <Gallery 
            artist={artist}
            answerProvided={answerProvided}
          />
          </div>
          <div className="answersContainer" ref={answersAnimation}>
          <Answers selectAnswer={selectAnswer} nextArtist={nextArtist} answerProvided={answerProvided} possibleAnswers={possibleAnswers} />
          </div>
        </>
      : 
        <button onClick={nextArtist}>Next Artist</button>
      }
      <Footer />
    </>
  )
}

export default App
