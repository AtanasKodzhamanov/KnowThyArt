import {useState } from 'react'
import WelcomeScreen from './Components/WelcomeScreen/WelcomeScreen'
import Gallery from './Components/Gallery/Gallery'
import './App.css'
import Answers from './Components/Answers/Answers'
import names from './assets/names.json'
import TerminalScreen from './Components/TerminalScreen/TerminalScreen'
import InfoModal from './Components/BioModal/InfoModal'
import useGetData from './useGetData';
import useUpdateData from './useUpdateData';

function App() {
  const [artist, setArtist] = useState({})
  const [answerProvided, setAnswerProvided] = useState(false)
  const [possibleAnswers, setPossibleAnswers] = useState([])
  const [next, setNext] = useState(false)
  const [bioModal, setBioModal] = useState(false)
  const [terminate, setTerminate] = useState(false)
  const [correctAnswer, setCorrectAnswer] = useState(false)
  const [artistIndex, setArtistIndex] = useState(0)


  const { data: allArtistsData, loading, error } = useGetData(
    'https://knowthyartdjango-production.up.railway.app/artists/'
  );
  const {
    executePatch
  } = useUpdateData();

  const generatePossibleAnswers = (correctAnswer) => {
    
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

  const selectArtist = () => {
    if (allArtistsData && allArtistsData.length === artistIndex) {
      setTerminate(true)
      return;
    }
    setArtist(allArtistsData[artistIndex]);
    setArtistIndex(artistIndex + 1); 
    generatePossibleAnswers(allArtistsData[artistIndex].name);
  }

  const selectAnswer = async (answer) => {
    window.scrollTo(0, 0);
    setAnswerProvided(true);
    setBioModal(true);
    const isCorrect = answer === artist.name;
    setCorrectAnswer(isCorrect);

    const updatedArtist = { ...artist };

    if (isCorrect) {
      updatedArtist.correct_answer += 1;
    } else {
      updatedArtist.incorrect_answer += 1;
    }
  
    let patchUrl = `https://knowthyartdjango-production.up.railway.app/artists/${artist.id}/`;
    executePatch(patchUrl, updatedArtist); 
  };
  
  // triggered on click of next artist button
  const nextArtist = () => {
    setAnswerProvided(false)
    selectArtist()
    setNext(!next)
    window.scrollTo(0, 0);
  }

  const closeModal = () => {
    setBioModal(false)
  }


  return (
    <>
      { terminate && <TerminalScreen /> }
      { Object.keys(artist).length !== 0 ? 
        <>
          <InfoModal 
            correctAnswer={correctAnswer} 
            answerProvided={answerProvided} 
            nextArtist={nextArtist} 
            artist={artist} 
            closeModal={closeModal} 
            bioModal={bioModal}/>
          <div >
          <Gallery 
            artist={artist}
            answerProvided={answerProvided}
          />
          </div>
          <Answers 
            selectAnswer={selectAnswer} 
            nextArtist={nextArtist} 
            answerProvided={answerProvided} 
            possibleAnswers={possibleAnswers} />
        </>
      : 
        <WelcomeScreen nextArtist={nextArtist} />
      }
    </>
  )
}

export default App
