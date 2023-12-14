import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getProperty,  } from '../../services/propertyService';
import PropertyForm from '../../components/properties/propertyForm';

const PropertyEdit = () => {
 
  return (
     <PropertyForm isEditing={true} />
  );
};

export default PropertyEdit;