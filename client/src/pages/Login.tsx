import { useState, FormEvent } from 'react';
import { validators } from '../util/form-validators';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Login = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    username: {
        touched: false,
        error: true,
        value: ''
    },
    password: {
        touched: false,
        error: true,
        value: ''
    },
  });
  type FormState = typeof formData;

  const setFieldValue = (field: string, value?: string | null, blur?: boolean | null) => setFormData(prevState => {
    console.log(value, blur, );
    return {
      ...prevState,
      [field]: {
        // ...prevState[field as keyof FormState],
        value: value ?? prevState[field as keyof FormState]["value"],
        touched: blur ?? prevState[field as keyof FormState]["touched"],
        error: !validators.name(value ?? prevState[field as keyof FormState]["value"]) ? true : false
      }
    }
  });

  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setFieldValue(name, value, false);
    console.log(formData);
  }

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    console.log(formData);
  }

  const handleBlur = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = ev.target;
    setFieldValue(name, null, true);
  }
    
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto md:min-w-[28rem]">
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
        </div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            
            <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
            <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
            {/* <div>
              <h1 className="text-2xl font-semibold capitalize">sign in</h1>
            </div> */}
            <form className="divide-y divide-gray-200" onSubmit={handleSubmit}>
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative mt-3">
                  <input 
                    autoComplete="off" 
                    name="username" 
                    type="text"
                    className={`peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none ${!formData.username.error && 'border-green-500 text-green-900 text-sm focus:ring-green-500 focus:border-green-500 block dark:bg-green-100 dark:border-green-400'} ${formData.username.error && formData.username.touched && 'border-red-500 text-sm focus:ring-red-500 focus:border-red-500 block dark:bg-red-100 dark:border-red-400'}`}
                    placeholder="Email Address or username" 
                    value={formData.username.value}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                  <label 
                    htmlFor="email" 
                    className={`absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm ${formData.username.error && formData.username.touched && 'text-red-700'}`}
                  >
                    Email or Username
                  </label>
                  {(formData.username.touched && !validators.name(formData.username.value)) && <div className="text-red-600 my-1 text-sm">
                    Name must have at least 3 characters.
                  </div>}
                </div>
                <div className="relative mt-3">
                  <input 
                    autoComplete="off" 
                    name="password" 
                    type={passwordShow ? "text" : "password" }
                    className={`peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none ${!formData.password.error && 'border-green-500 text-green-900 text-sm focus:ring-green-500 focus:border-green-500 block dark:bg-green-100 dark:border-green-400'} ${formData.password.error && formData.password.touched && 'border-red-500 text-sm focus:ring-red-500 focus:border-red-500 block dark:bg-red-100 dark:border-red-400'}`}
                    placeholder="Password"
                    value={formData.password.value}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                  />
                  <div className={`h-6 w-6 p-1 absolute right-0 5 cursor-pointer top-2.5 ${formData.password.touched && !validators.password(formData.password.value) && 'top-1.5'}`} onClick={() => setPasswordShow(!passwordShow)}>
                    {
                      passwordShow ? <AiOutlineEyeInvisible /> : <AiOutlineEye />
                    }
                  </div>
                  <label 
                    htmlFor="password" 
                    className={`absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm ${formData.password.error && formData.password.touched && 'text-red-700'}`}
                  >
                    Password
                  </label>
                  {(formData.password.touched && !validators.password(formData.password.value)) && <div className="text-red-600 my-1 text-sm">
                    Password must have at least 8 characters.
                  </div>}
                </div>
                <div className="relative mt-5">
                  <button 
                    type="submit"
                    className="outline-none border-none bg-gradient-to-br to-blue-600 from-blue-300 text-white rounded-lg p-2"
                    disabled={Object.values(formData).some(el => el.error === true)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;