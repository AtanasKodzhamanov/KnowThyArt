import { useEffect, useState } from 'react'
import WelcomeScreen from './Components/WelcomeScreen/WelcomeScreen'
import Gallery from './Components/Gallery/Gallery'
import './App.css'
import Answers from './Components/Answers/Answers'
import names from './assets/names.json'
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Header from './Components/Header'
import Footer from './Components/Footer'
import BioModal from './Components/BioModal/BioModal'
import TerminalScreen from './Components/TerminalScreen/TerminalScreen'
import InfoModal from './Components/BioModal/InfoModal'

function App() {
  const [artist, setArtist] = useState({})
  const [answerProvided, setAnswerProvided] = useState(false)
  const [possibleAnswers, setPossibleAnswers] = useState([])
  const [next, setNext] = useState(false)
  const [allArtistsData, setAllArtistsData] = useState(null);
  const [bioModal, setBioModal] = useState(false)
  const [terminate, setTerminate] = useState(false)
  const [correctAnswer, setCorrectAnswer] = useState(false)

  useEffect(() => {
    fetch('https://knowthyartdjango-production.up.railway.app/artists/')
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


  const selectAnswer = async (answer) => {
    setAnswerProvided(true);
    setBioModal(true);
    if (answer === artist.name) {
      setCorrectAnswer(true);
      artist.correct_answer += 1;
    } else {
      setCorrectAnswer(false);
      artist.incorrect_answer += 1;
    }
  
    try {
      const response = await fetch(`https://knowthyartdjango-production.up.railway.app/artists/${artist.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(artist),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      setArtist(data);  // update the state with the updated artist data
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  // triggered on click of next artist button
  const nextArtist = () => {
    setAnswerProvided(false)
    selectArtist()
    setNext(!next)
  }

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
          <InfoModal correctAnswer={correctAnswer} answerProvided={answerProvided} nextArtist={nextArtist} artist={artist} closeModal={closeModal} bioModal={bioModal}/>
          <div ref={galleryAnimation}>
          <Gallery 
            artist={artist}
            answerProvided={answerProvided}
          />
          </div>
          <div className="answersContainer">
          <Answers selectAnswer={selectAnswer} nextArtist={nextArtist} answerProvided={answerProvided} possibleAnswers={possibleAnswers} />
          </div>
        </>
      : 
        <WelcomeScreen nextArtist={nextArtist} />
      }
      <Footer />
    </>
  )
}

export default App
