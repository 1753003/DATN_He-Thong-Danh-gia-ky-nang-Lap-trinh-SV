import { dynamic } from 'umi';
export default dynamic({
  loader: async function() {
    // webpackChunkName tells webpack create separate bundle for HugeA
    const { default: AsyncDiscussionTab } = await import(/* webpackChunkName: "external_A" */ '@/components/Discussions/DiscusstionTab');
    return AsyncDiscussionTab;
  },
});