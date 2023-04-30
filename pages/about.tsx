import fs from "fs";
import path from "path";
import yaml from "js-yaml";

import { GetStaticProps } from "next";
import Image from "next/image";
import Head from "next/head";

import styles from "@/styles/About.module.scss";

type DataProps = {
  data: Record<string, any>;
};

export default function About({ data }: DataProps) {
  const officerData = JSON.parse(JSON.stringify(data, null, 2));

  return (
    <div className="page">
      <Head>
        <title>About | ACM Cyber at UCLA</title>
      </Head>
      <h1>About</h1>

      <h2>Who Are We</h2>
      <p>
        We are a group of hackers, CTFers and developers passionate about
        cybersecurity. We break things for fun and work to improve our skills in
        a variety of disciplines, whether it be rev, pwn, crypto, or something
        entirely different. We aim to nurture the love of cybersecurity in the
        students at UCLA.
      </p>

      <h2>Team</h2>

      <div className={styles.officersContainer}>
        {officerData.map((officer: PersonInfoProps, index: number) => (
          <PersonInfo
            key={index}
            name={officer.name}
            role={officer.role}
            major={officer.major}
            pronouns={officer.pronouns}
            photo={officer.photo}
          />
        ))}
      </div>
    </div>
  );
}
export const getStaticProps: GetStaticProps<DataProps> = async () => {
  const filePath = path.join(process.cwd(), "data/officers.yml");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const data = yaml.load(fileContents) as DataProps;
  return {
    props: {
      data,
    },
  };
};

type PersonInfoProps = {
  name: string;
  role: string;
  major: string;
  pronouns: string;
  photo: string;
};

function PersonInfo({ name, role, major, pronouns, photo }: PersonInfoProps) {
  return (
    <div className={styles.personInfo}>
      <Image
        className={styles.personImage}
        src={"/images/officers/" + photo}
        alt={`Profile picture of ${name}`}
        width={300}
        height={300}
      />
      <h3>{name}</h3>
      <p>
        <i>{role}</i>
      </p>
      <p>{pronouns}</p>
      <p>{major}</p>
    </div>
  );
}
