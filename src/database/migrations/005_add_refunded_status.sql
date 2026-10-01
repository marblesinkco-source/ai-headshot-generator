-- Add 'refunded' order status (set by the Stripe charge.refunded webhook)
ALTER TYPE order_status ADD VALUE IF NOT EXISTS 'refunded';
