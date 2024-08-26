import styled from "styled-components";
import DrgOrg from '../../assets/designrun.mp4';
import BlobAnimation from "../blobAnimation";
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
`
const Frame = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;
`
const Project = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    z-index: 2;
`
const Title = styled.h1`
    font-family: halyard-display, sans-serif;
    font-size: 3rem;
    font-weight: 400;
`
const Subtitle = styled.h3`
    font-weight: 200;
    font-size: 1rem;
    width: 300px;
`
const Date = styled.p`
    margin-top: -14px;
`
const Video = styled.video`
    height: 300px;
    transition: all 1s ease;
    box-shadow: 0px 0px 12px 4px rgba(0, 0, 0, 0.2);
    z-index: 2;
    @media only screen and (max-width: 768px) {
        width: calc(100vw - 80px);
    }
`
const A = styled.a`
    all: unset;
    text-decoration: none;
    width: fit-content;
    padding: 10px 20px;
    border-radius: 3px;
    color: #40cd47;
    background: white;
    outline: 1px solid #40cd47;
    cursor: pointer;
    &:hover {
        color: white;
        background: #40cd47;
        outline: none;
    }
`

const DesignRunOrg = () => {
    const { handleMove, setBoxInView, changeOpacity, toggleAnimation, handleReset } = useControlPanel();
    const handleViewDetailsClick = () => {
        setBoxInView(9);
        handleMove(9, '0', '-100vh');
        handleMove(4, '-100vw', '-100vh');
        changeOpacity(9, 1);
        toggleAnimation(9, true);
        setTimeout(() => {
            toggleAnimation(4, false);
            handleReset([4]);
        }, 1000)
    }
  return (
    <Fold>
        <Container>
            <Frame>
                <Project>
                    <Title>DesignRun<br/>.org</Title>
                    <Subtitle>WEBSITE</Subtitle>
                    <Date>2019</Date>
                    <A onClick={() => handleViewDetailsClick()}>Project Details</A>
                </Project>
                <Video src={DrgOrg} autoPlay loop muted />
                <BlobAnimation />
            </Frame>
        </Container>
    </Fold>
  )
}

export default DesignRunOrg