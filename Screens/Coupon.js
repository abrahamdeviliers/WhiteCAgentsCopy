import { FlatList } from "react-native";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import ExpandableCard from "../Components/ExpandableCard";

function Coupon() {
  const { sessionToken } = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!sessionToken) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://svcdev.whitecoats.com/emp/coupon/getAll",
          {
            headers: {
              Authorization: `Bearer ${sessionToken}`,
            },
          }
        );

        setData(res.data.coupon);
      } catch (err) {
        console.log("Error fetching coupons", err);
      }
    };

    fetchData();
  }, [sessionToken]);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => String(item.couponId)}
      renderItem={({ item }) => (
        <ExpandableCard
          header={item.couponCode}
          subHeader={`Valid till ${item.endDate}`}
          badgeText={item.status}
          amount={
            item.discountType === "PERCENT"
              ? `${item.discountValue}% OFF`
              : `₹ ${item.discountValue} OFF`
          }
          rows={[
            { label: "Discount Type", value: item.discountType },
            { label: "Discount Value", value: item.discountValue },
            { label: "Min Order Value", value: item.minOrderValue },
            { label: "Max Discount", value: item.maxDiscount },
            { label: "Start Date", value: item.startDate },
            { label: "End Date", value: item.endDate },
          ]}
        />
      )}
    />
  );
}

export default Coupon;
