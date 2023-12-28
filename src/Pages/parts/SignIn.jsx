import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

const SignIn = ({userEmail, setUserEmail}) => {
  const [userPassword, setUserPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const navigate = useNavigate()
  
  const submitHandler = async(e) => {
    e.preventDefault()
    if(userEmail.length === 0){
      setPasswordError('Email cannot be empty')
      return
    }
    if(userPassword.length === 0){
      setPasswordError ('Password cannot be empty')
      return
    }
    try{
      // getting authentication done
       const auth = getAuth()
       await signInWithEmailAndPassword(auth, userEmail, userPassword)

      //  clear any previous error done
      setPasswordError('')

      // redirect to home
      navigate('../home')
    }
    catch(error){
      // Handle authentication errors (e.g., wrong credentials)
      console.error("Sign-in error:", error.message);
      setPasswordError("Invalid credentials. Please try again.");
    }
  };
  return (
    <div className="signin-content">
      <div className="toggle-btns">
          <button style={{backgroundColor:'rgb(166, 89, 238)'}} className="active" type="button">SignIn</button>
          <button type="button" onClick={()=>navigate('../signup')}>SignUp</button>
      </div>
      <div className="input">
         <form onSubmit={submitHandler}>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input type="email" placeholder="Email" value={userEmail} onChange={(e)=>setUserEmail(e.target.value)} />
            </div>
            <div className="password">
              <input type="password" placeholder="Password" value={userPassword} onChange={(e)=>setUserPassword(e.target.value)} />
            </div>
            <button type='submit'>SignIn</button>
         </form>
         <div className="input-info">
           <p>Does not have a account? <span><a href="/signup">SignUp</a></span></p>
          <p style={{color:'red'}}>{passwordError}</p>
         </div>
      </div>
    </div>
  );
};

export default SignIn;
