import styled from "styled-components";
import DRGGroupVid from "/DrgGroupVid.mp4";
import Screenshot1 from "../../assets/drg1.png";
import Screenshot2 from "../../assets/drg2.png";
import Logo1 from "../../assets/drg_logo_v1.svg";
import Logo2 from "../../assets/drg_logo_v2.svg";
import { useCallback, useEffect, useRef, useState } from "react";
import { useControlPanel } from "../Contexts/ControlPanelContext";
import { useNavContext } from "../Contexts/NavContext";
import {
	RiArrowLeftSLine,
	RiArrowRightSLine,
	RiCloseLargeFill,
} from "react-icons/ri";
import styles from "./details.module.css";
import Template from "./template";

const Modal = styled.div<{ $isOpen: boolean }>`
	display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
`;

const BreadcrumbDot = styled.div<{ $isActive: boolean }>`
	background-color: ${({ $isActive }) => ($isActive ? "white" : "gray")};
`;

const Logo1Div = styled.img`
	position: absolute;
	left: 20px;
	top: 20px;
	height: auto;
	width: calc(100vw - 85px);
	max-width: 400px;
	transition: opacity 1s ease;
	opacity: 1;
	&:hover {
		opacity: 0;
	}
	&:hover + img {
		opacity: 1;
	}
	z-index: 999;
`;

const Logo2Div = styled.img`
	position: absolute;
	left: 20px;
	top: 20px;
	height: auto;
	width: calc(100vw - 85px);
	max-width: 400px;
	opacity: 0;
	transition: opacity 1s ease;
	z-index: 1;
`;

const ImageOverlap = styled.div`
	position: relative;
	display: block;
	height: 602px;
	max-width: 402px;
	width: calc(100vw - 40px);
	z-index: 9;
	outline: 1px solid black;
	cursor: pointer;
	@media only screen and (max-width: 768px) {
	}
`;
const Image1 = styled.img`
	position: absolute;
	right: 0;
	top: 0;
	width: auto;
	max-width: 402px;
	height: 600px;
	transition: opacity 1s ease;
	opacity: 1;
	&:hover {
		opacity: 0;
	}
	&:hover + img {
		opacity: 1;
	}
	z-index: 999;
	@media only screen and (max-width: 768px) {
		width: calc(100vw - 40px);
		object-fit: cover;
	}
`;
const Image2 = styled.img`
	position: absolute;
	right: 0;
	top: 0;
	width: auto;
	max-width: 402px;
	height: 600px;
	opacity: 0;
	transition: opacity 1s ease;
	z-index: 9;
	@media only screen and (max-width: 768px) {
		width: calc(100vw - 40px);
		object-fit: cover;
	}
`;

const Examples = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding-right: 20px;
	margin-top: 60px;
	margin-bottom: 60px;
	@media only screen and (max-width: 1250px) {
		flex-direction: column;
		justify-content: flex-start;
		gap: 60px;
	}
`;
const ImgOverlapContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: auto;
	@media only screen and (max-width: 1250px) {
		align-items: flex-end;
		width: 100%;
	}
`
const LogoOverlap = styled.div`
	position: relative;
	max-width: 442px;
	width: calc(100vw - 40px);
	max-height: 122px;
	height: 105px;
	background: white;
	border: 1px solid black;
	cursor: default;
	&:focus {
		cursor: not-allowed;
	}
	&:active {
		cursor: not-allowed;
	}
	z-index: 2;
`;

const DrgGroupDetails = () => {
	const { boxInView } = useControlPanel();
	const myDivRef = useRef<HTMLDivElement>(null);
	const { isModalOpen, setModalOpen } = useNavContext();
	const [currentIndex, setCurrentIndex] = useState(0);

	const galleryItems = [Screenshot1, Screenshot2];
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
	const projectLink = "https://www.designrungroup.com";
	const projectType = "WEBSITE";
	const year = "2023";
	const title = <h1 className={styles.h1}>Designrun Group</h1>;
	const nonDisclosure = `
        To comply with my non-disclosure agreement, I have omitted and
        obfuscated confidential information in this case study. All
        information in this case study is my own and does not
        necessarily reflect the views of NQ Hardware and General
        Enterprise.
    `;
	const summaryContent = (
		<p className={styles.pBody}>
			DesignRun.org is a healthcare startup and non-profit organization that
			aims to establish a strong brand identity and digital presence to reach
			its target audience of current and future investors, clients, and
			partners.
			<br />
			<br />
			The challenge was to create a minimalist and subtle brand identity,
			user-friendly interface, and smooth user experience with limited resources
			and time.
			<br />
			<br />
			Despite these constraints, the team successfully delivered a website that
			effectively communicated the company's mission and provided a seamless
			experience for its users.
		</p>
	);

	const resetScroll = () => {
		if (myDivRef.current) {
			myDivRef.current.scrollTop = 0; // Reset scroll to the top
		}
	};

	useEffect(() => {
		if (boxInView !== 7) {
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
			<div className={styles.padded}>
				<Examples>
					<div>
						<LogoOverlap>
							<Logo1Div src={Logo1} />
							<Logo2Div src={Logo2} />
						</LogoOverlap>
						<p className={styles.p} style={{ paddingTop: "20px" }}>Wordmark.</p>
						<p className={styles.pBody} style={{ width: 'calc(100vw - 40px)', maxWidth: "400px" }}>
							A dynamic wordmark that expertly balances professionalism and
							creativity, shifting tones between bold black and vibrant color to
							embody the essence of DesignRun Group.
						</p>
					</div>
					<ImgOverlapContainer>
						<ImageOverlap onClick={() => handleOpenModal(0)}>
							<Image1 src={Screenshot1} />
							<Image2 src={Screenshot2} />
						</ImageOverlap>
						<p className={styles.p} style={{ paddingTop: "20px" }}>Dual-view interactive slider.</p>
						<p className={styles.pBody} style={{ width: 'calc(100vw - 40px)', maxWidth: "400px" }}>
							Explore the interactive dual-view slider, where content shifts
							dynamically between two dimensions. Sliding left or right reveals
							interconnected narratives, illustrating how DesignRun Group's design
							seamlessly integrates multiple perspectives into a cohesive user
							experience.
						</p>
					</ImgOverlapContainer>
				</Examples>
				<div className={styles.videoWrapper}>
					<video className={styles.video}
						src={DRGGroupVid}
						controls
						autoPlay
						loop
						muted
						playsInline
					/>
				</div>
				<p className={styles.p} style={{ width: 'calc(100vw - 40px)', maxWidth: "500px", paddingTop: "20px" }}>
					Experience the bold, innovative design of the DesignRun Group site in
					action.
				</p>
				<div className={styles.end}>
					<div className={styles.verticalLine} />
					<div className={styles.smallShapeAnimation} />
				</div>
			</div>
		</div>
	);
};

export default DrgGroupDetails;
