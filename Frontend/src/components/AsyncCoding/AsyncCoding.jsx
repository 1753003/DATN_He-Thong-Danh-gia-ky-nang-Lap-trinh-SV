import { dynamic } from 'umi';
import Loading from '@/components/PageLoading'
export default dynamic({
  loader: async () => await import('@/components/Coding'),
  loading: Loading,
  render(loaded, props) {
    let AsyncCoding = loaded.default;
    return <AsyncCoding {...props}/>;
  }
});