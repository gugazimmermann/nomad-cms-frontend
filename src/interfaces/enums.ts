export enum PAYMENT_RESPONSE {
  ACCEPT = 'accept',
  DECLINED = 'declined'
}

export enum ORDER_STATUS {
  PENDING = 'pending',
  PROCESSING = "processing_payment",
  PAYMENT_FAILURE = 'payment_failure',
  PAYMENT_DECLINED = 'payment_declined',
  PAYMENT_SUCCESS = 'payment_success',
  WAITING = 'waiting',
  PREPARING = 'preparing',
  READY = 'ready',
  DELIVERED = 'delivered',
}