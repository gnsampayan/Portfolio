import { ReactNode } from "react";
import styles from "./details.module.css";

interface Props {
    scopeContents: ReactNode;
    projectLink: string;
    projectType: string;
    year: string;
    title: ReactNode;
    nonDisclosure: string;
    summaryContent: ReactNode;
}
const HeadTemplate = ({
    scopeContents,
    projectLink,
    projectType,
    year,
    title,
    nonDisclosure,
    summaryContent,
}: Props) => {

    return (
        <div className={styles.padded}>
            <div className={styles.heading}>
                <div className={styles.scope}>
                    <p className={styles.caption}>Scope</p>
                    {scopeContents}
                    <p className={styles.caption}>Links</p>
                    <a className={styles.a} href={projectLink} target="_blank">
                        Visit Site
                    </a>
                </div>
                <div className={styles.content}>
                    <div className={styles.summary}>
                        <div className={styles.top}>
                            <p className={styles.caption} style={{ textTransform: "uppercase" }}>{projectType}</p>
                            <div className={styles.line} />
                            <p className={styles.caption}>{year}</p>
                        </div>
                        {title}
                        <p className={styles.p}>
                            {nonDisclosure}
                        </p>
                        <p className={styles.caption}>Summary</p>
                        {summaryContent}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeadTemplate;
