import styled from "styled-components";
import NQVid from '../../assets/nqhardware-sequence.mp4';
import { useNavContext } from "../Contexts/NavContext";

const Fold = styled.div`
    height: 100vh;
    align-items: center;
    justify-content: center;
    display: flex;
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
    margin-top: -14px;
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
    left: 440px;
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
const ViewBtn = styled.button`
    all: unset;
    color: blue;
`

const NQHardware = () => {
    const {
        handleProjectDetails,
    } = useNavContext();
    return (
        <Fold>
            <Container>
                <Frame>
                    <Project>
                        <Title>NQ Hardware</Title>
                        <Subtitle>WEB APP, E-COMMERCE</Subtitle>
                        <Date>2024</Date>
                        <ViewBtn onClick={() => handleProjectDetails(0)}>Project Details</ViewBtn>
                        <a href="https://nqhardware.com" target="_blank">Visit Site</a>
                    </Project>
                    <Video src={NQVid} autoPlay loop muted />
                    <Square />
                </Frame>
            </Container>
        </Fold>
    );
};

export default NQHardware;
