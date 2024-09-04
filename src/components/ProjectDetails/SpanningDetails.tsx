import styled from "styled-components";
import SpanningVideo from '/spanning_1080p.mp4';
import Image1 from '../../assets/Dash1.png';
import Image2 from '../../assets/email1.png';
import { useControlPanel } from "../Contexts/ControlPanelContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavContext } from "../Contexts/NavContext";
import { RiArrowLeftSLine, RiArrowRightSLine, RiCloseLargeFill } from "react-icons/ri";
import styles from './details.module.css';
import Template from "./template";

const Images = styled.div`
    display: flex;
`
const ImageDash = styled.img`
    width: 350px;
    cursor: pointer;
`
const ImageEmail = styled.img`
    width: calc(100vw - 40px);
    max-width: 460px;
    margin-right: 20px;
    cursor: pointer;
`
const Modal = styled.div<{ $isOpen: boolean }>`
    display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
`;
const BreadcrumbDot = styled.div<{ $isActive: boolean }>`
    background-color: ${({ $isActive }) => ($isActive ? 'white' : 'gray')};
`;
const ImagesContainer = styled.div`
    width: 100%; 
    display: flex; 
    flex-direction: row; 
    justify-content: space-between;
    margin-bottom: 60px;
    margin-top: 60px;
    @media only screen and (max-width: 1250px) {
        flex-direction: column;
        gap: 60px;
	}
`

const SpanningDetails = () => {
    const { boxInView } = useControlPanel();
    const myDivRef = useRef<HTMLDivElement>(null);
    const { isModalOpen, setModalOpen } = useNavContext();
    const [currentIndex, setCurrentIndex] = useState(0);
    const galleryItems = [Image1, Image2];

    const scopeContents = (
        <p className={`${styles.scopeList} ${styles.p}`}>
            UX/UI,
            <br />
            Graphic Design
        </p>
    );
    const projectLink = "https://www.spanning.com";
    const projectType = "WEB APP";
    const year = "2019";
    const title = (
        <h1 className={styles.h1}>
            Spanning Cloud Apps
        </h1>
    );
    const nonDisclosure = `
        To comply with my non-disclosure agreement, I have omitted and
        obfuscated confidential information in this case study. All
        information in this case study is my own and does not
        necessarily reflect the views of NQ Hardware and General
        Enterprise.
    `;
    const summaryContent = (
        <p className={styles.pBody}>
            Spanning Cloud Apps is a SaaS solution that
            provides data protection for Microsoft 365, G Suite, and
            Salesforce, empowering administrators and users to restore lost
            data with ease.
            <br />
            <br />
            As part of an agile design team, I contributed
            to the development of new features across all Spanning products.
            Our team follows an iterative approach, releasing new features in
            small chunks and typically completing each block within two weeks.
            This case study showcases the type of work I was
            involved in while working with the Spanning Cloud Apps team.
        </p>
    );

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
        <div className={styles.frame} ref={myDivRef}>
            <div className={styles.padding}>
                <Modal className={styles.modal} $isOpen={isModalOpen}>
                    <div className={styles.modalContent}>
                        <div className={styles.arrow} onClick={handlePrev}>
                            <RiArrowLeftSLine />
                        </div>
                        <img
                            className={styles.modalImage}
                            src={galleryItems[currentIndex]}
                        />
                        <div className={styles.arrow} onClick={handleNext}>
                            <RiArrowRightSLine />
                        </div>
                        <div className={styles.breadCrumbs}>
                            {galleryItems.map((_, index) => (
                                <BreadcrumbDot
                                    className={styles.breadCrumbDot}
                                    key={index}
                                    $isActive={index === currentIndex}
                                    onClick={() => handleBreadcrumbClick(index)}
                                />
                            ))}
                        </div>
                    </div>
                    <button className={styles.close} onClick={handleCloseModal}>
                        <RiCloseLargeFill />
                    </button>
                </Modal>
            </div>
            <Template
                scopeContents={scopeContents}
                projectLink={projectLink}
                projectType={projectType}
                year={year}
                title={title}
                nonDisclosure={nonDisclosure}
                summaryContent={summaryContent}
            />
            <div className={styles.padded}>
                <ImagesContainer>
                    <Images style={{ display: 'flex', flexDirection: 'column' }}>
                        <ImageDash style={{ outline: '1px solid black' }} onClick={() => handleOpenModal(0)} src={Image1} />
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                paddingTop: "20px",
                            }} >
                            <p className={styles.p}>Dashboard</p>
                            <p className={styles.pBody} style={{ width: "300px" }}>
                                Spanning Cloud Apps dashboard: Designed for intuitive navigation,
                                with customizable widgets that highlight key information and data,
                                empowering users to prioritize and manage resources efficiently
                                based on their unique needs.
                            </p>
                        </div>
                    </Images>
                    <Images
                        style={{
                            alignItems: "flex-end",
                            flexDirection: "column",
                        }}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                            }}>
                            <ImageEmail style={{ outline: '1px solid black' }} onClick={() => handleOpenModal(1)} src={Image2} />
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    width: 'calc(100vw - 40px)',
                                    maxWidth: "460px",
                                    paddingRight: "20px",
                                    paddingTop: "20px",
                                }}>
                                <p className={styles.p}>Daily Email Summary</p>
                                <p style={{ maxWidth: '450px' }} className={styles.pBody}>
                                    Daily email backup summary: Delivered in a clean, well-organized
                                    format, this summary provides users with a clear and concise
                                    overview of their backup status. The design ensures that
                                    essential information is easily accessible, allowing users to
                                    quickly grasp the health of their data backups. With a focus on
                                    clarity and usability, this summary helps users stay informed
                                    and confident in the security of their critical data.
                                </p>
                            </div>
                        </div>
                    </Images>
                </ImagesContainer>
                <div style={{ width: "calc(100vw - 40px)", display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' }}>
                    <div className={styles.videoWrapper}>
                        <video className={styles.video} src={SpanningVideo} controls autoPlay loop muted playsInline />
                    </div>
                    <p className={styles.p} style={{ paddingTop: "20px", width: 'calc(100vw - 40px)', maxWidth: "540px" }}>
                        Explore Spanning Cloud Apps for Office 360—watch as a user navigates
                        backup, restoration, file management, and activity tracking,
                        showcasing the platform’s robust functionality.
                    </p>
                </div>
                <div className={styles.end}>
                    <div className={styles.verticalLine} />
                    <div className={styles.smallShapeAnimation} />
                </div>
            </div>
        </div>
    );
}

export default SpanningDetails