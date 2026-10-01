import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const { orderId } = params;

    if (!orderId || orderId.length < 1) {
      return NextResponse.json(
        { error: 'Invalid order ID' },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Fetch order and verify ownership
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select(
        'id, package_id, category_id, status, amount, currency, created_at, headshot_count'
      )
      .eq('id', orderId)
      .eq('user_id', user.id)
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Format values for the invoice
    const invoiceDate = new Date(order.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const amountFormatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: (order.currency || 'usd').toUpperCase(),
      minimumFractionDigits: 2,
    }).format((order.amount || 0) / 100);

    const isPaid =
      order.status === 'completed' ||
      order.status === 'processing' ||
      order.status === 'training';

    const statusLabel = isPaid ? 'Paid' : order.status === 'failed' ? 'Failed' : 'Pending';

    const packageName = (order.package_id || 'standard')
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (c: string) => c.toUpperCase());

    const categoryName = (order.category_id || 'headshots')
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (c: string) => c.toUpperCase());

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice ${order.id} - TailorPic</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #1a1a2e;
      background: #ffffff;
      padding: 40px;
      max-width: 800px;
      margin: 0 auto;
      line-height: 1.6;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding-bottom: 32px;
      border-bottom: 2px solid #1a1a2e;
    }
    .brand h1 {
      font-size: 28px;
      font-weight: 800;
      color: #1a1a2e;
      letter-spacing: -0.5px;
    }
    .brand p {
      font-size: 13px;
      color: #6b7280;
      margin-top: 4px;
    }
    .invoice-title {
      text-align: right;
    }
    .invoice-title h2 {
      font-size: 32px;
      font-weight: 700;
      color: #1a1a2e;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    .invoice-title p {
      font-size: 13px;
      color: #6b7280;
      margin-top: 4px;
    }
    .meta {
      display: flex;
      justify-content: space-between;
      margin-top: 32px;
      gap: 24px;
    }
    .meta-block h3 {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #6b7280;
      margin-bottom: 8px;
    }
    .meta-block p {
      font-size: 14px;
      color: #1a1a2e;
    }
    .table-wrapper {
      margin-top: 40px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    thead th {
      text-align: left;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #6b7280;
      padding: 12px 16px;
      border-bottom: 2px solid #e5e7eb;
    }
    thead th:last-child {
      text-align: right;
    }
    tbody td {
      padding: 16px;
      font-size: 14px;
      color: #1a1a2e;
      border-bottom: 1px solid #f3f4f6;
    }
    tbody td:last-child {
      text-align: right;
      font-weight: 600;
    }
    .totals {
      margin-top: 24px;
      display: flex;
      justify-content: flex-end;
    }
    .totals-table {
      width: 280px;
    }
    .totals-table .row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      font-size: 14px;
      color: #374151;
    }
    .totals-table .row.total {
      border-top: 2px solid #1a1a2e;
      margin-top: 8px;
      padding-top: 12px;
      font-size: 18px;
      font-weight: 700;
      color: #1a1a2e;
    }
    .status-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .status-paid {
      background: #d1fae5;
      color: #065f46;
    }
    .status-pending {
      background: #fef3c7;
      color: #92400e;
    }
    .status-failed {
      background: #fee2e2;
      color: #991b1b;
    }
    .footer {
      margin-top: 60px;
      padding-top: 24px;
      border-top: 1px solid #e5e7eb;
      font-size: 12px;
      color: #9ca3af;
      text-align: center;
    }
    .print-note {
      margin-top: 40px;
      padding: 16px;
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      text-align: center;
      font-size: 13px;
      color: #6b7280;
    }
    @media print {
      body { padding: 20px; }
      .print-note { display: none; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="brand">
      <h1>TailorPic</h1>
      <p>AI-Powered Professional Photos</p>
      <p>hello@tailorpic.com</p>
    </div>
    <div class="invoice-title">
      <h2>Invoice</h2>
      <p>#${escapeHtml(order.id)}</p>
    </div>
  </div>

  <div class="meta">
    <div class="meta-block">
      <h3>Bill To</h3>
      <p>${escapeHtml(user.email || 'N/A')}</p>
    </div>
    <div class="meta-block">
      <h3>Invoice Date</h3>
      <p>${invoiceDate}</p>
    </div>
    <div class="meta-block">
      <h3>Payment Status</h3>
      <p>
        <span class="status-badge status-${isPaid ? 'paid' : order.status === 'failed' ? 'failed' : 'pending'}">
          ${statusLabel}
        </span>
      </p>
    </div>
  </div>

  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Category</th>
          <th>Qty</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${escapeHtml(packageName)} Package</td>
          <td>${escapeHtml(categoryName)}</td>
          <td>${order.headshot_count || 1}</td>
          <td>${amountFormatted}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="totals">
    <div class="totals-table">
      <div class="row">
        <span>Subtotal</span>
        <span>${amountFormatted}</span>
      </div>
      <div class="row">
        <span>Tax</span>
        <span>$0.00</span>
      </div>
      <div class="row total">
        <span>Total</span>
        <span>${amountFormatted}</span>
      </div>
    </div>
  </div>

  <div class="footer">
    <p>Thank you for choosing TailorPic.</p>
    <p style="margin-top: 4px;">This invoice was generated automatically. For questions, contact hello@tailorpic.com.</p>
  </div>

  <div class="print-note">
    To save as PDF, press <strong>Ctrl+P</strong> (or <strong>Cmd+P</strong> on Mac) and select <strong>"Save as PDF"</strong> as the destination.
  </div>
</body>
</html>`;

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': `attachment; filename="invoice-${order.id}.html"`,
      },
    });
  } catch (error) {
    console.error('Invoice generation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/** Escape HTML special characters to prevent XSS in the generated invoice. */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
