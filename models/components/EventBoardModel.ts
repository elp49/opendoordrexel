import OrderedItem from '../shared/OrderedItem';

export type PostModel = OrderedItem & {
  date: string;
  header: string;
  details: string;
};

type EventBoardModel = {
  postList: PostModel[];
};

export default EventBoardModel;
