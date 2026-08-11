import React, { useMemo, useState } from 'react'
import { Eye, Trash2 } from 'lucide-react';
import { formatINR } from '../../../../utils/formatCurrency';

import ConfirmDialog from '../../../../components/ui/ConfirmDialog';
import DataGrid from '../../../../components/ui/erp/DataGrid';
import { sortRows } from '../../../../components/ui/erp/sortRows';

const statusTones = {
  pending: 'warning',
  processing: 'info',
  shipped: 'brand',
  delivered: 'success',
  cancelled: 'danger',
};

const statusOptions = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

const statusSelectClass = (tone) =>
  `px-3 py-1 rounded-full text-sm font-semibold cursor-pointer border border-transparent transition-opacity duration-150 hover:opacity-80 ${
    tone === 'success'
      ? 'bg-success-soft text-success'
      : tone === 'warning'
      ? 'bg-warning-soft text-warning'
      : tone === 'danger'
      ? 'bg-danger-soft text-danger'
      : tone === 'info'
      ? 'bg-info-soft text-info'
      : 'bg-brand-soft text-brand-600 dark:text-brand-400'
  }`;

const buildColumns = (onStatusChange) => [
  {
    key: 'orderId',
    header: 'Order ID',
    sortable: true,
    render: (order) => (
      <span className="font-mono text-sm font-semibold text-foreground">{order.orderId}</span>
    ),
  },
  {
    key: 'customer',
    header: 'Customer',
    sortable: true,
    sortValue: (order) => order.shippingInfo?.fullName,
    render: (order) => (
      <div>
        <p className="font-semibold text-foreground">{order.shippingInfo?.fullName}</p>
        <p className="text-xs text-text-muted">{order.shippingInfo?.email}</p>
      </div>
    ),
  },
  {
    key: 'date',
    header: 'Date',
    sortable: true,
    sortValue: (order) => new Date(order.orderDate || order.createdAt).getTime(),
    render: (order) => (
      <span className="text-sm text-foreground">
        {new Date(order.orderDate || order.createdAt).toLocaleDateString()}
      </span>
    ),
  },
  {
    key: 'items',
    header: 'Items',
    align: 'right',
    sortable: true,
    sortValue: (order) => order.items?.length || 0,
    render: (order) => (
      <span className="text-sm text-foreground">{order.items?.length || 0} item(s)</span>
    ),
  },
  {
    key: 'total',
    header: 'Total',
    align: 'right',
    sortable: true,
    sortValue: (order) => order.pricing?.grandTotal || order.totalAmount || 0,
    render: (order) => (
      <span className="font-bold text-brand-600 dark:text-brand-400">
        {formatINR(order.pricing?.grandTotal || order.totalAmount || 0)}
      </span>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    sortValue: (order) => order.status,
    render: (order) => {
      const statusKey = order.status?.toLowerCase() || 'pending';
      return (
        <select
          value={statusKey}
          onChange={(e) => onStatusChange(order.orderId, e.target.value)}
          className={statusSelectClass(statusTones[statusKey])}
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      );
    },
  },
];

export const OrdersTable = ({ orders, currentPage, pageSize, onViewOrder, onStatusChange, onDelete }) => {
  const [sortKey, setSortKey] = useState('date');
  const [sortDir, setSortDir] = useState('desc');
  const [orderToDelete, setOrderToDelete] = useState(null);

  const columns = useMemo(() => buildColumns(onStatusChange), [onStatusChange]);
  const totalPages = Math.max(1, Math.ceil(orders.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const sortedOrders = sortRows(orders, columns, sortKey, sortDir);
  const pageRows = sortedOrders.slice((safePage - 1) * pageSize, safePage * pageSize);

  const rowActions = (order) => [
    {
      label: 'View Details',
      icon: <Eye size={15} aria-hidden />,
      onClick: () => onViewOrder(order),
    },
    {
      label: 'Delete Order',
      icon: <Trash2 size={15} aria-hidden />,
      tone: 'danger',
      onClick: () => setOrderToDelete(order._id),
    },
  ];

  const handleConfirmDelete = () => {
    if (orderToDelete) {
      onDelete(orderToDelete);
      setOrderToDelete(null);
    }
  };

  return (
    <>
      <DataGrid
        columns={columns}
        rows={pageRows}
        rowKey="orderId"
        sortKey={sortKey}
        sortDir={sortDir}
        onSortChange={(key, dir) => {
          setSortKey(key);
          setSortDir(dir);
        }}
        rowActions={rowActions}
        toolbar
        title="Orders"
        count={orders.length}
        emptyMessage="No orders found"
      />

      <ConfirmDialog
        open={Boolean(orderToDelete)}
        onClose={() => setOrderToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Order?"
        message="You won't be able to revert this!"
        confirmText="Yes, delete it"
      />
    </>
  )
}
