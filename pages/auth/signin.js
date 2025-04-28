import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

     const handleSignIn = async (e) => {
     e.preventDefault();
     setLoading(true);
-    const { error } = await supabase.auth.signIn({ email, password });
+    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
+      email,
+      password
+    });
     setLoading(false);
-    if (error) {
-      setError(error.message);
-    } else {
-      router.push('/dashboard');
-    }
+    if (signInError) {
+      setError(signInError.message);
+    } else {
+      router.push('/dashboard');
+    }
   };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSignIn} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl mb-4">Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input type="email" placeholder="E-Mail" value={email} onChange={e => setEmail(e.target.value)} className="w-full mb-3 p-2 border rounded" required />
        <input type="password" placeholder="Passwort" value={password} onChange={e => setPassword(e.target.value)} className="w-full mb-3 p-2 border rounded" required />
        <button type="submit" disabled={loading} className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
          {loading ? 'Lädt...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
