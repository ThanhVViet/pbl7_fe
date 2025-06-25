import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const PaymentFailure = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-10">
      <SentimentVeryDissatisfiedIcon style={{ fontSize: 80, color: '#e53935' }} />
      <h1 className="text-3xl font-bold text-red-600 mt-4 mb-2">Thanh toán thất bại</h1>
      <p className="text-gray-700 mb-6 text-center max-w-md">
        Giao dịch của bạn không thành công. Vui lòng kiểm tra lại thông tin hoặc thử lại sau.<br/>
        Nếu bạn cần hỗ trợ, hãy liên hệ với chúng tôi qua hotline hoặc email.
      </p>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>Về trang chủ</Button>
    </div>
  );
};

export default PaymentFailure; 