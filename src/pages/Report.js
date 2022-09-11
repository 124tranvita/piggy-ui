import { PageTransition } from '../utils/Transition';

export default function Report() {
  return (
    <div className="relative">
      <PageTransition>
        <div className="p-7 text-2xl font-semibold flex-1 h-screen pt-20">
          <h1>Report</h1>
        </div>
      </PageTransition>
    </div>
  );
}
