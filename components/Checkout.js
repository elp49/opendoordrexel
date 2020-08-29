import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { isDefined, getTheme, ICONS } from '../components/Layout';

const SUCCESS = 'success';

function getCardSectionTheme(cardElement) {
  let theme;
  if (isDefined(cardElement))
    theme = cardElement.theme;

  return getTheme(theme);
}

function disableSubmit(id) {
  const button = document.getElementById(id);
  button.disabled = true;
}

const CheckoutForm = ({ cardElement, success }) => {
  const submitBtnId = 'submitBtn';
  const theme = getCardSectionTheme(cardElement);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    disableSubmit(submitBtnId);
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });

    if (!error) {
      const { id } = paymentMethod;

      try {
        const { data } = await axios.post('/api/charge', { id, amount: 100 });
        console.log(data);
        success();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form className={`${theme} checkoutForm`} onSubmit={handleSubmit}>
      <CardElement />
      <button id={submitBtnId} type={'submit'} disable={`${!stripe}`} className={'checkoutBtn'}>
        <p>Donate</p>
      </button>
      <div className={'stripeBadge'}>
        <i></i>
      </div>
      <style jsx>
        {`
          // .white {
          //   background-color: #fff;
          //   color: #24316F;
          // }
          // .blue {
          //   background-color: #24316F;
          //   color: #fff;
          // }
          .checkoutForm {
            position: relative;
            height: 100%;
            width: 100%;
          }
          .checkoutBtn {
            outline-style: auto;
            outline-width: 1px;
          }
          // .white .checkoutBtn {
          //   background-color: #24316F;
          //   color: #fff;
          //   outline-color: #fff;
          // }
          // .blue .checkoutBtn {
          //   background-color: #fff;
          //   color: #24316F;
          //   outline-color: #24316F;
          // }
          .checkoutBtn:focus {
            outline-color: #ccc;
          }
          .checkoutBtn>p {
            padding: 2px;
          }
          .stripeBadge {
            position: relative;
            height: 30px;
            max-width: 100px;
            margin: auto;
          }
          .stripeBadge>i {
            position: absolute;
            top: 50%;
            left: 50%;
            // background-image: url(${ICONS.stripe.solidDark});
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            transition-duration: .3s;
          }
          .blue .stripeBadge>i {
            background-image: url(${ICONS.stripe.solidLight});
          }
        `}
      </style>
    </form>
  );
};

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC);

export default function Checkout({ cardElement }) {
  const [status, setStatus] = React.useState('ready');

  if (status === SUCCESS)
    return <div>Thank you for your donation!</div>;

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm cardElement={cardElement} success={() => setStatus(SUCCESS)} />
    </Elements>
  );
}
