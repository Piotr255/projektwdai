import React, {useEffect, useState} from 'react';
import {jwtDecode} from "jwt-decode";
import useFetch from "./useFetch";
import useToken from "./useToken";

const CouponNotification = () => {
  const userData = useToken();
  const [couponNotificationContainer, setCouponNotificationContainer] = useState(null);
  const [showCouponNotification, setShowCouponNotification] = useState(true);
  useEffect(() => {
    setCouponNotificationContainer(document.querySelector('.coupon-notification-container'));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && userData && couponNotificationContainer && showCouponNotification){
      const decoded = jwtDecode(token);
      if (userData.bonus_count > 0){
        couponNotificationContainer.classList.remove("no-display");
      }
    }
  }, [userData, couponNotificationContainer]);

  const handleCloseNotification = () => {
    setShowCouponNotification(false);
    couponNotificationContainer.classList.add("no-display");
  }

  return (
    <div className="coupon-notification-container no-display">
      <div className="coupon-notification-container-notification">
        {userData && <span className="coupon-notification">Twoje kupony: </span>}
        {userData && <span id="coupon-notification-coupon-count">{userData.bonus_count}</span>}
      </div>
      <div className="coupon-notification-container-close">
        {userData && <span id="close-coupon-notification" onClick={handleCloseNotification}>&#10006;</span>}
      </div>
    </div>


  );
};

export default CouponNotification;
