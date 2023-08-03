import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import FeedAct from '../views/FeedAct.vue'
import FeedArt from '../views/FeedArt.vue'
import FeedCol from '../views/FeedCol.vue'
import FeedMak from '../views/FeedMak.vue'
import FeedPla from '../views/FeedPla.vue'
import NewPost from '../views/NewPost.vue'
import Popup from '../views/Popup.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/activity',
    name: 'activity',
    component: FeedAct
  },
  {
    path: '/art',
    name: 'art',
    component: FeedArt
  },
  {
    path: '/collect',
    name: 'collect',
    component: FeedCol
  },
  {
    path: '/make',
    name: 'make',
    component: FeedMak
  },
  {
    path: '/play',
    name: 'play',
    component: FeedPla
  },
  {
    path: '/newpost',
    name: 'newpost',
    component: NewPost
  },
  {
    path: '/popup:id',
    name: 'popup',
    props:true,
    component: Popup
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
