import Vue from "vue";
import VueRouter from "vue-router";
import Community from "@/components/Community/Community";
import Conversation from "@/components/Conversation/Conversation";
import Search from "@/components/Search/Search";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Community",
    component: Community
  },
  {
    path: "/conversation/:id",
    name: "Conversation",
    component: Conversation
  },
  {
    path: "/search",
    name: "Search",
    component: Search
  }
];

const router = new VueRouter({
  routes
});

const originalPush = router.push;
router.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export default router;
