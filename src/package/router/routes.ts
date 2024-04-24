import { RoutesQueryAndPath } from "./router.util";
import { useInternalRouter } from "./use-internal-router";

const Routes = {
  home: {
    path: () => {},
    useRouter: () => useInternalRouter(),
  },
};
