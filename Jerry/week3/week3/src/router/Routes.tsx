import { Children, useMemo, cloneElement, isValidElement } from 'react';
import type { ReactElement } from 'react';
import type { RoutesProps, RouteProps } from './types';
import { useCurrentPath } from './hooks';

const isRouteElement = (
  element: unknown
): element is ReactElement<RouteProps> => {
  return isValidElement(element);
};

export const Routes = ({ children }: RoutesProps) => {
  const currentPath = useCurrentPath();

  const activeRoute = useMemo(() => {
    const routes = Children.toArray(children).filter(isRouteElement);
    return routes.find((route) => route.props.path === currentPath);
  }, [children, currentPath]);

  if (!activeRoute) return null;

  return cloneElement(activeRoute);
};
