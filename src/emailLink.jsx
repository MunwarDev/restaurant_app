import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const EmailLink = () => {
const [value,setValue] = useState("");
const onChange = (e) => {
    setValue(e.target.value);
}

const location = useLocation();
  const username = location.state?.username || 'user';

console.log(username);
  const email = 'munwarmatters@gmail.com';
  const subject = encodeURIComponent(`${username} has complaint!`);
  const body = encodeURIComponent(value);

  const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

  const handleClick = () => {
      window.location.href = mailtoLink;
      setValue("");
  };

  return (
<center>
<textarea value={value} onChange={onChange} rows={10} cols={100} placeholder='Enter your complaint'></textarea><br />
<button id='button' onClick={handleClick} >Send Email</button>
</center>
  );
};

export default EmailLink;
