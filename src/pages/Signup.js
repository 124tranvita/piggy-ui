import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(email, password);
    await signup(name, email, password, passwordConfirm);
  };

  return (
    <>
      <h1>Signup</h1>
      <form className="signup" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <label>Email</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <label>Password Confirm</label>
        <input
          type="password"
          onChange={(e) => setPasswordConfirm(e.target.value)}
          value={passwordConfirm}
        />
        <button type="submit" disabled={isLoading}>
          Submit
        </button>
        {error && <div>{error}</div>}
      </form>
    </>
  );
};

export default Signup;
