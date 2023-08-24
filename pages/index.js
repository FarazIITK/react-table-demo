import styles from "../styles/Home.module.css";

export default function Home(props) {
  const { products } = props;

  return (
    <div className={styles.main}>
      <div className={styles.pageHeader}>
        <h2>React Table Demo</h2>
      </div>
      <div className={styles.pageBody}>
        <h3>Details of users...</h3>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const data = await fetch(`https://dummyjson.com/products?skip=0&limit=10`);
  const formattedData = await data.json();
  return {
    props: {
      products: formattedData.products,
    },
  };
}
