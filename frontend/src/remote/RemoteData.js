import React, { useEffect, useState } from "react";
import axios from 'axios';

export const postData = async  (url,data) =>{
  return await axios.post(url, data)
}


