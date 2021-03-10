import { dynamic } from 'umi'

export default dynamic({
  loader: async function () {
    const { default: ComA } = await import(/* webpackChunkName: "external_A" */ '../pages/404/404');
    return ComA;
  }
})