import { dynamic } from 'umi';
import Loading from '@/components/PageLoading'
export default dynamic({
  loader: async function() {
    // webpackChunkName tells webpack create separate bundle for HugeA
    const { default: AsyncQuizWrapper } = await import(/* webpackChunkName: "external_A" */ './QuizWrapper');
    return AsyncQuizWrapper;
  },
  loading: Loading,
});