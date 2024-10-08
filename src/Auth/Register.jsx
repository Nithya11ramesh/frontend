
import { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'student',
    enrollStatus: 'Not-enrolled'
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const response = await axios.post('https://capstone-backend-05tj.onrender.com/apiUsers/register', values);
      if (response.data) {
        sessionStorage.setItem('user', JSON.stringify(response.data));
        message.success('Registration successful');
        navigate('/login');
      } else {
        message.error('Registration failed! Please try again.');
      }
      message.success('Registration successful');
      navigate('/login');
    
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="container" >
      <div className="card mb-3 mt-3" style={{ border: '1px solid black' }}>
        <div className="row g-0">
          <div className="col-md-6  d-flex justify-content-center align-items-center p-2">
            <img
              src="https://static.vecteezy.com/system/resources/previews/045/709/588/non_2x/hand-pushing-button-with-register-here-word-on-yellow-background-photo.jpg"
              className="img-fluid rounded-start login-image"
              alt="..."
            />
          </div>
          <div className="col-md-6 col-12">
            <div className="card-body">
              <h1 className="text-center " style={{ color: 'blue', fontFamily: 'Poppins, sans-serif', fontWeight: 400  }}>
                <i className="bi bi-person-fill"> Register</i>
              </h1>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-3">
                      <label className="form-label playwrite-sk">First Name</label>
                      <Field type="text" className="form-control name-input" name="firstName" />
                      <ErrorMessage name="firstName" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label playwrite-sk">Last Name</label>
                      <Field type="text" className="form-control name-input" name="lastName" />
                      <ErrorMessage name="lastName" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label playwrite-sk">Email</label>
                      <Field type="email" className="form-control email-input" name="email" />
                      <ErrorMessage name="email" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label playwrite-sk">Password</label>
                      <Field type="password" className="form-control password-input" name="password" />
                      <ErrorMessage name="password" component="div" className="text-danger" />
                    </div>
                    <div className='d-flex justify-content-center gap-3'>
                      <button type="submit" className="btn btn-primary mt-2 pacifico-regular" style={{ fontSize: '1.5rem' }} disabled={isSubmitting || loading}>Create Account</button>
                    </div>
                    <div className='mt-3'>
                      <p className='text-center playwrite-sk'>Already have an account? <Link to={'/login'}>Login</Link></p>
                    </div>

                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;