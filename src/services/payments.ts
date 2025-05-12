import axios from 'axios';

const pagar_me_api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Basic ${Buffer.from(process.env.NEXT_PUBLIC_PAGARME_API_KEY || '').toString('base64')}`,
    }
});

export const gerarLinkDePagamento = async (data: ILinkPaymentCreate) => {
    try {
        const response = await pagar_me_api.post('/paymentlinks', data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export interface PaymentPix {
    amount: number;
    expiresIn: number;
    description: string;
    customer: {
        name: string;
        cellphone: string;
        email: string;
        taxId: string;
    };
}
interface ILinkPaymentCreate {
  is_building: boolean;
  payment_settings: Paymentsettings;
  cart_settings: Cartsettings;
  name: string;
  type: string;
}

interface Cartsettings {
  items: Item[];
}

interface Item {
  amount: number;
  name: string;
  default_quantity: number;
}

interface Paymentsettings {
  credit_card_settings: Creditcardsettings;
  pix_settings: Pixsettings;
  accepted_payment_methods: string[];
}

interface Pixsettings {
  expires_in: number;
}

interface Creditcardsettings {
  installments: Installment[];
  operation_type: string;
}

interface Installment {
  number: number;
  total: number;
}