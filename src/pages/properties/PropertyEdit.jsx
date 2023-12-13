import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getProperty,  } from '../../services/propertyService';
import PropertyForm from './propertyForm';

const PropertyEdit = () => {
  const { id } = useParams();

  const { isLoading, error, data: property } = useQuery({
    queryKey: ['property', id],
    queryFn: () => getProperty(id),
  });

  const [formState, setFormState] = useState({
    name: '',
    description: '',
    location: '',
    capacity: 0,
  });

//   const mutation = useMutation(updateProperty);

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // mutation.mutate(formState);
  };

  return (
     <PropertyForm isEditing={true} />
     
  );
};

export default PropertyEdit;