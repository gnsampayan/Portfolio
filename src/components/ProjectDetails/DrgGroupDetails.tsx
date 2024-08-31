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

const P = styled.p`
	clear: both;
	font-family: halyard-text, sans-serif;
	font-size: 0.9rem;
	font-weight: 200;
	font-style: italic;
	max-width: 600px;
	line-height: 1.5rem;
	color: rgb(143, 143, 143);
`;
const PBody = styled.p`
	clear: both;
	font-family: halyard-text, sans-serif;
	font-size: 0.9rem;
	font-weight: 200;
	font-style: normal;
	max-width: 600px;
	line-height: 1.5rem;
	color: rgb(0, 0, 0);
`;
const Modal = styled.div<{ $isOpen: boolean }>`
	display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
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
	background-color: ${({ $isActive }) => ($isActive ? "white" : "gray")};
	cursor: pointer;
	transition: background-color 0.3s ease;
`;

const Logo1Div = styled.img`
	position: absolute;
	left: 20px;
	top: 20px;
	height: auto;
	width: 400px;
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
	width: 400px;
	opacity: 0;
	transition: opacity 1s ease;
	z-index: 1;
`;

const Image1 = styled.img`
	position: absolute;
	right: 0;
	top: 0;
	width: auto;
	height: 600px;
	max-width: 600px;
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

const Image2 = styled.img`
	position: absolute;
	right: 0;
	top: 0;
	width: auto;
	height: 600px;
	opacity: 0;
	transition: opacity 1s ease;
	z-index: 9;
`;

const Examples = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding-right: 20px;
	@media only screen and (max-width: 1250px) {
		flex-direction: column;
		justify-content: flex-start;
		gap: 60px;
		margin-bottom: 60px;
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

const ImageOverlap = styled.div`
	position: relative;
	display: block;
	height: 602px;
	width: 402px;
	z-index: 9;
	outline: 1px solid black;
	cursor: pointer;
`;

const LogoOverlap = styled.div`
	position: relative;
	width: 442px;
	height: 122px;
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
			&nbsp;&nbsp;&nbsp;DesignRun.org is a healthcare startup and non-profit organization that
			aims to establish a strong brand identity and digital presence to reach
			its target audience of current and future investors, clients, and
			partners.
			<br />
			&nbsp;&nbsp;&nbsp;The challenge was to create a minimalist and subtle brand identity,
			user-friendly interface, and smooth user experience with limited resources
			and time.
			<br />
			&nbsp;&nbsp;&nbsp;Despite these constraints, the team successfully delivered a website that
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
				<Examples style={{ marginTop: "60px" }}>
					<div>
						<LogoOverlap>
							<Logo1Div src={Logo1} />
							<Logo2Div src={Logo2} />
						</LogoOverlap>
						<P style={{ paddingTop: "20px" }}>Wordmark.</P>
						<PBody style={{ width: "400px" }}>
							A dynamic wordmark that expertly balances professionalism and
							creativity, shifting tones between bold black and vibrant color to
							embody the essence of DesignRun Group.
						</PBody>
					</div>
					<ImgOverlapContainer>
						<ImageOverlap onClick={() => handleOpenModal(0)}>
							<Image1 src={Screenshot1} />
							<Image2 src={Screenshot2} />
						</ImageOverlap>
						<P style={{ paddingTop: "20px" }}>Dual-view interactive slider.</P>
						<PBody style={{ width: "400px" }}>
							Explore the interactive dual-view slider, where content shifts
							dynamically between two dimensions. Sliding left or right reveals
							interconnected narratives, illustrating how DesignRun Group's design
							seamlessly integrates multiple perspectives into a cohesive user
							experience.
						</PBody>
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
				<P style={{ paddingTop: "20px" }}>
					Experience the bold, innovative design of the DesignRun Group site in
					action.
				</P>
				<div className={styles.end}>
					<div className={styles.verticalLine} />
					<div className={styles.smallShapeAnimation} />
				</div>
			</div>
		</div>
	);
};

export default DrgGroupDetails;
