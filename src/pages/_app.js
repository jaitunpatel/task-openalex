import Router from 'next/router';
import nProgress from 'nprogress';
import {Home} from '../components/home.tsx';
import '../../global.css'

import '../i18n';

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);



const App = (props) => {
  return (
    <Home/>
  );
};

export default App;