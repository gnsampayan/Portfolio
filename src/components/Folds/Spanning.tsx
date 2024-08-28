import styled, { keyframes } from "styled-components";
import SpanningVid from '../../assets/spanning-o365.mp4';
import { useControlPanel } from "../Contexts/ControlPanelContext";
import { useNavContext } from "../Contexts/NavContext";
import { RiCloseLargeFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa6";

const Fold = styled.div`
    height: 100vh;
    align-items: center;
    justify-content: center;
    display: flex;
    padding-left: 360px;
`;

const Container = styled.div`
    position: relative;
    width: calc(100vw - 360px);
`;

const Frame = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;
`;

const Project = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    z-index: 2;
`;

const Title = styled.h1`
    font-family: halyard-display, sans-serif;
    font-size: 3rem;
    font-weight: 400;
`;

const Subtitle = styled.h3`
    font-weight: 200;
    font-size: 1rem;
    width: 300px;
    text-transform: uppercase;
`;

const Date = styled.p`
    margin-top: 0px;
`;

const VideoWrapper = styled.div`
    position: relative;
    height: 300px;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s ease;
    z-index: 3;
`;

const HoverText = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2rem;
    color: white;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: 4;

    ${VideoWrapper}:hover & {
        opacity: 1; // Make the text visible on hover
    }
`;

const Video = styled.video`
    height: 100%;
    width: 100%;
    transition: all 0.3s ease;
    border: 1px solid black;
    z-index: 2;
    @media only screen and (max-width: 768px) {
        width: calc(100vw - 80px);
    }
    ${VideoWrapper}:hover & {
        filter: brightness(0.5); // Darken the video on hover
    }
`;

const Modal = styled.div<{ isOpen: boolean }>`
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    padding-left: 360px;
    background-color: rgba(0, 0, 0, 0.9);
    justify-content: center;
    align-items: center;
    z-index: 999;
`;

const ModalVideo = styled.video`
    width: 90%;
    height: auto;
    max-width: 1000px;
    box-shadow: 0px 0px 12px 4px rgba(0, 0, 0, 0.2);
`;

const getFixedPolygon = () => {
  return `polygon(
      10% 10%,   /* Top-left corner */
      50% 20%,   /* Top-center */
      90% 10%,   /* Top-right corner */
      80% 50%,   /* Right-center */
      90% 90%,   /* Bottom-right corner */
      50% 80%,   /* Bottom-center */
      10% 90%,   /* Bottom-left corner */
      20% 50%    /* Left-center */
    )`;
};

const getRandomPolygon = () => {
  const randomValue = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  return `polygon(
      ${randomValue(5, 15)}% ${randomValue(5, 15)}%,   /* Top-left corner */
      50% ${randomValue(15, 25)}%,  /* Top-center */
      ${randomValue(85, 95)}% ${randomValue(5, 15)}%, /* Top-right corner */
      ${randomValue(75, 85)}% 50%,/* Right-center */
      ${randomValue(85, 95)}% ${randomValue(85, 95)}%,/* Bottom-right corner */
      50% ${randomValue(75, 85)}%, /* Bottom-center */
      ${randomValue(5, 15)}% ${randomValue(85, 95)}%,  /* Bottom-left corner */
      ${randomValue(15, 25)}% 50%    /* Left-center */
    )`;
};

const star = keyframes`
    0% {
      clip-path: ${getFixedPolygon()};
    }
    25% {
      clip-path: ${getRandomPolygon()};
    }
    50% {
      clip-path: ${getRandomPolygon()};
    }
    75% {
      clip-path: ${getRandomPolygon()};
    }
    100% {
      clip-path: ${getFixedPolygon()};
    }
`;

const AnimatedShape = styled.div`
      position: absolute;
      width: 490px;
      height: 490px;
      top: -100px;
      left: 420px;
      background-color: #e06bd0;
      animation: ${star} 6s infinite linear;
`;
const A = styled.a`
    all: unset;
    text-decoration: none;
    width: fit-content;
    padding: 10px 20px;
    border-radius: 3px;
    cursor: pointer;
    color: white;
    background: black;
    outline: none;
    &:hover {
        color: black;
        background: white;
        outline: 1px solid black;
    }
`;
const Close = styled.button`
    all: unset;
    position: absolute;
    top: 40px;
    right: 40px;
    color: white;
`

const Spanning = () => {
  const { handleMove, setBoxInView, changeOpacity, toggleAnimation, handleReset } = useControlPanel();
  const { setButtonDisabled, isModalOpen, setModalOpen } = useNavContext();

  const handleViewDetailsClick = () => {
    setButtonDisabled(true);
    setBoxInView(10);
    handleMove(10, '0', '-100vh');
    handleMove(5, '-100vw', '-100vh');
    changeOpacity(10, 1);
    toggleAnimation(10, true);
    setTimeout(() => {
      setButtonDisabled(false);
      toggleAnimation(5, false);
      handleReset([5]);
    }, 1000);
  };

  const handleVideoClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Fold>
      <Container>
        <Frame>
          <Project>
            <Title>Spanning<br />Office 365</Title>
            <Subtitle>Web App</Subtitle>
            <Date>2019</Date>
            <A onClick={handleViewDetailsClick}>Project Details</A>
          </Project>
          <VideoWrapper onClick={handleVideoClick}>
            <Video src={SpanningVid} autoPlay loop muted />
            <HoverText><FaEye /></HoverText>
          </VideoWrapper>
        </Frame>
        <AnimatedShape />
      </Container>

      <Modal isOpen={isModalOpen}>
        <ModalVideo src={SpanningVid} controls autoPlay />
        <Close onClick={handleCloseModal}><RiCloseLargeFill /></Close>
      </Modal>
    </Fold>
  );
};

export default Spanning;
