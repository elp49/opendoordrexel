import OrderedItem from '../OrderedItem';
import ThemedModel from '../ThemedModel';

export type PostModel = OrderedItem & {
  date: string;
  header: string;
  details: string;
};

type EventBoardModel = ThemedModel & {
  postList: PostModel[];
};

export default EventBoardModel;
