import { isFilePathValid } from '../../utils/fs-handler';
import OrderedItem from '../OrderedItem';
import ThemedModel from '../ThemedModel';

export type CardModel = OrderedItem & {
  image: string;
};

type CarouselModel = ThemedModel & {
  cardList: CardModel[];
};

export const filterValidCards = (cardList: CardModel[]) => cardList.filter(({ image }) => isFilePathValid(image));

export default CarouselModel;
