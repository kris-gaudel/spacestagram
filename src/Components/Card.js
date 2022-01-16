import React, { useState } from "react";
import styled from "styled-components";

import heartRed from '../svgs/heart-red.svg'
import heartGrey from '../svgs/heart-grey.svg';


import ReactModal from "react-modal";

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    text-align: center;
    justify-content: top;
    margin-bottom: 2rem;
`;

const StyledImage = styled.img`
    margin-left: 5rem;
    margin-right: 5rem;
    margin-bottom: 2rem;
    margin-top: 2rem;
    height: max(25vw, 500px);
    width: max(25vw, 500px);

    @media (max-width: 768px) {
        height: max(25vw, 300px);
        width: max(25vw, 300px);
    }

    box-shadow: 0 0 20px rgba(204, 204, 204, 0.596);
    border: 5px solid white;
    border-radius: 5%;
    background-size: cover;
    transition: transform 0.5s ease-in-out, border 0.5s ease-in-out,
    background-image 1s ease-in-out;

    &:hover {
    transform: scale(1.05);
    }
`;

const BottomContainer = styled.div`
    align-self: center;
    display: flex;
    width: max(25vw, 250px);
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.h1`
    font-family: 'Dongle', sans-serif;
    font-weight: 300;
    font-size: 30px;

    @media (max-width: 768px) {
        font-size: 25px;
    }

    text-align: left;
    color: white;
    margin: 0;
`;

const Date = styled.h1`
    font-family: 'Dongle', sans-serif;
    font-weight: 300;
    font-size: 30px;

    @media (max-width: 768px) {
        font-size: 15px;
    }

    text-align: left;
    color: white;
    margin: 0;
`;

const StyledLike = styled.img`
    height: 60px;
    width: 60px;

    @media (max-width: 768px) {
        height: 50px;
        width: 50px;
    }

    transition: all 0.4s;
    margin-left: 5px;

    &:hover {
    transform: scale(1.1);
    }
`;

const ImageContainer = styled.div`
  position: relative;
  text-align: center;

  display: visible;

  &:hover {
    display: visible;
  }
`;

const InfoButton = styled.button`
    font-family: 'Dongle', sans-serif;
    font-weight: 400;
    color: white;
    font-size: 30px;
    @media (max-width: 768px) {
        font-size: 15px;
    }
    background-color: #2D3585;
    box-shadow: 0 0 20px rgba(204, 204, 204, 0.596);
    border-radius: 8px;
    border: 1px solid white;
    max-height: 70px;
    margin: 15px;
`;

const StyledTitle = styled(Title)`
    color: #2D3585;
    font-size: 60px;
    font-weight: 700;
    max-width: 100%;
`;

const Copyright = styled(StyledTitle)`
    font-weight: 400;
    font-size: 40px;
`;

const StyledDescription = styled.p`
    font-family: 'Dongle', sans-serif;
    font-weight: 400;
    font-size: 20px;
`;

const ModalInfoButton = styled(InfoButton)`
    margin: 0;
`;

const ShareableLink = styled.h2`
    font-family: 'Dongle', sans-serif;
    font-weight: 400;
    font-size: 30px;
`;

const DateTitleContainer = styled.div`
    max-width: 100px;
`;

const Card = ({ title, date, url, description, copyright }) => {
    const [liked, setLiked] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <CardContainer>

                <ImageContainer>
                    <StyledImage alt={title} src={url}/>
                </ImageContainer>

                <BottomContainer>
                    <DateTitleContainer>
                        <Title>{title}</Title>
                        <Date>{date}</Date>
                    </DateTitleContainer>
                    <StyledLike
                        src={liked ? heartRed : heartGrey}
                        alt="like button"
                        className="like"
                        onClick={() => setLiked((curr) => !curr)}
                    /> 
                    <InfoButton onClick={handleShow}>More Info</InfoButton>

                    <ReactModal isOpen={show}>
                        <StyledTitle>{title}</StyledTitle>
                        <Copyright>{copyright ? copyright : "No author found"}</Copyright>
                        <StyledDescription>
                            {description}
                        </StyledDescription>
                        <ShareableLink><a href={url}>Shareable Link</a></ShareableLink>
                        <ModalInfoButton onClick={handleClose}>Close</ModalInfoButton>
                    </ReactModal>

                </BottomContainer>
            </CardContainer>
        </>
    );
};

export default Card;
