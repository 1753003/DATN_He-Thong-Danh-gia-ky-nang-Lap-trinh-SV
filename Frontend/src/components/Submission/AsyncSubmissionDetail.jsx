import { dynamic } from 'umi';
import Loading from '@/components/PageLoading'
export default dynamic({
  loader: async function() {
    // webpackChunkName tells webpack create separate bundle for HugeA
    const { default: AsyncSubmissionDetail } = await import(/* webpackChunkName: "external_A" */ '../SubmissionDetail');
    return AsyncSubmissionDetail;
  },
  loading: Loading,
});