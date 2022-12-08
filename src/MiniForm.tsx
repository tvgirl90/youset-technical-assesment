import { Button, Typography, Container, Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react"

interface FormProps {
    chosenPolicy: string;
    onCancel: () => void;
}

interface Errors {
    email?: string;
    age?: string;
    gender?: string;
}

interface FormValues {
    email: string;
    age: number;
    gender: string;
}

const useStyles = makeStyles({
    root: {
        '& .MuiFormControl-root': {
            width: '100%',
        }
    }
})

const MiniForm: React.FunctionComponent<FormProps> = ({ chosenPolicy, onCancel }) => {

    const classes = useStyles()

    const defaultFormValues: FormValues = {
        email: "",
        age: 0,
        gender: "",
    }
    const [formValues, setFormValues] = useState(defaultFormValues);
    const [isValid, setIsValid] = useState(false)
    const [isDone, setIsDone] = useState(false)

    const handleOnChange = (e: any) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const isEmail = (email: string) => /\S+@\S+\.\S+/.test(email); ///^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

    const [errors, setErrors] = useState<Errors>({})

    const validate = (formValues: any) => {
        let formErrors: Errors = {
            email: undefined,
            age: undefined,
            gender: undefined,
        }

        if (!formValues.age.value) {
            formErrors.age = "This field is required";
        }
        if (typeof parseInt(formValues.age.value) !== 'number') {
            formErrors.age = "Please use only numbers"
        }
        if (formValues.age.value < 0) {
            formErrors.age = "Please enter a valid age number";
        }

        if (!formValues.email.value) {
            formErrors.email = "This field is required";
        }
        if (!isEmail(formValues.email.value)) {
            formErrors.email = "Please, enter a valid email address";
        }
        if (!formValues.gender.value) {
            formErrors.gender = "Please, select a value";
        }

        if (formErrors.age === undefined && formErrors.email === undefined && formErrors.gender === undefined) {
            alert("youpiii")
            setIsValid(true)
        }
        setErrors(formErrors)
    };

    const handleSubmit = (e: any) => {
        e.preventDefault()
        console.log(e.target.elements)
        console.log(formValues)

        validate(e.target.elements)
    }


    useEffect(() => {
        console.log("is valid", isValid)
        if (isValid) {
            const params = {
                user: {
                    age: formValues.age,
                    gender: formValues.gender,
                    email: formValues.email
                },
                insuranceIdChosen: chosenPolicy
            }

            const options = {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    accept: 'application/json',
                },
            }

            fetch('http://www.example.com/', options)
                .then(response => response.json())
                .then(response => {
                    console.log("success!!")
                    console.log(response)
                })
                .catch(rejected => {
                    console.log("error!!")
                    console.log(rejected);
                });
            // je le mets ici puisqu le fetch ne marche pas
            setIsDone(true)

        }
    });


    return (
        <React.Fragment>
            {!isDone ?
                <div>
                    <Box mb={3}>
                        <Container maxWidth="md">
                            <Typography align="center" variant="h3" component="h2" gutterBottom={true}>
                                <Typography variant="h5" component="span" color="primary"> Almost done!</Typography>
                                <Typography variant="h5" component="span"> We just need more information before we can setup your insurance plan!</Typography>
                            </Typography>
                            <Typography align="center" variant="h4"> </Typography>
                        </Container>
                    </Box>
                    <form className={classes.root} autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <Typography>{chosenPolicy}</Typography>
                        <Grid container direction="column" xs={12} spacing={4} >
                            <Grid item >
                                <InputLabel style={{ paddingBottom: 5 }}>What is your email?</InputLabel>
                                <TextField
                                    required
                                    id="email"
                                    name="email"
                                    type={"email"}
                                    variant="outlined"
                                    onChange={handleOnChange}
                                    error={errors.email !== undefined}
                                    helperText={errors.email}
                                />
                            </Grid>

                            <Grid item >
                                <InputLabel style={{ paddingBottom: 5 }}>How old are you?</InputLabel>
                                <TextField
                                    required
                                    id="age"
                                    name="age"
                                    type={"number"}
                                    variant="outlined"
                                    onChange={handleOnChange}
                                    error={errors.age !== undefined}
                                    helperText={errors.age}
                                />
                            </Grid>

                            <Grid item >
                                <FormControl>
                                    <InputLabel>What is your gender?</InputLabel>
                                    <Select
                                        className="large"
                                        error={errors.gender !== undefined}
                                        name="gender" id="gender" value={formValues.gender} onChange={handleOnChange}>
                                        <MenuItem key="Women" value="Women">Women</MenuItem>
                                        <MenuItem key="Men" value="Men">Men</MenuItem>
                                        <MenuItem key="Other" value="Other">Other</MenuItem>
                                    </Select>
                                    {errors.gender && <Typography color="error">{errors.gender}</Typography>}
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <Grid container direction="row-reverse" spacing={2}>
                                    <Grid item >
                                        <Button variant="contained" color="primary" type="submit">
                                            Submit
                                        </Button>
                                    </Grid>
                                    <Grid item >
                                        <Button variant="outlined" color="secondary" onClick={() => onCancel()}>
                                            Cancel
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                :
                <Box mb={3}>
                    <Container maxWidth="md">
                        <Typography variant="h5" component="span" color="primary"> done!</Typography>
                        <Button variant="outlined" color="secondary" onClick={() => onCancel()}>
                            Back To Main Page
                        </Button>
                    </Container>
                </Box>
            }
        </React.Fragment>
    )
}

export default MiniForm;