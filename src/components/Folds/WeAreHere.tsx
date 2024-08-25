import styled from "styled-components";
import WeAreHereVid from '../../assets/WeAreHere.mp4';
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
`
const ViewBtn = styled.button`
    all: unset;
    color: blue;
`

const WeAreHere = () => {
    const {
        handleProjectDetails
    } = useNavContext();
  return (
    <Fold>
        <Container>
            <Frame>
                <Project>
                    <Title>We Are Here</Title>
                    <Subtitle>WEB E-COMMERCE</Subtitle>
                    <Date>2021</Date>
                    <ViewBtn onClick={() => handleProjectDetails(2)}>Project Details</ViewBtn>
                    <a href="https://wearehere.com" target="_blank">Visit Site</a>
                </Project>
                <Video src={WeAreHereVid} autoPlay loop muted />
            </Frame>
            <Triangle />
        </Container>
    </Fold>
  )
}

export default WeAreHere