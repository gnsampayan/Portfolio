import WeAreHereVideo from '/WeAreHere.mp4';
import { useEffect, useRef } from "react";
import { useControlPanel } from "../Contexts/ControlPanelContext";
import styles from './details.module.css';
import Template from "./template";

const WeAreHereDetails = () => {
    const { boxInView } = useControlPanel();
    const myDivRef = useRef<HTMLDivElement>(null);

    const scopeContents = (
        <p className={`${styles.scopeList} ${styles.p}`}>
            Full Stack Dev,
            <br />
            Web Design
        </p>
    );
    const projectLink = "https://www.wearehere.com/";
    const projectType = "User-Driven Service Platform";
    const year = "2021";
    const title = (
        <h1 className={styles.h1}>
            We Are Here
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
            "Here" is a healthcare startup that provides
            resources and support to individuals affected by cancer. The
            project involved the development of a professional website that
            offered a minimalist design, smooth user experience, and secure
            payment transactions.
            <br />
            <br />
            The website was built using Webflow for HTML,
            CSS, and JavaScript, a content management system (CMS) for ease of
            maintenance, and domain hosting for reliable access. The backend
            was automated using Zapier and payment transactions were handled
            using the Stripe API.
            <br />
            <br />
            The end result was a successful website that met
            the client's needs and aimed to have a positive impact on those
            affected by cancer.
        </p>
    );

    const resetScroll = () => {
        if (myDivRef.current) {
            myDivRef.current.scrollTop = 0; // Reset scroll to the top
        }
    };
    useEffect(() => {
        if (boxInView !== 8) {
            setTimeout(() => {
                resetScroll();
            }, 1000)
        }
    }, [boxInView]);

    return (
        <div style={{ marginTop: '40px' }} className={styles.frame} ref={myDivRef}>
            <Template
                scopeContents={scopeContents}
                projectLink={projectLink}
                projectType={projectType}
                year={year}
                title={title}
                nonDisclosure={nonDisclosure}
                summaryContent={summaryContent}
            />
            <div style={{ marginTop: '60px' }} className={styles.padded}>
                <div className={styles.videoWrapper}>
                    <video className={styles.video} src={WeAreHereVideo} controls autoPlay loop muted playsInline />
                </div>
                <p className={styles.p} style={{ paddingTop: "20px", maxWidth: '540px' }}>
                    A clean, streamlined website with Stripe payment integration,
                    HubSpot management, and a prototyped member portal for core
                    features.
                </p>
                <div className={styles.end}>
                    <div className={styles.verticalLine} />
                    <div className={styles.smallShapeAnimation} />
                </div>
            </div>
        </div>
    );
}

export default WeAreHereDetails