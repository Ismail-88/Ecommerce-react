// components/orders/EmptyOrdersState.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package } from 'lucide-react';

import EmptyState from '../../../../components/ui/EmptyState';
import Button from '../../../../components/ui/Button';

const EmptyOrdersState = ({ filter }) => {
  const navigate = useNavigate();

  const titleMap = {
    all: "No Orders Yet",
    transit: "No Orders in Transit",
    delivered: "No Delivered Orders",
    cancelled: "No Cancelled Orders"
  };
  const descriptionMap = {
    all: "Start your shopping journey today",
    transit: "You don't have any orders on the way at the moment",
    delivered: "Your delivered orders will show up here",
    cancelled: "Cancelled orders will appear here"
  };

  return (
    <EmptyState
      icon={Package}
      title={titleMap[filter] || `No ${filter} Orders`}
      description={descriptionMap[filter] || `You don't have any ${filter} orders at the moment`}
      action={
        <Button size="lg" onClick={() => navigate("/products")}>
          Start Shopping
        </Button>
      }
    />
  );
};

export default EmptyOrdersState;
