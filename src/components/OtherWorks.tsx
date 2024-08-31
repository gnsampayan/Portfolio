import styled from "styled-components";
import Image1 from '../assets/background.png';
import Image2 from '../assets/ocean.png';
import Image3 from '/Final v1.mp4';
import Image4 from '../assets/House - Small (2 rooms) v70.png';
import Image5 from '../assets/seaholm-print-cover.jpeg';
import Image7 from '../assets/myface.png';
import Image8 from '/alfie.gif';
import Image9 from '../assets/seaholm-steel-works.jpg';
import { useControlPanel } from "./Contexts/ControlPanelContext";
import { useEffect, useState } from "react";

const Wrapper = styled.div<{ $pointerEvent: boolean; $opacity: boolean }>`
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    /* Hide scrollbar for WebKit browsers (Chrome, Safari) */
	&::-webkit-scrollbar {
		display: none;
	}
	/* Hide scrollbar for other browsers */
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 180px;
    opacity: ${(props) => props.$opacity ? '1' : '0'};
    transition: opacity ${(props) => props.$opacity ? '24s' : '1s'} ease;
    pointer-events: ${(props) => props.$pointerEvent ? 'auto' : 'none'};
`
const Caption = styled.p`
    font-size: .7rem;
`
const OtherWorks = () => {
    const { boxInView } = useControlPanel();
    const [pointerEvent, setPointerEvent] = useState<boolean>(false);
    const [opacity, setOpacity] = useState<boolean>(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (boxInView === -1) {
            timeout = setTimeout(() => {
                setPointerEvent(true);
                setOpacity(true);
            }, 3000);
        } else {
            setOpacity(false);
            setPointerEvent(false);
        }
        return () => clearTimeout(timeout);
    }, [boxInView]);

    return (
        <Wrapper $opacity={opacity} $pointerEvent={pointerEvent}>
            <div style={{ transform: 'translateX(-30vw)', width: '40vw', height: 'auto' }}>
                <video style={{ width: '40vw', height: 'auto' }} src={Image3} autoPlay loop muted playsInline />
                <Caption style={{ paddingLeft: '10px' }}>A Honda engine I modeled in Fusion 360, textured, animated and rendered in Blender. Used for AI machine vision training.</Caption>
            </div>
            <img style={{ transform: 'translateX(25vw)', width: '300px', height: '300px' }} src={Image2} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', transform: 'translateX(calc(50vw - 600px))', width: '1200px', height: 'auto' }}>
                <img style={{ width: '100vw', maxWidth: '1200px', height: 'auto' }} src={Image4} />
                <Caption style={{ transform: 'translate( 80px,-40px)', paddingRight: '10px' }}>A house frame I designed and engineered in Fusion 360. Built in real life using coco lumber, mahogany and pine.</Caption>
            </div>
            <img style={{ transform: 'translateX(calc(-50vw + 200px))', width: '300px', height: '300px' }} src={Image1} />
            <div style={{ transform: 'translateX(calc(-50vw + 300px))', width: '600px', height: 'auto' }}>
                <img style={{ width: '600px', height: '500px', objectFit: 'cover' }} src={Image5} />
                <Caption style={{ marginTop: '6px', paddingLeft: '10px' }}>A typographic tribute to Seaholm Power Plant’s transformation from industrial landmark to a vibrant mixed-use destination.</Caption>
            </div>
            <img style={{ width: '400px', height: '400px' }} src={Image9} />
            <div style={{ transform: 'translateX(calc(50vw - 200px))', display: 'flex', flexDirection: 'column', width: '400px', height: 'auto' }}>
                <img style={{ width: '400px', height: '400px' }} src={Image8} />
                <Caption style={{ paddingTop: '6px', paddingRight: '10px' }}>My dog Alfie</Caption>
            </div>
            <div style={{ paddingBottom: 'calc(50vh - 165px)' }}>
                <img style={{ width: '300px', height: '300px' }} src={Image7} />
            </div>
        </Wrapper>
    )
}

export default OtherWorks