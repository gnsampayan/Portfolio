import { useControlPanel } from "../Contexts/ControlPanelContext";
import { useNavContext } from "../Contexts/NavContext";
import styles from "./folds.module.css";
import SpanningImage from '../../assets/spanning-fold.png';

const Spanning = () => {
    const {
        handleMove,
        setBoxInView,
        changeOpacity,
        toggleAnimation,
        handleReset,
    } = useControlPanel();
    const { setButtonDisabled } = useNavContext();

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

    return (
        <div className={styles.fold}>
            <div className={styles.frame}>
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
                <div className={styles.imageContainer} onClick={handleViewDetailsClick} style={{ background: '#b9b9b9' }}>
                    <img className={styles.image} src={SpanningImage} alt="Spanning" />
                </div>
            </div>
        </div>
    );
};

export default Spanning;
