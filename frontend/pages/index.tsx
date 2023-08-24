import Head from 'next/head'
import styles from '../styles/Home.module.css';
import { AddTask } from '../components/AddTask';
import { TaskList } from '../components/TaskList';
import { Text } from '@chakra-ui/react';

export default function Home() {
  return (
    <>
      <Head>
        <title>Sailboat Task App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.header}>
          <Text fontSize="5xl" textAlign="center" fontWeight="bold">Todo App</Text>
        </div>
        <div className={styles.taskWrapper}>
          <AddTask />
          <TaskList />
        </div>
      </main>
    </>
  )
}
