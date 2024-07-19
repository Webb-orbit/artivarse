import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from "react-redux"
import { stores } from './store/store.js'

import Signup from './componentes/Signup.jsx'
import Varifituser from './componentes/Varifituser.jsx'
import Authout from './componentes/Authout.jsx'
import Login from './componentes/Login.jsx'
import Home from './pages/Home.jsx'
import Mainprofile from './componentes/profile/Mainprofile.jsx'
import { Profile } from './componentes/profile/Profile.jsx'
import Danger from './componentes/profile/Danger.jsx'
import { Changepassword } from './componentes/Changepassword.jsx'
import Createcreator from './componentes/creator/Createcreator.jsx'
import Mailchannal from './componentes/creator/Mailchannal.jsx'
import CreateArtical from './componentes/creator/CreateArtical.jsx'
import Overview from './componentes/creator/Overview.jsx'
import Artical from './componentes/blog/Artical.jsx'
import Publiccreatorpage from './componentes/creator/Publiccreatorpage.jsx'
import Searchresults from './componentes/Searchresults.jsx'
import Creatorarticals from './componentes/creator/Creatorarticals.jsx'
import Editartical from './componentes/creator/Editartical.jsx'
import Subscriptions from './componentes/subscription/Subscriptions.jsx'
import Creatorsettings from './componentes/creator/Creatorsettings.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={stores}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index path='/' element={<Home />} />
          <Route path='/sign-up' element={<Authout reqauth={false} child={<Signup />} />} />
          <Route path='/login' element={<Authout reqauth={false} child={<Login />} />} />
          <Route path='/Verification' element={<Varifituser />} />
          <Route path='/changepassword' element={<Changepassword />} />
          <Route path='/createchannel' element={<Createcreator />} />
          <Route path='/Subscriptions' element={<Subscriptions />} />
          <Route path='/artical/:articalid' element={<Artical/>}/>
          <Route path='/creator/:creatorid' element={<Publiccreatorpage/>}/>
          <Route path='/search/:params' element={<Searchresults/>}/>

          <Route path='/profile' element={<Mainprofile />}>
            <Route index path='/profile' element={<Profile />} />
            <Route path='/profile/dangerzone' element={<Danger />} />
          </Route>

          <Route path='/channal' element={<Authout reqauth={true} child={<Mailchannal />}/>}>
            <Route index path='overview' element={<Overview />} />
            <Route path='create-artical' element={<CreateArtical />} />
            <Route path='edit-artical/:articalid' element={<Editartical />} />
            <Route path='articals' element={<Creatorarticals />} />
            <Route path='settings' element={<Creatorsettings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
)
