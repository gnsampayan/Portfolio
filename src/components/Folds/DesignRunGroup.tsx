import { useControlPanel } from "../Contexts/ControlPanelContext";
import { useNavContext } from "../Contexts/NavContext";
import styles from './folds.module.css';
import { useState } from 'react';
import ReactPlayer from 'react-player';

const DesignRunGroup = () => {
    const { handleMove, setBoxInView, changeOpacity, toggleAnimation, handleReset } = useControlPanel();
    const { setButtonDisabled } = useNavContext();
    const [videoUrl, setVideoUrl] = useState('/drgroup_480p.mp4');

    const handleViewDetailsClick = () => {
        setButtonDisabled(true);
        setBoxInView(7);
        handleMove(7, '0', '-100dvh');
        handleMove(2, '-100vw', '-100dvh');
        changeOpacity(7, 1);
        toggleAnimation(7, true);
        setTimeout(() => {
            setButtonDisabled(false);
            toggleAnimation(2, false);
            handleReset([2]);
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
                            <option value="/drgroup_480p.mp4">480p</option>
                            <option value="/drgroup_720p.mp4">720p</option>
                            <option value="/drgroup_1080p.mp4">1080p</option>
                        </select>
                    </div>
                </div>
                <div className={styles.project}>
                    <div className={styles.title}>DesignRun<br />Group</div>
                    <div className={styles.subtitle}>WEBSITE</div>
                    <div className={styles.date}>2023</div>
                    <a className={styles.customLink} onClick={handleViewDetailsClick}>Project Details</a>
                </div>
            </div>
        </div>
    );
};

export default DesignRunGroup;
