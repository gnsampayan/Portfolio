import { useControlPanel } from "../Contexts/ControlPanelContext";
import { useNavContext } from "../Contexts/NavContext";
import styles from './folds.module.css';
import { useState } from 'react';
import ReactPlayer from 'react-player';

const WeAreHere = () => {
    const { handleMove, setBoxInView, changeOpacity, toggleAnimation, handleReset } = useControlPanel();
    const { setButtonDisabled } = useNavContext();
    const [videoUrl, setVideoUrl] = useState('/here_480p.mp4');

    const handleViewDetailsClick = () => {
        setButtonDisabled(true);
        setBoxInView(8);
        handleMove(8, '0', '-100dvh');
        handleMove(3, '-100vw', '-100dvh');
        changeOpacity(8, 1);
        toggleAnimation(8, true);
        setTimeout(() => {
            setButtonDisabled(false);
            toggleAnimation(3, false);
            handleReset([3]);
        }, 1000);
    };

    const handleResolutionChange = (resolution: string) => {
        setVideoUrl(resolution);
    };

    return (
        <div className={styles.fold}>
            <div className={styles.frame}>
                <div className={styles.videoWrapper}>
                    <div className={styles.videoContainer}>
                        <ReactPlayer
                            url={videoUrl}
                            width='100%'
                            height='100%'
                            controls
                            playing
                            loop
                            muted
                            playsinline
                            className={styles.video}
                        />
                    </div>
                    <div className={styles.controls}>
                        <select
                            id="resolution-select"
                            onChange={(e) => handleResolutionChange(e.target.value)}
                            defaultValue={videoUrl}
                        >
                            <option value="/here_480p.mp4">480p</option>
                            <option value="/here_720p.mp4">720p</option>
                            <option value="/here_1080p.mp4">1080p</option>
                        </select>
                    </div>
                </div>
                <div className={styles.project}>
                    <div className={styles.title}>We Are Here</div>
                    <div className={styles.subtitle}>User-Driven Service Platform</div>
                    <div className={styles.date}>2021</div>
                    <a className={styles.customLink} onClick={handleViewDetailsClick}>Project Details</a>
                </div>
            </div>
        </div>
    );
};

export default WeAreHere;
