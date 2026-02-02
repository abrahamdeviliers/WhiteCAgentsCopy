import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PlanContext } from "../../Context/PlanContext";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

export default function PlanSelectorFull({ onSubmit }) {
  const { planResponse } = useContext(PlanContext);
  const { sessionToken } = useContext(AuthContext);
  const categories = planResponse?.planCategory || [];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedPricing, setSelectedPricing] = useState(null);

  const [includeSetupCost, setIncludeSetupCost] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState({});

  // Coupon state
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [showCouponDropdown, setShowCouponDropdown] = useState(false);
  const [loadingCoupons, setLoadingCoupons] = useState(false);

  const plansOfCategory =
    categories.find(c => c.categoryName === selectedCategory)?.plan || [];

  // Fetch coupons when component mounts
  useEffect(() => {
    if (!sessionToken) return;

    const fetchCoupons = async () => {
      try {
        setLoadingCoupons(true);
        const res = await axios.get(
          "http://svcdev.whitecoats.com/emp/coupon/getAll",
          {
            headers: {
              Authorization: `Bearer ${sessionToken}`,
            },
          }
        );
        setCoupons(res.data.coupon || []);
      } catch (err) {
        console.log("Error fetching coupons", err);
      } finally {
        setLoadingCoupons(false);
      }
    };

    fetchCoupons();
  }, [sessionToken]);

  const toggleAddon = id => {
    setSelectedAddOns(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const calculateAmount = () => {
    let baseAmount = Number(selectedPricing.price) || 0;
    let setupCost = includeSetupCost ? Number(selectedPricing.setUpCost) : 0;
    
    // Add selected add-ons
    let addOnsTotal = 0;
    if (selectedPricing.planAddOn) {
      selectedPricing.planAddOn.forEach(addon => {
        if (selectedAddOns[addon.planAddOnId] && addon.planPricingAddOn?.length > 0) {
          // Add first pricing option for each selected addon
          addOnsTotal += Number(addon.planPricingAddOn[0].price) || 0;
        }
      });
    }

    let subtotal = baseAmount + setupCost + addOnsTotal;

    // Apply coupon discount if selected
    
    let discount = 0;
    if (selectedCoupon) {
      if (selectedCoupon.discountType === "PERCENT") {
        discount = (subtotal * Number(selectedCoupon.discountFixed || 0)) / 100;
        // Apply max discount cap if exists
        if (selectedCoupon.maxDiscount && discount > Number(selectedCoupon.maxDiscount)) {
          discount = Number(selectedCoupon.maxDiscount);
        }
      } else {
        discount = Number(selectedCoupon.discountValue || 0);
      }
    }

    const finalAmount = subtotal - discount;

    return {
      baseAmount,
      setupCost,
      addOnsTotal,
      subtotal,
      discount,
      finalAmount: finalAmount > 0 ? finalAmount : 0,
    };
  };

  const BackButton = ({ onPress }) => (
    <Pressable style={styles.backBtn} onPress={onPress}>
      <Ionicons name="arrow-back" size={18} color="#2563EB" />
      <Text style={styles.backText}>Back</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* ---------------- STEP 1 : CATEGORY ---------------- */}
      {!selectedCategory && (
        <>
          <Text style={styles.title}>Select Category</Text>

          {categories.map(cat => (
            <Pressable
              key={cat.planCategoryId}
              style={styles.card}
              onPress={() => setSelectedCategory(cat.categoryName)}
            >
              <Text style={styles.cardTitle}>{cat.categoryName}</Text>
              <Ionicons name="chevron-forward" size={18} color="#64748B" />
            </Pressable>
          ))}
        </>
      )}

      {/* ---------------- STEP 2 : PLAN ---------------- */}
      {selectedCategory && !selectedPlan && (
        <>
          <Text style={styles.title}>{selectedCategory} Plans</Text>

          {plansOfCategory.map(plan => (
            <Pressable
              key={plan.planId}
              style={styles.card}
              onPress={() => setSelectedPlan(plan)}
            >
              <Text style={styles.cardTitle}>{plan.planName}</Text>
              <Ionicons name="chevron-forward" size={18} color="#64748B" />
            </Pressable>
          ))}

          <BackButton onPress={() => setSelectedCategory(null)} />
        </>
      )}

      {/* ---------------- STEP 3 : PRICING ---------------- */}
      {selectedPlan && !selectedPricing && (
        <>
          <Text style={styles.title}>{selectedPlan.planName}</Text>

          {selectedPlan.planPricing.map(p => (
            <Pressable
              key={p.planPricingId}
              style={styles.card}
              onPress={() => setSelectedPricing(p)}
            >
              <View>
                <Text style={styles.cardTitle}>{p.displayStr}</Text>
                <Text style={styles.subText}>₹{p.price} (Pre-GST)</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#64748B" />
            </Pressable>
          ))}

          <BackButton onPress={() => setSelectedPlan(null)} />
        </>
      )}

      {/* ---------------- STEP 4 : DETAILS ---------------- */}
      {selectedPricing && (
        <>
          <Text style={styles.title}>Plan Details</Text>

          {/* SETUP COST */}
          {selectedPricing.setUpCost > 0 && (
            <Pressable
              style={styles.checkRow}
              onPress={() => setIncludeSetupCost(!includeSetupCost)}
            >
              <Ionicons
                name={
                  includeSetupCost
                    ? "checkbox"
                    : "square-outline"
                }
                size={20}
                color="#2563EB"
              />
              <Text style={styles.checkText}>
                Include Setup Cost (₹{selectedPricing.setUpCost})
              </Text>
            </Pressable>
          )}

          {/* FEATURES */}
          <Text style={styles.section}>Features</Text>
          {selectedPricing.planPricingFeature?.map((f, i) => (
            <View key={f.featureId} style={styles.featureCard}>
              <Text style={styles.bold}>
                {i + 1}. {f.featureName}
              </Text>
              <Text style={styles.subText}>
                Per Month: {f.perMonthCount} | Total: {f.totalCount}
              </Text>
              <Text style={styles.subText}>
                Total Price: ₹{f.totalPrice}
              </Text>
            </View>
          ))}

          {/* ADD ONS */}
          {selectedPricing.planAddOn?.length > 0 && (
            <>
              <Text style={styles.section}>Add Ons</Text>

              {selectedPricing.planAddOn.map(addon => (
                <Pressable
                  key={addon.planAddOnId}
                  style={styles.addonCard}
                  onPress={() => toggleAddon(addon.planAddOnId)}
                >
                  <Ionicons
                    name={
                      selectedAddOns[addon.planAddOnId]
                        ? "checkbox"
                        : "square-outline"
                    }
                    size={20}
                    color="#2563EB"
                  />

                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.bold}>{addon.addOnName}</Text>
                    {addon.planPricingAddOn.map(p => (
                      <Text key={p.planPricingAddOnId} style={styles.subText}>
                        ₹{p.price}{" "}
                        {p.recommended ? "(Recommended)" : ""}
                      </Text>
                    ))}
                  </View>
                </Pressable>
              ))}
            </>
          )}

          {/* COUPON DROPDOWN */}
<Text style={styles.section}>Select Coupon (Optional)</Text>

{loadingCoupons ? (
  <ActivityIndicator size="small" color="#2563EB" style={{ marginVertical: 10 }} />
) : (
  <View style={styles.dropdownContainer}>
    <Pressable
      style={({ pressed }) => [
        styles.dropdown,
        pressed && styles.dropdownPressed
      ]}
      onPress={() => setShowCouponDropdown(!showCouponDropdown)}
      android_ripple={{ color: "#E5E7EB" }}
    >
      <Text style={styles.dropdownText}>
        {selectedCoupon 
          ? `${selectedCoupon.couponCode} - ${selectedCoupon.discountType === "PERCENT" 
              ? `${selectedCoupon.discountFixed}% OFF` 
              : `₹${selectedCoupon.discountValue} OFF`}`
          : "Select a coupon"
        }
      </Text>
      <Ionicons 
        name={showCouponDropdown ? "chevron-up" : "chevron-down"} 
        size={18} 
        color="#64748B" 
      />
    </Pressable>

    {showCouponDropdown && (
      <Pressable style={styles.dropdownListContainer}>
        {/* None option */}
        <Pressable
          style={({ pressed }) => [
            styles.dropdownItem,
            pressed && styles.dropdownItemPressed
          ]}
          onPress={() => {
            setSelectedCoupon(null);
            setShowCouponDropdown(false);
          }}
          android_ripple={{ color: "#F3F4F6" }}
        >
          <Text style={styles.dropdownItemText}>No Coupon</Text>
        </Pressable>

        {coupons.map(coupon => (
          <Pressable
            key={coupon.couponId}
            style={({ pressed }) => [
              styles.dropdownItem,
              selectedCoupon?.couponId === coupon.couponId && styles.selectedItem,
              pressed && styles.dropdownItemPressed
            ]}
            onPress={() => {
              setSelectedCoupon(coupon);
              setShowCouponDropdown(false);
            }}
            android_ripple={{ color: "#F3F4F6" }}
          >
            <View style={styles.dropdownItemContent}>
              <Text style={styles.dropdownItemText}>
                {coupon.couponCode}
              </Text>
              <Text style={styles.dropdownItemSubText}>
                {coupon.discountType === "PERCENT" 
                  ? `${coupon.discountFixed}% OFF` 
                  : `₹${coupon.discountValue} OFF`}
                {" - Valid till " + coupon.endDate}
              </Text>
            </View>
          </Pressable>
        ))}
      </Pressable>
    )}
  </View>
)}

          {/* CALCULATE AMOUNT BUTTON */}
          <Pressable
            style={styles.calculateBtn}
            onPress={() => {
              const amounts = calculateAmount();
              console.log("Calculated Amounts:", amounts);
              alert(
                `Base Amount: ₹${amounts.baseAmount}\n` +
                `Setup Cost: ₹${amounts.setupCost}\n` +
                `Add-ons Total: ₹${amounts.addOnsTotal}\n` +
                `Subtotal: ₹${amounts.subtotal}\n` +
                `Discount: ₹${amounts.discount}\n` +
                `Final Amount: ₹${amounts.finalAmount}`
              );
            }}
          >
            <Ionicons name="calculator-outline" size={18} color="#fff" />
            <Text style={styles.calculateText}>Calculate Amount</Text>
          </Pressable>

          {/* SUBMIT */}
          <Pressable
            style={styles.submitBtn}
            onPress={() =>
              onSubmit?.({
                selectedCategory,
                selectedPlan,
                selectedPricing,
                includeSetupCost,
                selectedAddOns,
                selectedCoupon,
                calculatedAmounts: calculateAmount(),
              })
            }
          >
            <Text style={styles.submitText}>Submit Plan</Text>
          </Pressable>

          <BackButton onPress={() => setSelectedPricing(null)} />
        </>
      )}
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    paddingBottom: 40,
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 14,
    color: "#0F172A",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  cardTitle: {
    fontWeight: "600",
    fontSize: 14,
    color: "#0F172A",
  },

  subText: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },

  section: {
    fontSize: 15,
    fontWeight: "700",
    marginTop: 18,
    marginBottom: 10,
  },

  featureCard: {
    backgroundColor: "#F8FAFC",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },

  addonCard: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 10,
    alignItems: "flex-start",
  },

  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  checkText: {
    marginLeft: 10,
    fontWeight: "500",
  },

  // Coupon Dropdown Styles
  dropdownContainer: {
    marginBottom: 16,
    zIndex: 1000,
  },

  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 14,
  },

  dropdownText: {
    fontSize: 14,
    color: "#0F172A",
    flex: 1,
  },

  dropdownList: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    marginTop: 8,
    maxHeight: 200,
  },

  dropdownItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },

  selectedItem: {
    backgroundColor: "#EFF6FF",
  },

  dropdownItemText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },

  dropdownItemSubText: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },

  calculateBtn: {
    backgroundColor: "#10B981",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },

  calculateText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    marginLeft: 8,
  },

  submitBtn: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },

  submitText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },

  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },

  backText: {
    marginLeft: 6,
    color: "#2563EB",
    fontWeight: "600",
  },

  bold: {
    fontWeight: "600",
  },
});
