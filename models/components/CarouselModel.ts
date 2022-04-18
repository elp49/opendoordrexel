import OrderedItem from '../shared/OrderedItem';

export type CardModel = OrderedItem & {
  image: string;
};

type CarouselModel = {
  cardList: CardModel[];
};

export default CarouselModel;
