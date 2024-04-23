import { useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function useQueryParam() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const getValue = (key: string) => searchParams.get(key);

  const createQueryString = useCallback(
    (name?: string, value?: string | null) => {
      const params = new URLSearchParams(searchParams);
      if (name) {
        if (value) {
          params.set(name, value);
        } else {
          params.delete(name);
        }
      }

      return params.toString();
    },
    [searchParams]
  );

  const mergeQueryString = useCallback(
    (data: Record<string, string>, preserveQuery?: string[]) => {
      const preserveData: Record<string, string> = {};
      preserveQuery?.forEach((v) => {
        const val = getValue(v);
        if (val) {
          preserveData[v] = val;
        }
      });
      const merged = { ...data, ...preserveData };
      const params = new URLSearchParams(merged);

      return params.toString();
    },
    [searchParams]
  );

  //? push to new route from name params
  const pushNewRoute = (name: string) =>
    router.push(name + "?" + createQueryString());

  //? replace to new route from name params
  const replaceRoute = (name: string, value?: string | null) =>
    router.replace(pathname + "?" + createQueryString(name, value), {
      scroll: false,
    });

  //? add or remove queryParams by name and value (push)
  const pushRoute = (name: string, value?: string | null) =>
    router.push(pathname + "?" + createQueryString(name, value), {
      scroll: false,
    });

  //? add queryParams with options to preserve existing queryParams
  const pushRouteWithObject = (
    data: Record<string, string>,
    preserveQuery?: string[]
  ) =>
    router.push(pathname + "?" + mergeQueryString(data, preserveQuery), {
      scroll: false,
    });

  //? add queryParams with options to preserve existing queryParams (replace)
  const replaceRouteWithObject = (
    data: Record<string, string>,
    preserveQuery?: string[]
  ) => {
    router.replace(pathname + "?" + mergeQueryString(data, preserveQuery), {
      scroll: false,
    });
  };

  const refresh = () => router.refresh();
  return {
    pushRoute,
    getValue,
    replaceRoute,
    replaceRouteWithObject,
    pushRouteWithObject,
    pushNewRoute,
    refresh,
  };
}
