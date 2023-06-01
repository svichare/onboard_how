import React, {useState, useEffect} from 'react';
import * as S from "./ResultDashboardStyles";

import dashboard_placeholder from '../../assets/dashboard_placeholder.jpg'


export default function ResultDashboard() {

return (
  <S.ResultContainer>
    <S.ResultTopImage src={dashboard_placeholder} alt="dashboard_placeholder" />
    <h1>Stay tuned for the result dashboard...</h1>
    <p>  . </p>
    <p>Still under construction. </p>
  </S.ResultContainer>
);
}
