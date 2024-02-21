import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import { registerAdminHandler, registerCustomerHandler, sendOtpHandler } from '../../../utils/HandlerFunctions/AdminHandler';
// ----------------------------------------------------------------------
import { setShow } from '../../../Actions/ManagerActions';
import { useDispatch } from 'react-redux';
import { Button, Radio } from 'antd';

export default function RegisterForm({setIsRegister}) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [address,setAddress] = useState("");
  const [street,setStreet] = useState("");
  const [pincode,setPincode] = useState("");
  const [gender,setGender] = useState("");
  const [otp,setOtp] = useState("");
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
    },
    // validationSchema: RegisterSchema,
    onSubmit: () => {
      // navigate('/dashboard', { replace: true });
    },
  });

  const { errors, touched, isSubmitting, getFieldProps } = formik;

  return (
    <>
    <FormikProvider value={formik}>
      <Form
        autoComplete="off"
        noValidate
        onSubmit={e =>
          registerCustomerHandler(e,
             firstName,
             lastName,
             email,
             password,
             mobile,
             address,
             street,
             otp,
             pincode,
             gender,
              navigate)
        }
      >
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="firstname"
              {...getFieldProps('firstname')}
              error={Boolean(touched.userName && errors.userName)}
              helperText={touched.userName && errors.userName}
              onChange={e => setFirstName(e.target.value)}
              value={firstName}
            />
          </Stack>
           <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="lastname"
              {...getFieldProps('lastname')}
              error={Boolean(touched.userName && errors.userName)}
              helperText={touched.userName && errors.userName}
              onChange={e => setLastName(e.target.value)}
              value={lastName}
            />
          </Stack>
          <TextField
            fullWidth
            autoComplete="email"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Button onClick={()=>sendOtpHandler(email)}>Get Otp</Button>
          <TextField
            fullWidth
            autoComplete="otp"
            type="number"
            label="otp"
            {...getFieldProps('otp')}
            error={Boolean(touched.otp && errors.otp)}
            helperText={touched.otp && errors.otp}
            value={otp}
            onChange={e => setOtp(e.target.value)}
          />
          <TextField
            fullWidth
            autoComplete="mobile"
            type="mobile"
            label="mobile"
            {...getFieldProps('email')}
            error={Boolean(touched.mobile && errors.mobile)}
            helperText={touched.mobile && errors.mobile}
            value={mobile}
            onChange={e => setMobile(e.target.value)}
          />

          <TextField
            fullWidth
            autoComplete="address"
            type="text"
            label="address"
            {...getFieldProps('address')}
            error={Boolean(touched.address && errors.address)}
            helperText={touched.address && errors.address}
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
           <TextField
            fullWidth
            autoComplete="street"
            type="text"
            label="street"
            {...getFieldProps('street')}
            error={Boolean(touched.street && errors.street)}
            helperText={touched.street && errors.street}
            value={street}
            onChange={e => setStreet(e.target.value)}
          />
           <TextField
            fullWidth
            autoComplete="pincode"
            type="text"
            label="pincode"
            {...getFieldProps('pincode')}
            error={Boolean(touched.pincode && errors.pincode)}
            helperText={touched.pincode && errors.pincode}
            value={pincode}
            onChange={e => setPincode(e.target.value)}
          />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword(prev => !prev)}
                  >
                    <Iconify
                      icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
           <Radio.Group onChange={(e)=>setGender(e.target.value)} value={gender}>
             <Radio value={'MALE'}>Male</Radio>
             <Radio value={'FEMALE'}>Female</Radio>
             <Radio value={'OTHERS'}>Others</Radio>
           </Radio.Group>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
          <span onClick={()=>setIsRegister(false)}>Login Instead</span>
        </Stack>
      </Form>
    </FormikProvider>
    </>
  );
}
