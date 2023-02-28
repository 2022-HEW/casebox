import { NextPage } from "next";
import React, { useState } from "react";
import PrivacyTerms from "../../components/app/common/PrivacyTerms";

const app_terms: NextPage = () => {
  return (
   <PrivacyTerms name={"privacy"}/>
  );
};

export default app_terms;
