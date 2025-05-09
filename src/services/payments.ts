import axios from 'axios';

// Create axios instance with default configuration
const api = axios.create({
    baseURL: 'https://api.abacatepay.com/v1',
    headers: {
        Authorization: 'Bearer abc_dev_HJfqHpha5ddQLqBCZnYh4T54',
        'Content-Type': 'application/json'
    }
});

export const gerarQrCodePix = async (dados: PaymentPix) => {
    try {
        const response = await api.post('/pixQrCode/create', dados);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const criarUmaNovaCobranca = async (dados: PaymentPix) => {
    try {
        const options = {
            method: 'POST',
            headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
            body: '{"frequency":"ONE_TIME","methods":["PIX"],"products":[{"externalId":"prod-1234","name":"Assinatura de Programa Fitness","description":"Acesso ao programa fitness premium por 1 mês.","quantity":2,"price":2000}],"returnUrl":"https://example.com/billing","completionUrl":"https://example.com/completion","customerId":"cust_abcdefghij","customer":{"name":"Daniel Lima","cellphone":"(11) 4002-8922","email":"daniel_lima@abacatepay.com","taxId":"123.456.789-01"}}'
          };
          
          fetch('https://api.abacatepay.com/v1/billing/create', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
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