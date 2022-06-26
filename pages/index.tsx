import type { NextPage } from 'next';
import Head from 'next/head';
import Banner from '../components/Banner';
import Row from '../components/Row';
import { Movie } from '../typings';
import requests from '../utils/requests';
import Header from './../components/Header';
import useAuth from '../hooks/useAuth';
import Loading from './../components/Loading';

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
  // products: Product[]
}

const Home = ({
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
}: Props) => {
  const { loading } = useAuth();
  if (loading)
    return (
      <Loading/>
    );
  return (
    <div
      className='relative m h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] 
    lg:h-[140vh]
    '
    >
      <Head>
        {/* <title> {movie?.title || movie?.original_name || 'Home'} - Netflix</title> */}
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {/* Header */}
      <Header />
      <main className='relative pl-4 pb-24 lg:space-y-24 lg:pl-10 overflow-x-hidden'>
        {/* Banner */}
        <Banner netflixOriginals={netflixOriginals} />
        <section className='md:space-y-24'>
          <Row title='Trending Now' movies={trendingNow} />
          <Row title='Top Rated' movies={topRated} />
          <Row title='Action Movies' movies={actionMovies} />
          <Row title='Comedy Movies' movies={comedyMovies} />
          <Row title='Horror Movies' movies={horrorMovies} />
          <Row title='Romance Movies' movies={romanceMovies} />
          <Row title='Documentaries Movies' movies={documentaries} />
        </section>
      </main>
      {/* Modal */}
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
      // products
    },
  };
};
