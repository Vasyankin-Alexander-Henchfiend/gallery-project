export type TPaginationProps = {
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
  onNumberPageClick: (pageNumber: number) => void;
  disable: {
    left: boolean;
    right: boolean;
  };
  nav?: {
    current: number;
    total: number;
  };
};
