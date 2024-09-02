import { useCallback, useEffect, useRef, useState } from "react";
import Screenshot1 from "../../assets/nqhardware-shop-fold-screenshot.png";
import Screenshot2 from "../../assets/nqhardware-store-scrolled-screenshot.png";
import Screenshot3 from "../../assets/nqhardware-zipties-screenshot.png";
import Screenshot4 from "../../assets/nqhardware-editing-screenshot.png";
import NQhardware from "/nqhardware-sequence.mp4";
import { useControlPanel } from "../Contexts/ControlPanelContext";
import styles from './details.module.css';
import Template from "./template";
import { useNavContext } from "../Contexts/NavContext";
import { styled } from "styled-components";
import {
    RiArrowLeftSLine,
    RiArrowRightSLine,
    RiCloseLargeFill,
} from "react-icons/ri";

const Modal = styled.div<{ $isOpen: boolean }>`
	display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
`;
const BreadcrumbDot = styled.div<{ $isActive: boolean }>`
	background-color: ${({ $isActive }) => ($isActive ? "white" : "gray")};
`;
const ImgVariant = styled.img`
    width: calc(100vw - 70%);
    @media only screen and (max-width: 768px) {
        width: calc(100vw - 40px);
    }
`

const NQHardwareDetails = () => {
    const { boxInView } = useControlPanel();
    const myDivRef = useRef<HTMLDivElement>(null);
    const { isModalOpen, setModalOpen } = useNavContext();
    const [currentIndex, setCurrentIndex] = useState(0);
    const galleryItems = [Screenshot1, Screenshot2, Screenshot3, Screenshot4];

    const scopeContents = (
        <p className={`${styles.scopeList} ${styles.p}`}>
            Full Stack Development,
            <br />
            UX/UI,
            <br />
            Web Design
        </p>
    );
    const projectLink = "https://www.nqhardware.com";
    const projectType = "WEB APP, E-COMMERCE";
    const year = "2024";
    const title = (
        <h1 className={styles.h1}>
            NQ Hardware <br />
            and General Enterprise
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
            NQ Hardware and General Enterprise is an
            ongoing project aimed at enhancing the store's operations and
            customer engagement through a full-stack web application. This
            app serves as a vital tool for managing stock prices, sales, and
            inventory, ensuring that the store maintains an efficient and
            competitive edge.
            <br />
            <br />
            Beyond traditional retail functions, the
            application offers a dedicated portal tailored for customers in
            the general enterprise sector. This portal enables users to
            monitor shipments for construction materials, coordinate with
            contractors, rent tools, and arrange for installation
            services—all within a streamlined interface.
            <br />
            <br />
            A key feature of the app is its user tier
            system, which assigns different access levels for store
            employees and administrators, safeguarding the integrity of the
            store's operations. The front-end is developed using React
            TypeScript, providing a responsive and user-friendly interface,
            while the backend, built with Express.js and MySQL, ensures
            robust data management.
            <br />
            <br />
            This project demonstrates my ability to
            develop practical, scalable solutions that meet the complex
            needs of businesses, supporting their growth in an increasingly
            digital marketplace.
        </p>
    );

    const handleNext = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryItems.length);
    }, [galleryItems.length]);

    const handlePrev = useCallback(() => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + galleryItems.length) % galleryItems.length
        );
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

    const resetScroll = () => {
        if (myDivRef.current) {
            myDivRef.current.scrollTop = 0;
        }
    };

    useEffect(() => {
        if (boxInView !== 6) {
            setTimeout(() => {
                resetScroll();
            }, 1000);
        }
    }, [boxInView]);

    const handleOpenModal = (index: number) => {
        setCurrentIndex(index);
        setModalOpen(true);
    };
    const handleCloseModal = () => {
        setModalOpen(false);
    };

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
            <div className={styles.images}
                style={{ justifyContent: "flex-start", gap: "20px", marginTop: "60px" }}>
                <div>
                    <div className={styles.padded}>
                        <ImgVariant className={styles.image}
                            src={Screenshot1}
                            onClick={() => handleOpenModal(0)}
                        />
                        <p className={styles.p} style={{ paddingTop: "20px" }}>Shop: Main fold.</p>
                        <p className={styles.pBody}>
                            Designed the main fold to prominently feature key categories and
                            personalized suggestions, optimizing user engagement and enhancing
                            the shopping experience through strategic placement and intuitive
                            design.
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.padded}
                style={{
                    width: "100vw",
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingRight: "20px",
                }}>
                <div className={styles.images}
                    style={{
                        flexDirection: "column",
                        justifyContent: "flex-start",
                    }}>
                    <img className={styles.image}
                        style={{ width: 'calc(100vw - 40px)', maxWidth: "400px" }}
                        src={Screenshot2}
                        onClick={() => handleOpenModal(1)} />
                    <p className={styles.p} style={{ paddingTop: "20px" }}>Shop: Scrolled down.</p>
                    <p className={styles.pBody} style={{ width: 'calc(100vw - 40px)', maxWidth: "400px" }}>
                        Designed the shop page to prioritize seamless navigation with
                        versatile filtering options, including a dropdown and a left column
                        filter. These features allow users to refine their shopping
                        experience effortlessly, enabling them to quickly find the items
                        that match their preferences through intuitive and strategic
                        filtering design.
                    </p>
                </div>
            </div>
            <div className={styles.images}
                style={{
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    gap: "20px",
                }}
            >
                <img className={styles.image}
                    style={{
                        width: "100vw",
                        maxWidth: "100vw",
                        cursor: 'default',
                    }}
                    src={Screenshot3}
                />
                <div className={styles.padded} style={{ justifyContent: "flex-start" }}>
                    <p className={styles.p} style={{ paddingTop: "20px" }}>Item View & Cart.</p>
                    <p className={styles.pBody}>
                        Built an item page that shows all the essential details—pricing,
                        ratings, descriptions, and more. You can easily add items to your
                        cart or wishlist, adjust quantities, and see what's in your cart at
                        a glance. Thanks to smooth API calls, everything updates in
                        real-time, making the shopping process quick and hassle-free.
                    </p>
                </div>
            </div>
            <div className={styles.padded}>
                <div className={styles.images} style={{ flexDirection: "column", alignItems: "flex-end", marginBottom: '60px' }}>
                    <div style={{ justifyContent: "flex-start", paddingRight: "20px" }}>
                        <img className={styles.image} src={Screenshot4} onClick={() => handleOpenModal(3)} />
                        <div style={{ justifyContent: "flex-start" }}>
                            <p className={styles.p} style={{ paddingTop: "20px" }}>
                                Role-Based Access Control: Editing an item.
                            </p>
                            <p className={styles.pBody}>
                                Showcasing the super or admin view of NQ Hardware's role-based
                                access control web app. This interface allows employees and
                                store owner to efficiently manage and edit inventory items,
                                offering comprehensive control over key details such as pricing,
                                stock levels, descriptions, and more. The design ensures a
                                streamlined and intuitive experience, tailored for effective
                                inventory management within a dynamic retail environment.
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.images}
                    style={{ flexDirection: "column", width: "auto" }}>
                    <div className={styles.videoWrapper}>
                        <video className={styles.video} src={NQhardware} controls autoPlay loop muted playsInline />
                    </div>
                    <p className={styles.p} style={{ paddingTop: "20px" }}>
                        Quick Tour: Explore the NQ Hardware site in action.
                    </p>
                </div>
                <div className={styles.end}>
                    <div className={styles.verticalLine} />
                    <div className={styles.smallShapeAnimation} />
                </div>
            </div>
        </div>
    );
};

export default NQHardwareDetails;
