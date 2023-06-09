import React, {useState, useEffect} from 'react';
import * as S from "./ResultDashboardStyles";

// import dashboard_placeholder from '../../assets/dashboard_placeholder.jpg'
import dashboard_placeholder from '../../assets/result_sample_paint.png'


export default function ResultDashboard() {

return (
  <S.ResultContainer>
    <S.ResultTopImage src={dashboard_placeholder} alt="dashboard_placeholder" />
    <p>Sample results. Stay tuned for updates. </p>
  </S.ResultContainer>
);
}
