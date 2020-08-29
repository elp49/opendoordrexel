import { isDefined, getTheme, sortListByOrder } from './Layout';

const FORM_ITEM_CLASS = 'formItem';
const HALF_WIDTH_CLASS = 'half';
const NOT_HALF_WIDTH_CLASS = 'full';

function buildItemClassList(item) {
  let classList = FORM_ITEM_CLASS;

  if (item.isHalfWidth)
    classList += ` ${HALF_WIDTH_CLASS}`;
  else
    classList += ` ${NOT_HALF_WIDTH_CLASS}`;

  return classList;
}

function buildFormItemList(formItems) {
  if (!isDefined(formItems))
    return;

  let formItemList = [];
  for (const i in formItems) {
    let item = formItems[i];
    if (isDefined(item)) {
      const classList = buildItemClassList(item);
      item.classList = classList;
      formItemList.push(item);
    }
  }

  formItemList = sortListByOrder(formItemList);

  return formItemList;
}

export default function CheckoutSection({ sectionDetails }) {
  if (!isDefined(sectionDetails))
    return;

  const id = isDefined(sectionDetails.name) ? sectionDetails.name : 'checkoutSection';
  const theme = getTheme(sectionDetails.theme);
  const formItemList = buildFormItemList(sectionDetails.formItems);

  return (
    <section id={`${id}CheckoutSection`} className={`${theme}`} style={{ position: 'relative' }}>
      <form>
        {
          formItemList.map((formItem, i) => {
            const key = `${id}FormItem-${section.order}`;
            const id = `${formItem.name}`;

            return (
              <div key={key} className={`${formItem.classList}`}>
                <label>
                  {formItem.label}:
                <input id={id} type={formItem.type} name={id} placeholder={formItem.placeholder} />
                </label>
              </div>
            );
          })
        }
      </form>
    </section>
  );
}
