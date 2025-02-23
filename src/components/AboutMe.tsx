import styled from "styled-components";
import useTypingEffect from "../hooks/useTypingEffect";
import chatText from '../hooks/streamText';
import { useWindowSize } from "./Contexts/WindowSizeContext";
import { useControlPanel } from "./Contexts/ControlPanelContext";

import ReactGA from 'react-ga4';
import { useEffect, useState } from "react";

const Frame = styled.div`
    width: 100vw;
    height: 100dvh;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 40px;
    padding-left: 20px;
    padding-right: 360px;
    @media only screen and (max-width: 1250px) {
      padding-right: 260px;
	  }
    @media only screen and (max-width: 768px) {
      padding: 100px 20px 60px 20px;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      overflow: auto;
	  }
    /* Hide scrollbar for WebKit browsers (Chrome, Safari) */
    &::-webkit-scrollbar {
      display: none;
    }
    /* Hide scrollbar for other browsers */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
`;

const Introduction = styled.div<{ width: number }>`
  width: calc(100vw - 40px);
  max-width: ${(props) => (props.width >= 1150) ? '600px' : '400px'};
  position: relative;
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  padding: 0;
  margin: 0;
  @media only screen and (max-width: 768px) {
      align-items: flex-start;
	  }
`;

const Link = styled.a`
    all: unset;
    text-align: right;
    clear: both;
    font-family: halyard-text, sans-serif;
    font-size: 0.9rem;
    font-weight: 200;
    font-style: italic;
    max-width: 600px;
    line-height: 1.5rem;
    color: rgb(143, 143, 143);
    cursor: pointer;
`;
const Bubble = styled.div`
    background-color: white;
    width: auto;
    min-height: 40px;
    height: auto;
    position: absolute;
    top: -16px;
    left: 80px;
    border-radius: 20px 20px 20px 0px;
    border: 1px solid #90e5ff;
    color: #4b4b4b;
    padding: 6px 20px;
    display: flex;
    align-items: center;
    
    @media only screen and (max-width: 768px) {
        max-width: calc(100% - 100px);
        height: auto;
        white-space: normal;
        word-wrap: break-word;
    }
`
const Caption = styled.p`
	font-family: halyard-text, sans-serif;
	font-size: 1.1rem;
	font-weight: 200;
	color: rgb(143, 143, 143);
	float: left;
`;

const AboutMe: React.FC = () => {
  const { width } = useWindowSize();
  const { boxInView } = useControlPanel();
  const shouldRestart = boxInView === 12;
  const typedText = useTypingEffect(60, 1500, chatText, shouldRestart);
  const currentText = boxInView === 12 ? typedText : "";
  const [startTime, setStartTime] = useState<number | null>(null);

  // Google Analytics
  useEffect(() => {
    // When this component comes into view (boxInView === 12)
    if (boxInView === 12) {
      setStartTime(Date.now());
      ReactGA.event({
        category: 'Page View',
        action: 'About Me Viewed',
        label: 'Enter'
      });
    } else if (boxInView !== 12 && startTime !== null) {
      // When user leaves this view
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      ReactGA.event({
        category: 'Page View',
        action: 'About Me Time Spent',
        label: 'Exit',
        value: timeSpent
      });
      setStartTime(null);
    }
  }, [boxInView, startTime]);

  return (
    <Frame>
      <Links>
        <Caption>Links</Caption>
        <Link
          onClick={(e) => {
            e.preventDefault(); // Prevent immediate navigation
            ReactGA.event({
              category: 'About Me',
              action: 'Email Link Clicked',
              label: 'Email'
            });
            // Navigate after a small delay to ensure the event is tracked
            setTimeout(() => {
              window.location.href = "mailto:gnsampayan@gmail.com?subject=Hello there!&body=Hey Glenn,";
            }, 100);
          }}
          href="mailto:gnsampayan@gmail.com?subject=Hello there!&body=Hey Glenn,"
          id="email"
          style={{
            color: "#438dff",
          }}
        >
          Email
        </Link>
        <Link
          target="_blank"
          onClick={(e) => {
            e.preventDefault(); // Prevent immediate navigation
            ReactGA.event({
              category: 'About Me',
              action: 'Github Link Clicked',
              label: 'Github'
            });
            // Navigate after a small delay to ensure the event is tracked
            setTimeout(() => {
              window.location.href = "https://github.com/gnsampayan";
            }, 100);
          }}
          href="https://github.com/gnsampayan"
          id="art"
          style={{
            color: "#40cd47",
          }}
        >
          Github
        </Link>
        <Link
          target="_blank"
          onClick={(e) => {
            e.preventDefault(); // Prevent immediate navigation
            ReactGA.event({
              category: 'About Me',
              action: 'LinkedIn Link Clicked',
              label: 'LinkedIn'
            });
            // Navigate after a small delay to ensure the event is tracked
            setTimeout(() => {
              window.location.href = "https://www.linkedin.com/in/glenn-sampayan-544807176/";
            }, 100);
          }}
          href="https://www.linkedin.com/in/glenn-sampayan-544807176/"
          id="social"
          style={{
            color: "#f6543c",
          }}
        >
          LinkedIn
        </Link>
      </Links>
      <Introduction width={width}>
        <Bubble>{currentText}</Bubble>
        Hi! 😊 <br />
        I'm Glenn. <br />
        <br />
        I'm a designer and engineer based in Austin Texas.
        I have a unique blend of skills that includes visual communication,
        mechatronics engineering, UX & UI design, and full stack web developer.
        I also have a strong background in fine arts.
        <br />
        <br />
        When I'm not working, I enjoy spending time outdoors
        and pursuing my passions. Whether it's camping withmy friends and my dog Alfie,
        building and flying drones, riding motorcycles, making art,
        or working on exciting projects, I always find a way to stay
        engaged and challenged.
        <br />
        <br />
        I'm always looking for opportunities to connect and
        collaborate, so feel free to get in touch if you'd like to chat.
        Let's see what we can create together!
      </Introduction>
    </Frame>
  );
};

export default AboutMe;
