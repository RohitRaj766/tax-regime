import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTaxRegimeThunk } from '../redux/taxRegimesSlice';
import { useNavigate } from 'react-router-dom';
import './main.scss';
 
const AddTaxRegime = () => {
  const [name, setName] = useState('');
  const [rate, setRate] = useState('');
  const [uid, setUid] = useState('');
  const [username, setUsername] = useState('');
  const [level, setLevel] = useState('JM12');
  const [document, setDocument] = useState('');
  const [taxRegime, setTaxRegime] = useState('new');
  const [switchRegime, setSwitchRegime] = useState('no');
  const [confirm, setConfirm] = useState(false);
  const [declare, setDeclare] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUid(user.userID);
      setUsername(user.username);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (switchRegime !== 'yes' || !confirm || !declare) {
      setSubmissionError('Please select "Yes" for switching regime and check "I Confirm" and "I Declare" checkboxes.');
      return;
    }

    const formData = { name, rate, uid, username, level, document, taxRegime, switchRegime, confirm, declare };
    dispatch(addTaxRegimeThunk(formData));
    setName('');
    setRate('');
    setUid('');
    setUsername('');
    setLevel('JM12');
    setDocument('');
    setTaxRegime('new');
    setSwitchRegime('no');
    setConfirm(false);
    setDeclare(false);
    setSubmissionError('');
    navigate('/suggestion-management');
  };

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleDocumentClick = (docName) => {
    alert(`Opening document: ${docName}`);
  };

  return (
    <div className="add-tax-regime">
      <h1>Tax Regime Switch Facility for Financial Year</h1>
      <form onSubmit={handleSubmit}>
        <h2>Record Details</h2>
        <div className="form-group">
          <label htmlFor="uid">UID</label>
          <input
            id="uid"
            type="text"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            placeholder="UID"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="level">Level</label>
          <input
            id="level"
            type="text"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            placeholder="Level"
            required
          />
        </div>
        <div>
          <h3>Document Options</h3>
          <button type="button" onClick={() => handleDocumentClick('Document 1')}>Document 1</button>
          <button type="button" onClick={() => handleDocumentClick('Document 2')}>Document 2</button>
          <button type="button" onClick={() => handleDocumentClick('Document 3')}>Document 3</button>
        </div>
        <h3>You are under Income Tax</h3>
        <p>Default option - 1 (New Tax Regime)</p>
        <p>Do you want to switch from option 1 to 2?</p>
        <label>
          <input
            type="radio"
            name="switchRegime"
            value="yes"
            checked={switchRegime === 'yes'}
            onChange={(e) => setSwitchRegime(e.target.value)}
          /> Yes
        </label>
        <label>
          <input
            type="radio"
            name="switchRegime"
            value="no"
            checked={switchRegime === 'no'}
            onChange={(e) => setSwitchRegime(e.target.value)}
          /> No
        </label>
        <div>
          <label>
            <input
              type="checkbox"
              checked={confirm}
              onChange={(e) => setConfirm(e.target.checked)}
            /> I Confirm
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={declare}
              onChange={(e) => setDeclare(e.target.checked)}
            /> I Declare
          </label>
        </div>
        {submissionError && <p className="error-message">{submissionError}</p>}
        <button type="submit">Submit</button>
</form>
</div>
);
};

export default AddTaxRegime;