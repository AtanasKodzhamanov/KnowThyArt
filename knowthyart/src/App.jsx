import { useEffect, useState } from 'react'
import Gallery from './Components/Gallery'
import './App.css'
import Answers from './Components/Answers'
import names from './assets/names.json'
import { useAutoAnimate } from '@formkit/auto-animate/react';


function App() {
  const[questions, setQuestions] = useState([])
  const[artist, setArtist] = useState(0)
  const[answerProvided, setAnswerProvided] = useState(false)
  const[possibleAnswers, setPossibleAnswers] = useState([])
  const[next, setNext] = useState(false)

  const fetchAllArt = async () => {
    const response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/1')
    const allArt = await response.json()
    console.log(allArt)
  }

  const generatePossibleAnswers = () => {
    const correctAnswer = artist.name;
    let possibleAnswers = [];
  
    while (possibleAnswers.length < 5) {
      const randomIndex = Math.floor(Math.random() * names.length);
      const selectedName = names[randomIndex];
  
      if (selectedName !== correctAnswer && !possibleAnswers.includes(selectedName)) {
        possibleAnswers.push(selectedName);
      }
    }
  
    setPossibleAnswers(possibleAnswers);
  }

  const selectQuestion = () => {
    console.log(questions)
    const randomIndex = Math.floor(Math.random() * questions.length);
    console.log(randomIndex)
    //setArtist(questions[randomIndex]);
    const artist = {
      name: "Leonardo da Vinci",
      img_1: "path/to/image1.jpg",
      img_2: "path/to/image2.jpg",
      img_3: "path/to/image3.jpg",
      bio: "A brief biography of the artist...",
      artist_painting_1: "path/to/painting1.jpg",
      artist_painting_2: "path/to/painting2.jpg",
      artist_painting_3: "path/to/painting3.jpg",
      artist_painting_1_title: "Title of Painting 1",
      artist_painting_2_title: "Title of Painting 2",
      artist_painting_3_title: "Title of Painting 3",
      correct_answer: 0,
      incorrect_answer: 0
    };
    
    console.log(artist)
    const updatedQuestions = questions.filter((_, index) => index !== randomIndex);
    setQuestions(updatedQuestions);
    console.log(questions)

    generatePossibleAnswers();
  }

  useEffect(()=>{
    fetchAllArt()
    selectQuestion()
  },[])

  const selectAnswer = () => {
    setAnswerProvided(true)
  }

  const nextQuestion = () => {
    setAnswerProvided(false)
    selectQuestion()
    setNext(!next)
  }

  useEffect(()=>{
    selectQuestion()
  },[next])

  const [answersAnimation] = useAutoAnimate()
  const [galleryAnimation] = useAutoAnimate()

  return (
    <>
      <div ref={galleryAnimation}>
      <Gallery 
        artist={artist}
        answerProvided={answerProvided}
      />
      </div>
      <div className="answersContainer" ref={answersAnimation}>
      <Answers selectAnswer={selectAnswer} nextQuestion={nextQuestion} answerProvided={answerProvided} possibleAnswers={possibleAnswers} />
      </div>
    </>
  )
}

export default App
