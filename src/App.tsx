import { AppBar, Box, Container, Grid, makeStyles, ThemeProvider, Toolbar, Typography } from "@material-ui/core";
import InsuranceOptions from "./InsuranceOptions";
import MiniForm from "./MiniForm"
import { theme } from "./theme";
import { useState } from "react";

const useStyles = makeStyles({
  addingMargin: {
    marginTop: "2%"
  }
})

export const App: React.FunctionComponent = () => {
  const classes = useStyles()

  const [viewForm, setViewForm] = useState(false)
  const [chosenPolicy, setChosenPolicy] = useState("")

  const onClick = (policyId: string) => {
    setChosenPolicy(policyId)
    setViewForm(true)
  }

  const onCancel = () => {
    setChosenPolicy("")
    setViewForm(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography>Technical Assignment</Typography>
          </Toolbar>
        </AppBar>
        <div className="container">
          <div className="content">
            <Grid container direction="column" alignItems="center" justifyContent="center">
              {viewForm ?
                <Grid item style={{width: "60%"}}>
                  <MiniForm chosenPolicy={chosenPolicy} onCancel={onCancel} />
                </Grid>
                :
                <div>
                  <Grid item>
                    <Box mb={3}>
                      <Container maxWidth="md" className={classes.addingMargin}>
                        <Typography align="center" variant="h3" component="h2" gutterBottom>
                          <Typography variant="h4" component="span" color="primary"> Rely on us </Typography>
                          <Typography variant="h4" component="span"> with your insurance policy.</Typography>
                        </Typography>
                        <Typography align="center" variant="subtitle1" color="textSecondary" paragraph={true}>Take a look at our policies and choose the one that best suits your needs</Typography>
                      </Container>
                    </Box>
                  </Grid>
                  <Grid item className={classes.addingMargin}>
                    <InsuranceOptions  onSelectOption={onClick} />
                  </Grid>
                </div>
                }
            </Grid>
          </div>
        </div>
      </div>
    </ThemeProvider >
  );
};
