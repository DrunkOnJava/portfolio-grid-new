declare module 'react-responsive-masonry' {
  import React from 'react';

  export interface ResponsiveMasonryProps {
    columnsCountBreakPoints?: { [key: number]: number };
    children: React.ReactNode;
  }

  export interface MasonryProps {
    gutter?: string;
    children: React.ReactNode;
  }

  export const ResponsiveMasonry: React.FC<ResponsiveMasonryProps>;
  export default class Masonry extends React.Component<MasonryProps> {}
}