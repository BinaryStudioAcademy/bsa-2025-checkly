import styles from "./styles.module.css";

const Footer: React.FC = () => {
    return (
        <footer className={styles["footer"]}>
            <div className={styles["wrapper"]}>
                <p>Footer content will go here.</p>
            </div>
        </footer>
    );
};

export { Footer };