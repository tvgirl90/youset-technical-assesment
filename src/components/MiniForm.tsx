import { Button, Typography, Container, Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField, makeStyles } from "@material-ui/core";
import React, { useState } from "react"

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
    },
    padding: {
        paddingBottom: "5px"
    },
    smallFont: {
        fontSize: "0.75rem"
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
    const [isDone, setIsDone] = useState(false)

    const handleOnChange = (e: any) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const isEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

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

        setErrors(formErrors)

        return formErrors.age === undefined && formErrors.email === undefined && formErrors.gender === undefined

    };

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const isValid: boolean = validate(e.target.elements) 

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
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
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
            // je le mets ici puisqu le fetch ne marche pas, sinon ça aurait été
            // dans le 2eme then 
            setIsDone(true)

        }
    }

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
                        <Grid container direction="column" xs={12} spacing={4} >
                            <Grid item >
                                <InputLabel className={classes.padding}>What is your email?</InputLabel>
                                <TextField
                                    required
                                    id="email"
                                    name="email"
                                    type={"email"}
                                    variant="standard"
                                    onChange={handleOnChange}
                                    error={errors.email !== undefined}
                                    helperText={errors.email}
                                />
                            </Grid>

                            <Grid item >
                                <InputLabel className={classes.padding}>How old are you?</InputLabel>
                                <TextField
                                    required
                                    id="age"
                                    name="age"
                                    type={"number"}
                                    variant="standard"
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
                                    {errors.gender && <Typography className={classes.smallFont} color="error">{errors.gender}</Typography>}
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
                <Grid className={classes.root} container direction="column" alignItems="center" justifyContent="center">
                    <Grid item>
                        <Typography variant="h5" component="div" align="center" color="primary"> You're All Set!</Typography>
                        <Typography variant="h5" component="div" align="center"> Look for a confirmation email from us and happy to have you on board!</Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" color="secondary" onClick={() => onCancel()}>
                            Back To Main Page
                        </Button>
                    </Grid>
                </Grid>
            }
        </React.Fragment>
    )
}

export default MiniForm;