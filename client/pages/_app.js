import '../styles/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header'
import Footer from '../components/Footer'



function MyApp({ Component, pageProps }) {
    return (
        <>
    <Header />
    <Component {...pageProps} />
    <Footer/>
    </>
    )
}  
export default MyApp