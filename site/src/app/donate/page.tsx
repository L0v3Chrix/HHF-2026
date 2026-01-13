import { redirect } from 'next/navigation';

// Alias redirect to main donate page
export default function DonatePage() {
  redirect('/get-involved/donate');
}
