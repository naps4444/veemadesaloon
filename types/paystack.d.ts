declare module '@paystack/inline-js' {
  interface PaystackTransaction {
    reference: string;
    [key: string]: any;
  }

  interface PaystackOptions {
    key: string;
    amount: number;
    email: string;
    onSuccess?: (transaction: PaystackTransaction) => void;
    onCancel?: () => void;
    [key: string]: any;
  }

  export default class PaystackPop {
    newTransaction(options: PaystackOptions): void;
  }
}