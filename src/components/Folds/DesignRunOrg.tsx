import { useControlPanel } from "../Contexts/ControlPanelContext";
import { useNavContext } from "../Contexts/NavContext";
import styles from './folds.module.css';
import ReactPlayer from 'react-player';
import { useState } from 'react';

const DesignRunOrg = () => {
    const { handleMove, setBoxInView, changeOpacity, toggleAnimation, handleReset } = useControlPanel();
    const { setButtonDisabled } = useNavContext();
    const [videoUrl, setVideoUrl] = useState('/drorg_480p.mp4');

    const handleViewDetailsClick = () => {
        setButtonDisabled(true);
        setBoxInView(9);
        handleMove(9, '0', '-100dvh');
        handleMove(4, '-100vw', '-100dvh');
        changeOpacity(9, 1);
        toggleAnimation(9, true);
        setTimeout(() => {
            setButtonDisabled(false);
            toggleAnimation(4, false);
            handleReset([4]);
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
                            <option value="/drorg_480p.mp4">480p</option>
                            <option value="/drorg_720p.mp4">720p</option>
                            <option value="/drorg_1080p.mp4">1080p</option>
                        </select>
                    </div>
                </div>
                <div className={styles.project}>
                    <div className={styles.title}>Designrun<br />.org</div>
                    <div className={styles.subtitle}>WEBSITE</div>
                    <div className={styles.date}>2024</div>
                    <a className={styles.customLink} onClick={handleViewDetailsClick}>Project Details</a>
                </div>
            </div>
        </div>
    );
}

export default DesignRunOrg;
