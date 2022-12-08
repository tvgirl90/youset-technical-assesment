import { makeStyles, Grid, Card, CardContent, Typography, CardActions, Button } from "@material-ui/core";
import React from "react";
import InsuranceOptionCard from "./InsuranceOptionCard";
import insuranceData from "./data";

interface InsuranceOptionsProps {
  onSelectOption: (policyId: string) => void;
}

const InsuranceOptions: React.FunctionComponent<InsuranceOptionsProps> 
= ({onSelectOption}) => {

    return (
    <React.Fragment>
        <Grid direction="row" container alignItems="center" spacing={2}>
          <InsuranceOptionCard 
            id={insuranceData[0].id}
            title={insuranceData[0].insurerName} 
            description={insuranceData[0].description}
            price={insuranceData[0].price}
            onClick={onSelectOption}
          />
          <InsuranceOptionCard 
            recommended 
            id={insuranceData[1].id}
            title={insuranceData[1].insurerName} 
            description={insuranceData[1].description}
            price={insuranceData[1].price}
            onClick={onSelectOption}
          />
          <InsuranceOptionCard 
            id={insuranceData[2].id}
            title={insuranceData[2].insurerName} 
            description={insuranceData[2].description}
            price={insuranceData[2].price}
            onClick={onSelectOption}
          />
        </Grid>
    </React.Fragment>
)
}

export default InsuranceOptions;