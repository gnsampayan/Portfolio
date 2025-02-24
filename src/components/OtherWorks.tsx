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

import ReactGA from 'react-ga4';

const Container = styled.div<{ $pointerEvent: boolean; $opacity: boolean; }>`
    padding-top: 20px;
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 120px;
    opacity: ${(props) => (props.$opacity ? '1' : '0')};
    transition: opacity ${(props) => (props.$opacity ? '24s' : '1s')} ease;
    pointer-events: ${(props) => (props.$pointerEvent ? 'auto' : 'none')};
`;

const RelativeDiv = styled.div`
    position: relative;
    pointer-events: none;
    width: 100%;
`;

const ProjectContainer = styled.div<{ $align?: string }>`
    width: 100%;
    max-width: calc(100vw - 40px);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: ${props => props.$align || 'center'};

    @media (max-width: 768px) {
        width: 95%;
    }
`;

const MediaWrapper = styled.div<{ $maxWidth?: string }>`
    width: 100%;
    max-width: ${props => props.$maxWidth || '800px'};
    position: relative;
`;

const StyledImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 3px;
    object-fit: cover;
`;

const Caption = styled.p`
    font-size: 0.85rem;
    line-height: 1.4;
    color: #666;
    margin-top: 12px;
    max-width: 600px;
    padding: 10px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 3px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);

    @media (max-width: 768px) {
        font-size: 0.75rem;
        padding: 8px;
    }
`;

const ProfileSection = styled.div`
    width: 100vw;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-bottom: calc(50vh - 171px);
    
    img {
        width: 320px;
        height: 310px;
        object-fit: cover;
        
        @media (max-width: 768px) {
            width: 280px;
            height: 270px;
        }
    }
`;


const OtherWorks = () => {
    const { boxInView } = useControlPanel();
    const [pointerEvent, setPointerEvent] = useState<boolean>(false);
    const [opacity, setOpacity] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [hasReachedBottom, setHasReachedBottom] = useState(false);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        // Only track scrolling when Other Works is visible
        if (boxInView !== -1) return;

        const element = e.currentTarget;
        const scrollPosition = element.scrollTop + element.clientHeight;
        const scrollHeight = element.scrollHeight;
        const difference = scrollHeight - scrollPosition;

        // Check if user has scrolled to bottom (with a tiny buffer for floating point precision)
        if (!hasReachedBottom && difference <= 1) {  // Changed from 100 to 1
            setHasReachedBottom(true);
            ReactGA.event({
                category: 'User Engagement',
                action: 'Reached Bottom',
                label: 'Other Works'
            });
        }

        // Track scroll percentage and update isAtBottom
        const scrollPercentage = Math.round((scrollPosition / scrollHeight) * 100);
        ReactGA.event({
            category: 'User Engagement',
            action: 'Scroll Depth',
            label: 'Other Works',
            value: scrollPercentage
        });
    };

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

    // Google Analytics
    useEffect(() => {
        // When this component comes into view (boxInView === -1)
        if (boxInView === -1) {
            setStartTime(Date.now());
            ReactGA.event({
                category: 'Page View',
                action: 'Other Works Viewed',
                label: 'Enter'
            });
        } else if (boxInView !== -1 && startTime !== null) {
            // When user leaves this view
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            ReactGA.event({
                category: 'Page View',
                action: 'Other Works Time Spent',
                label: 'Exit',
                value: timeSpent
            });
            setStartTime(null);
        }
    }, [boxInView]);

    return (
        <RelativeDiv>
            <Container $opacity={opacity} $pointerEvent={pointerEvent} onScroll={handleScroll}>
                <ProjectContainer>
                    <MediaWrapper $maxWidth="600px">
                        <StyledImage src={Image3} alt="Honda engine 3D model" />
                        <Caption>A Honda engine I modeled in Fusion 360, textured, animated and rendered in Blender. Used for AI machine vision training.</Caption>
                    </MediaWrapper>
                </ProjectContainer>

                <ProjectContainer $align="flex-end">
                    <MediaWrapper $maxWidth="500px">
                        <StyledImage src={Image2} alt="Ocean waves" />
                        <Caption>ComfyUI generated image of crashing waves.</Caption>
                    </MediaWrapper>
                </ProjectContainer>

                <ProjectContainer>
                    <MediaWrapper>
                        <StyledImage src={Image6} alt="DnD app interface" />
                        <Caption>Interface screenshots from "Dnd 5e Player AIO" - a React Native mobile application developed and published on the App Store and Google Play Store, designed to streamline D&D 5e gameplay.</Caption>
                    </MediaWrapper>
                </ProjectContainer>

                <ProjectContainer $align="flex-start">
                    <MediaWrapper $maxWidth="600px">
                        <StyledImage src={bottomVideo} alt="UAV prototype" />
                        <Caption>Custom-designed UAV prototype that I developed in Fusion 360, fabricated, and flight tested for autonomous operations with Air Force Special Operations Command. I conducted the field testing in Dripping Springs, Texas.</Caption>
                    </MediaWrapper>
                </ProjectContainer>

                <ProjectContainer>
                    <MediaWrapper>
                        <StyledImage src={Image4} alt="House frame design" />
                        <Caption>A house frame I designed and engineered in Fusion 360. Built in real life using coco lumber, mahogany and pine.</Caption>
                    </MediaWrapper>
                </ProjectContainer>

                <ProjectContainer $align="flex-start">
                    <MediaWrapper $maxWidth="500px">
                        <StyledImage src={Image1} alt="Mountain landscape" />
                        <Caption>Midjourney generated image of clouds and distant mountains.</Caption>
                    </MediaWrapper>
                </ProjectContainer>

                <ProjectContainer>
                    <MediaWrapper $maxWidth="800px">
                        <StyledImage src={Image5} alt="Seaholm Power Plant" />
                        <Caption>A typographic tribute to Seaholm Power Plant's transformation from industrial landmark to a vibrant mixed-use destination.</Caption>
                    </MediaWrapper>
                </ProjectContainer>

                <ProjectContainer $align="center">
                    <MediaWrapper $maxWidth="600px">
                        <StyledImage src={WhiteSands} alt="White Sands" />
                        <Caption>White Sands National Monument, New Mexico. Taken with my iPhone 14 Pro Max.</Caption>
                    </MediaWrapper>
                </ProjectContainer>

                <ProjectContainer $align="flex-end">
                    <MediaWrapper $maxWidth="500px">
                        <StyledImage src={Image8} alt="Alfie" />
                        <Caption>My dog Alfie, my best friend.</Caption>
                    </MediaWrapper>
                </ProjectContainer>

                <ProfileSection>
                    <img src={Image7} alt="Profile" />
                </ProfileSection>
            </Container>
        </RelativeDiv>
    );
};

export default OtherWorks;
