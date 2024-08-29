import styled from "styled-components";
import NQVid from '../../assets/nqhardware-sequence.mp4';
import { useControlPanel } from "../Contexts/ControlPanelContext";
import { RiCloseLargeFill } from "react-icons/ri";
import { useNavContext } from "../Contexts/NavContext";
import { FaEye } from "react-icons/fa6";
import { useDeviceContext } from "../../hooks/deviceDetector";

const Fold = styled.div<{ $mobile: boolean }>`
    height: 100vh;
    align-items: center;
    justify-content: center;
    display: flex;
    padding-left: ${(props) => props.$mobile ? '0px' : '360px'};
`;
const Container = styled.div<{ $mobile: boolean }>`
    position: relative;
    width: ${(props) => props.$mobile ? '100vw' : 'calc(100vw - 360px)'};
`;

const Frame = styled.div<{ $mobile: boolean }>`
    display: flex;
    flex-direction: ${(props) => props.$mobile ? 'column' : 'row'};
    align-items: ${(props) => props.$mobile ? 'flex-start' : 'center'};
    justify-content: ${(props) => props.$mobile ? 'flex-start' : 'center'};
    gap: 20px;
    padding-left: ${(props) => props.$mobile ? '20px' : '0px'};
`;

const Project = styled.div<{ $mobile: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: ${(props) => props.$mobile ? 'flex-start' : 'center'};
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

const VideoWrapper = styled.div<{ $mobile: boolean }>`
    position: relative;
    height: ${(props) => props.$mobile ? '100%' : '300px'};
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

const Video = styled.video<{ $mobile: boolean }>`
    height: ${(props) => props.$mobile ? 'auto' : '100%'};
    width: ${(props) => props.$mobile ? 'calc(100vw - 40px)' : 'auto'};
    transition: all 0.3s ease;
    border: 1px solid black;
    z-index: 2;
    ${VideoWrapper}:hover & {
        filter: brightness(0.5); // Darken the video on hover
    }
    /* // Media Queries for Responsive Design
    @media only screen and (max-width: 1024px) { // Tablet Portrait
        width: calc(100vw - 60px);
    }

    @media only screen and (max-width: 768px) { // Mobile Landscape
        width: calc(100vw - 80px);
    }

    @media only screen and (max-width: 480px) { // Mobile Portrait
        width: calc(100vw - 100px);
    }

    @media only screen and (max-width: 320px) { // Small Mobile Devices
        width: calc(100vw - 120px);
    } */
`;

const Modal = styled.div<{ $isOpen: boolean }>`
    display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
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

const Square = styled.div<{ $mobile: boolean }>`
    position: absolute;
    top: ${(props) => props.$mobile ? 'calc(50vh - 400px)' : '-60px'};
    left: ${(props) => props.$mobile ? 'calc(50vw - 200px)' : '440px'};
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
    const { isMobile } = useDeviceContext();
    const { setButtonDisabled, isModalOpen, setModalOpen } = useNavContext();
    const { handleMove, setBoxInView, changeOpacity, toggleAnimation, handleReset } = useControlPanel();

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
        <Fold $mobile={isMobile}>
            <Container $mobile={isMobile}>
                <Frame $mobile={isMobile}>
                    <Project $mobile={isMobile}>
                        <Title>NQ Hardware</Title>
                        <Subtitle>WEB APP, E-COMMERCE</Subtitle>
                        <Date>2024</Date>
                        <A onClick={handleViewDetailsClick}>Project Details</A>
                    </Project>
                    <VideoWrapper $mobile={isMobile} onClick={handleVideoClick}>
                        <Video $mobile={isMobile} src={NQVid} autoPlay loop muted />
                        <HoverText><FaEye /></HoverText>
                    </VideoWrapper>
                </Frame>
                <Square $mobile={isMobile} />
            </Container>
            <Modal $isOpen={isModalOpen}>
                <ModalVideo src={NQVid} controls autoPlay />
                <Close onClick={handleCloseModal}><RiCloseLargeFill /></Close>
            </Modal>
        </Fold>

    );
};

export default NQHardware;
