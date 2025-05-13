import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/mongo";
import CobrancaStatus from "@/models/webhookPayment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();
  if (req.method === "POST") {
    const { body } = req as { body: PagarmeWebhookPayload };
    console.log("🚀 ~ body:", body.data)

    const cobranca = new CobrancaStatus({
      status: body.data.status,
      checkoutId: body.data.id,
      orderId: body.data.code,
      data: new Date(body.data.created_at),
    });

    await cobranca.save();

    res.status(200).json({
      message: "Webhook received",
      status: body.data.status,
      orderId: body.data.order.id,
      paymentId: body.data.id,
    });
  }
  if (req.method === "GET") {
    try {
      const { orderId } = req.query;

      if (!orderId) {
        return res.status(400).json({ error: "orderId é obrigatório" });
      }

      const cobranca = await CobrancaStatus.findOne({
        orderId: orderId,
      }).sort({ createdAt: -1 }); 

      if (!cobranca) {
        return res.status(200).json({});
      }

      return res.status(200).json(cobranca);
    } catch (error) {
      console.error("Erro ao buscar cobrança:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}

export interface PagarmeWebhookPayload {
  id: string;
  account: {
    id: string;
    name: string;
  };
  type: string;
  created_at: string;
  data: {
    id: string;
    code: string;
    gateway_id: string;
    amount: number;
    paid_amount: number;
    status: string;
    currency: string;
    payment_method: string;
    paid_at: string;
    created_at: string;
    updated_at: string;
    order: {
      id: string;
      code: string;
      amount: number;
      closed: boolean;
      created_at: string;
      updated_at: string;
      closed_at: string;
      currency: string;
      status: string;
      customer_id: string;
    };
    customer: {
      id: string;
      name: string;
      email: string;
      document: string;
      document_type: string;
      type: string;
      delinquent: boolean;
      address: object;
      created_at: string;
      updated_at: string;
      phones: object;
    };
    last_transaction: {
      brand_id: string;
      id: string;
      transaction_type: string;
      gateway_id: string;
      amount: number;
      status: string;
      success: boolean;
      installments: number;
      acquirer_name: string;
      acquirer_tid: string;
      acquirer_nsu: string;
      acquirer_auth_code: string;
      acquirer_message: string;
      acquirer_return_code: string;
      operation_type: string;
      card: object;
      funding_source: string;
      created_at: string;
      updated_at: string;
      gateway_response: object;
      antifraud_response: object;
      metadata: Record<string, any>;
    };
  };
}
