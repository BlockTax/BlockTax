import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';
import ExportBlockTax from '../components/ExportBlockTax';

export default function Dashboard() {
  const [session, setSession] = useState(null);
  const [filteredTx, setFilteredTx] = useState([]);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push('/auth/signin');
      else {
        setSession(session);
        fetch('/api/bitget').then(res => res.json()).then(data => setFilteredTx(data.transactions));
      }
    });
  }, []);

  if (!session) return null;
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl mb-4">Dashboard</h1>
      <ExportBlockTax filteredTx={filteredTx} />
    </div>
  );
}
