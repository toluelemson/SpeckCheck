export type SharedCardProps = {
  id: string;
  title: string;
  text: string;
  percentage: number;
  progressColor: string;
  progressCount: string;
  pic: any;
  inbox: string;
  tickCount: string;
  totalTickCount: string;
  card: (handleClick: () => void) => JSX.Element;
};

export type CardContextType = {
  card: SharedCardProps[];
  handleDelete: Function;
  handleDeleteAll: Function;
  handleSharedCard: Function;
};
