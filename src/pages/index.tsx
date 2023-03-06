import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { GetServerSideProps } from "next";
const { CosmosClient } = require("@azure/cosmos");

const inter = Inter({ subsets: ['latin'] })

type Social = {
  id: string;
  img_source: string;
  img_alt: string;
  item_order: number;
  url: string;
};

type Menu = {
  id: string;
  name: string;
  route: string;
  item_order: number;
};

type Props = {
  social: Social[];
  menu: Menu[];
};


export default function Home({ social, menu }: Props) {
  return (
    <>
      <Head>
        <title>Behwal</title>
        <meta name="description" content="Made by Behwal game studio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <div>
            <a
              href="#"
              rel="noopener noreferrer"
            >
              <Image
                src="/logo.svg"
                alt="Behwal Logo"
                className={styles.behwalLogo}
                width={500}
                height={64}
                priority
              />
            </a>
          </div>
          <div className={styles.itensMenu}>
            {menu.map((item) => (
              <a className={styles.itemMenu} key={item.id} href={item.route}>
                {item.name}
              </a>
            ))}
          </div>

          <div className={styles.social}>
            {social.map((item) => (
              <a key={item.id} href={item.url} className={styles.img_social} target='_blank'>
                <Image
                  src={item.img_source}
                  alt={item.img_alt}
                  width={32}
                  height={32}
                />
              </a>
            ))}
          </div>
        </div>
        <div>
          <div>
            <h1 className={styles.mainQuote}>TO SEE BEHIND WALL</h1>
          </div>
          <div className={styles.quote}>
            <blockquote><span>&ldquo;</span>
            At Behwal Game Studio, we are dedicated to creating games that are more than just games, they are experiences that inspire and bring people together. We believe that everyone should have access to fun and great games, no matter what platform they play on. That&#63;s why we&#63;re constantly pushing the boundaries to create innovative, engaging, and unforgettable games. Our passion for game development is matched only by our commitment to our players, we strive to create games that not only entertain, but also empower and enrich their lives.
              <span>&rdquo;</span>
              </blockquote>
          </div>
        </div>

        {/* <div className="video-background">
          <video autoPlay muted loop>
            <source src="/background_video.mp4" type="video/mp4" />
          </video>
        </div>
         */}
      </main>
    </>
  )
}


export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const endpoint = process.env.COSMOS_DB_ENDPOINT;
  const key = process.env.COSMOS_DB_KEY;
  const databaseName = process.env.COSMOS_DB_DATABASE;
  const client = new CosmosClient({ endpoint, key });
  const database = client.database(databaseName);

  const containerSocial = database.container(process.env.COSMOS_DB_CONTAINER_SOCIAL);
  const containerMenu = database.container(process.env.COSMOS_DB_CONTAINER_MENU);

  const querySocial = "SELECT * FROM c WHERE c.active = true and c.url NOT IN ('', null, '#') ORDER BY c.item_order ASC";
  const queryMenu = "SELECT * FROM c WHERE c.active = true ORDER BY c.item_order ASC";

  const { resources: social } = await containerSocial.items.query(querySocial).fetchAll();
  const { resources: menu } = await containerMenu.items.query(queryMenu).fetchAll();

  return {
    props: {
      social,
      menu,
    },
  };
};