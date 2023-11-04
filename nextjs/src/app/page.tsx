import * as React from 'react';
import Counter from '../components/counter';
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  return (
    <main>
      <p>home page</p>
      <Counter />
    </main>
  );
}