import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Loaded from environment variables
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, // Loaded from environment variables
  apiVersion: "2023-01-01", // Update this based on your Sanity setup
  useCdn: true, // Set to false if you want real-time updates
});
