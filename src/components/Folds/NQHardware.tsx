import { useControlPanel } from "../Contexts/ControlPanelContext";
import { useNavContext } from "../Contexts/NavContext";
import styles from './folds.module.css';
import ReactPlayer from 'react-player';
import { useState } from "react";

const NQHardware = () => {
    const { setButtonDisabled } = useNavContext();
    const { handleMove, setBoxInView, changeOpacity, toggleAnimation, handleReset } = useControlPanel();
    const [videoUrl, setVideoUrl] = useState('/nq_480p.mp4');

    const handleViewDetailsClick = () => {
        setButtonDisabled(true);
        setBoxInView(6);
        handleMove(6, '0', '-100dvh');
        handleMove(1, '-100vw', '-100dvh');
        changeOpacity(6, 1);
        toggleAnimation(6, true);
        setTimeout(() => {
            toggleAnimation(1, false);
            handleReset([1]);
            setButtonDisabled(false);
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
                            <option value="/nq_480p.mp4">480p</option>
                            <option value="/nq_720p.mp4">720p</option>
                            <option value="/nq_1080p.mp4">1080p</option>
                        </select>
                    </div>
                </div>
                <div className={styles.project}>
                    <div className={styles.title}>NQ Hardware</div>
                    <div className={styles.subtitle}>WEB APP, E-COMMERCE</div>
                    <div className={styles.date}>2024</div>
                    <a className={styles.customLink} onClick={handleViewDetailsClick}>Project Details</a>
                </div>
            </div>
        </div>
    );
};

export default NQHardware;
