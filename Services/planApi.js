import axios from "axios";

const DOCTOR_ID = 10366;

export async function fetchPlans({
  leadId,
  agentId,
  showAllPlans = false,
}) {
  try {
    const res = await axios.post(
      "https://svcdev.whitecoats.com/agent/planListing",
      {
        leadId,
        doctorId : DOCTOR_ID,
        agentId,
        showAllPlans,
      }
    );

    return res.data?.data || [];
  } catch (err) {
    console.log("PLAN API ERROR:", err);
    return [];
  }
}
