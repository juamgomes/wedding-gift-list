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
  installments_setup: Installment;
  operation_type: string;
}

interface Installment {
  interest_rate: number,
  interest_type: string,
  customer_fee: boolean,
  max_installments: number,
  amount: number,
}

export interface IPaymentLink {
  id: string;
  name: string;
  order_code: string;
  url: string;
  payment_link_type: string;
  status: string;
  expires_in: number;
  max_sessions: number;
  total_sessions: number;
  max_paid_sessions: number;
  total_paid_sessions: number;
  created_at: string;
  updated_at: string;
  payment_settings: PaymentSettingsResponse;
  cart_settings: CartSettingsResponse;
  layout_settings: LayoutSettings;
  flow_settings: Record<string, unknown>;
  checkout_settings: CheckoutSettings;
  account_settings: AccountSettings;
}

interface PaymentSettingsResponse {
  accepted_payment_methods: string[];
  accepted_multi_payment_methods: string[];
  credit_card_settings: CreditCardSettings;
  pix_settings: PixSettingsResponse;
  google_pay_enabled: boolean;
  apple_pay_enabled: boolean;
  threed_secure_enabled: boolean;
  click_to_pay_enabled: boolean;
}

interface PixSettingsResponse extends Pixsettings {
  discount: number;
  discount_percentage: number;
}

interface CreditCardSettings {
  operation_type: string;
  installments: Installment[];
}

interface CartSettingsResponse {
  shipping_cost: number;
  shipping_total_cost: number;
  items_total_cost: number;
  total_cost: number;
  items: Item[];
}

interface LayoutSettings {
  primary_color: string;
  secondary_color: string;
}

interface CheckoutSettings {
  accepted_brands: string[];
  address_type: string;
  enabled: boolean;
  required_fields: string[];
}

interface AccountSettings {
  merchant_id: string;
  account_id: string;
  account_name: string;
  display_name: string;
  organization: string;
}
