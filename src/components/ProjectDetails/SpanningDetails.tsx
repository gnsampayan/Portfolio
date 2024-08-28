import styled from "styled-components";
import SpanningVideo from '../../assets/spanning-o365.mp4';
import Image1 from '../../assets/Dash1.png';
import Image2 from '../../assets/email1.png';
import { useControlPanel } from "../Contexts/ControlPanelContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavContext } from "../Contexts/NavContext";
import { RiArrowLeftSLine, RiArrowRightSLine, RiCloseLargeFill, RiExpandDiagonalFill } from "react-icons/ri";

const Frame = styled.div`
    width: 100vw;
    height: 100vh;
    padding: calc(50vh - 200px) 0px 60px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 40px;
    overflow: auto;
    /* Hide scrollbar for WebKit browsers (Chrome, Safari) */
    &::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for other browsers */
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
`
const Padded = styled.div`
    padding-left: 360px;
    width: 100vw;
`
const Heading = styled.div`
    display: flex;
    flex-direction: row;
    gap: 40px;
    align-items: center;
    justify-content: center;
`
const Scope = styled.div`
    display: flex;
    flex-direction: column;
    text-align: right;
`
const Caption = styled.p`
    font-family: halyard-text, sans-serif;
    font-size: 1.1rem;
    font-weight: 200;
    color: rgb(143, 143, 143);
    float: left;
`
const Summary = styled.div`
    display: flex;
    flex-direction: column;
`
const Top = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`
const Line = styled.div`
    border-top: 1px solid rgb(143, 143, 143);
    width: 40px;
    height: 1px;
    margin-left: 6px;
    margin-right: 6px;
    transform: translateY(-8px);
`
const H1 = styled.h1`
    clear: both;
    font-family: halyard-display, sans-serif;
    font-size: 3rem;
    font-weight: 400;
    margin-top: -10px;
`
const P = styled.p`
    clear: both;
    font-family: halyard-text, sans-serif;
    font-size: 0.9rem;
    font-weight: 200;
    font-style: italic;
    max-width: 600px;
    line-height: 1.5rem;
    color: rgb(143, 143, 143);
`
const PBody = styled.p`
    clear: both;
    font-family: halyard-text, sans-serif;
    font-size: 0.9rem;
    font-weight: 200;
    font-style: normal;
    max-width: 600px;
    line-height: 1.5rem;
    color: rgb(0, 0, 0);
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
const VideoWrapper = styled.div`
    position: relative;
    height: 300px;
    width: 532px;
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
        opacity: 1;
    }
    `;
const Video = styled.video`
    height: 100%;
    width: auto;
    transition: all 0.3s ease;
    border: 1px solid black;
    z-index: 2;
    @media only screen and (max-width: 768px) {
        width: calc(100vw - 80px);
    }
    ${VideoWrapper}:hover & {
        filter: brightness(0.5);
    }
`;
const End = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 60px;
`
const VerticalLine = styled.div`
    height: 40px;
    width: 1px;
    border-left: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 6px;
`
const SmallBlobAnimation = styled.div`
    height: 10px;
    width: 10px;
    animation: 3s ease-in-out 0s infinite colorShifter1;
    @keyframes colorShifter1 {
    25% { transform: rotate(90deg); }
    40% { background-color: #438dff; }
    50% { background-color: #40cd47; transform: rotate(90deg); }
    60% { background-color: #438dff; }
    75% { transform: rotate(90deg); }
    100% { transform: rotate(90deg); }
  }
  @keyframes colorShifter2 {
    25% { transform: scale(1.1); }
    40% { background-color: rgb(255, 208, 0); }
    50% { background-color: #40cd47; transform: scale(1); }
    60% { background-color: rgb(255, 208, 0); }
    75% { transform: scale(0.9); }
    100% { transform: scale(1); }
  }
  @keyframes colorShifter3 {
    25% { transform: skew(25deg); }
    40% { border-bottom: 10px solid #f6543c; }
    50% { border-bottom: 10px solid #40cd47; transform: skew(0deg); }
    60% { border-bottom: 10px solid #f6543c; }
    75% { transform: skew(-25deg); }
    100% { transform: skew(0deg); }
  }
`
const Images = styled.div`
    display: flex;
`
const ImageDash = styled.img`
    width: 350px;
    cursor: pointer;
`
const ImageEmail = styled.img`
    width: 460px;
    margin-right: 20px;
    cursor: pointer;
`
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

const ModalContent = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;
    position: relative;
    max-height: 100vh;
    overflow: hidden;
`;

const ModalVideo = styled.video`
    width: 100%;
    height: auto;
    max-width: 1000px;
    z-index: 2;
`;

const ModalImage = styled.img`
    width: 100%;
    height: auto;
    max-width: 1000px;
    z-index: 2;
`;

const Arrow = styled.div`
    font-size: 2rem;
    color: white;
    cursor: pointer;
    margin: 0 10px;
    z-index: 3;
`;

const Breadcrumbs = styled.div`
    position: absolute;
    bottom: 20px;
    display: flex;
    justify-content: center;
    gap: 8px;
    width: 100%;
    z-index: 4;
`;

const BreadcrumbDot = styled.div<{ isActive: boolean }>`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${({ isActive }) => (isActive ? 'white' : 'gray')};
    cursor: pointer;
    transition: background-color 0.3s ease;
`;

const Close = styled.button`
    all: unset;
    position: absolute;
    top: 40px;
    right: 40px;
    color: white;
    cursor: pointer;
`;

const SpanningDetails = () => {
    const { boxInView } = useControlPanel();
    const myDivRef = useRef<HTMLDivElement>(null);
    const { isModalOpen, setModalOpen } = useNavContext();
    const [currentIndex, setCurrentIndex] = useState(0);
    const galleryItems = [Image1, Image2, SpanningVideo];

    const resetScroll = () => {
        if (myDivRef.current) {
            myDivRef.current.scrollTop = 0; // Reset scroll to the top
        }
    };
    useEffect(() => {
        if (boxInView !== 10) {
            setTimeout(() => {
                resetScroll();
            }, 1000)
        }
    }, [boxInView]);

    const handleOpenModal = (index: number) => {
        setCurrentIndex(index);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleNext = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryItems.length);
    }, [galleryItems.length]);

    const handlePrev = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + galleryItems.length) % galleryItems.length);
    }, [galleryItems.length]);

    const handleBreadcrumbClick = (index: number) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (isModalOpen) {
                if (event.key === "ArrowRight") {
                    handleNext();
                } else if (event.key === "ArrowLeft") {
                    handlePrev();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isModalOpen, handleNext, handlePrev]);

    return (
        <Frame ref={myDivRef}>
            {/* Modal for Image and Video Carousel */}
            <Modal isOpen={isModalOpen}>
                <ModalContent>
                    <Arrow onClick={handlePrev}><RiArrowLeftSLine /></Arrow>
                    {currentIndex === 2 ? (
                        <ModalVideo src={galleryItems[currentIndex]} controls autoPlay />
                    ) : (
                        <ModalImage src={galleryItems[currentIndex]} />
                    )}
                    <Arrow onClick={handleNext}><RiArrowRightSLine /></Arrow>
                    <Breadcrumbs>
                        {galleryItems.map((_, index) => (
                            <BreadcrumbDot
                                key={index}
                                isActive={index === currentIndex}
                                onClick={() => handleBreadcrumbClick(index)}
                            />
                        ))}
                    </Breadcrumbs>
                </ModalContent>
                <Close onClick={handleCloseModal}><RiCloseLargeFill /></Close>
            </Modal>
            <Padded>
                <Heading>
                    <Scope>
                        <Caption>Scope</Caption>
                        <P>
                            UX/UI,
                            <br />
                            Graphic Design
                        </P>
                        <Caption>Links</Caption>
                        <A href="https://www.spanning.com/" target="_blank">
                            Visit Site
                        </A>
                    </Scope>
                    <Summary>
                        <Top>
                            <Caption style={{ textTransform: "uppercase" }}>Web app</Caption>
                            <Line />
                            <Caption>2019</Caption>
                        </Top>
                        <H1>Spanning Cloud Apps</H1>
                        <P>
                            To comply with my non-disclosure agreement, I have omitted and
                            obfuscated confidential information in this case study. All
                            information in this case study is my own and does not necessarily
                            reflect the views of Spanning Cloud Apps.
                        </P>
                        <Caption>Summary</Caption>
                        <PBody>
                            &nbsp;&nbsp;&nbsp;Spanning Cloud Apps is a SaaS solution that
                            provides data protection for Microsoft 365, G Suite, and
                            Salesforce, empowering administrators and users to restore lost
                            data with ease.
                            <br />
                            &nbsp;&nbsp;&nbsp;As part of an agile design team, I contributed
                            to the development of new features across all Spanning products.
                            Our team follows an iterative approach, releasing new features in
                            small chunks and typically completing each block within two weeks.
                            <br />
                            &nbsp;&nbsp;&nbsp;This case study showcases the type of work I was
                            involved in while working with the Spanning Cloud Apps team.
                        </PBody>
                    </Summary>
                </Heading>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Images style={{ display: 'flex', flexDirection: 'column' }}>
                        <ImageDash style={{ outline: '1px solid black' }} onClick={() => handleOpenModal(0)} src={Image1} />
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                paddingTop: "20px",
                            }}
                        >
                            <P>Dashboard</P>
                            <PBody style={{ width: "300px" }}>
                                Spanning Cloud Apps dashboard: Designed for intuitive navigation,
                                with customizable widgets that highlight key information and data,
                                empowering users to prioritize and manage resources efficiently
                                based on their unique needs.
                            </PBody>
                        </div>
                    </Images>
                    <Images
                        style={{
                            alignItems: "flex-end",
                            flexDirection: "column",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                            }}
                        >
                            <ImageEmail style={{ outline: '1px solid black' }} onClick={() => handleOpenModal(1)} src={Image2} />
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    width: "460px",
                                    paddingRight: "20px",
                                    paddingTop: "20px",
                                }}
                            >
                                <P>Daily Email Summary</P>
                                <PBody>
                                    Daily email backup summary: Delivered in a clean, well-organized
                                    format, this summary provides users with a clear and concise
                                    overview of their backup status. The design ensures that
                                    essential information is easily accessible, allowing users to
                                    quickly grasp the health of their data backups. With a focus on
                                    clarity and usability, this summary helps users stay informed
                                    and confident in the security of their critical data.
                                </PBody>
                            </div>
                        </div>
                    </Images>
                </div>
                <div style={{ width: '100vw', display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' }}>
                    <VideoWrapper>
                        <Video onClick={() => handleOpenModal(2)} src={SpanningVideo} autoPlay loop muted />
                        <HoverText><RiExpandDiagonalFill /></HoverText>
                    </VideoWrapper>
                    <P style={{ paddingTop: "20px", width: "540px" }}>
                        Explore Spanning Cloud Apps for Office 360—watch as a user navigates
                        backup, restoration, file management, and activity tracking,
                        showcasing the platform’s robust functionality.
                    </P>
                </div>
                <End>
                    <VerticalLine />
                    <SmallBlobAnimation />
                </End>
            </Padded>
        </Frame>
    );
}

export default SpanningDetails