import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { PlanContext } from '../../Context/PlanContext';

export default function PlanSelectorFull() {
  const { planResponse } = useContext(PlanContext);
  const categories = planResponse?.planCategory || [];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedPricing, setSelectedPricing] = useState(null);

  const plansOfCategory =
    categories.find(c => c.categoryName === selectedCategory)?.plan || [];

    const BackButton = ({ onPress }) => (
    <TouchableOpacity style={styles.backBtn} onPress={onPress}>
        <Text style={styles.backText}>← Back</Text>
    </TouchableOpacity>
    );

  return (
    <ScrollView style={styles.container}>

      {/* STEP 1 – CATEGORY */}
      {!selectedCategory && (
        <>
          <Text style={styles.title}>Select Category</Text>

          {categories.map(cat => (

            <TouchableOpacity
              key={cat.planCategoryId}
              style={styles.option}
              onPress={() => setSelectedCategory(cat.categoryName)}
            >
              <Text>{cat.categoryName}</Text>
            </TouchableOpacity>

           

          ))}
           <BackButton onPress={() => setSelectedCategory(null)} />
        </>
      )}

      {/* STEP 2 – PLAN */}
      {selectedCategory && !selectedPlan && (
        <>
          <Text style={styles.title}>{selectedCategory} Plans</Text>

          {plansOfCategory.map(plan => (
            <TouchableOpacity
              key={plan.planId}
              style={styles.option}
              onPress={() => setSelectedPlan(plan)}
            >
              <Text>{plan.planName}</Text>
            </TouchableOpacity>
          ))}
           <BackButton onPress={() => setSelectedCategory(null)} />
        </>
      )}

      {/* STEP 3 – PRICING */}
      {selectedPlan && !selectedPricing && (
        <>
          <Text style={styles.title}>{selectedPlan.planName}</Text>

          {selectedPlan.planPricing.map(p => (
            <TouchableOpacity
              key={p.planPricingId}
              style={styles.option}
              onPress={() => setSelectedPricing(p)}
            >
              <Text>
                {p.displayStr} (₹{p.price}) - Pre-GST
              </Text>
            </TouchableOpacity>
          ))}
           <BackButton onPress={() => setSelectedCategory(null)} />
        </>
      )}

      {/* STEP 4 – PRICING DETAILS */}
{selectedPricing && (
  <>
    <Text style={styles.title}>Plan Details</Text>

    {/* Setup Cost */}
    {selectedPricing.setUpCost > 0 && (
      <View style={styles.setupBox}>
        <Text>Setup Cost: ₹{selectedPricing.setUpCost}</Text>
      </View>
    )}

    {/* FEATURES */}
    <Text style={styles.section}>Features</Text>
    {selectedPricing.planPricingFeature?.map((f, index) => (
      <View key={f.featureId} style={styles.row}>
        <Text style={styles.bold}>
          {index + 1}. {f.featureName}
        </Text>
        <Text>Per Month: {f.perMonthCount}</Text>
        <Text>Total Count: {f.totalCount}</Text>
        <Text>Total Price: ₹{f.totalPrice}</Text>
      </View>
    ))}

    {/* ADD ONS */}
    {selectedPricing.planAddOn?.length > 0 && (
      <>
        <Text style={styles.section}>Add Ons</Text>
        {selectedPricing.planAddOn.map(addon => (
          <View key={addon.planAddOnId} style={styles.row}>
            <Text style={styles.bold}>{addon.addOnName}</Text>

            {addon.planPricingAddOn.map(p => (
              <Text key={p.planPricingAddOnId}>
                ₹{p.price} {p.recommended ? '(Recommended)' : ''}
              </Text>
            ))}
          </View>
        ))}
      </>
    )}

     <BackButton onPress={() => setSelectedCategory(null)} />
  </>
)}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  option: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  setupBox: {
    backgroundColor: '#dff5ea',
    padding: 10,
    marginVertical: 10,
    borderRadius: 6,
  },
  section: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 6,
  },
  row: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
  bold: { fontWeight: '600' },
  backBtn: {
  marginTop: 16,
  alignItems: 'center',
},

backText: {
  fontSize: 14,
  color: '#2563EB',
  fontWeight: '600',
},

});
