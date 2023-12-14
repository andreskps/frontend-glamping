import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import MultipleImageUpload from "../../components/MultipleImageUpload";

import { createProperty } from "../../services/propertyService";
import PropertyForm from "../../components/properties/propertyForm";

const PropertiesCreate = () => {

  return (
    <>

<PropertyForm isEditing={false}/>
    </>  
   
  );
};

export default PropertiesCreate;
