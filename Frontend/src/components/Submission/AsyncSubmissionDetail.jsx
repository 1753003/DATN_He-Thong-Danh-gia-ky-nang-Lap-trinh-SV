import { dynamic } from 'umi';
export default dynamic({
  loader: async function() {
    // webpackChunkName tells webpack create separate bundle for HugeA
    const { default: AsyncSubmissionDetail } = await import(/* webpackChunkName: "external_A" */ '../SubmissionDetail');
    return AsyncSubmissionDetail;
  },
});