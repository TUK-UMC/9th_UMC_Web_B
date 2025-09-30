import { Children, cloneElement, isValidElement, useMemo, type FC, type ReactElement } from "react";
import useCurrentPath from './useCurrentPath';
import type { RoutesProps } from './types';

export const Routes: FC<RoutesProps> = ({ children }) => {
  const currentPath = useCurrentPath();
  const activeRoute = useMemo(() => {
    const routes = Children.toArray(children).filter(isRouteElement);
    return routes.find((route) => route.props.path === currentPath);
  }, [children, currentPath]);

  if (!activeRoute) return null;
  return cloneElement(activeRoute);
}

function isRouteElement(child: any):child is ReactElement {
  return isValidElement(child) && 'path' in child.props;
}