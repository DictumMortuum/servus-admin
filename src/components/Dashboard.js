import * as React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import GamesExpenses from "./graphs/GamesExpenses";
import Income from "./graphs/Income";
import { Grid } from "@mui/material";
import { Title } from 'react-admin';

const Dashboard = () => (
  <Card>
    <Title title="Home" />
    <CardContent>
      <Grid container>
        <Grid md={6} xs={12}>
          <Income disable_title={true} />
        </Grid>
        <Grid md={6} xs={12}>
          <GamesExpenses disable_title={true} />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default Dashboard;
