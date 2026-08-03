// components/orders/EmptyOrdersState.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package } from 'lucide-react';

import EmptyState from '../../../../components/ui/EmptyState';
import Button from '../../../../components/ui/Button';

const EmptyOrdersState = ({ filter }) => {
  const navigate = useNavigate();

  return (
    <EmptyState
      icon={Package}
      title={filter === "all" ? "No Orders Yet" : `No ${filter} Orders`}
      description={
        filter === "all"
          ? "Start your shopping journey today"
          : `You don't have any ${filter} orders at the moment`
      }
      action={
        <Button size="lg" onClick={() => navigate("/products")}>
          Start Shopping
        </Button>
      }
    />
  );
};

export default EmptyOrdersState;
