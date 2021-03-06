import {useEffect, useState} from 'react';
import styled from 'styled-components';
import Particles from 'react-tsparticles';
import particlesOptions from './particles.json';

import Card from './Components/Card';

import refresh from './svgs/refresh.svg'

const url = "https://api.nasa.gov/planetary/apod?api_key=gz670kioWg4ZOog8yltDih1xXd7P7esLMCoDBJle&count=3";

const StyledHeader = styled.h1`
  font-family: 'Dongle', sans-serif;
  font-weight: 700;
  text-decoration: none;
  font-size: 60px;
  color: #ffff;
  margin: auto;

  @media (max-width: 768px) {
      font-size: 40px;
  }

  @media (max-width: 400px) {
      font-size: 35px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  position: absolute;
  top: 5%;
  flex-direction: column;
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  align-items: center;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const ParticleWrapper = styled.div`
  position: fixed;
  width: 100%;
  overflow-x: hidden;
`;

const CardWrapper = styled.div`
  width: 70vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

`;

const LoadingText = styled.p`
  font-family: 'Dongle', sans-serif;
  font-weight: 400;
  font-size: 30px;
  color: white;
  width: 100%;
  text-align: center;
`;

const Loading = styled.img`
  background-color: #2D3585;
  border-radius: 8px;
  padding: 5px;
  height: 80px;
  width: 80px;
  transition: all 0.4s;
  top: 15px;

  &:hover {
    transform: rotate(360deg);
  }
`;

const AppWrapper = styled.div`
  position: relative;
`;

const App = () => {

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTracks = async() => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  }

  const handleGetTracks = () => {
    setLoading(true);
    getTracks().then((images) => {
      setImages((curr) => [...curr, ...images]);
      setLoading(false);
    });
  };

  useEffect(() => {
    handleGetTracks();
  }, []);

  return (
    <AppWrapper>

      <ParticleWrapper>
        <Particles 
          width="100wh"
          height="100vh"
          options={particlesOptions}/>
      </ParticleWrapper>
      
      <Wrapper>
        <StyledHeader>
          <a 
            style={{textDecoration: "none", color: "white"}}
            href="https://docs.google.com/document/d/13zXpyrC2yGxoLXKktxw2VJG2Jw8SdUfliLM-bYQLjqE/edit#heading=h.2kwy1hgbxmq"> 
            Welcome to Spacestagram! ???? </a>
        </StyledHeader>  
            
        <CardWrapper>
        {images.length > 0 &&
            images.map(
              (image) =>
                image.media_type === "image" && (
                  <Card
                    title={image.title}
                    date={image.date}
                    url={image.url}
                    key={image.title}
                    description={image.explanation}
                    copyright={image.copyright}
                  />
                )
          )}
          {loading && <LoadingText>Loading...</LoadingText>}
        </CardWrapper>

        <Loading
          src={refresh}
          alt="load more"
          onClick={handleGetTracks}
        />

      </Wrapper>

    </AppWrapper>
  );
}

export default App;
