import axios from "axios";

export async function fetchPlans({
  leadId,
  doctorId,
  agentId,
  showAllPlans = false,
}) {
  try {
    const res = await axios.post(
      "https://svcdev.whitecoats.com/agent/planListing",
      {
        leadId,
        doctorId,
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
