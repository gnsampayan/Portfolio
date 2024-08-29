import styled from "styled-components";
import WeAreHereVid from '../../assets/WeAreHere.mp4';
import { useControlPanel } from "../Contexts/ControlPanelContext";
import { RiCloseLargeFill } from "react-icons/ri";
import { useNavContext } from "../Contexts/NavContext";
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
    width: 90%;
    height: auto;
    max-width: 1000px;
`;

const Triangle = styled.div`
    position: absolute;
    top: -60px;
    left: 260px;
    z-index: 1;
    margin-left: 160px;
    width: 0;
    height: 0;
    border: 200px solid transparent;
    border-top: 0;
    border-bottom: 400px solid #f6543c;
    animation: 12s ease-in-out 0s infinite bigTriangleShift;
    @keyframes bigTriangleShift {
        25% {
            transform: skew(25deg);
        }
        50% {
            transform: skew(0deg);
        }
        75% {
            transform: skew(-25deg);
        }
        100% {
            transform: skew(0deg);
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

const WeAreHere = () => {
    const { handleMove, setBoxInView, changeOpacity, toggleAnimation, handleReset } = useControlPanel();
    const { setButtonDisabled, isModalOpen, setModalOpen } = useNavContext();

    const handleViewDetailsClick = () => {
        setButtonDisabled(true);
        setBoxInView(8);
        handleMove(8, '0', '-100vh');
        handleMove(3, '-100vw', '-100vh');
        changeOpacity(8, 1);
        toggleAnimation(8, true);
        setTimeout(() => {
            setButtonDisabled(false);
            toggleAnimation(3, false);
            handleReset([3]);
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
                        <Title>We Are Here</Title>
                        <Subtitle>User-Driven Service Platform</Subtitle>
                        <Date>2021</Date>
                        <A onClick={handleViewDetailsClick}>Project Details</A>
                    </Project>
                    <VideoWrapper onClick={handleVideoClick}>
                        <Video src={WeAreHereVid} autoPlay loop muted />
                        <HoverText><FaEye /></HoverText>
                    </VideoWrapper>
                </Frame>
                <Triangle />
            </Container>

            <Modal $isOpen={isModalOpen}>
                <ModalVideo src={WeAreHereVid} controls autoPlay />
                <Close onClick={handleCloseModal}><RiCloseLargeFill /></Close>
            </Modal>
        </Fold>
    );
};

export default WeAreHere;
