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
import { useEffect, useState, Suspense } from "react";
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
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
    pointer-events: auto;

    @media (max-width: 768px) {
        width: 95%;
    }
`;

const MediaWrapper = styled.div<{ $maxWidth?: string }>`
    width: 100%;
    max-width: ${props => props.$maxWidth || '800px'};
    position: relative;
    pointer-events: auto;
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

const ModelContainer = styled(MediaWrapper)`
    height: 400px;
    background: #f5f5f5;
    border-radius: 3px;
    overflow: visible;
    position: relative;
    pointer-events: auto;
`;

const LoadingText = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #666;
    font-size: 14px;
    pointer-events: none;
`;

const ControlsOverlay = styled.div`
    position: absolute;
    top: 12px;
    right: 0px;
    background: rgba(255, 255, 255, 0.9);
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 12px;
    color: #666;
    display: flex;
    gap: 16px;
    pointer-events: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    z-index: 1;

    .control-item {
        display: flex;
        align-items: center;
        gap: 4px;
    }

    .icon {
        font-size: 14px;
        color: #333;
    }

    @media (max-width: 768px) {
        .desktop-controls {
            display: none;
        }
        .mobile-controls {
            display: flex;
            gap: 12px;
        }
    }

    @media (min-width: 769px) {
        .desktop-controls {
            display: flex;
            gap: 16px;
        }
        .mobile-controls {
            display: none;
        }
    }
`;

const HouseModel = () => {
    console.log("Attempting to load model...");
    const { scene } = useGLTF("/result.gltf");
    console.log("Model loaded successfully:", scene);

    useEffect(() => {
        scene.traverse((child: THREE.Object3D) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                // Make materials darker and more visible
                if (child.material) {
                    child.material.transparent = false;
                    child.material.opacity = 1;
                    child.material.color.setHex(0x4a4a4a); // Set a darker gray color
                    child.material.metalness = 0.3; // Reduce metalness for more matte appearance
                    child.material.roughness = 0.7; // Increase roughness for less shine
                    child.material.needsUpdate = true;
                }
            }
        });
    }, [scene]);

    return <primitive object={scene} scale={0.01} position={[2, -1, 0]} />;
};

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

                <ProjectContainer $align="flex-end">
                    <ModelContainer>
                        <ControlsOverlay>
                            <div className="desktop-controls">
                                <div className="control-item">
                                    <span className="icon">🖱️</span>
                                    <span>Left: Orbit</span>
                                </div>
                                <div className="control-item">
                                    <span className="icon">🖱️</span>
                                    <span>Right: Pan</span>
                                </div>
                                <div className="control-item">
                                    <span className="icon">⚡</span>
                                    <span>Scroll: Zoom</span>
                                </div>
                            </div>
                            <div className="mobile-controls">
                                <div className="control-item">
                                    <span className="icon">👆</span>
                                    <span>1 finger: Orbit</span>
                                </div>
                                <div className="control-item">
                                    <span className="icon">✌️</span>
                                    <span>2 fingers: Pan</span>
                                </div>
                                <div className="control-item">
                                    <span className="icon">🤏</span>
                                    <span>Pinch: Zoom</span>
                                </div>
                            </div>
                        </ControlsOverlay>
                        <Suspense fallback={<LoadingText>Loading 3D Model...</LoadingText>}>
                            <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
                                <ambientLight intensity={1} />
                                <directionalLight
                                    position={[10, 10, 5]}
                                    intensity={2}
                                    castShadow
                                    shadow-mapSize-width={1024}
                                    shadow-mapSize-height={1024}
                                    shadow-camera-far={50}
                                />
                                <HouseModel />
                                <OrbitControls
                                    enablePan={true}
                                    enableZoom={true}
                                    enableRotate={true}
                                    panSpeed={0.5}
                                    zoomSpeed={0.6}
                                    rotateSpeed={0.4}
                                    minDistance={2}
                                    maxDistance={10}
                                    minPolarAngle={Math.PI / 4}
                                    maxPolarAngle={Math.PI / 2}
                                />
                                <color attach="background" args={['#ffffff']} />
                            </Canvas>
                        </Suspense>
                        <Caption>An interactive 3D view of the house frame I designed and engineered in Fusion 360. Built in real life using coco lumber, mahogany and pine.</Caption>
                    </ModelContainer>
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
