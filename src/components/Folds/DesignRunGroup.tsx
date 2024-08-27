import styled from "styled-components";
import DrgGroup from '../../assets/DrgGroupVid.mp4';
import { useControlPanel } from "../Contexts/ControlPanelContext";

const Fold = styled.div`
    height: 100vh;
    align-items: center;
    justify-content: center;
    display: flex;
    padding-left: 360px;
`;

const Container = styled.div`
  position: relative;
  width: calc(100vw - 380px);
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
`;

const Date = styled.p`
  margin-top: 0px;
`;

const Video = styled.video`
  height: 300px;
  transition: all 1s ease;
  box-shadow: 0px 0px 12px 4px rgba(0, 0, 0, 0.2);
  z-index: 2;
  @media only screen and (max-width: 768px) {
    width: calc(100vw - 80px);
  }
`;
const Circle = styled.div`
    position: absolute;
    top: -60px;
    left: 440px;
    width: 400px;
    height: 400px;
    z-index: 1;
    border-radius: 100%;
    animation: 12s ease-in-out 0s infinite bigCircleScale;
    background-color: #ffd000;
    @keyframes bigCircleScale {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.12);
        }
        55% {
            transform: scale(1.129);
        }
        70% {
            transform: scale(0.9);
        }
        100% {
            transform: scale(1);
        }
    }
`
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
`


const DesignRunGroup = () => {
  const { handleMove, setBoxInView, changeOpacity, toggleAnimation, handleReset } = useControlPanel();
  const handleViewDetailsClick = () => {
    setBoxInView(7);
    handleMove(7, '0', '-100vh');
    handleMove(2, '-100vw', '-100vh');
    changeOpacity(7, 1);
    toggleAnimation(7, true);
    setTimeout(() => {
      toggleAnimation(2, false);
      handleReset([2]);
    }, 1000)
  }
  return (
    <Fold>
      <Container>
        <Frame>
          <Project>
            <Title>DesignRun<br />Group</Title>
            <Subtitle>WEBSITE</Subtitle>
            <Date>2023</Date>
            <A onClick={() => handleViewDetailsClick()}>Project Details</A>
          </Project>
          <Video src={DrgGroup} autoPlay loop muted />
        </Frame>
        <Circle />
      </Container>
    </Fold>
  );
};

export default DesignRunGroup;
