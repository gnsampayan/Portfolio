import styled from "styled-components";
import NQVid from '../../assets/nqhardware-sequence.mp4';
import { useControlPanel } from "../Contexts/ControlPanelContext";


const Container = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-left: 360px;
`;

const Frame = styled.div`
    position: relative;
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
const Square = styled.div`
    position: absolute;
    top: -60px;
    left: 240px;
    width: 400px;
    height: 400px;
    border-radius: 3px;
    animation: 24s ease-in-out 0s infinite bigSquareSpin;
    z-index: 1;
    background-color: #438dff;
    @keyframes bigSquareSpin {
        100% {
            transform: rotate(360deg);
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

const NQHardware = () => {
    const { handleMove, setBoxInView, changeOpacity, toggleAnimation, handleReset } = useControlPanel();
    const handleViewDetailsClick = () => {
        setBoxInView(6);
        handleMove(6, '0', '-100vh');
        handleMove(1, '-100vw', '-100vh');
        changeOpacity(6, 1);
        toggleAnimation(6, true);
        setTimeout(() => {
            toggleAnimation(1, false);
            handleReset([1]);
        }, 1000)
    }
    return (
        <Container>
            <Frame>
                <Project>
                    <Title>NQ Hardware</Title>
                    <Subtitle>WEB APP, E-COMMERCE</Subtitle>
                    <Date>2024</Date>
                    <A onClick={() => handleViewDetailsClick()}>Project Details</A>
                </Project>
                <Video src={NQVid} autoPlay loop muted />
                <Square />
            </Frame>
        </Container>
    );
};

export default NQHardware;
