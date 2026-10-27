import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <p style={styles.label}>Simple React counter</p>
        <h1 style={styles.title}>{count}</h1>
        <div style={styles.buttons}>
          <button onClick={() => setCount((value) => value - 1)}>−</button>
          <button onClick={() => setCount(0)}>Reset</button>
          <button onClick={() => setCount((value) => value + 1)}>+</button>
        </div>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    background: "#f7f5ef",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    width: "min(90%, 360px)",
    padding: "40px 24px",
    textAlign: "center",
    borderRadius: "18px",
    background: "#c9d8bd",
    boxShadow: "0 12px 30px rgba(32, 35, 31, 0.12)",
  },
  label: {
    margin: 0,
    color: "#52604d",
    fontSize: "0.85rem",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  title: {
    margin: "24px 0",
    color: "#20231f",
    fontSize: "5rem",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
};
