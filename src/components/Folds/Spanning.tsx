import { useState } from "react";
import { useControlPanel } from "../Contexts/ControlPanelContext";
import { useNavContext } from "../Contexts/NavContext";
import styles from "./folds.module.css";
import ReactPlayer from "react-player";

const Spanning = () => {
    const {
        handleMove,
        setBoxInView,
        changeOpacity,
        toggleAnimation,
        handleReset,
    } = useControlPanel();
    const { setButtonDisabled } = useNavContext();
    const [videoUrl, setVideoUrl] = useState('/spanning_480p.mp4');

    const handleViewDetailsClick = () => {
        setButtonDisabled(true);
        setBoxInView(10);
        handleMove(10, "0", "-100dvh");
        handleMove(5, "-100vw", "-100dvh");
        changeOpacity(10, 1);
        toggleAnimation(10, true);
        setTimeout(() => {
            setButtonDisabled(false);
            toggleAnimation(5, false);
            handleReset([5]);
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
                            <option value="/spanning_480p.mp4">480p</option>
                            <option value="/spanning_720p.mp4">720p</option>
                            <option value="/spanning_1080p.mp4">1080p</option>
                        </select>
                    </div>
                </div>
                <div className={styles.project}>
                    <div className={styles.title}>
                        Spanning
                        <br />
                        Office 365
                    </div>
                    <div className={styles.subtitle}>WEB APP</div>
                    <div className={styles.date}>2019</div>
                    <a className={styles.customLink} onClick={handleViewDetailsClick}>
                        Project Details
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Spanning;
