import { isProxy, toRaw } from "vue";

export const getProxyData = (data) => {
  if (isProxy(data)) {
    return toRaw(data);
  }
  return null;
};