import styled from "styled-components";
import NQVid from '../../assets/nqhardware-sequence.mp4';
import { useControlPanel } from "../Contexts/ControlPanelContext";
import { RiCloseLargeFill } from "react-icons/ri";
import { useNavContext } from "../Contexts/NavContext";
import { FaEye } from "react-icons/fa6";

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
    width: 100%;
    height: auto;
    max-width: 1000px;
    box-shadow: 0px 0px 12px 4px rgba(0, 0, 0, 0.2);
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

const NQHardware = () => {
    const { handleMove, setBoxInView, changeOpacity, toggleAnimation, handleReset } = useControlPanel();
    const { setButtonDisabled, isModalOpen, setModalOpen } = useNavContext();

    const handleViewDetailsClick = () => {
        setButtonDisabled(true);
        setBoxInView(6);
        handleMove(6, '0', '-100vh');
        handleMove(1, '-100vw', '-100vh');
        changeOpacity(6, 1);
        toggleAnimation(6, true);
        setTimeout(() => {
            toggleAnimation(1, false);
            handleReset([1]);
            setButtonDisabled(false);
        }, 1000);
    };

    const handleVideoClick = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <Container>
            <Frame>
                <Project>
                    <Title>NQ Hardware</Title>
                    <Subtitle>WEB APP, E-COMMERCE</Subtitle>
                    <Date>2024</Date>
                    <A onClick={handleViewDetailsClick}>Project Details</A>
                </Project>
                <VideoWrapper onClick={handleVideoClick}>
                    <Video src={NQVid} autoPlay loop muted />
                    <HoverText><FaEye /></HoverText>
                </VideoWrapper>
                <Square />
            </Frame>

            <Modal isOpen={isModalOpen}>
                <ModalVideo src={NQVid} controls autoPlay />
                <Close onClick={handleCloseModal}><RiCloseLargeFill /></Close>
            </Modal>
        </Container>
    );
};

export default NQHardware;
