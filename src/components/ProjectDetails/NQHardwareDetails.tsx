import styled from "styled-components";
import NQhardware from "../../assets/nqhardware-sequence.mp4";
import Screenshot1 from "../../assets/nqhardware-shop-fold-screenshot.png";
import Screenshot2 from "../../assets/nqhardware-store-scrolled-screenshot.png";
import Screenshot3 from "../../assets/nqhardware-zipties-screenshot.png";
import Screenshot4 from "../../assets/nqhardware-editing-screenshot.png";
import { useControlPanel } from "../Contexts/ControlPanelContext";
import { useEffect, useRef } from "react";

const Frame = styled.div`
	width: 100vw;
	height: 100vh;
	padding: 60px 0px 60px 360px;
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
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
`;
const Heading = styled.div`
	display: flex;
	flex-direction: row;
	gap: 40px;
	align-items: center;
	justify-content: center;
`;
const Scope = styled.div`
	display: flex;
	flex-direction: column;
	text-align: right;
    align-items: flex-end;
`;
const Caption = styled.p`
	font-family: halyard-text, sans-serif;
	font-size: 1.1rem;
	font-weight: 200;
	color: rgb(143, 143, 143);
	float: left;
`;
const Summary = styled.div`
	display: flex;
	flex-direction: column;
`;
const Top = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;
const Line = styled.div`
	border-top: 1px solid rgb(143, 143, 143);
	width: 40px;
	height: 1px;
	margin-left: 6px;
	margin-right: 6px;
	transform: translateY(-8px);
`;
const H1 = styled.h1`
	clear: both;
	font-family: halyard-display, sans-serif;
	font-size: 3rem;
	font-weight: 400;
	margin-top: -10px;
`;
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
`;
const Video = styled.video`
	height: 300px;
	transition: all 1s ease;
	box-shadow: 0px 0px 12px 4px rgba(0, 0, 0, 0.2);
	z-index: 2;
	@media only screen and (max-width: 768px) {
		width: calc(100vw - 80px);
	}
`;
const Image = styled.img`
	width: 600px;
	box-shadow: 0px 0px 12px 4px rgba(0, 0, 0, 0.2);
`;
const End = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
const VerticalLine = styled.div`
	height: 40px;
	width: 1px;
	border-left: 1px solid rgba(0, 0, 0, 0.2);
	margin-bottom: 6px;
`;
const SmallBlobAnimation = styled.div`
	height: 10px;
	width: 10px;
	animation: 3s ease-in-out 0s infinite colorShifter1;
	@keyframes colorShifter1 {
		25% {
			transform: rotate(90deg);
		}
		40% {
			background-color: #438dff;
		}
		50% {
			background-color: #40cd47;
			transform: rotate(90deg);
		}
		60% {
			background-color: #438dff;
		}
		75% {
			transform: rotate(90deg);
		}
		100% {
			transform: rotate(90deg);
		}
	}
	@keyframes colorShifter2 {
		25% {
			transform: scale(1.1);
		}
		40% {
			background-color: rgb(255, 208, 0);
		}
		50% {
			background-color: #40cd47;
			transform: scale(1);
		}
		60% {
			background-color: rgb(255, 208, 0);
		}
		75% {
			transform: scale(0.9);
		}
		100% {
			transform: scale(1);
		}
	}
	@keyframes colorShifter3 {
		25% {
			transform: skew(25deg);
		}
		40% {
			border-bottom: 10px solid #f6543c;
		}
		50% {
			border-bottom: 10px solid #40cd47;
			transform: skew(0deg);
		}
		60% {
			border-bottom: 10px solid #f6543c;
		}
		75% {
			transform: skew(-25deg);
		}
		100% {
			transform: skew(0deg);
		}
	}
`;
const Images = styled.div`
    position: relative;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
`

const NQHardwareDetails = () => {
    const { boxInView } = useControlPanel();
    const myDivRef = useRef<HTMLDivElement>(null);

    const resetScroll = () => {
        if (myDivRef.current) {
            myDivRef.current.scrollTop = 0; // Reset scroll to the top
        }
    };
    useEffect(() => {
        if (boxInView !== 7) {
            setTimeout(() => {
                resetScroll();
            }, 1000)
        }
    }, [boxInView]);
    return (
        <Frame ref={myDivRef}>
            <Heading>
                <Scope>
                    <Caption>Scope</Caption>
                    <P>
                        Full Stack Development,
                        <br />
                        UX/UI,
                        <br />
                        Web Design
                    </P>
                    <Caption>Links</Caption>
                    <A href="https://www.nqhardware.com/" target="_blank">
                        {" "}
                        Visit Site{" "}
                    </A>
                </Scope>
                <Summary>
                    <Top>
                        <Caption>WEB APP, E-COMMERCE</Caption>
                        <Line />
                        <Caption>2024</Caption>
                    </Top>
                    <H1>
                        NQ Hardware <br />
                        and General Enterprise
                    </H1>
                    <P>
                        To comply with my non-disclosure agreement, I have omitted and
                        obfuscated confidential information in this case study. All
                        information in this case study is my own and does not necessarily
                        reflect the views of NQ Hardware and General Enterprise.
                    </P>
                    <Caption>Summary</Caption>
                    <PBody>
                        &nbsp;&nbsp;&nbsp;NQ Hardware and General Enterprise is an ongoing
                        project aimed at enhancing the store's operations and customer
                        engagement through a full-stack web application. This app serves
                        as a vital tool for managing stock prices, sales, and inventory,
                        ensuring that the store maintains an efficient and competitive
                        edge.
                        <br />
                        &nbsp;&nbsp;&nbsp;Beyond traditional retail functions, the
                        application offers a dedicated portal tailored for customers in
                        the general enterprise sector. This portal enables users to
                        monitor shipments for construction materials, coordinate with
                        contractors, rent tools, and arrange for installation services—all
                        within a streamlined interface.
                        <br />
                        &nbsp;&nbsp;&nbsp;A key feature of the app is its user tier
                        system, which assigns different access levels for store employees
                        and administrators, safeguarding the integrity of the store's
                        operations. The front-end is developed using React TypeScript,
                        providing a responsive and user-friendly interface, while the
                        backend, built with Express.js and MySQL, ensures robust data
                        management.
                        <br />
                        &nbsp;&nbsp;&nbsp;This project demonstrates my ability to develop
                        practical, scalable solutions that meet the complex needs of
                        businesses, supporting their growth in an increasingly digital
                        marketplace.
                    </PBody>
                </Summary>
            </Heading>
            <div>
                <Video src={NQhardware} autoPlay loop muted />
                <P style={{ paddingTop: "20px" }}>
                    Quick Tour: Explore the NQ Hardware site in action.
                </P>
            </div>
            <Images style={{ justifyContent: "space-between", gap: "20px" }}>
                <div>
                    <Image style={{ width: "800px" }} src={Screenshot1} />
                    <P style={{ paddingTop: "20px" }}>Shop: Main fold.</P>
                    <PBody>
                        Designed the main fold to prominently feature key categories and
                        personalized suggestions, optimizing user engagement and enhancing
                        the shopping experience through strategic placement and intuitive
                        design.
                    </PBody>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        paddingRight: "20px",
                    }}
                >
                    <Image style={{ width: "400px" }} src={Screenshot2} />
                    <P style={{ paddingTop: "20px" }}>Shop: Scrolled down.</P>
                    <PBody style={{ width: '400px' }}>
                        Designed the main fold to prominently feature key categories and
                        personalized suggestions, optimizing user engagement and enhancing
                        the shopping experience through strategic placement and intuitive
                        design.
                    </PBody>
                </div>
            </Images>
            <Images style={{ justifyContent: "flex-start", gap: "20px" }}>
                <Image src={Screenshot3} />
                <div style={{ justifyContent: "flex-start", paddingRight: "20px" }}>
                    <P style={{ paddingTop: "20px" }}>Item View & Cart.</P>
                    <PBody>
                        Built an item page that shows all the essential details—pricing,
                        ratings, descriptions, and more. You can easily add items to your
                        cart or wishlist, adjust quantities, and see what's in your cart
                        at a glance. Thanks to smooth API calls, everything updates in
                        real-time, making the shopping process quick and hassle-free.
                    </PBody>
                </div>
            </Images>
            <Images style={{ flexDirection: "column", alignItems: "flex-end" }}>
                <div style={{ justifyContent: "flex-start" }}>
                    <Image src={Screenshot4} />
                    <div style={{ justifyContent: "flex-start", paddingRight: "20px" }}>
                        <P style={{ paddingTop: "20px" }}>Role-Based Access Control: Editing an item</P>
                        <PBody>
                            Showcasing the super or admin view of NQ Hardware's role-based
                            access control web app. This interface allows employees and store owner to
                            efficiently manage and edit inventory items, offering
                            comprehensive control over key details such as pricing, stock
                            levels, descriptions, and more. The design ensures a streamlined
                            and intuitive experience, tailored for effective inventory
                            management within a dynamic retail environment.
                        </PBody>
                    </div>
                </div>
            </Images>
            <End>
                <VerticalLine />
                <SmallBlobAnimation />
            </End>
        </Frame>
    );
};

export default NQHardwareDetails;
