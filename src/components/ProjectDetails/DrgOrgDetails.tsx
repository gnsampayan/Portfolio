import styled from "styled-components";
import DrgOrg from '/designrun.mp4';
import Wordmard from '../../assets/drg_branding.png';
import Screenshot from '../../assets/drg_sample_page.png';
import { useControlPanel } from "../Contexts/ControlPanelContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavContext } from "../Contexts/NavContext";
import { RiArrowLeftSLine, RiArrowRightSLine, RiCloseLargeFill } from "react-icons/ri";
import styles from './details.module.css';
import Template from "./template";

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
const Image = styled.img`
    width: 100vw;
`

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

const BreadcrumbDot = styled.div<{ $isActive: boolean }>`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${({ $isActive }) => ($isActive ? 'white' : 'gray')};
    cursor: pointer;
    transition: background-color 0.3s ease;
`;


const DrgOrgDetails = () => {
    const { boxInView } = useControlPanel();
    const myDivRef = useRef<HTMLDivElement>(null);
    const { isModalOpen, setModalOpen } = useNavContext();
    const [currentIndex, setCurrentIndex] = useState(0);
    const galleryItems = [Screenshot, Wordmard];

    const scopeContents = (
        <p className={`${styles.scopeList} ${styles.p}`}>
            Art Direction,
            <br />
            UX/UI,
            <br />
            Web Design,
            <br />
            Front-End Development
        </p>
    );
    const projectLink = "https://www.designrun.org";
    const projectType = "WEBSITE";
    const year = "2019";
    const title = (
        <h1 className={styles.h1}>
            Designrun.org
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
            &nbsp;&nbsp;&nbsp;DesignRun.org is a healthcare startup and
            non-profit organization that aims to establish a strong brand
            identity and digital presence to reach its target audience of
            current and future investors, clients, and partners.
            <br />
            &nbsp;&nbsp;&nbsp;The challenge was to create a minimalist and
            subtle brand identity, user-friendly interface, and smooth user
            experience with limited resources and time. Despite these
            constraints, the team successfully delivered a website that
            effectively communicated the company's mission and provided a
            seamless experience for its users.
        </p>
    );

    const resetScroll = () => {
        if (myDivRef.current) {
            myDivRef.current.scrollTop = 0; // Reset scroll to the top
        }
    };
    useEffect(() => {
        if (boxInView !== 9) {
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
            <div className={styles.padded}>
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
            <div style={{ width: '100vw', display: 'flex', justifyContent: 'flex-end', marginTop: '60px' }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: 'flex-start',
                        gap: "20px",
                        flexDirection: 'column',
                    }}
                >
                    <Image src={Screenshot} />
                    <div className={styles.padded}>
                        <P style={{ paddingTop: '20px' }}>Screen Shot</P>
                        <PBody style={{ width: "600px" }}>
                            A glimpse of DesignRun.org’s website: Highlighting the strategic
                            layout, refined typography, and cohesive color palette that
                            together create a seamless and engaging user experience.
                        </PBody>
                    </div>
                </div>
            </div>
            <div className={styles.padded}>
                <div style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    gap: "20px",
                    width: '100%',
                    height: 'auto',
                    marginBottom: '60px',
                    marginTop: '60px',
                }}>
                    <img className={styles.image} onClick={() => handleOpenModal(1)} style={{ width: '100%', maxWidth: "400px", height: '100%', border: '1px solid black' }} src={Wordmard} />
                    <div style={{ width: '100%', maxWidth: "260px", paddingRight: '20px' }}>
                        <p className={styles.p} style={{ paddingTop: '20px' }}>Brand Guide</p>
                        <p className={styles.pBody} >
                            DesignRun.org's brand guide: Showcasing the carefully selected
                            typography, color palette, and wordmark that define the brand’s
                            minimalist and impactful visual identity.
                        </p>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                        <div className={styles.videoWrapper}>
                            <video className={styles.video} src={DrgOrg} controls autoPlay loop muted playsInline />
                        </div>
                        <p className={styles.p} style={{ paddingTop: "20px", width: "500px" }}>
                            Explore DesignRun.org’s minimalist design, thoughtful typography,
                            and strategic layout, all crafted to communicate the brand’s
                            mission.
                        </p>
                    </div>
                </div>
                <div className={styles.end}>
                    <div className={styles.verticalLine} />
                    <div className={styles.smallShapeAnimation} />
                </div>
            </div>
        </div>
    );
}

export default DrgOrgDetails