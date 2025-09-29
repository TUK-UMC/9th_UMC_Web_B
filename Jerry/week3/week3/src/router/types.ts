import type { ReactNode, ComponentType } from 'react';

export interface LinkProps {
  to: string;
  children: ReactNode;
}

export interface RouteProps {
  path: string;
  component: ComponentType;
}

export interface RoutesProps {
  children: ReactNode;
}

export const PUSHSTATE_EVENT = 'pushstate';
export const POPSTATE_EVENT = 'popstate';
