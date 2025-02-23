import styled from "styled-components";
import Image1 from '../assets/background.png';
import Image2 from '../assets/ocean.png';
import Image3 from '/engine.gif';
import Image4 from '../assets/House - Small (2 rooms) v70.png';
import Image5 from '../assets/seaholm-print-cover.jpeg';
import Image6 from '../assets/original-dnd-images.png';
import Image7 from '../assets/Me-square.jpg';
import Image8 from '/alfie.gif';
import bottomVideo from '/drone.gif';
import WhiteSands from '../assets/white-sands.jpg';
import { useControlPanel } from "./Contexts/ControlPanelContext";
import { useEffect, useState } from "react";

const Container = styled.div<{ $pointerEvent: boolean; $opacity: boolean }>`
    width: 100vw;
    height: 100dvh;
    overflow-y: auto;
    overflow-x: hidden;
    /* Hide scrollbar for WebKit browsers (Chrome, Safari) */
    &::-webkit-scrollbar {
        display: none;
    }
    /* Hide scrollbar for other browsers */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 180px;
    opacity: ${(props) => (props.$opacity ? '1' : '0')};
    transition: opacity ${(props) => (props.$opacity ? '24s' : '1s')} ease;
    pointer-events: ${(props) => (props.$pointerEvent ? 'auto' : 'none')};
`;

const RelativeDiv = styled.div`
    position: relative;
    pointer-events: none;
`;

const VideoContainer = styled.div`
    transform: translateX(-30vw);
    width: 40vw;
    height: auto;
`;

const StyledVideo = styled.img`
    width: 40vw;
    height: auto;
`;

const Caption = styled.p<{ $transform?: string; }>`
    font-size: 0.7rem;
    transform: ${({ $transform }) => $transform || 'none'};
    margin-top: 10px;
    border: 1px solid lightgray;
    border-radius: 3px;
    padding: 6px;
`;

const ImageStyled = styled.img<{ $transform?: string; $width: string; $height: string; $objectFit?: string }>`
    transform: ${({ $transform }) => $transform || 'none'};
    width: ${({ $width }) => $width};
    height: ${({ $height }) => $height};
    object-fit: ${({ $objectFit }) => $objectFit || 'initial'};
`;

const FlexColumnDiv = styled.div<{ $width: string; $transform: string }>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    transform: ${({ $transform }) => $transform};
    width: ${({ $width }) => $width};
    height: auto;
`;

const PositionedImage = styled.img`
    z-index: 2;
    object-fit: cover;
    width: 320px;
    height: 310px;
`;

const OtherWorks = () => {
    const { boxInView } = useControlPanel();
    const [pointerEvent, setPointerEvent] = useState<boolean>(false);
    const [opacity, setOpacity] = useState<boolean>(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (boxInView === -1) {
            timeout = setTimeout(() => {
                setPointerEvent(true);
                setOpacity(true);
            }, 1000);
        } else {
            setOpacity(false);
            setPointerEvent(false);
        }
        return () => clearTimeout(timeout);
    }, [boxInView]);

    return (
        <RelativeDiv>
            <Container $opacity={opacity} $pointerEvent={pointerEvent}>
                <VideoContainer>
                    <StyledVideo src={Image3} />
                    <Caption style={{ maxWidth: '300px' }}>A Honda engine I modeled in Fusion 360, textured, animated and rendered in Blender. Used for AI machine vision training.</Caption>
                </VideoContainer>
                <FlexColumnDiv $transform="translateX(25vw)" $width="300px">
                    <ImageStyled $width="300px" $height="300px" src={Image2} />
                    <Caption>ComfyUI generated image of crashing waves.</Caption>
                </FlexColumnDiv>
                <FlexColumnDiv $width="1200px" $transform="translateX(0)">
                    <ImageStyled $width="1200px" $height="auto" src={Image6} />
                    <Caption style={{ maxWidth: '300px' }}>Interface screenshots from "Dnd 5e Player AIO" - a React Native mobile application developed and published on the App Store and Google Play Store, designed to streamline D&D 5e gameplay.</Caption>
                </FlexColumnDiv>
                <VideoContainer>
                    <StyledVideo src={bottomVideo} />
                    <Caption style={{ maxWidth: '300px' }}>Custom-designed UAV prototype that I developed in Fusion 360, fabricated, and flight tested for autonomous operations with Air Force Special Operations Command. I conducted the field testing in Dripping Springs, Texas.</Caption>
                </VideoContainer>
                <FlexColumnDiv style={{ alignItems: 'flex-end' }} $width="1200px" $transform="translateX(calc(50vw - 600px))">
                    <ImageStyled $width="100vw" $height="auto" src={Image4} />
                    <Caption style={{ maxWidth: '300px' }}>A house frame I designed and engineered in Fusion 360. Built in real life using coco lumber, mahogany and pine.</Caption>
                </FlexColumnDiv>
                <FlexColumnDiv $transform="translateX(calc(-50vw + 200px))" $width="300px">
                    <ImageStyled $width="300px" $height="300px" src={Image1} />
                    <Caption>Midjourney generated image of clouds and distant mountains.</Caption>
                </FlexColumnDiv>
                <FlexColumnDiv $width="600px" $transform="translateX(calc(-50vw + 300px))">
                    <ImageStyled $width="100vw" $height="500px" $objectFit="cover" src={Image5} />
                    <Caption style={{ maxWidth: '300px' }} >A typographic tribute to Seaholm Power Plant’s transformation from industrial landmark to a vibrant mixed-use destination.</Caption>
                </FlexColumnDiv>
                <FlexColumnDiv $width="400px" $transform="translateX(0)">
                    <ImageStyled $width="400px" $height="400px" src={WhiteSands} />
                    <Caption>White Sands National Monument, New Mexico. Taken with my iPhone 14 Pro Max.</Caption>
                </FlexColumnDiv>
                <FlexColumnDiv $width="400px" $transform="translateX(calc(50vw - 200px))">
                    <ImageStyled $width="400px" $height="400px" src={Image8} />
                    <Caption>My dog Alfie, my best friend.</Caption>
                </FlexColumnDiv>
                <div style={{ width: '100vw', position: 'relative', paddingBottom: 'calc(50vh - 171px)' }}>
                    <div style={{ width: '100vw', display: 'flex', justifyContent: 'center' }}>
                        <PositionedImage src={Image7} />
                    </div>
                </div>
            </Container>
        </RelativeDiv>
    );
};

export default OtherWorks;
