import { dynamic } from 'umi';
import Loading from '@/components/PageLoadingBlank'
export default dynamic({
  loader: async function() {
    // webpackChunkName tells webpack create separate bundle for HugeA
    const { default: AsyncSubmission } = await import(/* webpackChunkName: "external_A" */ '@/components/Submission');
    return AsyncSubmission;
  },
  loading: Loading
});