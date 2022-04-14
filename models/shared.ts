import { sortByOrder } from '../utils/utils';
import OrderedItem from './OrderedItem';

export type TextLink = OrderedItem & {
  text: string;
  href: string;
};

export const getTextLinks = (links: TextLink[]) => {
  const isTextLinkValid = ({ text, href }: TextLink) => text !== '' && href !== '';
  const filteredLinks = links.filter(isTextLinkValid);
  return sortByOrder(filteredLinks);
};

export enum Month {
  January = 0,
  February = 1,
  March = 2,
  April = 3,
  May = 4,
  June = 5,
  July = 6,
  August = 7,
  September = 8,
  October = 9,
  November = 10,
  Decumber = 11,
}

export enum MonthName {
  January = 'Jan',
  February = 'Feb',
  March = 'Mar',
  April = 'Apr',
  May = 'May',
  June = 'Jun',
  July = 'Jul',
  August = 'Aug',
  September = 'Sep',
  October = 'Oct',
  November = 'Nov',
  Decumber = 'Dec',
}

export const getMonthName = (month: Month) => {
  let monthName = '';

  switch (month) {
    case Month.January:
      monthName = MonthName.January;
      break;

    case Month.February:
      monthName = MonthName.February;
      break;

    case Month.March:
      monthName = MonthName.March;
      break;

    case Month.April:
      monthName = MonthName.April;
      break;

    case Month.May:
      monthName = MonthName.May;
      break;

    case Month.June:
      monthName = MonthName.June;
      break;

    case Month.July:
      monthName = MonthName.July;
      break;

    case Month.August:
      monthName = MonthName.August;
      break;

    case Month.September:
      monthName = MonthName.September;
      break;

    case Month.October:
      monthName = MonthName.October;
      break;

    case Month.November:
      monthName = MonthName.November;
      break;

    case Month.Decumber:
      monthName = MonthName.Decumber;
      break;

    default:
      break;
  }

  return monthName;
};
