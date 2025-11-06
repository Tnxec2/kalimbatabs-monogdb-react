import  { FC } from "react"
import { Formik } from 'formik'
import { Button, Container, Form } from 'react-bootstrap'
import * as yup from 'yup'
import { useState } from 'react'
import Loading from '../components/Loading'
import { useAuth } from "../context/AuthContext"
import { useRestApi } from "../context/RestApiContext"

const userSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required()
})

type Props = {
    onLogin: () => void
}

const LogIn: FC<Props> = ({onLogin}) => {
    
    const { login } = useAuth();
    const { getToken } = useRestApi();

    const [loading, setLoading] = useState(false)


    function submitHandler (values: any) {
        setLoading(true)

        console.log('submit');
        
        getToken(values.username, values.password)
            .then((res: any) => {
            console.log(res);
            
        
            if (res.token) {
                console.log('logged in...');
                login(res.token, values.username);
                onLogin();
            } else {
                alert(res.message || 'Login failed');
            }})
            .catch((err) => alert(err))
            .finally(() => setLoading(false))        
    }

    return (
        <Container className='d-flex justify-content-center mt-3'>
            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}

                validationSchema={userSchema}
                onSubmit={submitHandler}
            >
                {({errors, touched, handleSubmit, values, handleChange}) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        {loading && <Loading />}
                        {!loading && (<div>
                            <h1>Login</h1>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="username" value={values.username} onChange={handleChange}  />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" value={values.password} onChange={handleChange} 
                                isValid={touched.password && !errors.password} />
                                <Form.Control.Feedback>{errors.password}</Form.Control.Feedback>
                            </Form.Group>
                            <div className="text-center mt-2">
                                <Button variant="primary" type="submit">Submit</Button>
                            </div>
                        </div>)}
                    </Form>
                )}
            </Formik>
        </Container>
    )
}

export default LogIn