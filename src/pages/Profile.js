import { CgProfile } from 'react-icons/cg';

import UserForm from '../components/UserForm';

import { PageTransition } from '../utils/Transition';

export default function Profile() {
  return (
    <div className="relative">
      <PageTransition>
        <header className="flex items-center pt-8 pb-4 border-b border-slate-200">
          <div className="flex items-center">
            <div className="text-4xl mr-3 text-violet-500">
              <CgProfile />
            </div>
            <h2 className="font-semibold">EDIT PROFILE</h2>
          </div>
        </header>
        <div className="flex flex-col justify-center items-center py-5">
          <UserForm />
        </div>
      </PageTransition>
    </div>
  );
}
