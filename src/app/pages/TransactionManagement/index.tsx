import React from 'react';
import { HomePage } from '../HomePage/Loadable';

type Props = {};

export const ProjectManagement = (props: Props) => {
  return <HomePage projectActive={0}></HomePage>;
};
